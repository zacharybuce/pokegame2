import { Grid, Typography, Box, Divider } from "@mui/material";
import React from "react";
import SwitchButton from "./SwitchButton";

const SwitchPanel = ({ team, trapped, sendSwitchChoice, animsDone }) => {
  if (animsDone)
    return (
      <Box>
        <Typography variant="h6">Team</Typography>
        <Divider sx={{ backgroundColor: "#ededed", mb: "5px" }} />
        <Grid container>
          {!trapped ? (
            team.side.pokemon.map((poke, index) => {
              return (
                <SwitchButton
                  disabled={poke.active || poke.condition == "0 fnt"}
                  poke={poke}
                  sendSwitchChoice={sendSwitchChoice}
                  slot={index}
                />
              );
            })
          ) : (
            <Box>
              <Typography color="error">
                Cant Switch! The Active Pokemon is Trapped!
              </Typography>
            </Box>
          )}
        </Grid>
      </Box>
    );

  return <div></div>;
};

export default SwitchPanel;
