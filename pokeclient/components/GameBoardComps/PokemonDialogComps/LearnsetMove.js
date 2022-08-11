import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Cookie from "@mui/icons-material/Cookie";
import { HtmlTooltip } from "../../Utils/HtmlTooltip";

const LearnsetMove = ({ move, candiesSpent }) => {
  const [moveInfo, setMoveInfo] = useState();

  useEffect(() => {
    getMove();
  }, []);

  const getMove = async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_ROOT_URL + "/api/move/" + move.move
    );
    const json = await res.json();

    setMoveInfo(json.data);
  };

  const calcCandies = () => {
    let count = Math.round(move.level / 4);

    return count;
  };

  return (
    <Box
      sx={{
        opacity: calcCandies() > candiesSpent ? "0.2" : "1",
        backgroundColor: calcCandies() > candiesSpent ? "black" : "",
        p: 1,
        border: "1px solid lightgray",
        borderRadius: "2px",
        mb: "1vh",
        transition: "all .2s",
        ":hover": {
          transform: "translate(0px, -2px)",
          boxShadow:
            "0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06)",
        },
      }}
    >
      <Grid container>
        <Grid item container alignItems="center" xs={9}>
          {moveInfo ? moveInfo.name : ""}
          {moveInfo ? (
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography>
                    <b>Type:</b> {moveInfo.type}
                  </Typography>
                  <Typography>
                    <b>Accuracy:</b> {moveInfo.accuracy}
                  </Typography>
                  <Typography>
                    <b>Base Power:</b> {moveInfo.basePower}
                  </Typography>
                  <Typography>
                    <b>Category: </b>
                    {moveInfo.category}
                  </Typography>
                  <Typography>
                    <b>Desc:</b> {moveInfo.desc}
                  </Typography>
                </React.Fragment>
              }
            >
              <InfoOutlinedIcon fontSize="small" sx={{ ml: "2px" }} />
            </HtmlTooltip>
          ) : (
            ""
          )}
        </Grid>
        {candiesSpent < calcCandies() ? (
          <Grid item container alignItems="center" xs={3}>
            <Cookie fontSize="small" />
            {calcCandies()}
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </Box>
  );
};

export default LearnsetMove;
