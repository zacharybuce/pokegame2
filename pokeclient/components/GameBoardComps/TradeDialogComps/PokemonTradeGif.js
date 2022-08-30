import React from "react";

const PokemonTradeGif = ({ spriteId, isShiny }) => {
  let shiny = isShiny ? "-shiny" : "";
  return (
    <img
      src={`http://play.pokemonshowdown.com/sprites/ani${shiny}/${spriteId}.gif`}
    />
  );
};

export default PokemonTradeGif;
