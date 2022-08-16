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
  const equipItem = (item, pokemon, index) => {
    setBag((prev) => {
      let newBag = prev;
      newBag.heldItems.splice(index, 1);
      return newBag;
    });

    let newMon = pokemon;
    newMon.item = item;

    let filteredTeam = team.slice();
    filteredTeam.forEach((mem, index) => {
      if (JSON.stringify(mem) == JSON.stringify(pokemon)) {
        filteredTeam[index] = newMon;
      }
    });

    setTeam([...filteredTeam]);
  };

  const teachTm = (tm, pokemon, index) => {
    setBag((prev) => {
      let newBag = prev;
      newBag.tms.splice(index, 1);
      return newBag;
    });

    let newMon = pokemon;
    newMon.learnset.unshift({ move: tm.move.id, level: "0" });

    let filteredTeam = team.slice();
    filteredTeam.forEach((mem, index) => {
      if (JSON.stringify(mem) == JSON.stringify(pokemon)) {
        filteredTeam[index] = newMon;
      }
    });

    setTeam([...filteredTeam]);
  };

  const useMedicine = (medicine, pokemon) => {
    setBag((prev) => {
      let newBag = prev;
      newBag.medicine[medicine] -= 1;
      return newBag;
    });

    let newMon = pokemon;

    switch (medicine) {
      case "potions":
        newMon.exhaustion -= 1;
        break;
      case "superPotions":
        newMon.exhaustion -= 3;
        break;
      case "hyperPotions":
        newMon.exhaustion -= 4;
        break;
      case "revives":
        newMon.fainted = false;
        newMon.exhaustion = 0;
        break;
    }

    if (newMon.exhaustion < 0) newMon.exhaustion = 0;

    let filteredTeam = team.slice();
    filteredTeam.forEach((mem, index) => {
      if (JSON.stringify(mem) == JSON.stringify(pokemon)) {
        filteredTeam[index] = newMon;
      }
    });

    setTeam([...filteredTeam]);
  };

  return (
    <Drawer anchor={"top"} open={bagDrawer} onClose={() => setBagDrawer(false)}>
      <Grid container sx={{ height: "30vh", p: 1, overflowY: "hidden" }}>
        <Grid item xs={3} sx={{ borderRight: "1px solid #fafafa", p: 1 }}>
          <HeldItems
            bag={bag}
            equipItem={equipItem}
            team={team}
            setBag={setBag}
            setMoney={setMoney}
          />
        </Grid>
        <Grid item xs={3} sx={{ borderRight: "1px solid #fafafa", p: 1 }}>
          <Tms
            bag={bag}
            team={team}
            setBag={setBag}
            setMoney={setMoney}
            teachTm={teachTm}
          />
        </Grid>
        <Grid item xs={3} sx={{ borderRight: "1px solid #fafafa", p: 1 }}>
          <Medicine
            bag={bag}
            team={team}
            setBag={setBag}
            setMoney={setMoney}
            useMedicine={useMedicine}
          />
        </Grid>
        <Grid item xs={3} sx={{ p: 1 }}>
          <Pokeballs bag={bag} setBag={setBag} setMoney={setMoney} />
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default BagDrawer;
