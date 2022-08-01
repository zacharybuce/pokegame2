import { Grid } from "@mui/material";
import React from "react";
import TrainerEncounterCard from "./TrainerEncounterCard";

const TrainerEncounters = ({ trainers }) => {
  return (
    <Grid container spacing={1}>
      {trainers.map((trainer) => (
        <TrainerEncounterCard trainer={trainer} regionId={"Hoen"} />
      ))}
    </Grid>
  );
};

export default TrainerEncounters;
