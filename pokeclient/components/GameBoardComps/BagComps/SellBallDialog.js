import { Dialog, Typography } from "@mui/material";
import React from "react";

const SellBallDialog = ({
  sellBallDialog,
  bag,
  setBag,
  setSellBallDialog,
  ballToSell,
}) => {
  return (
    <Dialog
      fullWidth
      maxWidth={"sm"}
      open={sellBallDialog}
      onClose={() => setSellBallDialog(false)}
    >
      <Typography>How many do you wish to sell?</Typography>
    </Dialog>
  );
};

export default SellBallDialog;
