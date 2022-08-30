import { Box, Typography, Divider, Tooltip } from "@mui/material";
import React from "react";
import HealingIcon from "@mui/icons-material/Healing";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";

const HeaderDescription = ({ name, desc, isTown }) => {
  return (
    <Box>
      <Typography gutterBottom variant="h5" component="div">
        {name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {desc}
      </Typography>
      <Box sx={{ mt: "1vh", display: isTown ? "block" : "none" }}>
        <Tooltip title="Ending your movement on this tile will heal your pokemon">
          <HealingIcon sx={{ mr: "1vw" }} />
        </Tooltip>
        <Tooltip title="Passing through this tile during movement will allow access to the shop during the action phase">
          <LocalGroceryStoreIcon />
        </Tooltip>
      </Box>
      <Divider sx={{ mt: "1vh" }} />
    </Box>
  );
};

export default HeaderDescription;
