import { Box, Grid, Typography, Tabs, Tab } from "@mui/material";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSocket } from "../../../../contexts/SocketProvider";
import ActivePokemonInfo from "./ActivePokemonInfo";
import FieldDisplay from "./FieldDisplay";
import WeatherDisplay from "./WeatherDisplay";
import ActivePokemonMoves from "./ActivePokemonMoves";
import BattleLog from "./BattleLog";

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

const Battle = () => {
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
  const [weather, setWeather] = useState("none");
  const [fieldEffectsP1, setFieldEffectsP1] = useState([]);
  const [fieldEffectsP2, setFieldEffectsP2] = useState([]);
  const [animsDone, setAnimsDone] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [log, setLog] = useState([]);
  //---Use Effects-------------------
  useEffect(() => {
    if (socket === undefined) return;

    socket.on("battle-side-update", (team, player1) => {
      setTeam(JSON.parse(team));
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
    return () => socket.off("battle-field-update");
  }, [socket, field]);

  //---Utility Functions-------------
  const sendMoveChoice = (moveIndex) => {
    console.log("sending choice...");
    socket.emit("send-move", moveIndex);
    setHasSelected(true);
  };

  const sendSwitchChoice = (pokeid) => {
    socket.emit("send-switch", pokeid, id);
    setHasSelected(true);
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

    let data = {
      name: name,
      isShiny: isShiny,
      status: status,
      level: level,
    };

    if (player == "p1a") {
      setP1ActivePoke(data);
      setP1PokeHealth(health);
    }
    if (player == "p2a") {
      setP2ActivePoke(data);
      setP2PokeHealth(health);
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
    let amount = splitToken[4];

    if (player == "p1a") {
      let newMon = p1ActivePoke;
      newMon.status.push(type + "|" + stat + "|" + amount);
      setP1ActivePoke(newMon);
    }
    if (player == "p2a") {
      let newMon = p2ActivePoke;
      newMon.status.push(type + "|" + stat + "|" + amount);
      setP2ActivePoke(newMon);
    }
  };

  const cureStatus = (token) => {
    let splitToken = token.split("|");
    let player = splitToken[2].split(":")[0];
    let newMon = player == "p1a" ? p1ActivePoke : p2ActivePoke;
    let newStatuses = newMon.status.filter(
      (status) => !status.includes(splitToken[3])
    );
    newMon.status = newStatuses;

    if (player == "p1a") {
      setP1ActivePoke(newMon);
    }
    if (player == "p2a") {
      setP2ActivePoke(newMon);
    }
  };

  const startSideEffect = (token) => {
    var splitToken = token.split("|");
    let player = splitToken[2].split(":")[0];
    let effect = splitToken[3];

    if (player == "p1a")
      setFieldEffectsP1((prevState) => [...prevState, effect]);
    if (player == "p2a")
      setFieldEffectsP2((prevState) => [...prevState, effect]);
  };

  const endSideEffect = (token) => {
    var splitToken = token.split("|");
    let player = splitToken[2].split(":")[0];
    const effect = splitToken[3];

    const newArr = fieldEffectsP1.filter((e) => !e.includes(effect));

    if (player == "p1a") setFieldEffectsP1(newArr);
    if (player == "p2a") setFieldEffectsP2(newArr);
  };

  const startStatusEffect = (token) => {
    var splitToken = token.split("|");
    let player = splitToken[2].split(":")[0];
    let effect = splitToken[3];
    let newMon = player == "p1a" ? p1ActivePoke : p2ActivePoke;
    newMon.status = newMon.status.push("effect|" + effect);

    if (player == "p1a") setP1ActivePoke(newMon);
    if (player == "p2a") setP2ActivePoke(newMon);
  };

  const faint = (token) => {
    if (token.startsWith("|faint|p1a:")) {
      setP1PokeHealth(0);
    }
    if (token.startsWith("|faint|p2a:")) {
      setP2PokeHealth(0);
    }
  };

  var initialSwitch = true;
  var delay = 300;
  var p1Heal = false;
  var p2Heal = false;
  var p1Fnt = false;
  var p2Fnt = false;
  var p1Status = false;
  var p2Status = false;
  const addDelay = 1500;

  const parseField = (field) => {
    setAnimsDone(false);

    var stream = field.split(/\r?\n/);
    let change = 1;
    for (const token of stream) {
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

      let newLog = log;
      newLog.push({ message: token, severity: "info" });
      setTimeout(() => setLog(newLog), delay);
    }

    setTimeout(() => setAnimsDone(true), delay);
    delay = 300;
    change = 1;
  };

  const fieldParser = () => {
    var p1Set = false;
    var p2Set = false;
    setAnimsDone(false);

    var stream = field.split(/\r?\n/);

    for (const token of stream) {
      snackDisplay(token);

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
      if (token.startsWith("|switch|p1a:") || token.startsWith("|drag|p1a:")) {
        var splitToken = token.split("|");
        setP1Poke(splitToken[3].split(",")[0]);
        setP1PokeHealth(splitToken[4].split("/")[0]);
        setSprite("p1", splitToken[3].split(",")[0]);
        setP1PokeStatus([]);

        //setShiny
        if (splitToken[3].split(",")[3]) setP1PokeShiny(true);
        else setP1PokeShiny(false);
        console.log(splitToken[4].split(" ")[1]);
        //set status on switch in
        if (splitToken[4].split(" ").length > 1) {
          setP1PokeStatus((prevState) => [
            ...prevState,
            "status|" + splitToken[4].split(" ")[1],
          ]);
        }

        // }, delay);
        // delay += addDelay;
      }
      if (token.startsWith("|switch|p2a:") || token.startsWith("|drag|p2a:")) {
        // if (initialSwitch) delay = 0;

        // setTimeout(() => {

        var splitToken = token.split("|");
        setP2Poke(splitToken[3].split(",")[0]);
        setP2PokeHealth(splitToken[4].split("/")[0]);
        setSprite("p2", splitToken[3].split(",")[0]);
        setP2PokeStatus([]);

        //setShiny
        if (splitToken[3].split(",")[3]) setP2PokeShiny(true);
        else setP2PokeShiny(false);

        //set status on switch in
        if (splitToken[4].split(" ").length > 1) {
          console.log(splitToken[4].split(" ")[1]);
          setP2PokeStatus(["status|" + splitToken[4].split(" ")[1]]);
        }

        // }, delay);
        // delay += addDelay;
        initialSwitch = false;
      }

      //set the health display on damage and heal
      if (
        (token.startsWith("|-damage|") || token.startsWith("|-heal|")) &&
        token.split("|")[3] != "0 fnt"
      ) {
        if (
          (token.startsWith("|-damage|p1a:") &&
            token.split("|")[3].split("/")[1] == "100") ||
          (token.startsWith("|-heal|p1a:") &&
            token.split("|")[3].split("/")[1] == "100") ||
          (token.startsWith("|-damage|p1a:") &&
            token.split("|")[3].split("/")[1].split(" ")[0] == "100") ||
          (token.startsWith("|-heal|p1a:") &&
            token.split("|")[3].split("/")[1].split(" ")[0] == "100")
        ) {
          var splitToken = token.split("|");
          setTimeout(() => setP1PokeHealth(splitToken[3].split("/")[0]), delay);
          delay += addDelay;
        }
        if (
          (token.startsWith("|-damage|p2a:") &&
            token.split("|")[3].split("/")[1] == "100") ||
          (token.startsWith("|-heal|p2a:") &&
            token.split("|")[3].split("/")[1] == "100") ||
          (token.startsWith("|-damage|p2a:") &&
            token.split("|")[3].split("/")[1].split(" ")[0] == "100") ||
          (token.startsWith("|-heal|p2a:") &&
            token.split("|")[3].split("/")[1].split(" ")[0] == "100")
        ) {
          var splitToken = token.split("|");
          setTimeout(() => setP2PokeHealth(splitToken[3].split("/")[0]), delay);
          delay += addDelay;
        }
      }

      //set health to 0 on faint
      if (token.startsWith("|faint|p1a:")) {
        if (!player1) setMonKOed((prevState) => prevState + 1);
        setTimeout(() => setP1PokeHealth(0), delay);
        delay += addDelay;
      }
      if (token.startsWith("|faint|p2a:")) {
        if (player1) {
          console.log("p2 faint +1 to p1");
          setMonKOed((prevState) => prevState + 1);
        }
        setTimeout(() => setP2PokeHealth(0), delay);
        delay += addDelay;
      }

      //set status
      if (token.startsWith("|-status|p1a:")) {
        var splitToken = token.split("|");
        console.log("in stat");
        setTimeout(
          () =>
            setP1PokeStatus((prevState) => [
              ...prevState,
              "status|" + splitToken[3],
            ]),
          delay
        );
        delay += addDelay;
      }
      if (token.startsWith("|-status|p2a:")) {
        var splitToken = token.split("|");
        setTimeout(
          () =>
            setP2PokeStatus((prevState) => [
              ...prevState,
              "status|" + splitToken[3],
            ]),
          delay
        );
        delay += addDelay;
      }

      //cure status
      if (token.startsWith("|-curestatus|p1a:")) {
        var splitToken = token.split("|");
        const newStatuses = p1PokeStatus.filter(
          (status) => !status.includes(splitToken[3])
        );
        setTimeout(() => setP1PokeStatus(newStatuses), delay);
        delay += addDelay;
      }
      if (token.startsWith("|-curestatus|p2a:")) {
        var splitToken = token.split("|");
        const newStatuses = p1PokeStatus.filter(
          (status) => !status.includes(splitToken[3])
        );
        setTimeout(() => setP2PokeStatus(newStatuses), delay);
        delay += addDelay;
      }

      if (token.startsWith("|-end|p1a:")) {
        var splitToken = token.split("|");
        const newStatuses = p1PokeStatus.filter(
          (status) => !status.includes(splitToken[3])
        );
        setTimeout(() => setP1PokeStatus(newStatuses), delay);
        delay += addDelay;
      }
      if (token.startsWith("|-end|p2a:")) {
        var splitToken = token.split("|");
        const newStatuses = p2PokeStatus.filter(
          (status) => !status.includes(splitToken[3])
        );
        setTimeout(() => setP2PokeStatus(newStatuses), delay);
        delay += addDelay;
      }

      //side effects
      if (token.startsWith("|-sidestart|p1:")) {
        var splitToken = token.split("|");
        const effect = splitToken[3];
        setTimeout(
          () => setFieldEffectsP1((prevState) => [...prevState, effect]),
          delay
        );
        delay += addDelay;
      }
      if (token.startsWith("|-sidestart|p2:")) {
        var splitToken = token.split("|");
        const effect = splitToken[3];
        setTimeout(
          () => setFieldEffectsP2((prevState) => [...prevState, effect]),
          delay
        );
        delay += addDelay;
      }

      //end side effect
      if (token.startsWith("|-sideend|p1:")) {
        var splitToken = token.split("|");
        const effectTok = splitToken[3];

        const newArr = fieldEffectsP1.filter(
          (effect) => !effect.includes(effectTok)
        );

        setTimeout(() => setFieldEffectsP1(newArr), delay);
        delay += addDelay;
      }
      if (token.startsWith("|-sideend|p2:")) {
        var splitToken = token.split("|");
        const effectTok = splitToken[3];

        const newArr = fieldEffectsP2.filter(
          (effect) => !effect.includes(effectTok)
        );

        setTimeout(() => setFieldEffectsP2(newArr), delay);
        delay += addDelay;
      }

      //weather
      if (token.startsWith("|-weather")) {
        var splitToken = token.split("|");
        const weather = splitToken[2];
        setTimeout(() => setWeather(weather), delay);
        delay += addDelay;
      }

      //set boost and unboost
      if (token.startsWith("|-unboost|p1a:")) {
        var splitToken = token.split("|");

        setTimeout(
          () =>
            setP1PokeStatus((prevState) => [
              ...prevState,
              "unboost|" + splitToken[3],
            ]),
          delay
        );
        delay += addDelay;
      }
      if (token.startsWith("|-unboost|p2a:")) {
        var splitToken = token.split("|");

        setTimeout(
          () =>
            setP2PokeStatus((prevState) => [
              ...prevState,
              "unboost|" + splitToken[3],
            ]),
          delay
        );
        delay += addDelay;
      }
      if (token.startsWith("|-boost|p1a:")) {
        var splitToken = token.split("|");

        setTimeout(
          () =>
            setP1PokeStatus((prevState) => [
              ...prevState,
              "boost|" + splitToken[3],
            ]),
          delay
        );
        delay += addDelay;
      }
      if (token.startsWith("|-boost|p2a:")) {
        var splitToken = token.split("|");

        setTimeout(
          () =>
            setP2PokeStatus((prevState) => [
              ...prevState,
              "boost|" + splitToken[3],
            ]),
          delay
        );
        delay += addDelay;
      }
      if (token.startsWith("|-setboost|p1a:")) {
        var splitToken = token.split("|");

        setTimeout(
          () =>
            setP1PokeStatus((prevState) => [
              ...prevState,
              "setboost|" + splitToken[3] + "|" + splitToken[4],
            ]),
          delay
        );
        delay += addDelay;
      }
      if (token.startsWith("|-setboost|p2a:")) {
        var splitToken = token.split("|");

        setTimeout(
          () =>
            setP2PokeStatus((prevState) => [
              ...prevState,
              "setboost|" + splitToken[3] + "|" + splitToken[4],
            ]),
          delay
        );
        delay += addDelay;
      }

      if (token.startsWith("|-start|p1a:")) {
        var splitToken = token.split("|");

        setTimeout(
          () =>
            setP1PokeStatus((prevState) => [
              ...prevState,
              "effect|" + splitToken[3],
            ]),
          delay
        );
        delay += addDelay;
      }
      if (token.startsWith("|-start|p2a:")) {
        var splitToken = token.split("|");

        setTimeout(
          () =>
            setP2PokeStatus((prevState) => [
              ...prevState,
              "effect|" + splitToken[3],
            ]),
          delay
        );
        delay += addDelay;
      }

      if (token.startsWith("|win")) {
        var splitToken = token.split("|");
        var winner = splitToken[2];
        setTimeout(() => {
          if (id == winner.replace(/['"]+/g, "")) setRewards(1000, 1, true);
          else setRewards(0, 1, false);
          setBattleEnd(true);
        }, delay);
      }
    } //end tok

    setTimeout(() => setAnimsDone(true), delay);
    delay = 300;
  };

  return (
    <Box sx={{ p: 2 }}>
      <Grid container>
        <Grid item container xs={8}>
          <Grid item xs={2}>
            <WeatherDisplay weather={weather} />
          </Grid>
          <Grid item container alignItems="center" justifyContent="end" xs={10}>
            <Typography variant="h5">{isPlayer1 ? p2Name : p1Name}</Typography>
          </Grid>
          <Grid item xs={12}>
            {p1ActivePoke && p2ActivePoke ? (
              <FieldDisplay
                p1ActivePoke={p1ActivePoke}
                p2ActivePoke={p2ActivePoke}
                p1PokeHealth={p1PokeHealth}
                p2PokeHealth={p2PokeHealth}
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
                <ActivePokemonMoves
                  team={team}
                  animsDone={animsDone}
                  sendMoveChoice={sendMoveChoice}
                />
              </TabPanel>
              <TabPanel value={tabValue} index={2}></TabPanel>
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
                <Tab label="Switch" {...a11yProps(2)} />
              </Tabs>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <BattleLog log={log} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Battle;
