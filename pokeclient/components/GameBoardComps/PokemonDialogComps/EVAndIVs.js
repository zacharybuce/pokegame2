import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import React from "react";

const getName = (stat) => {
  switch (stat) {
    case "hp":
      return "Hp";
    case "atk":
      return "Attack";
    case "def":
      return "Defence";
    case "spa":
      return "Sp. Atk";
    case "spd":
      return "Sp. Def";
    case "spe":
      return "Speed";
  }
};

const getColor = (percentage) => {
  if (percentage <= 10) return "red";
  if (10 < percentage && percentage <= 30) return "orange";
  if (30 < percentage && percentage <= 50) return "lightgreen";
  if (50 < percentage && percentage <= 80) return "green";
  if (80 < percentage && percentage <= 100) return "darkgreen";
};

const EVAndIVs = ({ evs, ivs, baseStats }) => {
  return (
    <Box sx={{ height: "378px" }}>
      <Grid container>
        {/* Evs */}
        <Grid item container xs={6}>
          <Grid item xs={12}>
            <Typography sx={{ mb: "1vh" }}>Evs</Typography>
          </Grid>
          {Object.keys(evs).map((stat, index) => (
            <Grid
              item
              container
              alignContent={"center"}
              xs={12}
              sx={{ backgroundColor: index % 2 == 0 ? "#2F4562" : "" }}
            >
              <Grid item xs={6}>
                <Typography>{getName(stat)}</Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: "center" }}>
                <Typography>{evs[stat]}</Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
        {/* Ivs */}
        <Grid item container xs={6}>
          <Grid item xs={12}>
            <Typography sx={{ mb: "1vh" }}>Ivs</Typography>
          </Grid>
          {Object.keys(ivs).map((stat, index) => (
            <Grid
              item
              container
              alignContent={"center"}
              xs={12}
              sx={{ backgroundColor: index % 2 == 0 ? "#2F4562" : "" }}
            >
              <Grid item xs={6}>
                <Typography>{getName(stat)}</Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: "center" }}>
                <Typography sx={{ color: ivs[stat] == 31 ? "#3cbf42" : "" }}>
                  {ivs[stat]}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
        {/* Base Stats */}
        <Grid item contianer xs={12} sx={{ mt: "2vh" }}>
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Typography>Base Stats</Typography>
          </Grid>
          {Object.keys(baseStats).map((stat) => (
            <Grid item container xs={12}>
              <Grid item xs={2}>
                <Typography>{getName(stat)}</Typography>
              </Grid>
              <Grid item xs={2} sx={{ textAlign: "center" }}>
                <Typography>{baseStats[stat]}</Typography>
              </Grid>
              <Grid
                item
                container
                alignItems="center"
                xs={8}
                sx={{ color: getColor((baseStats[stat] / 255) * 100) }}
              >
                <LinearProgress
                  variant="determinate"
                  value={(baseStats[stat] / 255) * 100}
                  color="inherit"
                  sx={{
                    width: "100%",
                    height: "75%",
                    backgroundColor: "gray",
                  }}
                />
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default EVAndIVs;
