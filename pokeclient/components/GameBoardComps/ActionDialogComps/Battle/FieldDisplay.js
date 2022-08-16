import { Grid } from "@mui/material";
import React from "react";
import PokemonDisplay from "./PokemonDisplay";

const FieldDisplay = ({
  p1ActivePoke,
  p2ActivePoke,
  p1PokeHealth,
  p2PokeHealth,
  p1PokeStatus,
  p2PokeStatus,
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
        status={isPlayer1 ? p2PokeStatus : p1PokeStatus}
        fieldEffects={isPlayer1 ? fieldEffectsP2 : fieldEffectsP1}
      />
      <PokemonDisplay
        pokemon={isPlayer1 ? p1ActivePoke : p2ActivePoke}
        health={isPlayer1 ? p1PokeHealth : p2PokeHealth}
        status={isPlayer1 ? p1PokeStatus : p2PokeStatus}
        fieldEffects={isPlayer1 ? fieldEffectsP1 : fieldEffectsP2}
      />
    </Grid>
  );
};

export default FieldDisplay;
