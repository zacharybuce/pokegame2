import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import Pokeball from "./Pokeball";
import Medicine from "./Medicine";

const BasicItems = ({ buyBasicItem }) => {
  return (
    <Box
      sx={{ mt: "1vh", p: 1, borderRadius: "3px", backgroundColor: "#767D92" }}
    >
      <Typography variant="h5">Items</Typography>
      <Divider sx={{ backgroundColor: "#fafafa", mb: "1vh" }} />
      <Pokeball ball={"poke"} buyBasicItem={buyBasicItem} />
      <Pokeball ball={"great"} buyBasicItem={buyBasicItem} />
      <Pokeball ball={"ultra"} buyBasicItem={buyBasicItem} />
      <Medicine medicine={"potion"} buyBasicItem={buyBasicItem} />
      <Medicine medicine={"super-potion"} buyBasicItem={buyBasicItem} />
      <Medicine medicine={"hyper-potion"} buyBasicItem={buyBasicItem} />
      <Medicine medicine={"revive"} buyBasicItem={buyBasicItem} />
    </Box>
  );
};

export default BasicItems;
