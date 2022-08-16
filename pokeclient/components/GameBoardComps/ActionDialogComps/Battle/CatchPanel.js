import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { pSBC } from "../../../Utils/colorUtil";
import ItemSprite from "../../../Utils/ItemSprite";

const pokeball = { name: "Poke Ball", id: "poke", type: "ball", cost: 500 };
const greatball = { name: "Great Ball", id: "great", type: "ball", cost: 750 };
const ultraball = { name: "Ultra Ball", id: "ultra", type: "ball", cost: 1200 };

const CatchPanel = ({ bag, throwBall, canThrowBall, animsDone }) => {
  if (animsDone)
    return (
      <Grid container>
        <Grid item xs={4}>
          <Button
            variant="contained"
            disabled={bag.balls.poke == 0 || !canThrowBall}
            sx={{
              backgroundColor: "#ee1515",
              "&:hover": {
                backgroundColor: pSBC(-0.4, "#ee1515"),
              },
              width: "95%",
              height: "100%",
              textTransform: "none",
            }}
            onClick={() => throwBall("poke")}
          >
            <Box>
              <ItemSprite item={pokeball} />
              <Typography> Pokeball</Typography>
              <Typography variant="body2">x{bag.balls.poke}</Typography>
            </Box>
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            disabled={bag.balls.great == 0 || !canThrowBall}
            sx={{
              backgroundColor: "#3b82c4",
              "&:hover": {
                backgroundColor: pSBC(-0.4, "#3b82c4"),
              },
              width: "95%",
              height: "100%",
              textTransform: "none",
            }}
            onClick={() => throwBall("great")}
          >
            <Box>
              <ItemSprite item={greatball} />
              <Typography> Greatball</Typography>
              <Typography variant="body2">x{bag.balls.great}</Typography>
            </Box>
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            disabled={bag.balls.ultra == 0 || !canThrowBall}
            sx={{
              backgroundColor: pSBC(-0.4, "#fdd23c"),
              "&:hover": {
                backgroundColor: pSBC(-0.7, "#fdd23c"),
              },
              width: "95%",
              height: "100%",
              textTransform: "none",
            }}
            onClick={() => throwBall("ultra")}
          >
            <Box>
              <ItemSprite item={ultraball} />
              <Typography> Ultraball</Typography>
              <Typography variant="body2">x{bag.balls.ultra}</Typography>
            </Box>
          </Button>
        </Grid>
      </Grid>
    );

  return <div></div>;
};

export default CatchPanel;
