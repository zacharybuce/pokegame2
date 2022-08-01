import React from "react";
import { Box, Grid } from "@mui/material";
import PlayerLobbyCard from "./PlayerLobbyCard";

const PlayerLobbyDisplay = ({ players }) => {
  return (
    <Box
      sx={{
        border: "solid",
        borderWidth: "1px",
        borderColor: "lightgray",
        mt: "20vh",
        p: 5,
        height: "60vh",
        overflowY: "auto",
      }}
    >
      <Grid container>
        {players.map((player) => (
          <PlayerLobbyCard player={player} />
        ))}
      </Grid>
    </Box>
  );
};

export default PlayerLobbyDisplay;
