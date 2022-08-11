import React from "react";
import { Grid, Typography, Tooltip } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import WavesIcon from "@mui/icons-material/Waves";
import CloudIcon from "@mui/icons-material/Cloud";
import FlareIcon from "@mui/icons-material/Flare";
import AcUnitIcon from "@mui/icons-material/AcUnit";

const iconDisplay = (weather) => {
  switch (weather) {
    case "none":
      return (
        <Tooltip title="No Weather">
          <WbSunnyIcon />
        </Tooltip>
      );
    case "Sandstorm":
      return (
        <Tooltip title="Sandstorm">
          <WavesIcon sx={{ color: "#E2BF65" }} />
        </Tooltip>
      );
    case "RainDance":
      return (
        <Tooltip title="Rain">
          <CloudIcon sx={{ color: "#6390F0" }} />
        </Tooltip>
      );
    case "SunnyDay":
      return (
        <Tooltip title="Sunny Day">
          <FlareIcon sx={{ color: "#EE8130" }} />
        </Tooltip>
      );
    case "Hail":
      return (
        <Tooltip title="Hail">
          <AcUnitIcon sx={{ color: "#96D9D6" }} />
        </Tooltip>
      );
  }
};

const WeatherDisplay = ({ weather }) => {
  return (
    <Grid
      container
      alignItems="center"
      sx={{ border: "1px solid lightgrey", borderRadius: "3px", p: 1 }}
    >
      <Grid item xs={9}>
        <Typography>Weather</Typography>
      </Grid>
      <Grid item container alignItems="center" xs={3}>
        {iconDisplay(weather)}
      </Grid>
    </Grid>
  );
};

export default WeatherDisplay;
