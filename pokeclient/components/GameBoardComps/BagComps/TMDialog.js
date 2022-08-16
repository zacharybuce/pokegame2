import { Box, Button, Dialog, Grid, Typography } from "@mui/material";
import React from "react";
import PokeSprite from "../../Utils/PokeSprite";

const TMDialog = ({ tm, index, team, tmDialog, teachTm, setTmDialog }) => {
  return (
    <Dialog
      fullWidth
      maxWidth={"sm"}
      open={tmDialog}
      onClose={() => setTmDialog(false)}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h5">Teach {tm.name}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: "1vh" }}>
          Choose which pokemon will learn this Tm.
        </Typography>
        <Grid container>
          <Grid
            item
            xs={6}
            sx={{ backgroundColor: "#2F4562", p: 1, borderRadius: "3px" }}
          >
            <Typography>
              <b>Type:</b> {tm.move.type}
            </Typography>
            <Typography>
              <b>Accuracy:</b> {tm.move.accuracy}
            </Typography>
            <Typography>
              <b>Base Power:</b> {tm.move.basePower}
            </Typography>
            <Typography>
              <b>Category: </b>
              {tm.move.category}
            </Typography>
            <Typography>
              <b>Desc:</b> {tm.move.desc}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            {team.map((pokemon) => (
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  mb: "1vh",
                  justifyContent: "start",
                  width: "95%",
                  ml: "2%",
                }}
                onClick={() => teachTm(tm, pokemon, index)}
              >
                <PokeSprite name={pokemon.id} shiny={pokemon.isShiny} />
                {pokemon.species}
              </Button>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};

export default TMDialog;
