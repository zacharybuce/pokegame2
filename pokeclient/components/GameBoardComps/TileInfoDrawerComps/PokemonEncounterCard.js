import { Grid, Typography } from "@mui/material";
import React from "react";
import PokeSprite from "../../Utils/PokeSprite";

const PokemonEncounterCard = ({ pokemon, encounterRate }) => {
  return (
    <Grid item container xs={12} className={"poke-encounter-card"}>
      <Grid item xs={2}>
        <PokeSprite name={pokemon.toLowerCase()} shiny={false} />
      </Grid>
      <Grid item container direction="row" alignItems="center" xs={8}>
        <Typography>{pokemon}</Typography>
      </Grid>
      <Grid item container direction="row" alignItems="center" xs={2}>
        <Typography>{encounterRate}%</Typography>
      </Grid>
    </Grid>
  );
};

export default PokemonEncounterCard;
