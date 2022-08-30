import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import PokemonGif from "../ActionDialogComps/Battle/PokemonGif";

const PlayerOffer = ({ pokemon, isPlayer, accepted }) => {
  return (
    <Box>
      <Box
        sx={{
          height: "167px",
          border: "solid",
          borderColor: "gray",
          borderWidth: "3px",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0px 5px gray",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#152642",
            textAlign: "center",
          }}
        >
          {isPlayer ? "Your Offer" : " Opp.'s Offer"}
        </Box>
        <Grid
          container
          alignItems="end"
          sx={{ textAlign: "center", height: "140px" }}
        >
          <Grid item xs={12}>
            {pokemon ? (
              <PokemonGif
                name={pokemon.species}
                isShiny={pokemon.isShiny}
                isOpp
              />
            ) : (
              <div></div>
            )}
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          mt: "3vh",
          border: "solid",
          borderRadius: 1,
          borderWidth: "1px",
          borderColor: "lightgrey",
        }}
      >
        {accepted ? (
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Accepted
            <CheckCircleOutlineIcon
              sx={{ color: "green", position: "relative", top: "5px" }}
            />
          </Typography>
        ) : (
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Not Accepted...
            <HourglassEmptyIcon
              sx={{ color: "red", position: "relative", top: "5px" }}
            />
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default PlayerOffer;
