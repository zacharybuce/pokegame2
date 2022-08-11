import React, { useEffect } from "react";
import { Grid, LinearProgress, Typography, Box } from "@mui/material";
import StatusDisplay from "./StatusDisplay";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const HealthBar = ({ health, name, level, status }) => {
  return (
    <Grid
      container
      sx={{
        borderRadius: "3px",
        backgroundColor: "#767D92",
        p: 1,
        boxShadow: 5,
      }}
    >
      <Grid item xs={12}>
        <Typography>
          {name} {level}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <LinearProgressWithLabel value={health} />
      </Grid>
      <Grid item xs={12}>
        <StatusDisplay statuses={status} />
      </Grid>
    </Grid>
  );
};

export default HealthBar;
