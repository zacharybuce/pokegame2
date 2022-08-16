import { Box, Grid } from "@mui/material";
import React from "react";
import FieldEffectsDisplay from "./FieldEffectsDisplay";
import PokemonGif from "./PokemonGif";
import HealthBar from "./HealthBar";
import BattleCircle from "./BattleCircle";

const PokemonDisplay = ({ pokemon, health, status, fieldEffects, isOpp }) => {
  if (isOpp)
    return (
      <Grid item container xs={12}>
        <Grid item xs={6}>
          <HealthBar
            health={health}
            name={pokemon.name}
            level={pokemon.level}
            status={status}
          />
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="flex-end"
          direction="row"
          xs={5}
          sx={{
            height: "140px",
            "&::after": {
              height: "50px",
              backgroundColor: "#506680",
              boxShadow: 3,
              width: "25%",
              position: "absolute",
              top: "33%",
              content: "''",
              borderRadius: "50%",
              zIndex: 0,
            },
          }}
        >
          {/* <BattleCircle /> */}
          <Box sx={{ zIndex: 1 }}>
            <PokemonGif name={pokemon.name} isShiny={pokemon.isShiny} isOpp />
          </Box>
        </Grid>
        <Grid item xs={1}>
          <FieldEffectsDisplay fieldEffects={fieldEffects} />
        </Grid>
      </Grid>
    );

  return (
    <Grid item container xs={12} sx={{ mt: "1vh" }}>
      <Grid item xs={1}>
        <FieldEffectsDisplay fieldEffects={fieldEffects} />
      </Grid>
      <Grid
        item
        container
        justifyContent="center"
        alignItems="flex-end"
        direction="row"
        xs={5}
        sx={{
          height: "140px",
          "&::after": {
            height: "50px",
            backgroundColor: "#506680",
            boxShadow: 3,
            width: "25%",
            position: "absolute",
            top: "60%",
            content: "''",
            borderRadius: "50%",
            zIndex: 0,
          },
        }}
      >
        {/* <BattleCircle /> */}
        <Box sx={{ zIndex: 1 }}>
          <PokemonGif name={pokemon.name} isShiny={pokemon.isShiny} />
        </Box>
      </Grid>
      <Grid item container alignItems="flex-end" direction="row" xs={6}>
        <HealthBar
          health={health}
          name={pokemon.name}
          level={pokemon.level}
          status={status}
        />
      </Grid>
    </Grid>
  );
};

export default PokemonDisplay;
