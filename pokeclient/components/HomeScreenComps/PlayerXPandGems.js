import { Box, Grid, LinearProgress, Tooltip, Typography } from "@mui/material";
import React from "react";
import DiamondIcon from "@mui/icons-material/Diamond";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">
          {props.value + "/100"}
        </Typography>
      </Box>
    </Box>
  );
}

const PlayerXPandGems = () => {
  return (
    <Box sx={{ mt: "1vh" }}>
      <Grid container spacing={1}>
        <Grid item xs={7}>
          <Typography variant="body2" color="text.secondary">
            Exp to level up
          </Typography>
          <LinearProgressWithLabel value={50} />
        </Grid>
        <Grid
          item
          container
          xs={1}
          direction="row"
          alignItems="flex-end"
          justifyContent="center"
        >
          <Tooltip title="Gems" placement="top" arrow>
            <DiamondIcon sx={{ mt: "auto" }} />
          </Tooltip>
          999
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlayerXPandGems;
