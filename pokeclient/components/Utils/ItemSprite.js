import React from "react";
import styles from "../../Styles/ItemSprite.module.css";
import { Typography } from "@mui/material";
import { HtmlTooltip } from "./HtmlTooltip";

const ItemSprite = ({ item, isTM, showTooltip }) => {
  const className = `${styles.pokesprite} ${styles[item.type]} ${
    styles[item.id]
  }`;

  const genTooltip = () => {
    var tooltip;

    if (isTM) {
      tooltip = (
        <React.Fragment>
          <Typography>
            <b>Type:</b> {item.move.type}
          </Typography>
          <Typography>
            <b>Accuracy:</b> {item.move.accuracy}
          </Typography>
          <Typography>
            <b>Base Power:</b> {item.move.basePower}
          </Typography>
          <Typography>
            <b>Category: </b>
            {item.move.category}
          </Typography>
          <Typography>
            <b>Desc:</b> {item.move.desc}
          </Typography>
        </React.Fragment>
      );
    } else {
      tooltip = (
        <React.Fragment>
          <Typography>{item.name}</Typography>
          <Typography>{item.desc}</Typography>
        </React.Fragment>
      );
    }

    return tooltip;
  };

  if (showTooltip)
    return (
      <HtmlTooltip title={genTooltip()}>
        <span className={className}></span>
      </HtmlTooltip>
    );

  return <span className={className}></span>;
};

export default ItemSprite;
