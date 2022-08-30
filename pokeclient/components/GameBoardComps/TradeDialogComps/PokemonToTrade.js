import { Grid, Box } from "@mui/material";
import React from "react";
import PokeTradeIcon from "./PokeTradeIcon";

const PokemonToTrade = ({ team, offerTrade }) => {
  return (
    <Grid
      item
      container
      justifyContent="center"
      xs={12}
      sx={{
        mt: "1vh",
        mb: "3vh",
      }}
    >
      <Box
        sx={{
          width: "75%",
          border: "1px solid lightgrey",
          borderRadius: 2,
          p: 1,
        }}
      >
        <Grid container>
          {team.map((poke) => (
            <Grid item xs={2}>
              <PokeTradeIcon pokemon={poke} offerTrade={offerTrade} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Grid>
  );
};

export default PokemonToTrade;
