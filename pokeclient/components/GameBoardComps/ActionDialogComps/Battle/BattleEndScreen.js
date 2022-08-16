import { Box, Typography, Fade, Divider, Button } from "@mui/material";
import React from "react";
import Cookie from "@mui/icons-material/Cookie";
import CurrencyYen from "@mui/icons-material/CurrencyYen";
import { pSBC } from "../../../Utils/colorUtil";

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
        <Box sx={{ textAlign: "center" }}>
          <Fade in direction="left" timeout={1000}>
            <Typography variant="h5">
              {rewards.candies} Candies
              <Cookie />
            </Typography>
          </Fade>
          <Fade in direction="left" timeout={2000}>
            <Typography variant="h5">
              {rewards.money ? rewards.money : 0} Money
              <CurrencyYen />
            </Typography>
          </Fade>
        </Box>
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
