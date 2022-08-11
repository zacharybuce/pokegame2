import { Grid } from "@mui/material";
import React from "react";
import MoveButton from "./MoveButton";

const ActivePokemonMoves = ({
  team,
  sendMoveChoice,
  sendSwitchChoice,
  animsDone,
  hasSelected,
}) => {
  if (animsDone)
    return (
      <Grid container spacing={1}>
        {team.active[0].moves.map((move, index) => {
          if (!move.disabled)
            return (
              <MoveButton
                move={move}
                index={index}
                sendMoveChoice={sendMoveChoice}
              />
            );
        })}
      </Grid>
    );

  return <Grid container spacing={1}></Grid>;
};

export default ActivePokemonMoves;
