import { Box, Typography } from "@mui/material";
import React from "react";
import Item from "./Item";
import { useSnackbar } from "notistack";

const HeldItems = ({ bag, setBag, setMoney }) => {
  const { enqueueSnackbar } = useSnackbar();

  const sellItem = (index, cost, itemName) => {
    let newBag = bag;
    newBag.heldItems.splice(index, 1);

    setBag(newBag);
    let refund = cost / 2;
    setMoney((prev) => prev + refund);

    enqueueSnackbar(`Sold the ${itemName} for ${refund}`, {
      variant: "info",
    });
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: "1vh" }}>
        Held Items
      </Typography>
      <Box sx={{ overflowY: "auto", height: "23vh" }}>
        {bag.heldItems.map((item, index) => (
          <Item item={item} index={index} sellItem={sellItem} />
        ))}
      </Box>
    </Box>
  );
};

export default HeldItems;
