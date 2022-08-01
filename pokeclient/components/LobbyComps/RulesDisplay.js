import React from "react";
import { Box, Grid, Typography } from "@mui/material";
const RulesDisplay = ({ rules }) => {
  return (
    <Box
      sx={{
        border: "solid",
        borderWidth: "1px",
        borderColor: "lightgray",
        mt: "20vh",
        p: 5,
        height: "25vh",
        overflowY: "auto",
      }}
    >
      <Grid container>
        <Grid item xs={12} sx={{ mb: "2vh" }}>
          <Typography variant="h5">Game Settings</Typography>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={6}>
            <Typography variant="h6" fontWeight={"600"}>
              Campaign
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6">{rules.campaign}</Typography>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={6}>
            <Typography variant="h6" fontWeight={"600"}>
              Starting Town
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6">{rules.StartingTown}</Typography>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={6}>
            <Typography variant="h6" fontWeight={"600"}>
              Starters
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6">{rules.Starters}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RulesDisplay;
