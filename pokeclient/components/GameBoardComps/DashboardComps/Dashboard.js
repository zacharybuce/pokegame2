import { Box, Grid } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";
import ActionArea from "./ActionArea";

const Team = dynamic(import("./Team"));

const Dashboard = ({
  setLeaderboardDrawer,
  team,
  setTeam,
  setBagDrawer,
  setShopDialog,
  canUseShop,
}) => {
  return (
    <Box sx={{ ml: "2vw", mr: "2vw" }}>
      <Grid container spacing={1}>
        <Grid item xs={7}>
          <Team team={team} setTeam={setTeam} />
        </Grid>
        <Grid item container xs={5}>
          <ActionArea
            canUseShop={canUseShop}
            setLeaderboardDrawer={setLeaderboardDrawer}
            setBagDrawer={setBagDrawer}
            setShopDialog={setShopDialog}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
