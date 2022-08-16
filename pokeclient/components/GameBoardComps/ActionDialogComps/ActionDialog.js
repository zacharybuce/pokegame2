import { Dialog, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import Battle from "./Battle/Battle";
import StarterTown from "./StarterTown/StarterTown";
import { useSocket } from "../../../contexts/SocketProvider";
import BattleEndScreen from "./Battle/BattleEndScreen";
import ReleasePokemonDialog from "./ReleasePokemon/ReleasePokemonDialog";

const ActionDialog = ({
  action,
  actionDialog,
  actionComplete,
  mapId,
  bag,
  setBag,
  badges,
  event,
  money,
  setMoney,
  team,
  playerLocation,
  id,
  setActionDialog,
  selectStartingTown,
  setAction,
  setCandies,
  setTeam,
  setActionComplete,
  setBadges,
}) => {
  const socket = useSocket();
  const [wildMon, setWildMon] = useState();
  const [battleEnd, setBattleEnd] = useState(false);
  const [rewards, setRewards] = useState([]);
  const [oppTeam, setOppTeam] = useState();
  const [releaseDialog, setReleaseDialog] = useState();

  // useEffect(() => {
  //   if (action == "wildbattle" && !wildMon) getWildMon();
  // }, [action]);

  //triggered when a pokemon is successfully caught
  const catchPokemon = () => {
    if (team.length < 6) {
      setTeam((prev) => [...prev, wildMon]);
      setWildMon(undefined);
    } else {
      setReleaseDialog(true);
    }
  };

  //called when wanting to release a pokemon and replace with the one just caught
  const releasePokemon = (index) => {
    console.log(wildMon);

    if (index == -1) {
    } else {
      if (team[index].item) {
        let newBag = bag;
        newBag.heldItems.push(team[index].item);
        setBag(newBag);
      }

      let newTeam = team.slice();
      newTeam.splice(index, 1);
      setTeam([...newTeam, wildMon]);
    }

    setReleaseDialog(false);
  };

  //called when battle is over
  const endBattle = (win, team, caught) => {
    socket.emit("end-battle");
    applyExhaustion(team, win);
    generateRewards(win, caught);
    if (caught) catchPokemon();
    setBattleEnd(true);
  };

  //decide rewards based on battle type and badges
  const generateRewards = (win, caught) => {
    switch (action) {
      case "wildbattle":
        if (win && !caught) {
          let candies = 0;
          //console.log(oppTeam);
          let bst = 0;
          for (const stat in wildMon.baseStats) {
            if (Object.hasOwnProperty.call(wildMon.baseStats, stat)) {
              bst += wildMon.baseStats[stat];
            }
          }
          candies += Math.round(bst / 150);

          setRewards({ win: win, candies: candies });
          setCandies((prev) => prev + candies);
        } else if (win && caught) {
          setRewards({ win: win, candies: 1 });
          setCandies((prev) => prev + 1);
        } else {
          setRewards({ candies: 0 });
        }
        break;
      case "gymchallenge":
        if (win) {
          let candies = 0;
          //console.log(oppTeam);

          oppTeam.forEach((pokemon) => {
            let bst = 0;

            for (const stat in pokemon.baseStats) {
              if (Object.hasOwnProperty.call(pokemon.baseStats, stat)) {
                bst += pokemon.baseStats[stat];
              }
            }

            candies += Math.round(bst / 150);
          });

          let money = 5000 + badges.length * 500;
          setRewards({ win: win, candies: candies, money: money });
          setCandies((prev) => prev + candies);
          setMoney((prev) => prev + money);
          setBadges([...badges, { gym: event.gym }]);
        } else {
          setRewards({ candies: 0, money: 0 });
        }
        break;
      case "trainerbattle":
        if (win) {
          let candies = 0;
          oppTeam.forEach((pokemon) => {
            let bst = 0;

            for (const stat in pokemon.baseStats) {
              if (Object.hasOwnProperty.call(pokemon.baseStats, stat)) {
                bst += pokemon.baseStats[stat];
              }
            }

            candies += Math.round(bst / 150);
          });
          let money = 500 + badges.length * 500;
          setRewards({ win: win, candies: candies, money: money });
          setCandies((prev) => prev + candies);
          setMoney((prev) => prev + money);
        } else {
          setRewards({ candies: 0, money: 0 });
        }
        break;
    }
  };

  //depending on action, will display different components
  const display = () => {
    if (!actionComplete) {
      switch (action) {
        case "starter":
          return (
            <StarterTown
              id={id}
              mapId={mapId}
              selectTown={selectStartingTown}
            />
          );
        case "wildbattle":
          return (
            <Battle
              battletype={"wildbattle"}
              bag={bag}
              setBag={setBag}
              startBattle={getWildMon}
              endBattle={endBattle}
              id={id}
            />
          );
        case "trainerbattle":
          return (
            <Battle
              battletype={"trainerbattle"}
              trainer={event}
              bag={bag}
              setBag={setBag}
              startBattle={genTrainerBattle}
              endBattle={endBattle}
              id={id}
            />
          );
        case "gymchallenge":
          return (
            <Battle
              battletype={"gymchallenge"}
              trainer={event.gym}
              bag={bag}
              setBag={setBag}
              startBattle={genGymChallenge}
              endBattle={endBattle}
              id={id}
            />
          );
        case "pvpbattle":
          break;
        default:
          return <div></div>;
      }
    }
  };

  //randomly gens a wild mon then generates its data
  const getWildMon = async () => {
    let badgeMod = setDifficulty();

    const wildRes = await fetch(
      `${process.env.NEXT_PUBLIC_ROOT_URL}/api/getwildpokemon`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tile: playerLocation.tile }),
      }
    );
    const wildJson = await wildRes.json();

    const genRes = await fetch(
      `${process.env.NEXT_PUBLIC_ROOT_URL}/api/generatepokemon`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: wildJson.data,
          candiesSpent: badgeMod.candiesSpent,
          level: badgeMod.level,
        }),
      }
    );
    const genJson = await genRes.json();
    setWildMon(genJson.data);
    socket.emit("game-start-wildbattle", genJson.data);
  };

  //generates the team of the gym leader(from event state)
  const genGymChallenge = async () => {
    let badgeMod = setDifficulty();

    //console.log(badgeMod);
    const genRes = await fetch(
      `${process.env.NEXT_PUBLIC_ROOT_URL}/api/generateteam`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          team: event.team,
          candiesSpent: badgeMod.candiesSpent,
          level: badgeMod.level,
        }),
      }
    );
    const genJson = await genRes.json();
    setOppTeam(genJson.data);
    socket.emit("game-start-gymchallenge", genJson.data);
  };

  const genTrainerBattle = async () => {
    let badgeMod = setDifficulty();

    //console.log(badgeMod);
    const genRes = await fetch(
      `${process.env.NEXT_PUBLIC_ROOT_URL}/api/generatetrainer`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          trainer: event,
          badges: badges.length,
          candiesSpent: badgeMod.candiesSpent,
          level: badgeMod.level,
        }),
      }
    );
    const genJson = await genRes.json();
    setOppTeam([genJson.data]);
    socket.emit("game-start-trainerbattle", genJson.data);
  };

  //sets candiesspent and level of mon based on badges
  const setDifficulty = () => {
    let data = {};

    if (action == "wildbattle")
      switch (badges.length) {
        case 0:
          data.candiesSpent = 0;
          data.level = 20;
          break;
        case 1:
          data.candiesSpent = 0;
          data.level = 20;
          break;
        case 2:
          data.candiesSpent = 0;
          data.level = 20;
          break;
        case 3:
          data.candiesSpent = 0;
          data.level = 20;
          break;
        case 4:
          data.candiesSpent = 0;
          data.level = 20;
          break;
        case 5:
          data.candiesSpent = 0;
          data.level = 20;
          break;
        case 6:
          data.candiesSpent = 0;
          data.level = 20;
          break;
        case 7:
          data.candiesSpent = 0;
          data.level = 20;
          break;
        case 8:
          data.candiesSpent = 0;
          data.level = 20;
          break;
      }

    if (action == "trainerbattle")
      switch (badges.length) {
        case 0:
          data.candiesSpent = 0;
          data.level = 20;
          break;
        case 1:
          data.candiesSpent = 0;
          data.level = 20;
          break;
        case 2:
          data.candiesSpent = 0;
          data.level = 20;
          break;
        case 3:
          data.candiesSpent = 0;
          data.level = 20;
          break;
        case 4:
          data.candiesSpent = 0;
          data.level = 20;
          break;
        case 5:
          data.candiesSpent = 0;
          data.level = 20;
          break;
        case 6:
          data.candiesSpent = 0;
          data.level = 20;
          break;
        case 7:
          data.candiesSpent = 0;
          data.level = 20;
          break;
        case 8:
          data.candiesSpent = 0;
          data.level = 20;
          break;
      }

    if (action == "gymchallenge") {
      let highestLvl = 20;

      team.forEach((pokemon) => {
        if (highestLvl < pokemon.level) highestLvl = pokemon.level;
      });

      let candiesSpent = Math.floor((highestLvl - 20) / 5);

      data.level = highestLvl;
      data.candiesSpent = candiesSpent;
    }
    return data;
  };

  //triggered when closeing rewards dialog
  const closeDialog = () => {
    setActionDialog(false);
    setActionComplete(true);
    setBattleEnd(false);
    setWildMon(undefined);
  };

  //apply appropriate exhaustion points or faints pokemon doending on how much dmg taken
  const applyExhaustion = (inteam, win) => {
    var filteredTeam = team.slice();
    if (win) {
      inteam.side.pokemon.forEach((pokemon) => {
        let name = pokemon.ident.split(" ")[1];
        let currentHealth = pokemon.condition.split("/")[0];
        let maxHealth = pokemon.condition.split("/")[1];
        let ex = 0;

        console.log(currentHealth + "/" + maxHealth);

        if (pokemon.condition == "0 fnt") ex = 5;
        else if (currentHealth / maxHealth == 1) ex = 0;
        else if (currentHealth / maxHealth >= 0.8) ex = 1;
        else if (currentHealth / maxHealth >= 0.6) ex = 2;
        else if (currentHealth / maxHealth >= 0.4) ex = 3;
        else if (currentHealth / maxHealth >= 0.01) ex = 4;

        let indexOfMon = undefined;

        team.forEach((pokemon, index) => {
          console.log(pokemon.species + " " + name);
          if (pokemon.species == name && !indexOfMon) {
            indexOfMon = index;
          }
        });

        console.log(indexOfMon);

        let newMon = team[indexOfMon];
        newMon.exhaustion += ex;
        if (newMon.exhaustion >= 5) newMon.fainted = true;

        filteredTeam[indexOfMon] = newMon;
      });
    } else {
      inteam.side.pokemon.forEach((pokemon) => {
        let indexOfMon = undefined;
        let name = pokemon.ident.split(" ")[1];

        team.forEach((pokemon, index) => {
          if (pokemon.species == name && !indexOfMon) {
            indexOfMon = index;
          }
        });

        let ex = 5;
        let newMon = team[indexOfMon];
        newMon.exhaustion += ex;
        newMon.fainted = true;

        filteredTeam[indexOfMon] = newMon;
      });
    }

    setTeam([...filteredTeam]);
  };

  return (
    <Dialog maxWidth={"lg"} fullWidth open={actionDialog}>
      {battleEnd ? (
        <BattleEndScreen rewards={rewards} closeDialog={closeDialog} />
      ) : (
        display()
      )}

      <ReleasePokemonDialog
        releaseDialog={releaseDialog}
        team={team}
        releasePokemon={releasePokemon}
      />
    </Dialog>
  );
};

export default ActionDialog;
