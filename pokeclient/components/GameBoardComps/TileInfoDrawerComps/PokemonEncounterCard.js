import { Grid, Typography } from "@mui/material";
import React from "react";
import PokeSprite from "../../Utils/PokeSprite";

const PokemonEncounterCard = ({ pokemon, encounterRate }) => {
  const getId = () => {
    if (pokemon == "Flabébé") return "flabebe";

    return pokemon;
  };

  return (
    <Grid item container xs={12} className={"poke-encounter-card"}>
      <Grid item xs={2}>
        <PokeSprite name={getId().toLowerCase()} shiny={false} />
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
