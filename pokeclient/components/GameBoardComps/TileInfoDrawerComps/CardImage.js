import React from "react";
import { Box } from "@mui/material";
const CardImage = ({ image }) => {
  return (
    <Box
      sx={{
        height: "150px",
        overflowY: "auto",
      }}
    >
      <img className="cardimg" src={`/CardImgs/${image}.png`} />
    </Box>
  );
};

export default CardImage;
