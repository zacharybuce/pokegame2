import {
  Box,
  Button,
  Dialog,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import PokeSprite from "../../Utils/PokeSprite";

function CircularProgressWithLabel(props) {
  if (props.fainted) return <Typography>Fainted</Typography>;

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        // ml: "25%",
      }}
    >
      <CircularProgress variant="determinate" {...props} size="60px" />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${props.points}/5`}
        </Typography>
      </Box>
    </Box>
  );
}

const MedicineDialog = ({
  medToShow,
  useMedicine,
  team,
  medicineDialog,
  setMedicineDialog,
}) => {
  const [clickable, setClickable] = useState(true);

  const isUsable = (pokemon) => {
    if (medToShow != "revives") {
      return pokemon.fainted || pokemon.exhaustion == 0;
    } else return !pokemon.fainted;
  };

  return (
    <Dialog
      fullWidth
      maxWidth={"sm"}
      open={medicineDialog}
      onClose={() => setMedicineDialog(false)}
    >
      <Box sx={{ p: 3 }}>
        <Grid container>
          <Grid item xs={9}>
            <Typography variant="h5" sx={{ mb: "1vh" }}>
              Choose a Pokemon to Heal
            </Typography>
          </Grid>

          <Grid item xs={3} sx={{ textAlign: "center" }}>
            Exaustion
          </Grid>
        </Grid>
        {team.map((pokemon) => (
          <Grid container>
            <Grid item xs={9}>
              <Button
                variant="outlined"
                fullWidth
                disabled={isUsable(pokemon)}
                sx={{
                  mb: "1vh",
                  justifyContent: "start",
                  width: "95%",
                  ml: "2%",
                }}
                onClick={() => {
                  if (clickable) {
                    setTimeout(() => {
                      setMedicineDialog(false);
                      setClickable(true);
                    }, 1000);
                    useMedicine(medToShow, pokemon);
                  }
                  setClickable(false);
                }}
              >
                <PokeSprite name={pokemon.id} isShiny={pokemon.isShiny} />
                {pokemon.species}
              </Button>
            </Grid>
            <Grid
              item
              container
              alignItems="center"
              justifyContent="center"
              xs={3}
            >
              <CircularProgressWithLabel
                points={pokemon.exhaustion}
                fainted={pokemon.fainted}
                value={(pokemon.exhaustion / 5) * 100}
              />
            </Grid>
          </Grid>
        ))}
      </Box>
    </Dialog>
  );
};

export default MedicineDialog;
