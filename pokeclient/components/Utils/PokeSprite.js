import React from "react";
import styles from "../../Styles/PokeSprite.module.css";

const PokeSprite = ({ name, shiny }) => {
  const className =
    `${styles.pokesprite} ${styles.pokemon} ${styles[name]}` +
    (shiny ? "shiny" : "");

  return <span className={className}></span>;
};

export default PokeSprite;
