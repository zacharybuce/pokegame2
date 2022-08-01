import { Box, Button, Grid } from "@mui/material";
import React from "react";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";

const ActionArea = ({ money }) => {
  return (
    <Box sx={{ backgroundColor: "#2F4562", mt: "2vh", p: 2 }}>
      <Grid
        container
        direction="row"
        alignItems="flex-end"
        justifyContent="center"
        sx={{ fontSize: "25px" }}
      >
        <CurrencyYenIcon sx={{ fontSize: "35px" }} /> {money}
      </Grid>
    </Box>
  );
};

export default ActionArea;
