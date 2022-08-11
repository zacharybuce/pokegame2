import { Box, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Learnset from "./Learnset";
import Move from "./Move";

const PokemonMoves = ({ pokemon, team, setTeam }) => {
  const changeMoves = (moves) => {
    let filteredTeam = team.slice();
    let newMon = pokemon;

    filteredTeam.forEach((mem, index) => {
      if (JSON.stringify(mem) == JSON.stringify(newMon)) {
        newMon.moves = moves;
        filteredTeam[index] = newMon;
      }
    });

    setTeam([...filteredTeam]);
  };

  return (
    <Box sx={{ height: "378px" }}>
      <Grid container>
        <Grid item xs={5}>
          <Typography sx={{ mb: "1vh" }}>Moves</Typography>
          {pokemon.moves.map((move, index) => {
            return <Move move={move} />;
          })}
        </Grid>
        <Grid item xs={7}>
          <Learnset
            learnset={pokemon.learnset}
            candiesSpent={pokemon.candiesSpent}
            currentMoves={pokemon.moves}
            changeMoves={changeMoves}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PokemonMoves;
