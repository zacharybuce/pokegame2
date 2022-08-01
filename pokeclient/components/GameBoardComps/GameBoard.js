import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSocket } from "../../contexts/SocketProvider";
import { Hex } from "react-hexgrid";
import HoenBoard from "./HoenBoard";
import TestBoardComp from "./TestBoardComp";
import Dashboard from "./DashboardComps/Dashboard";
import Leaderboard from "./LeaderboardComps/Leaderboard";
import ResourceBar from "./ResourceBarComps/ResourceBar";
import BagDrawer from "./BagComps/BagDrawer";
import ShopDialog from "./ShopComps/ShopDialog";

const GameBoard = ({ id }) => {
  //---server driven variables
  const socket = useSocket();
  const [players, setPlayers] = useState();
  const [game, setGame] = useState();

  //---player stuff variables
  const [team, setTeam] = useState([]);
  const [money, setMoney] = useState(10000);
  const [candies, setCandies] = useState(0);
  const [bag, setBag] = useState({
    heldItems: [],
    medicine: { potions: 0, superPotions: 0, hyperPotions: 0, revives: 0 },
    balls: { poke: 5, great: 0, ultra: 0 },
    tms: [],
  });
  const [badges, setBadges] = useState([]);
  const [shop, setShop] = useState([]);

  //---utility variables
  const [winReady, setwinReady] = useState(false);
  const [playerLocation, setPlayerLocation] = useState(new Hex(0, 0, 0));
  const [canUseShop, setCanUseShop] = useState(true);
  const [tileToShow, setTileToShow] = useState();
  const [canInteract, setCanInteract] = useState(false); //player can take an action of the tile they are inspecting

  //---Open/Close variables for drawers and dialogs
  const [leaderboardDrawer, setLeaderboardDrawer] = useState(false);
  const [bagDrawer, setBagDrawer] = useState(false);
  const [tileDrawer, setTileDrawer] = useState(false);
  const [shopDialog, setShopDialog] = useState(false);

  //---Use Effects----------------------------------------------------
  //checks for updates to players
  useEffect(() => {
    if (socket === undefined) return;

    socket.on("game-update-players", (players) => setPlayers(players));
    console.log(players);
    return () => socket.off("game-update-players");
  }, [socket, players]);

  //checks for updates to game
  useEffect(() => {
    if (socket === undefined) return;

    socket.on("game-update-state", (game) => setGame(game));
    console.log(game);
    return () => socket.off("game-update-state");
  }, [socket, game]);

  //request state for first time setup
  useEffect(() => {
    setTimeout(() => socket.emit("game-request-state"), 1000);
    setwinReady(true); //--render mon correctly for drag
    getShop();
  }, []);
  //---Utility Funcs--------------------------------------------------
  const getShop = async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_ROOT_URL + "/api/generateshop"
    );
    const json = await res.json();
    console.log(json.data);
    setShop(json.data);
  };

  if (!players || !game)
    return (
      <Box sx={{ textAlign: "center", mt: "30vh" }}>
        <CircularProgress size="60px" />
        <Typography variant="h3">Starting game...</Typography>
      </Box>
    );

  return (
    <Box>
      <ResourceBar
        phase={game.phase}
        turn={game.turn}
        maxTurns={30}
        money={money}
        candies={candies}
        bag={bag}
        badges={badges.length}
      />
      <TestBoardComp
        tileDrawer={tileDrawer}
        phase={game.phase}
        playerLocation={playerLocation}
        players={players}
        tileToShow={tileToShow}
        canInteract={canInteract}
        setCanInteract={setCanInteract}
        setTileToShow={setTileToShow}
        setTileDrawer={setTileDrawer}
      />
      {winReady ? (
        <Dashboard
          team={team}
          canUseShop={canUseShop}
          setTeam={setTeam}
          setLeaderboardDrawer={setLeaderboardDrawer}
          setBagDrawer={setBagDrawer}
          setShopDialog={setShopDialog}
        />
      ) : (
        ""
      )}
      <Leaderboard
        leaderboardDrawer={leaderboardDrawer}
        setLeaderboardDrawer={setLeaderboardDrawer}
        players={players}
        id={id}
      />
      <BagDrawer
        bag={bag}
        team={team}
        bagDrawer={bagDrawer}
        setBagDrawer={setBagDrawer}
        setTeam={setTeam}
        setBag={setBag}
        setMoney={setMoney}
      />
      <ShopDialog
        shop={shop}
        bag={bag}
        money={money}
        shopDialog={shopDialog}
        setMoney={setMoney}
        setBag={setBag}
        setShop={setShop}
        setShopDialog={setShopDialog}
      />
    </Box>
  );
};

export default GameBoard;
