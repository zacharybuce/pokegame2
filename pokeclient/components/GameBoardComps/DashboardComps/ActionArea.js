import { Button, Grid } from "@mui/material";
import React from "react";
import ActionButtons from "./ActionButtons";
import BackpackIcon from "@mui/icons-material/Backpack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

// This component contains the action buttons on the dashboard, bag button, shop button, and leaderboard button

const ActionArea = ({
  game,
  canUseShop,
  actionComplete,
  movement,
  tileToShow,
  turnToMove,
  endTurn,
  isReady,
  moveToTile,
  setShopDialog,
  setLeaderboardDrawer,
  setBagDrawer,
  setTileDrawer,
}) => {
  return (
    <Grid item container xs={12} sx={{ height: "20vh" }}>
      <ActionButtons
        phase={game.phase}
        turnToMove={turnToMove}
        movement={movement}
        tileToShow={tileToShow}
        isReady={isReady}
        endTurn={endTurn}
        moveToTile={moveToTile}
        actionComplete={actionComplete}
        setTileDrawer={setTileDrawer}
      />
      {/* Open Bag Button */}
      <Grid
        item
        container
        direction="row"
        alignItems="flex-end"
        justifyContent="center"
        xs={7}
        sx={{ textAlign: "center" }}
      >
        <Button
          variant="contained"
          onClick={() => setBagDrawer(true)}
          sx={{ backgroundColor: "#152642", width: "90%", height: "100%" }}
        >
          <BackpackIcon sx={{ width: "100px", height: "100%" }} />
        </Button>
      </Grid>
      <Grid item container direction={"column"} xs={5}>
        {/* Open Shop Button */}
        <Grid
          item
          container
          direction="row"
          alignItems="flex-end"
          justifyContent="center"
          xs={6}
        >
          <Button
            variant="contained"
            disabled={!canUseShop || game.phase == "movement"}
            onClick={() => setShopDialog(true)}
            sx={{ height: "95%", backgroundColor: "#506680", width: "90%" }}
          >
            <ShoppingCartIcon />
          </Button>
        </Grid>
        {/* Open Leaderboard Button */}
        <Grid
          item
          container
          direction="row"
          alignItems="flex-end"
          justifyContent="center"
          xs={6}
        >
          <Button
            variant="contained"
            sx={{ height: "95%", backgroundColor: "#506680", width: "90%" }}
            onClick={() => setLeaderboardDrawer(true)}
          >
            <PeopleAltIcon />
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ActionArea;
