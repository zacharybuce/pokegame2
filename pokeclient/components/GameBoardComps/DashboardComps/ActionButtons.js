import { Button, Grid } from "@mui/material";
import React from "react";

//This componet displays action buttons depending on the phase of the game.
//If movement
//If action will show take action button and end turn

const ActionButtons = ({ turn }) => {
  if (turn == "movement")
    return (
      <Grid item container xs={12} sx={{ textAlign: "center" }}>
        <Grid item xs={6}>
          <Button color="success" variant="contained" sx={{ width: "75%" }}>
            Move
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" sx={{ width: "75%" }}>
            View info
          </Button>
        </Grid>
      </Grid>
    );

  return (
    <Grid
      item
      container
      alignContent="center"
      xs={12}
      sx={{ textAlign: "center" }}
    >
      <Grid item xs={7}>
        <Button color="success" variant="contained" sx={{ width: "90%" }}>
          Take Action
        </Button>
      </Grid>
      <Grid item xs={5}>
        <Button variant="contained" color="error" sx={{ width: "90%" }}>
          End Turn
        </Button>
      </Grid>
    </Grid>
  );
};

export default ActionButtons;
