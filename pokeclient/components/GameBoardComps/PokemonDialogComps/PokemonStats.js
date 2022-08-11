import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import StatTableRow from "./StatTableRow";
import { genStats } from "../../Utils/StatGen";
import LevelUpProgress from "./LevelUpProgress";

const PokemonStats = ({ pokemon, upgradeStat, candies, handleEvolve }) => {
  const [stats, setStats] = useState();

  useEffect(() => {
    setStats(genStats(pokemon));
    console.log("update");
  }, [pokemon, candies]);

  if (stats)
    return (
      <Box sx={{ height: "378px" }}>
        {/* Headers */}
        <Grid container>
          <Grid item xs={4}>
            <Typography>Stat</Typography>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: "center" }}>
            <Typography>Amount</Typography>
          </Grid>
          <Grid item xs={2} sx={{ textAlign: "center" }}></Grid>
          <Grid item xs={2}>
            <Typography>Cost</Typography>
          </Grid>
        </Grid>
        {/* Rows */}
        {Object.keys(stats).map((stat, index) => {
          let upgradeCost = pokemon.evs[stat] / 28 + 1;
          return (
            <StatTableRow
              key={stat}
              stat={stat}
              amount={stats[stat]}
              index={index}
              upgradeStat={upgradeStat}
              canUpgrade={candies >= upgradeCost}
              upgradeCost={upgradeCost}
            />
          );
        })}
        <LevelUpProgress
          candiesSpent={pokemon.candiesSpent}
          levelUpCandies={pokemon.levelUpCandies}
          levelUpIncrease={pokemon.levelUpIncrease}
          evolveCandies={pokemon.evolveCandies}
          handleEvolve={handleEvolve}
        />
      </Box>
    );

  return <div></div>;
};

export default PokemonStats;
