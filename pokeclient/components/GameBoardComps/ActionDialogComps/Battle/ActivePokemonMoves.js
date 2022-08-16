import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import MoveButton from "./MoveButton";

const ActivePokemonMoves = ({
  team,
  sendMoveChoice,
  animsDone,
  hasSelected,
}) => {
  if (animsDone)
    return (
      <Grid container spacing={1}>
        {!team.forceSwitch && !team.wait && !hasSelected ? (
          team.active[0].moves.map((move, index) => {
            if (!move.disabled)
              return (
                <MoveButton
                  move={move}
                  index={index}
                  sendMoveChoice={sendMoveChoice}
                />
              );
          })
        ) : (
          <Box sx={{ textAlign: "center", width: "100%", pt: "20px" }}>
            <Typography variant="h5">
              {team.forceSwitch
                ? "Choose a pokemon to switch to"
                : "Waiting for opponent"}
            </Typography>
          </Box>
        )}
      </Grid>
    );

  return <Grid container spacing={1}></Grid>;
};

export default ActivePokemonMoves;
