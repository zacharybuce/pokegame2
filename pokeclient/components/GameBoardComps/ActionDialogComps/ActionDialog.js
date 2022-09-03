import { Dialog } from "@mui/material";
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
  pvpBattleLost,
  setMoney,
  team,
  playerLocation,
  id,
  battleId,
  setActionDialog,
  selectStartingTown,
  setAction,
  setCandies,
  setTeam,
  setActionComplete,
  setBadges,
  setMusicEvent,
}) => {
  const socket = useSocket();
  const [wildMon, setWildMon] = useState();
  const [battleEnd, setBattleEnd] = useState(false);
  const [rewards, setRewards] = useState([]);
  const [oppTeam, setOppTeam] = useState();
  const [releaseDialog, setReleaseDialog] = useState();

  useEffect(() => {
    if ((action != "starter") & (action != "none")) socket.emit("in-action");
  }, [action]);

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
  const endBattle = (win, team, caught, ranFromBattle) => {
    setMusicEvent("action");
    socket.emit("end-battle");
    applyExhaustion(team, win, ranFromBattle);
    generateRewards(win, caught);
    if (caught) catchPokemon();
    setBattleEnd(true);
    if (!win && action == "pvpbattle") pvpBattleLost();
  };

  //decide rewards based on battle type and badges
  const generateRewards = (win, caught) => {
    switch (action) {
      case "safarizone":
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
          setRewards({ win: false, candies: 0 });
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

          let money = 2000 + badges.length * 500;
          setRewards({ win: win, candies: candies, money: money });
          setCandies((prev) => prev + candies);
          setMoney((prev) => prev + money);
          setBadges([...badges, { gym: event.gym }]);
        } else {
          setRewards({ win: false, candies: 0, money: 0 });
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
          setRewards({ win: false, candies: 0, money: 0 });
        }
        break;
      case "pvpbattle":
        if (win) {
          setRewards({ win: win, candies: 15, money: 1000 });
          setCandies((prev) => prev + 5);
          setMoney((prev) => prev + 1000);
        } else {
          setRewards({ win: false, candies: 0, money: 0 });
        }
        break;
      case "trickhouse":
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

          setRewards({
            win: win,
            candies: candies,
            money: 0,
            item: event.item,
          });
          setCandies((prev) => prev + candies);
          let newBag = bag;
          newBag.heldItems.push(event.item);
          setBag(newBag);
        } else {
          setRewards({ win: false, candies: 0, money: 0 });
        }
        break;
      case "championbattle":
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

          let money = 2000 + badges.length * 500;
          setRewards({ win: win, candies: candies, money: money });
          setCandies((prev) => prev + candies);
          setMoney((prev) => prev + money);
        } else {
          setRewards({ win: false, candies: 0, money: 0 });
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
              trainer={{ trainer: event.gym }}
              bag={bag}
              setBag={setBag}
              startBattle={genGymChallenge}
              endBattle={endBattle}
              id={id}
            />
          );
        case "pvpbattle":
          return (
            <Battle
              battletype={"pvpbattle"}
              trainer={event}
              bag={bag}
              setBag={setBag}
              startBattle={pvpBattle}
              endBattle={endBattle}
              id={id}
            />
          );
        case "safarizone":
          return (
            <Battle
              battletype={"wildbattle"}
              bag={bag}
              setBag={setBag}
              startBattle={getSafariMon}
              endBattle={endBattle}
              id={id}
            />
          );
        case "trickhouse":
          return (
            <Battle
              battletype={"trainerbattle"}
              trainer={event}
              bag={bag}
              setBag={setBag}
              startBattle={genTrickHouse}
              endBattle={endBattle}
              id={id}
            />
          );
        case "championbattle":
          return (
            <Battle
              battletype={"championbattle"}
              trainer={{ trainer: event.gym }}
              bag={bag}
              setBag={setBag}
              startBattle={genChampionBattle}
              endBattle={endBattle}
              id={id}
            />
          );
        default:
          return <div></div>;
      }
    }
  };

  //randomly gens a wild mon then generates its data
  const getWildMon = async () => {
    setMusicEvent("wild-battle");
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

  //generates the mon sent in by event for wildmon
  const getSafariMon = async () => {
    setMusicEvent("wild-battle");
    let badgeMod = setDifficulty();
    const genRes = await fetch(
      `${process.env.NEXT_PUBLIC_ROOT_URL}/api/generatepokemon`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: event.pokemon,
          candiesSpent: badgeMod.candiesSpent,
          level: badgeMod.level,
        }),
      }
    );
    const genJson = await genRes.json();
    setWildMon(genJson.data);
    socket.emit("game-start-wildbattle", genJson.data);
  };

  const genTrickHouse = async () => {
    setMusicEvent("trainer-battle");
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
          trainer: event.trainer,
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

  //generates the team of the gym leader(from event state)
  const genGymChallenge = async () => {
    setMusicEvent("trainer-battle");
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

  const genChampionBattle = async () => {
    setMusicEvent("elite-battle");
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
    socket.emit("game-start-championbattle", genJson.data);
  };

  const genTrainerBattle = async () => {
    setMusicEvent("trainer-battle");
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
          trainer: event.trainer,
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

  const pvpBattle = () => {
    setMusicEvent("elite-battle");
    socket.emit("pvpbattle-ready", battleId);
  };

  //sets candiesspent and level of mon based on badges
  const setDifficulty = () => {
    let data = {};

    if (action == "wildbattle" || action == "safarizone")
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
          data.level = 23;
          break;
        case 3:
          data.candiesSpent = 0;
          data.level = 23;
          break;
        case 4:
          data.candiesSpent = 2;
          data.level = 23;
          break;
        case 5:
          data.candiesSpent = 2;
          data.level = 26;
          break;
        case 6:
          data.candiesSpent = 2;
          data.level = 26;
          break;
        case 7:
          data.candiesSpent = 2;
          data.level = 26;
          break;
        case 8:
          data.candiesSpent = 4;
          data.level = 26;
          break;
      }

    if (action == "trainerbattle" || action == "trickhouse")
      switch (badges.length) {
        case 0:
          data.candiesSpent = 0;
          data.level = 20;
          break;
        case 1:
          data.candiesSpent = 3;
          data.level = 22;
          break;
        case 2:
          data.candiesSpent = 6;
          data.level = 24;
          break;
        case 3:
          data.candiesSpent = 6;
          data.level = 26;
          break;
        case 4:
          data.candiesSpent = 8;
          data.level = 28;
          break;
        case 5:
          data.candiesSpent = 8;
          data.level = 32;
          break;
        case 6:
          data.candiesSpent = 12;
          data.level = 34;
          break;
        case 7:
          data.candiesSpent = 12;
          data.level = 38;
          break;
        case 8:
          data.candiesSpent = 15;
          data.level = 40;
          break;
      }

    if (action == "gymchallenge" || action == "championbattle") {
      let highestLvl = 20;

      switch (badges.length) {
        case 0:
          highestLvl = 20;
          break;
        case 1:
          highestLvl = 23;
          break;
        case 2:
          highestLvl = 26;
          break;
        case 3:
          highestLvl = 28;
          break;
        case 4:
          highestLvl = 32;
          break;
        case 5:
          highestLvl = 36;
          break;
        case 6:
          highestLvl = 42;
          break;
        case 7:
          highestLvl = 48;
          break;
        case 8:
          highestLvl = 60;
          break;
      }

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
    socket.emit("out-of-action");
  };

  //apply appropriate exhaustion points or faints pokemon doending on how much dmg taken
  const applyExhaustion = (inteam, win, ranFromBattle) => {
    var filteredTeam = team.slice();
    if (win || ranFromBattle) {
      inteam.side.pokemon.forEach((pokemon) => {
        let name = pokemon.ident.split(" ")[1];
        let ex = 0;

        console.log(pokemon.condition);

        if (pokemon.condition != "0 fnt") {
          let currentHealth = pokemon.condition.split("/")[0];
          let maxHealth = pokemon.condition.split("/")[1].split(" ")[0];

          if (currentHealth / maxHealth == 1) ex = 0;
          else if (currentHealth / maxHealth >= 0.8) ex = 1;
          else if (currentHealth / maxHealth >= 0.6) ex = 2;
          else if (currentHealth / maxHealth >= 0.4) ex = 3;
          else if (currentHealth / maxHealth >= 0.01) ex = 4;
        } else {
          ex = 5;
        }

        let indexOfMon = undefined;

        team.forEach((pokemon, index) => {
          console.log(pokemon.species + " " + name);
          if (pokemon.species.includes(name) && !indexOfMon) {
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
          if (pokemon.species.includes(name) && !indexOfMon) {
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
