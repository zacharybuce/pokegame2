import {
  Box,
  Button,
  Grid,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import React from "react";
import MedicineSprite from "../../Utils/MedicineSprite";
import SellIcon from "@mui/icons-material/Sell";
import { useSnackbar } from "notistack";

const costs = {
  potions: 200,
  superPotions: 500,
  hyperPotions: 1000,
  revives: 1500,
};

const getName = (medicine) => {
  switch (medicine) {
    case "potions":
      return "Potion";
    case "superPotions":
      return "Super Potion";
    case "hyperPotions":
      return "Hyper Potion";
    case "revives":
      return "Revive";
  }
};

const Medicine = ({ bag, setBag, setMoney }) => {
  const { enqueueSnackbar } = useSnackbar();

  const interact = (item) => {};
  const sellMedicine = (medicine) => {
    if (bag.medicine[medicine] > 0) {
      let newBag = bag;
      newBag.medicine[medicine] -= 1;
      setBag(newBag);

      let refund = costs[medicine] / 2;
      setMoney((prev) => prev + refund);
      enqueueSnackbar(`Sold a ${getName(medicine)} for ${refund}`, {
        variant: "info",
      });
    } else {
      enqueueSnackbar(`Nothing to sell`, {
        variant: "error",
      });
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: "1vh" }}>
        Medicine
      </Typography>

      {/* Potions */}
      <Grid container>
        <Grid
          item
          container
          xs={1}
          direction="row"
          alignItems="flex-end"
          justifyContent="center"
        >
          <Tooltip title={"Sell"}>
            <IconButton onClick={() => sellMedicine("potions")}>
              <SellIcon sx={{ color: "#ededed" }} />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={10}>
          <Button
            variant="outlined"
            sx={{ width: "95%", justifyContent: "left" }}
            onClick={() => interact("potion")}
          >
            <MedicineSprite item={"potion"} showTooltip /> Potion
          </Button>
        </Grid>
        <Grid
          item
          container
          xs={1}
          direction="row"
          alignItems="flex-end"
          justifyContent="center"
        >
          <Typography variant="h6">x{bag.medicine.potions}</Typography>
        </Grid>
      </Grid>
      {/* Super Potions */}
      <Grid container sx={{ mt: "3px" }}>
        <Grid
          item
          container
          xs={1}
          direction="row"
          alignItems="flex-end"
          justifyContent="center"
        >
          <Tooltip title={"Sell"}>
            <IconButton onClick={() => sellMedicine("superPotions")}>
              <SellIcon sx={{ color: "#ededed" }} />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={10}>
          <Button
            variant="outlined"
            sx={{ width: "95%", justifyContent: "left" }}
            onClick={() => interact("super-potion")}
          >
            <MedicineSprite item={"super-potion"} showTooltip /> Super Potion
          </Button>
        </Grid>
        <Grid
          item
          container
          xs={1}
          direction="row"
          alignItems="flex-end"
          justifyContent="center"
        >
          <Typography variant="h6">x{bag.medicine.superPotions}</Typography>
        </Grid>
      </Grid>
      {/* Hyper Potions */}
      <Grid container sx={{ mt: "3px" }}>
        <Grid
          item
          container
          xs={1}
          direction="row"
          alignItems="flex-end"
          justifyContent="center"
        >
          <Tooltip title={"Sell"}>
            <IconButton onClick={() => sellMedicine("hyperPotions")}>
              <SellIcon sx={{ color: "#ededed" }} />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={10}>
          <Button
            variant="outlined"
            sx={{ width: "95%", justifyContent: "left" }}
            onClick={() => interact("hyper-potion")}
          >
            <MedicineSprite item={"hyper-potion"} showTooltip /> Hyper Potion
          </Button>
        </Grid>
        <Grid
          item
          container
          xs={1}
          direction="row"
          alignItems="flex-end"
          justifyContent="center"
        >
          <Typography variant="h6">x{bag.medicine.hyperPotions}</Typography>
        </Grid>
      </Grid>
      {/*Revives */}
      <Grid container sx={{ mt: "3px" }}>
        <Grid
          item
          container
          xs={1}
          direction="row"
          alignItems="flex-end"
          justifyContent="center"
        >
          <Tooltip title={"Sell"}>
            <IconButton onClick={() => sellMedicine("revives")}>
              <SellIcon sx={{ color: "#ededed" }} />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={10}>
          <Button
            variant="outlined"
            sx={{ width: "95%", justifyContent: "left" }}
            onClick={() => interact("revive")}
          >
            <MedicineSprite item={"revive"} showTooltip /> Revives
          </Button>
        </Grid>
        <Grid
          item
          container
          xs={1}
          direction="row"
          alignItems="flex-end"
          justifyContent="center"
        >
          <Typography variant="h6">x{bag.medicine.revives}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Medicine;
