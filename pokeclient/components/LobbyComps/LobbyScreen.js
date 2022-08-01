import React, { useState, useEffect } from "react";
import { useSocket } from "../../contexts/SocketProvider";
import { Box, CircularProgress, Grid } from "@mui/material";
import ReadyButton from "./ReadyButton";
import RulesDisplay from "./RulesDisplay";
import GameSettingsButton from "./GameSettingsButton";
import GameSettingsDialog from "./GameSettingsDialog";
import PlayerLobbyDisplay from "./PlayerLobbyDisplay";

const LobbyScreen = ({ setScreen, id }) => {
  const socket = useSocket();
  const [playersInLobby, setPlayersInLobby] = useState();
  const [isReady, setIsReady] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [rules, setRules] = useState({
    campaign: "Hoen Adventure",
    StartingTown: "Standard",
    Starters: "Standard",
  });

  //checks if playersInLobby has changed, receives lobby-player-update event
  useEffect(() => {
    if (socket === undefined) return;

    socket.on("lobby-player-update", (players) => setPlayersInLobby(players));
    return () => socket.off("lobby-player-update");
  }, [socket, playersInLobby]);

  //checks for changes in the rules
  useEffect(() => {
    if (socket === undefined) return;

    socket.on("lobby-rules-update", (rules) => setRules(rules));
    return () => socket.off("lobby-rules-update");
  }, [socket, rules]);

  //checks for the game starting
  useEffect(() => {
    if (socket === undefined) return;

    socket.on("start-game", () => setScreen("GameBoard"));
    return () => socket.off("start-game");
  }, [socket]);

  //alerts server that the player is ready to start the game. Should trigger lobby-player-update
  const readyUp = () => {
    socket.emit("lobby-player-ready");
    setIsReady(true);
  };

  //checks if the player is the host of the game
  const isHost = () => {
    if (playersInLobby[0].name == id) return true;
    else return false;
  };

  if (playersInLobby)
    return (
      <Grid
        container
        spacing={1}
        sx={{ ml: "10vw", mr: "10vw", width: "80vw" }}
      >
        <Grid item xs={7}>
          <PlayerLobbyDisplay players={playersInLobby} />
        </Grid>
        <Grid item xs={5}>
          <RulesDisplay rules={rules} />
        </Grid>
        <Grid item xs={7}>
          <ReadyButton readyUp={readyUp} isReady={isReady} />
        </Grid>
        <Grid item xs={5}>
          <GameSettingsButton
            setSettingsOpen={setSettingsOpen}
            isHost={isHost()}
          />
        </Grid>
        <GameSettingsDialog
          settingsOpen={settingsOpen}
          setSettingsOpen={setSettingsOpen}
        />
      </Grid>
    );

  return (
    <Box sx={{ mt: "40vh" }}>
      <CircularProgress />
    </Box>
  );
};

export default LobbyScreen;
