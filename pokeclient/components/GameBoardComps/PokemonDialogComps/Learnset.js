import { Box, Grid, Typography, Checkbox } from "@mui/material";
import React from "react";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import LearnsetMove from "./LearnsetMove";

const Learnset = ({ learnset, candiesSpent, currentMoves, changeMoves }) => {
  //either removes or adds move depending on the length of currentMoves
  const handleChange = (event, move) => {
    let newMoves = currentMoves.slice();

    if (currentMoves.includes(move)) {
      let i = currentMoves.indexOf(move);
      newMoves.splice(i, 1);
      changeMoves(newMoves);
    } else if (currentMoves.length < 4) {
      newMoves = currentMoves.slice();
      newMoves.push(move);
      changeMoves(newMoves);
    }
  };

  const isLearnable = (move) => {
    if (currentMoves.includes(move.move)) return true;
    if (currentMoves.length == 4) return false;
    if (Math.round(move.level / 4) > candiesSpent) return false;

    return true;
  };

  return (
    <Box sx={{ ml: "1vw" }}>
      <Typography sx={{ mb: "1vh" }}>Learnset</Typography>
      <Box
        sx={{
          overflowY: "auto",
          height: "340px",
          backgroundColor: "#506680",
          borderRadius: "3px",
          p: "5px",
        }}
      >
        <Grid container>
          {learnset.map((move) => (
            <Grid item container xs={12}>
              <Grid
                item
                container
                alignItems="center"
                justifyContent="center"
                xs={2}
              >
                {isLearnable(move) ? (
                  <Checkbox
                    checked={currentMoves.includes(move.move)}
                    onChange={(event) => handleChange(event, move.move)}
                    icon={<LightbulbOutlinedIcon />}
                    checkedIcon={<LightbulbIcon />}
                    sx={{
                      transition: "all .2s",
                      "&.Mui-checked": {
                        color: "#2F4562",
                      },
                      ":hover": {
                        backgroundColor: "rgba(0,0,0,.1)",
                        borderRadius: "50%",
                      },
                    }}
                  />
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={10}>
                <LearnsetMove move={move} candiesSpent={candiesSpent} />
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Learnset;
