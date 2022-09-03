import React from "react";
import { Box, Button, Dialog, Divider, Grid, Typography } from "@mui/material";
import TownOption from "./TownOption";

const FerryDialog = ({
  ferryDialog,
  takeAction,
  setFerryDialog,
  campaignId,
}) => {
  const tileInfo = {
    dewford: {
      location: { q: -3, r: 7, s: -4 },
      starters: [
        { species: "Farfetch’d-Galar", id: "farfetchd-galar" },
        { species: "Riolu", id: "riolu" },
        { species: "Tepig", id: "tepig" },
      ],
      name: "Dewford Town",
      img: "dewford",
      color: "sand1",
    },
    slateport: {
      location: { q: 0, r: 3, s: -3 },
      starters: [
        { species: "Vulpix-Alola", id: "vulpix-alola" },
        { species: "Rowlet", id: "rowlet" },
        { species: "Togepi", id: "togepi" },
      ],
      name: "Slateport City",
      img: "slateport",
      color: "sand1",
    },
    lilycove: {
      location: { q: 4, r: -1, s: -3 },
      starters: [
        { species: "Golett", id: "golett" },
        { species: "Froakie", id: "froakie" },
        { species: "Pawniard", id: "pawniard" },
      ],
      name: "Lilycove City",
      img: "lilycove",
      color: "grass2",
    },
    mossdeep: {
      location: { q: 6, r: -2, s: -4 },
      starters: [
        { species: "Solosis", id: "solosis" },
        { species: "Hatenna", id: "hatenna" },
        { species: "Fennekin", id: "fennekin" },
      ],
      name: "Mossdeep City",
      img: "mossdeep",
      color: "sand1",
    },
    sootopolis: {
      location: { q: 5, r: 0, s: -5 },
      starters: [
        { species: "Chikorita", id: "chikorita" },
        { species: "Ferroseed", id: "ferroseed" },
        { species: "Hawlucha", id: "hawlucha" },
      ],
      name: "Sootopolis City",
      img: "sootopolis",
      color: "water1",
    },
    pacifidlog: {
      location: { q: 3, r: 4, s: -7 },
      starters: [
        { species: "Skiddo", id: "skiddo" },
        { species: "Jangmo-o", id: "jangmo-o" },
        { species: "Larvesta", id: "larvesta" },
      ],
      name: "Pacifidlog Town",
      img: "pacifilog",
      color: "water2",
    },
  };

  return (
    <Dialog fullWidth maxWidth={"sm"} open={ferryDialog}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5">Choose where you want to sail to</Typography>
        <Divider sx={{ backgroundColor: "#ededed" }} />
        <Grid container sx={{ mt: "5px" }} spacing={1}>
          {tileInfo
            ? Object.keys(tileInfo).map((tile) => {
                return (
                  <TownOption
                    town={tileInfo[tile]}
                    takeAction={takeAction}
                    townId={tile}
                    setTaxiDialog={setFerryDialog}
                    fly={false}
                  />
                );
              })
            : ""}
        </Grid>
        <Button onClick={() => setFerryDialog(false)}>Cancel</Button>
      </Box>
    </Dialog>
  );
};

export default FerryDialog;
