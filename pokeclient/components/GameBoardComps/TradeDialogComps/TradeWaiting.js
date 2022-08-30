import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

const TradeWaiting = () => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h5" sx={{ mb: "2vh" }}>
        Waiting for other player...
      </Typography>
      <CircularProgress />
    </Box>
  );
};

export default TradeWaiting;
