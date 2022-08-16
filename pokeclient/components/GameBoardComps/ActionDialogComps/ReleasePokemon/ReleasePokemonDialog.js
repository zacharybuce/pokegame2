import { Box, Button, Dialog, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import PokeSprite from "../../../Utils/PokeSprite";
import DeleteIcon from "@mui/icons-material/Delete";

const ReleasePokemonDialog = ({ releaseDialog, team, releasePokemon }) => {
  return (
    <Dialog fullWidth maxWidth={"sm"} open={releaseDialog}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5">
          Choose a Pokemon to Release <DeleteIcon />
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: "1vh" }}>
          You can only have 6 Pokemon. Choose one to release in order to make
          room or release the pokemon you just caught back into the wild.
        </Typography>
        <Divider sx={{ backgroundColor: "#ededed", mb: "1vh" }} />
        <Grid container>
          {team.map((pokemon, index) => {
            if (pokemon)
              return (
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                      mb: "1vh",
                      justifyContent: "start",
                      width: "95%",
                      ml: "2%",
                    }}
                    onClick={() => releasePokemon(index)}
                  >
                    <PokeSprite name={pokemon.id} shiny={pokemon.isShiny} />
                    {pokemon.species}
                  </Button>
                </Grid>
              );
          })}
        </Grid>
        <Box sx={{ textAlign: "center", mt: "1vh" }}>
          <Button
            onClick={() => releasePokemon(-1)}
            variant="contained"
            color="error"
            sx={{ width: "50%" }}
          >
            Release the Wild Pokemon
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default ReleasePokemonDialog;
