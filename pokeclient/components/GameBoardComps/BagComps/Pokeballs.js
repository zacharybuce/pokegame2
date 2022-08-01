import {
  Box,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useSnackbar } from "notistack";
import ItemSprite from "../../Utils/ItemSprite";
import SellIcon from "@mui/icons-material/Sell";

const pokeball = { name: "Poke Ball", id: "poke", type: "ball", cost: 500 };
const greatball = { name: "Great Ball", id: "great", type: "ball", cost: 750 };
const ultraball = { name: "Ultra Ball", id: "ultra", type: "ball", cost: 1200 };

const Pokeballs = ({ bag, setBag, setMoney }) => {
  const { enqueueSnackbar } = useSnackbar();

  const sellBall = (ball) => {
    if (bag.balls[ball] > 0) {
      let newBag = bag;
      newBag.balls[ball] -= 1;
      setBag(newBag);

      let refund = 0;

      switch (ball) {
        case "poke":
          refund = pokeball.cost / 2;
          enqueueSnackbar(`Sold a Pokeball for ${refund}`, {
            variant: "info",
          });
          break;
        case "great":
          refund = greatball.cost / 2;
          enqueueSnackbar(`Sold a Greatball for ${refund}`, {
            variant: "info",
          });
          break;
        case "ultra":
          refund = ultraball.cost / 2;
          enqueueSnackbar(`Sold an Ultraball for ${refund}`, {
            variant: "info",
          });
          break;
      }

      setMoney((prev) => prev + refund);
    } else {
      enqueueSnackbar(`Nothing to sell`, {
        variant: "error",
      });
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: "1vh" }}>
        Pokeballs
      </Typography>
      {/* pokeballs */}
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
            <IconButton onClick={() => sellBall("poke")}>
              <SellIcon sx={{ color: "#ededed" }} />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={10}>
          <Button
            sx={{ width: "95%", justifyContent: "left" }}
            disableRipple
            disableTouchRipple
            disableFocusRipple
            disableElevation
          >
            <ItemSprite item={pokeball} /> Pokeball
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
          <Typography variant="h6">x{bag.balls.poke}</Typography>
        </Grid>
      </Grid>
      {/* greatballs */}
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
            <IconButton onClick={() => sellBall("great")}>
              <SellIcon sx={{ color: "#ededed" }} />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={10}>
          <Button
            sx={{ width: "95%", justifyContent: "left" }}
            disableRipple
            disableTouchRipple
            disableFocusRipple
            disableElevation
          >
            <ItemSprite item={greatball} /> Greatball
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
          <Typography variant="h6">x{bag.balls.great}</Typography>
        </Grid>
      </Grid>
      {/* ultraballs */}
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
            <IconButton onClick={() => sellBall("ultra")}>
              <SellIcon sx={{ color: "#ededed" }} />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={10}>
          <Button
            sx={{ width: "95%", justifyContent: "left" }}
            disableRipple
            disableTouchRipple
            disableFocusRipple
            disableElevation
          >
            <ItemSprite item={ultraball} /> Ultraball
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
          <Typography variant="h6">x{bag.balls.ultra}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Pokeballs;
