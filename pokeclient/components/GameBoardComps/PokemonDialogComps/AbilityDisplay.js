import React from "react";
import { Grid, Typography } from "@mui/material";
import Ability from "../../Utils/Ability";

const AbilityDisplay = ({ ability }) => {
  return (
    <Grid container xs={12} sx={{ mb: "1vh" }}>
      <Grid
        item
        container
        xs={8}
        sx={{ backgroundColor: "#506680", borderRadius: "3px" }}
      >
        <Grid container alignContent="center" item xs={4}>
          <Typography sx={{ ml: "5px" }}>Ability</Typography>
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          alignContent="center"
          xs={8}
          sx={{ borderRadius: "3px", height: "36px" }}
        >
          <Ability ability={ability} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AbilityDisplay;
