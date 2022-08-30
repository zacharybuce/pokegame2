import { Box, Typography, Fade, Divider, Button, Grid } from "@mui/material";
import React from "react";
import Cookie from "@mui/icons-material/Cookie";
import CurrencyYen from "@mui/icons-material/CurrencyYen";
import { pSBC } from "../../../Utils/colorUtil";
import ItemSprite from "../../../Utils/ItemSprite";
import BattleReward from "./BattleReward";

const BattleEndScreen = ({ rewards, closeDialog }) => {
  return (
    <Box
      sx={{
        p: 3,
        textAlign: "center",
        width: "50%",
        ml: "25%",
        overflowX: "hidden",
      }}
    >
      <Typography variant="h2">
        Battle {rewards.win ? "Won!" : "Lost"}
      </Typography>
      <Box
        sx={{
          p: 2,
          borderRadius: "3px",
          backgroundColor: "#506680",
          textAlign: "start",
          mb: "2vh",
        }}
      >
        <Typography variant="h4">Battle Rewards</Typography>
        <Divider sx={{ mb: "1vh", backgroundColor: "#ededed" }} />
        <Grid
          container
          justifyContent="center"
          sx={{
            width: "50%",
            ml: "25%",
          }}
        >
          {Object.keys(rewards).map((key, index) => {
            if (index != 0)
              return (
                <BattleReward reward={rewards[key]} index={index} type={key} />
              );
          })}
        </Grid>
      </Box>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#767D92",
          "&:hover": {
            backgroundColor: pSBC(-0.4, "#767D92"),
          },
        }}
        onClick={() => closeDialog()}
      >
        Close
      </Button>
    </Box>
  );
};

export default BattleEndScreen;
