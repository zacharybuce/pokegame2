import React from "react";
import { Box, Grid } from "@mui/material";

const PokemonImg = ({ num, isShiny }) => {
  const url = `url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${num}.png)`;
  const shinyUrl = `url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${num}.png)`;
  return (
    <Grid
      item
      container
      justifyContent="center"
      sx={{
        backgroundColor: "#506680",
        borderBottomLeftRadius: "3px",
        borderBottomRightRadius: "3px",
      }}
    >
      <Box
        sx={{
          backgroundImage: isShiny ? shinyUrl : url,
          height: "120px",
          width: "120px",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />
    </Grid>
  );
};

export default PokemonImg;
