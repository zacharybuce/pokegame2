import { Alert, Button, Grid, Tooltip } from "@mui/material";
import React from "react";
import CircleIcon from "@mui/icons-material/Circle";

//This componet displays action buttons depending on the phase of the game.
//If movement
//If action will show take action button and end turn

const ActionButtons = ({
  phase,
  actionComplete,
  movement,
  turnToMove,
  moveToTile,
  endTurn,
  isReady,
  tileToShow,
  setTileDrawer,
  playerLocation,
  actionButtonClick,
}) => {
  if (isReady || (!turnToMove && phase == "movement"))
    return (
      <Grid
        item
        container
        alignContent="center"
        justifyContent="center"
        xs={12}
        sx={{ textAlign: "center" }}
      >
        <Alert severity="info" sx={{ width: "94%" }}>
          Waiting for other players
        </Alert>
      </Grid>
    );

  if (phase == "movement")
    return (
      <Grid
        item
        container
        alignContent="center"
        xs={12}
        sx={{ textAlign: "center" }}
      >
        {/* movement counter */}
        <Tooltip title="Movement" arrow placement="top">
          <Grid
            item
            container
            alignItems="center"
            justifyContent="center"
            xs={2}
          >
            <Grid item xs={4}>
              <CircleIcon
                sx={{
                  color: movement >= 3 ? "green" : "gray",
                  fontSize: movement >= 3 ? "large" : "small",
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <CircleIcon
                sx={{
                  color: movement >= 2 ? "green" : "gray",
                  fontSize: movement >= 2 ? "large" : "small",
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <CircleIcon
                sx={{
                  color: movement >= 1 ? "green" : "gray",
                  fontSize: movement >= 1 ? "large" : "small",
                }}
              />
            </Grid>
          </Grid>
        </Tooltip>
        {/* Move to button */}
        <Grid item xs={5}>
          <Button
            onClick={() => {
              moveToTile();
            }}
            color="success"
            variant="contained"
            sx={{ width: "85%" }}
            disabled={
              !tileToShow ||
              movement <= 0 ||
              playerLocation?.tile == tileToShow?.tile
            }
          >
            Move to {tileToShow?.tile}
          </Button>
        </Grid>
        {/* info button */}
        <Grid item xs={2}>
          <Button
            variant="contained"
            sx={{ width: "82%" }}
            onClick={() => setTileDrawer(true)}
          >
            info
          </Button>
        </Grid>
        {/* end turn button */}
        <Grid item xs={3}>
          <Button
            onClick={() => endTurn()}
            variant="contained"
            color="error"
            sx={{ width: "83%" }}
          >
            End
          </Button>
        </Grid>
      </Grid>
    );

  return (
    <Grid
      item
      container
      alignContent="center"
      xs={12}
      sx={{ textAlign: "center" }}
    >
      <Grid item xs={7}>
        <Button
          disabled={actionComplete}
          color="success"
          variant="contained"
          sx={{ width: "90%" }}
          onClick={() => actionButtonClick()}
        >
          Take Action
        </Button>
      </Grid>
      <Grid item xs={5}>
        <Button
          onClick={() => endTurn()}
          variant="contained"
          color="error"
          sx={{ width: "90%" }}
        >
          End Turn
        </Button>
      </Grid>
    </Grid>
  );
};

export default ActionButtons;
