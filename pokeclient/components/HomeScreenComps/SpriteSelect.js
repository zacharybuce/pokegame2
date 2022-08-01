import { Grid } from "@mui/material";
import React from "react";
import SpriteDisplayCard from "./SpriteDisplayCard";
const spriteList = [
  "AceTrainer",
  "BattleGirl",
  "Beauty",
  "BlackBelt",
  "Collector",
  "CoolTrainer",
  "Hiker",
  "PokeManiac",
  "PokemonRanger",
  "Psychic",
  "RichBoy",
  "Youngster",
];

const SpriteSelect = ({ sprite, setSprite }) => {
  const selectSprite = (spriteName) => {
    setSprite(spriteName);
  };

  return (
    <Grid container spacing={1}>
      {spriteList.map((spriteName) => (
        <SpriteDisplayCard
          sprite={spriteName}
          selected={spriteName == sprite}
          selectSprite={selectSprite}
        />
      ))}
    </Grid>
  );
};

export default SpriteSelect;
