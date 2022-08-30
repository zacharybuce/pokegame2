import React, { useState, useEffect } from "react";
import { Card, Grid, Typography, Divider, Box, Tabs, Tab } from "@mui/material";
import { typeColor } from "../../Utils/typeColor";
import ItemCard from "../ShopComps/ItemCard";
import { useSnackbar } from "notistack";

const MegaStoneStore = ({
  campaignId,
  canInteract,
  money,
  takeAction,
  phase,
  badges,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [store, setStore] = useState();

  useEffect(() => {
    getMegaMarket();
  }, []);

  const getMegaMarket = async () => {
    let res = await fetch(
      process.env.NEXT_PUBLIC_ROOT_URL + "/api/megastonemarket"
    );
    let json = await res.json();

    setStore(json.data);
  };

  const buyRandomItem = (item, index) => {
    if (item.cost > money) {
      enqueueSnackbar(`Not enough money`, {
        variant: "error",
      });
    } else {
      takeAction("buyitem", item);
    }
  };

  return (
    <Card
      sx={{
        p: 1,
        backgroundColor: typeColor("Normal") + "d4",
        mb: "3vh",
      }}
    >
      <Grid container spacing={1} sx={{ mb: "3vh" }}>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography variant="h4">Mega Stone Market</Typography>
        </Grid>
        <Grid item xs={12} sx={{ mb: "1vh" }}>
          <Divider />
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ backgroundColor: typeColor("Normal") }}>
            <Box
              sx={{
                backgroundImage: `url(/Icons/MegaEvolution.png)`,
                backgroundSize: "50%",
                backgroundRepeat: "no-repeat",
                backgroundPositionX: "50%",
                backgroundPositionY: "50%",
                height: "150px",
                border: "solid",
                borderWidth: "1px",
                borderRadius: "3px",
                borderColor: "lightgray",
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Typography>
            The people of Pacifidlog make most of their money selling rare
            stones sought out by trainers around the world.
          </Typography>
          <Typography variant="body2" sx={{ mt: "5px" }}>
            *Must have 5 gym badges
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ height: "400px", overflowY: "auto", overflowX: "hidden" }}>
        {store && canInteract && phase != "movement"
          ? store.map((item, index) => {
              return (
                <ItemCard
                  item={item}
                  index={index}
                  buyRandomItem={buyRandomItem}
                />
              );
            })
          : ""}
      </Box>
    </Card>
  );
};

export default MegaStoneStore;
