import { Avatar, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";

const PlayerLobbyCard = ({ player }) => {
  return (
    <Grid
      item
      container
      xs={12}
      sx={{
        p: 1,
        mb: "1vh",
      }}
    >
      <Grid item xs={2}>
        <Avatar
          src={"/Avatar/" + player.sprite + ".png"}
          sx={{ height: "64px", width: "64px" }}
        />
      </Grid>
      <Grid item xs={9}>
        <Typography variant="h3">{player.name}</Typography>
      </Grid>
      <Grid item xs={1}>
        {player.ready ? (
          <CheckIcon sx={{ height: "40px", width: "40px", color: "green" }} />
        ) : (
          ""
        )}
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
    </Grid>
  );
};

export default PlayerLobbyCard;
