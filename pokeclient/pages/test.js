import { Box, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import Dashboard from "../components/GameBoardComps/DashboardComps/Dashboard";
import Leaderboard from "../components/GameBoardComps/LeaderboardComps/Leaderboard";
import ResourceBar from "../components/GameBoardComps/ResourceBarComps/ResourceBar";
import TestBoardComp from "../components/GameBoardComps/TestBoardComp";

const test = () => {
  const [leaderboardDrawer, setLeaderboardDrawer] = useState(false);
  const [bagDrawer, setBagDrawer] = useState(false);

  //render mon correctly for drag
  const [winReady, setwinReady] = useState(false);
  useEffect(() => {
    setwinReady(true);
  }, []);

  return (
    // <Grid container direction={"column"}>
    //   <Grid item xs={12}>
    //     <TestBoardComp />
    //   </Grid>
    //   <Grid item xs={2}>
    //     <Dashboard />
    //   </Grid>
    // </Grid>
    <Box>
      <ResourceBar turn={"movement"} round={100} maxRounds={100} />
      <TestBoardComp />
      {winReady ? (
        <Dashboard setLeaderboardDrawer={setLeaderboardDrawer} />
      ) : (
        ""
      )}
      <Leaderboard
        leaderboardDrawer={leaderboardDrawer}
        setLeaderboardDrawer={setLeaderboardDrawer}
        players={[
          {
            name: "Zach",
            team: [],
            badges: 0,
            location: { q: 0, r: 0, s: 0 },
            ready: false,
            sprite: "CoolTrainer",
            isHost: false,
          },
        ]}
      />
    </Box>
  );
};

export default test;
