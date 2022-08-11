import { Grid } from "@mui/material";
import React from "react";
import PokemonDisplay from "./PokemonDisplay";

const FieldDisplay = ({
  p1ActivePoke,
  p2ActivePoke,
  p1PokeHealth,
  p2PokeHealth,
  fieldEffectsP1,
  fieldEffectsP2,
  isPlayer1,
}) => {
  return (
    <Grid container sx={{ mt: "2vh" }}>
      <PokemonDisplay
        isOpp
        pokemon={isPlayer1 ? p2ActivePoke : p1ActivePoke}
        health={isPlayer1 ? p2PokeHealth : p1PokeHealth}
        fieldEffects={isPlayer1 ? fieldEffectsP2 : fieldEffectsP1}
      />
      <PokemonDisplay
        pokemon={isPlayer1 ? p1ActivePoke : p2ActivePoke}
        health={isPlayer1 ? p1PokeHealth : p2PokeHealth}
        fieldEffects={isPlayer1 ? fieldEffectsP1 : fieldEffectsP2}
      />
    </Grid>
  );
};

export default FieldDisplay;
