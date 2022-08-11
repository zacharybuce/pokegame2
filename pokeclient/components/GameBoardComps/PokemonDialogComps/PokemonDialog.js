import { Box, Dialog, Typography } from "@mui/material";
import React from "react";
import PokemonSummary from "./PokemonSummary";

const PokemonDialog = ({
  pokemon,
  candies,
  pokemonDialog,
  team,
  setTeam,
  setBag,
  setCandies,
  setPokemonDialog,
}) => {
  return (
    <Dialog
      fullWidth
      maxWidth={"md"}
      open={pokemonDialog}
      onClose={() => setPokemonDialog(false)}
    >
      {pokemon ? (
        <PokemonSummary
          pokemon={pokemon}
          candies={candies}
          team={team}
          setCandies={setCandies}
          setTeam={setTeam}
          setBag={setBag}
        />
      ) : (
        ""
      )}
    </Dialog>
  );
};

export default PokemonDialog;
