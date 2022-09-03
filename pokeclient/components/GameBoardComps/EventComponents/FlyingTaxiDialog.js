import { Box, Button, Dialog, Divider, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import TownOption from "./TownOption";

const FlyingTaxiDialog = ({
  taxiDialog,
  takeAction,
  setTaxiDialog,
  campaignId,
}) => {
  const [tileInfo, setTileInfo] = useState();

  useEffect(() => {
    getTowns();
  }, []);

  const getTowns = async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_ROOT_URL + "/api/startingtowns"
    );
    const json = await res.json();

    setTileInfo(json.data);
  };
  return (
    <Dialog fullWidth maxWidth={"sm"} open={taxiDialog}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5">Choose where you want to fly to</Typography>
        <Divider sx={{ backgroundColor: "#ededed" }} />
        <Grid container sx={{ mt: "5px" }} spacing={1}>
          {tileInfo
            ? Object.keys(tileInfo).map((tile) => {
                return (
                  <TownOption
                    town={tileInfo[tile]}
                    takeAction={takeAction}
                    townId={tile}
                    setTaxiDialog={setTaxiDialog}
                    fly
                  />
                );
              })
            : ""}
        </Grid>
        <Button onClick={() => setTaxiDialog(false)}>Cancel</Button>
      </Box>
    </Dialog>
  );
};

export default FlyingTaxiDialog;
