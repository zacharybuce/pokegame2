import { AppBar, Grid, Toolbar, Typography } from "@mui/material";
import React from "react";
import Resources from "./Resources";

const ResourceBar = ({
  phase,
  turn,
  maxTurns,
  money,
  candies,
  bag,
  badges,
}) => {
  return (
    <AppBar position="fixed" className="resourcebar">
      <Toolbar>
        <Grid container>
          <Grid item xs={2} sx={{ borderRight: "1px solid " }}>
            <Typography variant="h6">
              Round {turn}/{maxTurns}
            </Typography>
          </Grid>
          <Grid item xs={2} sx={{ textAlign: "center" }}>
            <Typography variant="button">{phase} Phase</Typography>
          </Grid>
          <Resources
            money={money}
            candies={candies}
            bag={bag}
            badges={badges}
          />
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default ResourceBar;
