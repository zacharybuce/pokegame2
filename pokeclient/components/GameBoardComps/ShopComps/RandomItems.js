import { Box, Divider, Typography, Tooltip } from "@mui/material";
import React from "react";
import ItemCard from "./ItemCard";
import InfoIcon from "@mui/icons-material/Info";

const tooltipTitle =
  "Limited supply items will refresh after every round. Garunteed at least 3 held items and 1 TM";

const RandomItems = ({ shop, buyRandomItem }) => {
  return (
    <Box sx={{ p: 1, mt: "1vh" }}>
      <Typography variant="h5">
        Limited Supply{" "}
        <Tooltip title={tooltipTitle} placement="top">
          <InfoIcon />
        </Tooltip>
      </Typography>
      <Divider sx={{ backgroundColor: "#fafafa", mb: "1vh" }} />
      <Box>
        {shop.map((item, index) => (
          <Box
            sx={{
              transition: "all .2s",
              ":hover": {
                // transform: "translate(2px,-10px) rotate(-.005turn)",
                transform: "scale(1.05)",
              },
            }}
          >
            <ItemCard item={item} index={index} buyRandomItem={buyRandomItem} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RandomItems;
