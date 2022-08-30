import { Box, Grid, Typography, Tabs, Tab } from "@mui/material";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSocket } from "../../../../contexts/SocketProvider";
import ActivePokemonInfo from "./ActivePokemonInfo";
import FieldDisplay from "./FieldDisplay";
import WeatherDisplay from "./WeatherDisplay";
import ActivePokemonMoves from "./ActivePokemonMoves";
import BattleLog from "./BattleLog";
import CatchPanel from "./CatchPanel";
import SwitchPanel from "./SwitchPanel";
import EntranceAnim from "./EntranceAnim";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Battle = ({
  battletype,
  trainer,
  bag,
  setBag,
  startBattle,
  endBattle,
  id,
}) => {
  //---Server Controlled Variables---
  const socket = useSocket();
  const [team, setTeam] = useState();
  const [field, setField] = useState();
  //---Utility Variables-------------
  const [isPlayer1, setIsPlayer1] = useState();
  const [p1Name, setP1Name] = useState();
  const [p2Name, setP2Name] = useState();
  const [hasSelected, setHasSelected] = useState(); //player has choosen action
  const [p1ActivePoke, setP1ActivePoke] = useState();
  const [p1PokeHealth, setP1PokeHealth] = useState(100);
  const [p2ActivePoke, setP2ActivePoke] = useState();
  const [p2PokeHealth, setP2PokeHealth] = useState(100);
  const [p1PokeStatus, setP1PokeStatus] = useState([]);
  const [p2PokeStatus, setP2PokeStatus] = useState([]);
  const [weather, setWeather] = useState("none");
  const [fieldEffectsP1, setFieldEffectsP1] = useState([]);
  const [fieldEffectsP2, setFieldEffectsP2] = useState([]);
  const [animsDone, setAnimsDone] = useState(false);
  const [tabValue, setTabValue] = useState(1);
  const [log, setLog] = useState([]);
  const [canThrowBall, setCanThrowBall] = useState(true);
  const [trapped, setTrapped] = useState(false);
  const [entranceAnim, setEntranceAnim] = useState(true);
  const [willMegaEvo, setWillMegaEvo] = useState(false);
  //---Use Effects-------------------
  useEffect(() => {
    startBattle();
    if (battletype != "wildbattle") {
      setTimeout(() => {
        setEntranceAnim(false);
      }, 2000);
    } else {
      setEntranceAnim(false);
    }
  }, []);

  useEffect(() => {
    if (socket === undefined) return;

    socket.on("battle-side-update", (team, player1) => {
      setTeam(JSON.parse(team));
      checkTrapped(JSON.parse(team));
      setIsPlayer1(player1);
      console.log(team);
    });

    setHasSelected(false);
    return () => socket.off("battle-side-update");
  }, [socket, team]);

  useEffect(() => {
    if (socket === undefined) return;

    socket.on("battle-field-update", (fieldUpdate) => {
      setField(fieldUpdate);
    });
    console.log(field);
    if (field) parseField(field);
    setHasSelected(false);
    setWillMegaEvo(false);
    setCanThrowBall(true);
    return () => socket.off("battle-field-update");
  }, [socket, field]);

  //---Utility Functions-------------
  const sendMoveChoice = (moveIndex) => {
    console.log("sending choice...");
    let mega = willMegaEvo ? " mega" : "";
    socket.emit("send-move", moveIndex + mega);
    setHasSelected(true);
    setCanThrowBall(false);
  };

  const sendSwitchChoice = (pokeid) => {
    socket.emit("send-switch", pokeid, id);
    setHasSelected(true);
    setCanThrowBall(false);
  };

  const setPokemon = (token) => {
    let splitToken = token.split("|");
    let player = splitToken[2].split(":")[0];
    let name = splitToken[3].split(",")[0];
    let health = splitToken[4].split("/")[0];
    let isShiny = false;
    let level = splitToken[3].split(",")[1];
    if (splitToken[3].split(",")[3]) isShiny = true;
    let status = [];
    if (splitToken[4].split(" ").length > 1) {
      status.push("status|" + splitToken[4].split(" ")[1]);
    }

    let data = {
      name: name,
      isShiny: isShiny,
      level: level,
    };

    if (player == "p1a") {
      setP1ActivePoke(data);
      setP1PokeHealth(health);
      setP1PokeStatus(status);
    }
    if (player == "p2a") {
      setP2ActivePoke(data);
      setP2PokeHealth(health);
      setP2PokeStatus(status);
    }
  };

  const setDamage = (token) => {
    let splitToken = token.split("|");
    let player = splitToken[2].split(":")[0];
    let value = splitToken[3].split("/")[0];

    if (player == "p1a") {
      setP1PokeHealth(value);
    }

    if (player == "p2a") {
      setP2PokeHealth(value);
    }
  };

  const setStatusChange = (token) => {
    console.log("in status change");
    let splitToken = token.split("|");
    let player = splitToken[2].split(":")[0];
    let type = splitToken[1].substring(1);
    let stat = splitToken[3];
    let amount = "";
    if (splitToken[4]) amount = splitToken[4];

    if (player == "p1a") {
      setP1PokeStatus((prevState) => [
        ...prevState,
        type + "|" + stat + "|" + amount,
      ]);
    }
    if (player == "p2a") {
      setP2PokeStatus((prevState) => [
        ...prevState,
        type + "|" + stat + "|" + amount,
      ]);
    }
  };

  const cureStatus = (token) => {
    let splitToken = token.split("|");
    let player = splitToken[2].split(":")[0];

    if (player == "p1a") {
      let newStatuses = p1PokeStatus.filter(
        (status) => !status.includes(splitToken[3])
      );
      setP1PokeStatus(newStatuses);
    }
    if (player == "p2a") {
      let newStatuses = p2PokeStatus.filter(
        (status) => !status.includes(splitToken[3])
      );
      setP2PokeStatus(newStatuses);
    }
  };

  const startSideEffect = (token) => {
    console.log(token);
    var splitToken = token.split("|");
    let player = splitToken[2].split(":")[0];
    let effect = splitToken[3];

    if (player == "p1")
      setFieldEffectsP1((prevState) => [...prevState, effect]);
    if (player == "p2")
      setFieldEffectsP2((prevState) => [...prevState, effect]);
  };

  const endSideEffect = (token) => {
    var splitToken = token.split("|");
    let player = splitToken[2].split(":")[0];
    const effect = splitToken[3];

    const newArr = fieldEffectsP1.filter((e) => !e.includes(effect));

    if (player == "p1") setFieldEffectsP1(newArr);
    if (player == "p2") setFieldEffectsP2(newArr);
  };

  const startStatusEffect = (token) => {
    var splitToken = token.split("|");
    let player = splitToken[2].split(":")[0];
    let effect = "effect|" + splitToken[3];

    if (player == "p1a") {
      setP1PokeStatus((prevState) => [...prevState, effect]);
    }
    if (player == "p2a") {
      setP2PokeStatus((prevState) => [...prevState, effect]);
    }
  };

  const faint = (token) => {
    if (token.startsWith("|faint|p1a:")) {
      setP1PokeHealth(0);
    }
    if (token.startsWith("|faint|p2a:")) {
      setP2PokeHealth(0);
    }
  };

  const handleWin = (token) => {
    let splitToken = token.split("|");
    let winner = splitToken[2];
    if (id == winner.replace(/['"]+/g, "")) endBattle(true, team);
    else endBattle(false, team);
  };

  const checkTrapped = (team) => {
    if (team.active) {
      if (team.active[0].trapped) {
        setTrapped(team.active[0].trapped);
      } else if (team.active[0].maybeTrapped) {
        setTrapped(team.active[0].maybeTrapped);
      }
    } else setTrapped(false);
  };

  const handleFormChange = (token) => {
    let splitToken = token.split("|");
    let player = splitToken[2].split(":")[0];
    let form = splitToken[3].split(",")[0];
    if (player == "p1a")
      setP1ActivePoke((prev) => {
        let newPrev = prev;
        newPrev.name = form;
        return newPrev;
      });
    else {
      setP2ActivePoke((prev) => {
        let newPrev = prev;
        newPrev.name = form;
        return newPrev;
      });
    }
  };

  var delay = 300;
  var p1Fnt = false;
  var p2Fnt = false;
  const addDelay = 1200;

  const parseField = (field) => {
    setAnimsDone(false);

    var stream = field.split(/\r?\n/);
    var change = 1;
    for (const token of stream) {
      addMessage(token, change);
      //set player names
      if (token.startsWith("|player|p1")) {
        var splitToken = token.split("|");
        setP1Name(splitToken[3].replace(/['"]+/g, ""));
      }
      if (token.startsWith("|player|p2")) {
        var splitToken = token.split("|");
        setP2Name(splitToken[3].replace(/['"]+/g, ""));
      }
      //Set the images and health on switches
      if (token.startsWith("|switch") || token.startsWith("|drag")) {
        setPokemon(token);
        change++;
        //delay += addDelay;
      }
      //set the health display on damage and heal
      if (
        (token.startsWith("|-damage") || token.startsWith("|-heal")) &&
        token.split("|")[3] != "0 fnt"
      ) {
        if (change % 2 == 0) {
          setTimeout(() => setDamage(token), delay);
          delay += addDelay;
        }
        change++;
      }
      //set boost and unboost and statuses
      if (
        token.startsWith("|-unboost") ||
        token.startsWith("|-boost") ||
        token.startsWith("|-setboost") ||
        token.startsWith("|-status")
      ) {
        setTimeout(() => setStatusChange(token), delay);
        delay += addDelay;
      }
      //weather
      if (token.startsWith("|-weather")) {
        let splitToken = token.split("|");
        let weather = splitToken[2];
        setTimeout(() => setWeather(weather), delay);
        delay += addDelay;
      }
      //set health to 0 on faint
      if (token.startsWith("|faint")) {
        setTimeout(() => faint(token), delay);
        delay += addDelay;
      }
      //cure statuses
      if (token.startsWith("|-curestatus") || token.startsWith("|-end")) {
        setTimeout(() => cureStatus(token), delay);
        delay += addDelay;
      }
      //start side effect
      if (token.startsWith("|-sidestart")) {
        setTimeout(() => startSideEffect(token), delay);
        delay += addDelay;
      }
      //end side effect
      if (token.startsWith("|-sideend")) {
        setTimeout(() => endSideEffect(token), delay);
        delay += addDelay;
      }
      //start a status effect
      if (token.startsWith("|-start")) {
        setTimeout(() => startStatusEffect(token), delay);
        delay += addDelay;
      }
      if (token.startsWith("|-formechange")) {
        setTimeout(() => handleFormChange(token), delay);
        delay += addDelay;
      }
      if (token.startsWith("|detailschange")) {
        setTimeout(() => handleFormChange(token), delay);
        delay += addDelay;
      }
      if (token.startsWith("|win")) {
        setTimeout(() => handleWin(token), delay);
      }
    }

    setTimeout(() => setAnimsDone(true), delay);

    delay = 300;
    change = 1;
  };

  const addMessage = (token, change) => {
    let message = "";
    let severity;
    let splitToken = token.split("|");
    let type = splitToken[1];
    let user;
    let opp;
    let move;
    let poke;
    let cause;
    let status;
    let ability;
    let effect;
    let amount;
    let stat;
    let item;
    switch (type) {
      case "switch":
        if (
          battletype == "wildbattle" &&
          change % 2 == 0 &&
          splitToken[2].split(":")[0] == "p2a"
        ) {
          user = splitToken[2].split(" ")[1];
          message = `A wild ${user} appeared!`;
          severity = "info";
        } else if (change % 2 == 0) {
          user = splitToken[2].split(" ")[1];
          message = `${user} was sent out!`;
          severity = "info";
        }

        break;
      case "move":
        opp = splitToken[4].split(" ")[1];
        user = splitToken[2].split(" ")[1];
        move = splitToken[3];

        if (opp != undefined) {
          message = `${user} used ${move} on ${opp}`;
        } else {
          message = `${user} used ${move}`;
        }
        severity = "info";
        break;
      case "-supereffective":
        message = `It was Super Effective!`;
        severity = "success";
        break;
      case "-crit":
        message = `It was a Critical Hit!`;
        severity = "success";
        break;
      case "-resisted":
        message = `It was not vey effective...`;
        severity = "warning";
        break;
      case "-immune":
        poke = splitToken[2].split(" ")[1];
        if (token.length == 5) {
          let effect = splitToken[3];
          let reason = splitToken[4].replace(/[\[\]']+/g, "");

          message = `${poke} is immune to ${effect} ${reason}!`;
          severity = "warning";
        } else {
          message = `${poke} is immune!`;
          severity = "error";
        }

        break;
      case "-heal":
        if (change % 2 == 0) {
          user = splitToken[2].split(" ")[1];
          if (splitToken.length > 4) cause = splitToken[4].split(" ").at(-1);
          else cause = "move";
          message = `${user} healed with ${cause}`;
          severity = "info";
        }
        break;
      case "-damage":
        user = splitToken[2].split(" ")[1];

        // if (splitToken[3].split(" ").at(-1) == "fnt") {
        //   if (
        //     (splitToken[2].split(" ")[0] == "p1a:" && !p1Fnt) ||
        //     (splitToken[2].split(" ")[0] == "p2a:" && !p2Fnt)
        //   ) {
        //     message = `${user} fainted!`;
        //     severity = "error";
        //     if (splitToken[2].split(" ")[0] == "p1a:") p1Fnt = true;
        //     else p2Fnt = true;
        //   }
        // }

        if (splitToken.length == 5 && change % 2 == 0) {
          message = `${user} was hurt from ${splitToken[4].split(" ").at(-1)}!`;
          severity = "error";
        }

        if (splitToken.length == 6 && change % 2 == 0) {
          message = `${user} was hurt from ${splitToken[4].replace(
            /[\[\]]+/g,
            ""
          )}!`;
          severity = "error";
        }

        break;
      case "faint":
        user = splitToken[2].split(" ")[1];
        if (
          (splitToken[2].split(" ")[0] == "p1a:" && !p1Fnt) ||
          (splitToken[2].split(" ")[0] == "p2a:" && !p2Fnt)
        ) {
          message = `${user} fainted!`;
          severity = "error";
          if (splitToken[2].split(" ")[0] == "p1a:") p1Fnt = true;
          else p2Fnt = true;
        }
        break;
      case "cant":
        user = splitToken[2].split(" ")[1];
        if (splitToken.length == 4) {
          let preventMove = splitToken[3];

          if (preventMove == "flinch") {
            message = `${user} flinched!`;
          } else message = `${user} is ${preventMove} !`;
          severity = "error";
        }

        if (splitToken.length == 5) {
          let move = splitToken[4];
          let preventMove = splitToken[3].split(" ")[1];
          message = `${user} cant use ${move} because of ${preventMove}`;
          severity = "error";
        }
        break;
      case "-fail":
        message = `The move Failed!`;
        severity = "error";
        break;
      case "-status":
        poke = splitToken[2].split(" ")[1];
        status = splitToken[3];

        if (splitToken.length == 6) {
          let cause = JSON.stringify(splitToken[4]).replace(/['"]+/g, "");
          cause = cause.replace(/[\[\]]+/g, "");
          message = `${poke} is now ${status} ${cause}!`;
          severity = "warning";
        }

        if (splitToken.length == 5) {
          let cause = JSON.stringify(splitToken[4]).replace(/['"]+/g, "");
          cause = cause.replace(/[\[\]]+/g, "");

          message = `${poke} is now ${status} ${cause}!`;
          severity = "warning";
        }

        if (splitToken.length == 4) {
          message = `${poke} is now ${status}!`;
          severity = "warning";
        }
        break;
      case "-curestatus":
        poke = splitToken[2].split(" ")[1];
        status = splitToken[3];
        message = `${poke} is no longer ${status}!`;
        severity = "success";
        break;
      case "-miss":
        message = `It missed...`;
        severity = "error";
        break;
      case "-weather":
        if (splitToken.length == 5) {
          let weather = splitToken[2].split(" ")[1];

          if (weather == undefined) weather = splitToken[2];
          let poke = splitToken[4].split(" ").at(-1);
          let ability = splitToken[3]
            .replace(/['"]+/g, "")
            .replace(/[\[\]]+/g, "");

          message = `${poke} caused ${weather} ${ability} !`;
          severity = "warning";
        }

        if (splitToken.length == 4) {
          let weather = splitToken[2];
          message = `The ${weather} continues...`;
          severity = "warning";
        }

        if (splitToken.length == 3 && splitToken[2] == "none") {
          message = `The weather stopped...`;
          severity = "warning";
        }
        break;
      case "-enditem":
        poke = splitToken[2].split(" ")[1];
        item = splitToken[3];
        message = `${poke}'s ${item} was destroyed!`;
        severity = "warning";
        break;
      case "-activate":
        if (splitToken.length == 4) {
          let poke = splitToken[2].split(" ")[1];
          let ability = splitToken[3].replace(/[:]+/g, "");
          message = `${poke}'s ${ability} was activated!`;
          severity = "warning";
        }

        if (splitToken.length == 5) {
          let ability = splitToken[3].split(" ")[1];
          message = `${ability} was activated!`;
          severity = "warning";
        }

        break;
      case "-end":
        if (splitToken.length == 4) {
          let item = splitToken[3];
          message = `${item} ended!`;
          severity = "warning";
        }
        break;
      case "-anim":
        user = splitToken[2].split(" ")[1];
        move = splitToken[3];
        opp = splitToken[4].split(" ")[1];
        message = `${user} used ${move} on ${opp}`;
        severity = "info";
        break;
      case "-prepare":
        user = splitToken[2].split(" ")[1];
        move = splitToken[3];
        message = `${user} is preparing ${move}`;
        severity = "info";
        break;
      case "-ability":
        user = splitToken[2].split(" ")[1];
        ability = splitToken[3];
        message = `${user}'s ${ability} was activated!`;
        severity = "warning";
        break;
      case "-start":
        if (token.includes("typechange")) {
          user = splitToken[2].split(" ")[1];
          let type = splitToken[4];

          message = `${user} changed type to ${type}!`;
          severity = "warning";
        } else if (token.includes("ability:")) {
          user = splitToken[2].split(" ")[1];
          ability = splitToken[3].split(":")[1];

          message = `${user}'s ${ability} was activated!`;
          severity = "warning";
        } else if (token.split("|").length == 4) {
          user = splitToken[2].split(" ")[1];
          effect = splitToken[3];

          switch (effect) {
            case "confusion":
              effect = "confused";
              break;
          }
          message = `${user} is ${effect}`;
          severity = "warning";
        }

        break;
      case "-boost":
        poke = splitToken[2].split(" ")[1];
        stat = splitToken[3];
        amount = splitToken[4];

        message = `${poke}'s ${stat} was increased by ${amount} stage!`;
        severity = "success";
        break;
      case "-unboost":
        poke = splitToken[2].split(" ")[1];
        stat = splitToken[3];
        amount = splitToken[4];

        message = `${poke}'s ${stat} was decreased by ${amount} stage!`;
        severity = "error";
        break;
      case "-setboost":
        poke = splitToken[2].split(" ")[1];
        stat = splitToken[3];
        amount = splitToken[4];

        message = `${poke}'s ${stat} was increased by ${amount} stages!`;
        severity = "success";
        break;
      case "-formechange":
        poke = splitToken[2].split(" ")[1];
        effect = splitToken[3];

        message = `${poke} changed form to ${effect}!`;
        severity = "info";
        break;
      case "-mega":
        poke = splitToken[2].split(" ")[1];

        message = `${poke} mega evolved!`;
        severity = "info";
        break;
        break;
    }

    if (message) {
      setTimeout(() => {
        setLog((prev) => [...prev, { message: message, severity: severity }]);
      }, delay);
      delay += addDelay;
    }
  };

  const throwBall = async (ball) => {
    setCanThrowBall(false);

    let newBag = bag;
    newBag.balls[ball] -= 1;
    setBag(newBag);

    let dataStatus = "none";
    p2PokeStatus.forEach((effect) => {
      console.log(effect);
      let s = effect.split("|")[1];
      if (
        s == "par" ||
        s == "psn" ||
        s == "tox" ||
        s == "brn" ||
        s == "slp" ||
        s == "frz"
      ) {
        dataStatus = s;
      }
    });

    let data = {
      name: p2ActivePoke.name,
      status: dataStatus,
      ball: ball,
      hp: p2PokeHealth,
    };
    const res = await fetch(
      process.env.NEXT_PUBLIC_ROOT_URL + "/api/catchpokemon",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const json = await res.json();

    if (json.data.caught) {
      setLog((prev) => [
        ...prev,
        { message: "The pokemon was caught!", severity: "success" },
      ]);
      setTimeout(() => endBattle(true, team, true), 1000);
    } else {
      //shakePokeball(json.data.shakes);
      setLog((prev) => [
        ...prev,
        { message: "The pokemon broke out!", severity: "error" },
      ]);
    }
  };
  return (
    <Box sx={{ p: 2 }}>
      <Grid container>
        {!entranceAnim || battletype == "wildbattle" ? (
          <Grid item container xs={8}>
            <Grid item xs={2}>
              <WeatherDisplay weather={weather} />
            </Grid>
            <Grid
              item
              container
              alignItems="center"
              justifyContent="end"
              xs={10}
            >
              <Typography variant="h5">
                {isPlayer1 ? p2Name : p1Name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {p1ActivePoke && p2ActivePoke ? (
                <FieldDisplay
                  p1ActivePoke={p1ActivePoke}
                  p2ActivePoke={p2ActivePoke}
                  p1PokeHealth={p1PokeHealth}
                  p2PokeHealth={p2PokeHealth}
                  p1PokeStatus={p1PokeStatus}
                  p2PokeStatus={p2PokeStatus}
                  fieldEffectsP1={fieldEffectsP1}
                  fieldEffectsP2={fieldEffectsP2}
                  isPlayer1={isPlayer1}
                />
              ) : (
                ""
              )}
            </Grid>
            <Grid
              item
              container
              xs={12}
              sx={{ mt: "25px", borderRadius: 3, backgroundColor: "#2F4562" }}
            >
              <Grid item xs={9}>
                <TabPanel value={tabValue} index={0}>
                  {team ? <ActivePokemonInfo team={team} /> : ""}
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                  {team ? (
                    <ActivePokemonMoves
                      team={team}
                      animsDone={animsDone}
                      sendMoveChoice={sendMoveChoice}
                      setWillMegaEvo={setWillMegaEvo}
                      hasSelected={hasSelected}
                    />
                  ) : (
                    ""
                  )}
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                  {battletype != "wildbattle" && team ? (
                    <SwitchPanel
                      team={team}
                      trapped={trapped}
                      animsDone={animsDone}
                      sendSwitchChoice={sendSwitchChoice}
                    />
                  ) : (
                    <CatchPanel
                      bag={bag}
                      throwBall={throwBall}
                      animsDone={animsDone}
                      canThrowBall={canThrowBall}
                    />
                  )}
                </TabPanel>
              </Grid>
              <Grid item xs={3}>
                <Tabs
                  orientation="vertical"
                  value={tabValue}
                  onChange={(e, newValue) => setTabValue(newValue)}
                  aria-label="Vertical tabs example"
                  sx={{
                    borderLeft: 1,
                    borderColor: "divider",
                    "& .Mui-selected": {
                      borderLeft: "1px solid",
                    },
                  }}
                  TabIndicatorProps={{
                    style: {
                      display: "none",
                    },
                  }}
                >
                  <Tab label="Stats" {...a11yProps(0)} />
                  <Tab label="Moves" {...a11yProps(1)} />
                  <Tab
                    label={battletype != "wildbattle" ? "Switch" : "Catch"}
                    {...a11yProps(2)}
                  />
                </Tabs>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            xs={8}
          >
            <EntranceAnim trainer={trainer} />
          </Grid>
        )}
        <Grid item xs={4}>
          <BattleLog log={log} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Battle;
