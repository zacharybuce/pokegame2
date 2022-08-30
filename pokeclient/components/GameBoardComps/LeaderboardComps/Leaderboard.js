import { Drawer } from "@mui/material";
import React from "react";
import PlayerCard from "./PlayerCard";

const Leaderboard = ({
  leaderboardDrawer,
  setLeaderboardDrawer,
  game,
  players,
  id,
  initiateTrade,
}) => {
  return (
    <Drawer
      anchor={"left"}
      open={leaderboardDrawer}
      onClose={() => setLeaderboardDrawer(false)}
      sx={{ overflowY: "auto" }}
    >
      {players.map((player) => (
        <PlayerCard
          player={player}
          game={game}
          isPlayer={player.name == id}
          initiateTrade={initiateTrade}
        />
      ))}
    </Drawer>
  );
};

export default Leaderboard;
