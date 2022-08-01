import React from "react";
import { Grid, Button, Typography } from "@mui/material";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import ItemSprite from "../../Utils/ItemSprite";

const pokeball = { name: "Pokeball", id: "poke", type: "ball", cost: 500 };
const greatball = { name: "Greatball", id: "great", type: "ball", cost: 750 };
const ultraball = { name: "Ultraball", id: "ultra", type: "ball", cost: 1200 };

const Pokeball = ({ ball, buyBasicItem }) => {
  const ballType = (ball) => {
    switch (ball) {
      case "poke":
        return pokeball;
      case "great":
        return greatball;
      case "ultra":
        return ultraball;
    }
  };

  return (
    <Grid container sx={{ mb: "5px" }}>
      <Grid item xs={10}>
        <Button
          variant="contained"
          sx={{
            width: "95%",
            justifyContent: "left",
            backgroundColor: "#152642",
          }}
          onClick={() => buyBasicItem(ball, ballType(ball).cost)}
        >
          <ItemSprite item={ballType(ball)} /> {ballType(ball).name}
        </Button>
      </Grid>
      <Grid
        item
        container
        xs={2}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <CurrencyYenIcon />
        {ballType(ball).cost}
      </Grid>
    </Grid>
  );
};

export default Pokeball;
