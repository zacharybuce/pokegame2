import { Grid } from "@mui/material";
import React from "react";
import PokemonEncounterCard from "./PokemonEncounterCard";

const WildEncounters = ({ encounters, encounterRates }) => {
  return (
    <Grid container>
      {encounters.map((pokemon, index) => (
        <PokemonEncounterCard
          pokemon={pokemon}
          encounterRate={encounterRates[index]}
        />
      ))}
    </Grid>
  );
};

export default WildEncounters;
