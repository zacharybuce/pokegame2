import React from "react";
import { Grid, Typography } from "@mui/material";
import Ability from "../../../Utils/Ability";

const ActivePokemonInfo = ({ team }) => {
  return (
    <Grid container alignItems="center" item>
      <Grid item container xs={6}>
        <Grid item container xs={12}>
          <Grid item xs={3}>
            <Typography sx={{ mb: "1vh" }}>
              <b>{"Ability: "}</b>
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Ability ability={team.side.pokemon[0].ability} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            <b>Item: </b>
            {team.side.pokemon[0].item ? team.side.pokemon[0].item : " none"}
          </Typography>
        </Grid>
      </Grid>
      <Grid item container xs={6}>
        {Object.keys(team.side.pokemon[0].stats).map((key) => {
          return (
            <Grid item xs={6}>
              <Typography>
                <b>{key}</b> : {team.side.pokemon[0].stats[key]}
              </Typography>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default ActivePokemonInfo;
