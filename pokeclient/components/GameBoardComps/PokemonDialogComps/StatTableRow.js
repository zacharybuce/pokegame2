import React from "react";
import { Grid, Typography, Button, Tooltip } from "@mui/material";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import CookieIcon from "@mui/icons-material/Cookie";

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

const StatTableRow = ({
  stat,
  amount,
  index,
  upgradeStat,
  canUpgrade,
  upgradeCost,
}) => {
  return (
    <Grid container>
      <Grid
        item
        container
        alignContent={"center"}
        xs={8}
        sx={{ backgroundColor: index % 2 == 0 ? "#2F4562" : "" }}
      >
        <Grid item xs={6}>
          <Typography>{getName(stat)}</Typography>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "center" }}>
          <Typography>{amount}</Typography>
        </Grid>
      </Grid>
      <Grid item xs={2} sx={{ textAlign: "center" }}>
        <Tooltip title="Upgrade" placement="left" arrow>
          <Button
            disabled={!canUpgrade}
            onClick={() => upgradeStat(stat, upgradeCost)}
          >
            <UpgradeIcon />
          </Button>
        </Tooltip>
      </Grid>
      <Grid
        item
        container
        alignItems="center"
        xs={2}
        sx={{ textAlign: "center" }}
      >
        <CookieIcon fontSize="small" /> {upgradeCost}
      </Grid>
    </Grid>
  );
};

export default StatTableRow;
