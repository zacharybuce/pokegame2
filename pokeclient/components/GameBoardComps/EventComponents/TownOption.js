import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { Hex } from "react-hexgrid";

const TownOption = ({ town, takeAction, townId, setTaxiDialog }) => {
  return (
    <Grid item xs={6}>
      <Button
        fullWidth
        sx={{
          textTransform: "none",
          backgroundImage: "url(/Tiles-Hoen/" + town.color + ".png)",
          borderRadius: 1,
          p: 2,
          border: "1px solid lightgrey",
          transition: "all .2s",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
        onClick={() => {
          setTaxiDialog(false);
          let { q, r, s } = town.location;
          takeAction("flyingtaxi", {
            location: { tile: townId, coord: new Hex(q, r, s) },
          });
        }}
      >
        <Typography color="black">{town.name}</Typography>
      </Button>
    </Grid>
  );
};

export default TownOption;
