import { Box, Button, Dialog, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import PokeSprite from "../../Utils/PokeSprite";

const DayCareDialog = ({ teamDialog, setTeamDialog, team, takeAction }) => {
  return (
    <Dialog fullWidth maxWidth={"sm"} open={teamDialog}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5">Choose which pokemon to release</Typography>
        <Divider sx={{ backgroundColor: "#ededed" }} />
        <Grid container sx={{ mt: "10px" }} spacing={1}>
          {team.map((pokemon) => (
            <Button
              variant="outlined"
              fullWidth
              disabled={team.length == 1}
              sx={{
                mb: "1vh",
                justifyContent: "start",
                width: "95%",
                ml: "2%",
              }}
              onClick={() => {
                let bst = 0;
                Object.keys(pokemon.baseStats).forEach((stat) => {
                  bst += pokemon.baseStats[stat];
                });
                takeAction("releasemon", {
                  mon: pokemon.dragId,
                  candies: Math.floor(bst / 100),
                });
              }}
            >
              <PokeSprite name={pokemon.id} shiny={pokemon.isShiny} />
              {pokemon.species}
            </Button>
          ))}
        </Grid>
        <Button
          variant="contained"
          color="error"
          sx={{ mt: "2vh" }}
          onClick={() => setTeamDialog(false)}
        >
          Cancel
        </Button>
      </Box>
    </Dialog>
  );
};

export default DayCareDialog;
