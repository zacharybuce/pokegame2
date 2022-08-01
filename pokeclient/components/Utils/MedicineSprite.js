import React from "react";
import styles from "../../Styles/MedicineSprite.module.css";
import { Typography } from "@mui/material";
import { HtmlTooltip } from "./HtmlTooltip";

const MedicineSprite = ({ item, showTooltip }) => {
  const className = `${styles.pokesprite} ${styles.medicine} ${styles[item]}`;
  const getDesc = (item) => {
    switch (item) {
      case "potion":
        return "Restores 1 Exauhstion Point";
      case "super-potion":
        return "Restores 3 Exauhstion Points";
      case "hyper-potion":
        return "Restores 5 Exauhstion Points";
      case "revive":
        return "Cures a pokemon from fainting";
    }
  };
  const tooltip = (
    <React.Fragment>
      <Typography>{item.replace("-", " ").toUpperCase()}</Typography>
      <Typography>{getDesc(item)}</Typography>
    </React.Fragment>
  );

  if (showTooltip)
    return (
      <HtmlTooltip title={tooltip}>
        <span className={className}></span>
      </HtmlTooltip>
    );

  return <span className={className}></span>;
};

export default MedicineSprite;
