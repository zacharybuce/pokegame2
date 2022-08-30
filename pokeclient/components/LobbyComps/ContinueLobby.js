import { Grid, Box, CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSocket } from "../../contexts/SocketProvider";
import ReadyButton from "./ReadyButton";
import RulesDisplay from "./RulesDisplay";
import GameSettingsButton from "./GameSettingsButton";
import GameSettingsDialog from "./GameSettingsDialog";
import PlayerLobbyDisplay from "./PlayerLobbyDisplay";

const ContinueLobby = ({ id, setScreen, setIsContinue }) => {
  const socket = useSocket();
  const [playersInLobby, setPlayersInLobby] = useState();
  const [isReady, setIsReady] = useState(false);

  //checks if playersInLobby has changed, receives lobby-player-update event
  useEffect(() => {
    if (socket === undefined) return;

    socket.on("lobby-player-update", (players) => setPlayersInLobby(players));
    return () => socket.off("lobby-player-update");
  }, [socket, playersInLobby]);

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
    setIsContinue(true);
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
        <Grid item xs={5}></Grid>
        <Grid item xs={7}>
          <ReadyButton readyUp={readyUp} isReady={isReady} />
        </Grid>
      </Grid>
    );

  return (
    <Box sx={{ mt: "40vh", textAlign: "center" }}>
      <CircularProgress />
    </Box>
  );
};

export default ContinueLobby;
