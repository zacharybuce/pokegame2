import { Avatar, Card, CardActionArea, Grid, Typography } from "@mui/material";
import React from "react";
import styles from "../../Styles/SpriteDisplayCard.module.css";

const SpriteDisplayCard = ({ sprite, selected, selectSprite }) => {
  return (
    <Grid item xs={2}>
      <Card
        className={selected ? styles.selected : styles.card}
        sx={{ textAlign: "center" }}
      >
        <CardActionArea sx={{ p: 1 }} onClick={() => selectSprite(sprite)}>
          <Avatar src={"/Avatar/" + sprite + ".png"} sx={{ m: "auto" }} />
          <Typography>{sprite}</Typography>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default SpriteDisplayCard;
