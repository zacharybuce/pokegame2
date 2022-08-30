import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import React from "react";
import { useSnackbar } from "notistack";
import ActionArea from "./ActionArea";
import BasicItems from "./BasicItems";
import RandomItems from "./RandomItems";

const ShopDialog = ({
  bag,
  money,
  shopDialog,
  shop,
  setShopDialog,
  setBag,
  setMoney,
  setShop,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const buyBasicItem = (item, cost) => {
    if (cost > money) {
      enqueueSnackbar(`Not enough money`, {
        variant: "error",
      });
    } else {
      setMoney(money - cost);
      let newBag = bag;

      switch (item) {
        case "potion":
          newBag.medicine.potions += 1;
          enqueueSnackbar(`Purchased a Potion`, {
            variant: "info",
          });
          break;
        case "super-potion":
          newBag.medicine.superPotions += 1;
          enqueueSnackbar(`Purchased a Super Potion`, {
            variant: "info",
          });
          break;
        case "hyper-potion":
          newBag.medicine.hyperPotions += 1;
          enqueueSnackbar(`Purchased a Hyper Potion`, {
            variant: "info",
          });
          break;
        case "revive":
          newBag.medicine.revives += 1;
          enqueueSnackbar(`Purchased a Revive`, {
            variant: "info",
          });
          break;
        case "poke":
          newBag.balls.poke += 1;
          enqueueSnackbar(`Purchased a Pokeball`, {
            variant: "info",
          });
          break;
        case "great":
          newBag.balls.great += 1;
          enqueueSnackbar(`Purchased a Greatball`, {
            variant: "info",
          });
          break;
        case "ultra":
          newBag.balls.ultra += 1;
          enqueueSnackbar(`Purchased an Ultraball`, {
            variant: "info",
          });
          break;
      }

      setBag(newBag);
    }
  };

  const buyRandomItem = (item, index) => {
    if (item.cost > money) {
      enqueueSnackbar(`Not enough money`, {
        variant: "error",
      });
    } else {
      setMoney(money - item.cost);
      let newBag = bag;
      let newShop = shop;

      newShop[index] = "bought";

      if (item.move) {
        newBag.tms.push(item);
      } else {
        newBag.heldItems.push(item);
      }

      enqueueSnackbar(`${item.name} was purchased`, {
        variant: "info",
      });
      setBag(newBag);
      setShop(newShop);
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth={"md"}
      open={shopDialog}
      onClose={() => setShopDialog(false)}
    >
      <DialogContent sx={{ overflowX: "hidden" }}>
        <Grid container>
          <Grid item xs={6}>
            <BasicItems buyBasicItem={buyBasicItem} />
            <ActionArea money={money} />
          </Grid>
          <Grid item xs={6}>
            <RandomItems shop={shop} buyRandomItem={buyRandomItem} />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ShopDialog;
