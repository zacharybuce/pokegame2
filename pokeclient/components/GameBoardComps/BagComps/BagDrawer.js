import React, { useState } from "react";
import { Drawer, Grid } from "@mui/material";
import HeldItems from "./HeldItems";
import Tms from "./Tms";
import Medicine from "./Medicine";
import Pokeballs from "./Pokeballs";

const BagDrawer = ({
  bag,
  setBag,
  team,
  setTeam,
  bagDrawer,
  setBagDrawer,
  setMoney,
}) => {
  return (
    <Drawer anchor={"top"} open={bagDrawer} onClose={() => setBagDrawer(false)}>
      <Grid container sx={{ height: "30vh", p: 1, overflowY: "hidden" }}>
        <Grid item xs={3} sx={{ borderRight: "1px solid #fafafa", p: 1 }}>
          <HeldItems bag={bag} setBag={setBag} setMoney={setMoney} />
        </Grid>
        <Grid item xs={3} sx={{ borderRight: "1px solid #fafafa", p: 1 }}>
          <Tms bag={bag} setBag={setBag} />
        </Grid>
        <Grid item xs={3} sx={{ borderRight: "1px solid #fafafa", p: 1 }}>
          <Medicine bag={bag} setBag={setBag} setMoney={setMoney} />
        </Grid>
        <Grid item xs={3} sx={{ p: 1 }}>
          <Pokeballs bag={bag} setBag={setBag} setMoney={setMoney} />
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default BagDrawer;
