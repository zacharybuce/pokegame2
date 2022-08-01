import { Box } from "@mui/material";
import React from "react";

const ShopImg = () => {
  return (
    <Box
      sx={{
        fontSize: "2rem",
        borderBottom: "1px solid #fafafa",
        backgroundImage: "url(/CardImgs/PokeMart2.png)",
        height: "200px",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPositionY: "25%",
        borderRadius: "3px",
      }}
    ></Box>
  );
};

export default ShopImg;
