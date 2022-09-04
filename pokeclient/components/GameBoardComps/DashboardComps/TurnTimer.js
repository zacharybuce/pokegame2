import React, { useState, useEffect, useRef } from "react";
import { Box, Grid, Typography } from "@mui/material";

const TurnTimer = ({ startTimer, endTurn }) => {
  const [time, setTime] = useState(30);
  const timerRef = useRef(time);
  timerRef.current = time;

  useEffect(() => {
    if (startTimer) {
      let myInterval = setInterval(() => {
        if (timerRef.current > 0) {
          setTime((prev) => prev - 1);
        } else {
          clearInterval(myInterval);
          setTime(30);
          endTurn();
        }
      }, 1000);
    } else {
      setTime(30);
    }
    return () => {
      clearInterval(myInterval);
    };
  }, [startTimer]);

  return (
    <Box
      sx={{
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        position: "absolute",
        backgroundColor: "#353C51",
        height: "50px",
        bottom: "22%",
        width: "200px",
        left: "45%",
      }}
    >
      <Grid
        container
        alignItems="center"
        sx={{ textAlign: "center", height: "100%" }}
      >
        <Grid item xs={12}>
          <Typography variant="h5"> {startTimer ? time : ""}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TurnTimer;
