import React from "react";
import { Box } from "@mui/material";

const BattleCircle = () => {
  return (
    <Box
      sx={{
        height: "50px",
        backgroundColor: "#506680",
        boxShadow: 3,
        width: "90%",
        position: "relative",
        top: "70%",
        borderRadius: "50%",
        zIndex: 0,
      }}
    ></Box>
  );
};

export default BattleCircle;
