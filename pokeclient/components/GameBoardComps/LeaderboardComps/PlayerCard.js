import React from "react";
import { Box, Button, Grid, Typography, Tooltip } from "@mui/material";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import LoopIcon from "@mui/icons-material/Loop";

const PlayerCard = ({ player, isPlayer }) => {
  return (
    <Box
      sx={{
        width: "300px",
        m: 1,
        border: "1px solid lightgray",
        p: 1,
        backgroundColor: "#506680",
      }}
    >
      <Grid container>
        <Grid item xs={8}>
          <Box
            sx={{
              height: "90px",
              width: "200px",
              backgroundImage: `url(/TrainerVsImages-Hoen/${player.sprite}.png)`,
              backgroundSize: "cover",
              borderBottom: "1px solid #fafafa",
            }}
          />
          <Typography variant="h5">{player.name}</Typography>
        </Grid>
        <Grid container item alignContent="center" direction={"column"} xs={4}>
          <Grid
            item
            xs={4}
            container
            direction="row"
            alignItems="flex-end"
            justifyContent="center"
          >
            <Tooltip title="Badges" placement="left" arrow>
              <MilitaryTechIcon />
            </Tooltip>{" "}
            {player.badges}
          </Grid>
          <Grid
            item
            xs={4}
            container
            direction="row"
            alignItems="flex-end"
            justifyContent="center"
          >
            <Tooltip title="Pokemon" placement="left" arrow>
              <CatchingPokemonIcon />
            </Tooltip>
            {player.team.length}
          </Grid>
          <Grid
            item
            xs={4}
            container
            direction="row"
            alignItems="flex-end"
            justifyContent="center"
          >
            {!isPlayer ? (
              <Tooltip title="Trade" placement="left" arrow>
                <Button variant="contained" sx={{ backgroundColor: "#353C51" }}>
                  <LoopIcon />
                </Button>
              </Tooltip>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlayerCard;
