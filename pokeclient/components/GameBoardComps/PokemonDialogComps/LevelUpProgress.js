import {
  Box,
  Button,
  CircularProgress,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import React from "react";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">
          {props.candiesSpent + "/" + props.levelUpCandies}
        </Typography>
      </Box>
    </Box>
  );
}

function CircularProgressWithLabel(props) {
  if (props.evolveCandies == "MAX")
    return (
      <Button
        variant="contained"
        autoCapitalize={false}
        sx={{
          height: "100px",
          width: "100px",
          ml: "25%",
          backgroundColor: "#081B33",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          ":hover": {
            backgroundColor: "#152642",
          },
          textTransform: "none",
        }}
        disableRipple
      >
        <Typography variant="h6" component="div" color="text.secondary">
          MAX
        </Typography>
      </Button>
    );

  if (props.candiesSpent < props.evolveCandies)
    return (
      <Box
        sx={{
          position: "relative",
          backgroundColor: "#081B33",
          borderRadius: "50%",
          width: "100px",
          height: "100px",
          ml: "25%",
        }}
      >
        <CircularProgress variant="determinate" {...props} size="100px" />
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
            {`${props.candiesSpent}/${props.evolveCandies}`}
          </Typography>
        </Box>
      </Box>
    );

  return (
    <Button
      variant="contained"
      autoCapitalize={false}
      sx={{
        height: "100px",
        width: "100px",
        ml: "25%",
        backgroundColor: "#081B33",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        ":hover": {
          backgroundColor: "#152642",
        },
        textTransform: "none",
      }}
      className={"evolvebutton"}
      onClick={() => props.handleEvolve()}
    >
      <Typography variant="h6" component="div" color="text.secondary">
        Evolve
      </Typography>
    </Button>
  );
}

const LevelUpProgress = ({
  candiesSpent,
  levelUpCandies,
  levelUpIncrease,
  evolveCandies,
  handleEvolve,
}) => {
  const linVal = ((candiesSpent % levelUpCandies) / levelUpCandies) * 100;
  return (
    <Box sx={{ mt: "1vh" }}>
      <Grid container>
        <Grid item container xs={7}>
          {/* candies to lvl up */}
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              Candies to Level Up (+{levelUpIncrease} lvls)
            </Typography>
            <LinearProgressWithLabel
              value={linVal}
              candiesSpent={candiesSpent % levelUpCandies}
              levelUpCandies={levelUpCandies}
            />
          </Grid>
        </Grid>

        {/* evolve progress */}
        <Grid
          item
          container
          justifyContent="center"
          xs={5}
          sx={{ textAlign: "center" }}
        >
          <Grid item xs={12}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: "1vh" }}
            >
              Candies to Evolve
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CircularProgressWithLabel
              value={(candiesSpent / evolveCandies) * 100} //has to be 0-100%
              candiesSpent={candiesSpent}
              evolveCandies={evolveCandies}
              handleEvolve={handleEvolve}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LevelUpProgress;
