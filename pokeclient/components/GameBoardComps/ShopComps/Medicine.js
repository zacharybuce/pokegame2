import React from "react";
import { Grid, Button, Typography } from "@mui/material";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import MedicineSprite from "../../Utils/MedicineSprite";

const findCost = (medicine) => {
  switch (medicine) {
    case "potion":
      return 200;
    case "super-potion":
      return 500;
    case "hyper-potion":
      return 1000;
    case "revive":
      return 1500;
  }
};

const Medicine = ({ medicine, buyBasicItem }) => {
  return (
    <Grid container sx={{ mb: "5px" }}>
      <Grid item xs={10}>
        <Button
          variant="contained"
          sx={{
            width: "95%",
            justifyContent: "left",
            backgroundColor: "#152642",
          }}
          onClick={() => buyBasicItem(medicine, findCost(medicine))}
        >
          <MedicineSprite item={medicine} showTooltip />{" "}
          {medicine.replace("-", " ")}
        </Button>
      </Grid>
      <Grid
        item
        container
        xs={2}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <CurrencyYenIcon />
        {findCost(medicine)}
      </Grid>
    </Grid>
  );
};

export default Medicine;
