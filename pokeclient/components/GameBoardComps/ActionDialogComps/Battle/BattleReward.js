import Cookie from "@mui/icons-material/Cookie";
import CurrencyYen from "@mui/icons-material/CurrencyYen";
import { Fade, Grid, Typography } from "@mui/material";
import React from "react";
import ItemSprite from "../../../Utils/ItemSprite";

const BattleReward = ({ reward, type, index }) => {
  const iconDisplay = () => {
    switch (type) {
      case "money":
        return <CurrencyYen />;
      case "candies":
        return <Cookie />;
      case "item":
        return <ItemSprite item={reward} showTooltip />;
    }
  };

  return (
    <Fade in direction="left" timeout={1000 + 1000 * index}>
      <Grid
        item
        container
        alignItems="center"
        sx={{ border: "1px solid #ededed", mb: "10px", height: "50px" }}
      >
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          xs={3}
          sx={{ backgroundColor: "#152642", height: "100%" }}
        >
          {iconDisplay()}
        </Grid>
        <Grid item xs={9}>
          <Typography variant="h5" sx={{ ml: "5px" }}>
            + {reward.name ? reward.name : reward + " " + type}
          </Typography>
        </Grid>
      </Grid>
    </Fade>
  );
};

export default BattleReward;
