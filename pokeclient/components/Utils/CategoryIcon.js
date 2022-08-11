import React from "react";
import { Box } from "@mui/material";

const CategoryIcon = ({ category }) => {
  return (
    <Box sx={{ width: "50px", height: "20px" }}>
      <img src={"/icons/" + category + ".png"} />
    </Box>
  );
};

export default CategoryIcon;
