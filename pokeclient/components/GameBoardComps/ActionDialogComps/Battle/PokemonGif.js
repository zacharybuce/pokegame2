import React, { useState, useEffect } from "react";

const PokemonGif = ({ name, isShiny, isOpp }) => {
  const [spriteId, setSpriteId] = useState();
  let shiny = isShiny ? "-shiny" : "";

  useEffect(() => {
    setSprite();
  }, [name]);

  const setSprite = async () => {
    let res = await fetch(
      process.env.NEXT_PUBLIC_ROOT_URL + "/api/pokemon/" + name
    );
    let json = await res.json();

    setSpriteId(json.data.spriteid);
  };

  if (spriteId && !isOpp)
    return (
      <img
        src={`http://play.pokemonshowdown.com/sprites/ani-back${shiny}/${spriteId}.gif`}
      />
    );

  if (spriteId && isOpp)
    return (
      <img
        src={`http://play.pokemonshowdown.com/sprites/ani${shiny}/${spriteId}.gif`}
      />
    );

  return <div></div>;
};

export default PokemonGif;
