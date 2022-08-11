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
import ActionDialog from "./ActionDialogComps/ActionDialog";
import { useSnackbar } from "notistack";

const testMon = {
  species: "Pikachu",
  num: 25,
  learnset: [
    {
      move: "charm",
      level: "1",
    },
    {
      move: "growl",
      level: "1",
    },
    {
      move: "nastyplot",
      level: "1",
    },
    {
      move: "nuzzle",
      level: "1",
    },
    {
      move: "playnice",
      level: "1",
    },
    {
      move: "quickattack",
      level: "1",
    },
    {
      move: "sweetkiss",
      level: "1",
    },
    {
      move: "tailwhip",
      level: "1",
    },
    {
      move: "thundershock",
      level: "1",
    },
    {
      move: "thunderwave",
      level: "4",
    },
    {
      move: "doubleteam",
      level: "8",
    },
    {
      move: "electroball",
      level: "12",
    },
    {
      move: "feint",
      level: "16",
    },
    {
      move: "spark",
      level: "20",
    },
    {
      move: "agility",
      level: "24",
    },
    {
      move: "slam",
      level: "28",
    },
    {
      move: "discharge",
      level: "32",
    },
    {
      move: "thunderbolt",
      level: "36",
    },
    {
      move: "lightscreen",
      level: "40",
    },
    {
      move: "thunder",
      level: "44",
    },
  ],
  evolveCandies: 8,
  levelUpCandies: 4,
  levelUpIncrease: 3,
  level: 20,
  ability: "Static",
  nature: "Lonely",
  gender: "F",
  types: ["Electric"],
  item: {
    name: "Leftovers",
    id: "leftovers",
    type: "hold-item",
    desc: "Test Desc",
  },
  moves: ["quickattack", "sweetkiss", "growl", "playnice"],
  evs: {
    hp: 0,
    atk: 0,
    def: 0,
    spa: 0,
    spd: 0,
    spe: 0,
  },
  ivs: {
    hp: 13,
    atk: 32,
    def: 4,
    spa: 26,
    spd: 9,
    spe: 26,
  },
  baseStats: {
    hp: 35,
    atk: 55,
    def: 40,
    spa: 50,
    spd: 50,
    spe: 90,
  },
  isShiny: true,
  candiesSpent: 0,
  exhaustion: 5,
  fainted: true,
  id: "pikachu",
  dragId: "1659353138628",
};

const testMon2 = {
  species: "Dragonite",
  num: "149",
  learnset: [
    {
      move: "hurricane",
      level: "0",
    },
    {
      move: "extremespeed",
      level: "1",
    },
    {
      move: "firepunch",
      level: "1",
    },
    {
      move: "leer",
      level: "1",
    },
    {
      move: "roost",
      level: "1",
    },
    {
      move: "thunderpunch",
      level: "1",
    },
    {
      move: "thunderwave",
      level: "1",
    },
    {
      move: "twister",
      level: "1",
    },
    {
      move: "wingattack",
      level: "1",
    },
    {
      move: "wrap",
      level: "1",
    },
    {
      move: "dragontail",
      level: "15",
    },
    {
      move: "agility",
      level: "20",
    },
    {
      move: "slam",
      level: "25",
    },
    {
      move: "aquatail",
      level: "33",
    },
    {
      move: "dragonrush",
      level: "39",
    },
    {
      move: "outrage",
      level: "41",
    },
    {
      move: "safeguard",
      level: "46",
    },
    {
      move: "raindance",
      level: "53",
    },
    {
      move: "dragondance",
      level: "62",
    },
    {
      move: "hyperbeam",
      level: "80",
    },
  ],
  evolveCandies: "MAX",
  levelUpCandies: 6,
  levelUpIncrease: 2,
  level: 20,
  ability: "Inner Focus",
  nature: "Modest",
  gender: "M",
  types: ["Dragon", "Flying"],
  item: "",
  moves: ["roost", "wrap", "firepunch", "thunderpunch"],
  evs: {
    hp: 0,
    atk: 0,
    def: 0,
    spa: 0,
    spd: 0,
    spe: 0,
  },
  ivs: {
    hp: 14,
    atk: 10,
    def: 10,
    spa: 14,
    spd: 3,
    spe: 30,
  },
  baseStats: {
    hp: 91,
    atk: 134,
    def: 95,
    spa: 100,
    spd: 100,
    spe: 80,
  },
  isShiny: false,
  candiesSpent: 0,
  exhaustion: 0,
  fainted: false,
  id: "dragonite",
  dragId: "1659608236053",
};

const GameBoard = ({ id }) => {
  //---server driven variables
  const socket = useSocket();
  const [players, setPlayers] = useState();
  const [game, setGame] = useState();

  //---player stuff variables
  const [team, setTeam] = useState([]);
  const [money, setMoney] = useState(10000);
  const [candies, setCandies] = useState(30);
  const [bag, setBag] = useState({
    heldItems: [],
    medicine: { potions: 0, superPotions: 0, hyperPotions: 0, revives: 0 },
    balls: { poke: 5, great: 0, ultra: 0 },
    tms: [],
  });
  const [badges, setBadges] = useState([]);
  const [shop, setShop] = useState([]);
  const [movement, setMovement] = useState(3);

  //---utility variables
  const { enqueueSnackbar } = useSnackbar();
  const [winReady, setwinReady] = useState(false);
  const [playerLocation, setPlayerLocation] = useState({
    tile: "118",
    coord: new Hex(0, 0, 0),
  });
  const [canUseShop, setCanUseShop] = useState(true);
  const [tileToShow, setTileToShow] = useState();
  const [canInteract, setCanInteract] = useState(false); //player can take an action of the tile they are inspecting
  const [action, setAction] = useState("starter"); //tells action dialog what to show
  const [actionComplete, setActionComplete] = useState(false); //the player has done their action for this round
  const [isReady, setIsReady] = useState(false); //the player has clicked the end turn button
  const [turnToMove, setTurnToMove] = useState(false); //it is the players turn to move

  //---Open/Close variables for drawers and dialogs
  const [leaderboardDrawer, setLeaderboardDrawer] = useState(false);
  const [bagDrawer, setBagDrawer] = useState(false);
  const [tileDrawer, setTileDrawer] = useState(false);
  const [shopDialog, setShopDialog] = useState(false);
  const [actionDialog, setActionDialog] = useState(false);

  //---Use Effects----------------------------------------------------
  //checks for updates to players
  useEffect(() => {
    if (socket === undefined) return;

    socket.on("game-update-players", (players, message) => {
      setPlayers(players);

      if (message) {
        enqueueSnackbar(message, {
          variant: "info",
        });
      }
    });
    console.log(players);

    return () => socket.off("game-update-players");
  }, [socket, players]);

  //checks for updates to game
  useEffect(() => {
    if (socket === undefined) return;

    socket.on("game-update-state", (game) => {
      setGame(game);

      if (game?.newPhase) {
        setActionComplete(false);
        setIsReady(false);
        if (game?.phase == "movement" || game?.phase == "starter")
          setCanUseShop(false);
        if (game.phase == "action") getShop();
      }

      if (game.moveOrder[game.moving] == id) {
        setTurnToMove(true);
      } else {
        setTurnToMove(false);
      }

      console.log(game);
      console.log(turnToMove);
    });
    return () => socket.off("game-update-state");
  }, [socket, game]);

  //request state for first time setup
  useEffect(() => {
    setTimeout(() => socket.emit("game-request-state"), 1000);
    setwinReady(true); //--render mon correctly for drag
    getShop();
    setActionDialog(true);
  }, []);

  //If team has changed, will send new team to server for updates
  useEffect(() => {
    socket.emit("game-team-update", team);
  }, [team]);

  //If badges has changed, will send new team to server for updates
  useEffect(() => {
    socket.emit("game-team-update", badges);
  }, [badges]);

  //---Utility Funcs--------------------------------------------------

  //gets shop items from api and assigns it to shop state
  const getShop = async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_ROOT_URL + "/api/generateshop"
    );
    const json = await res.json();
    console.log(json.data);
    setShop(json.data);
  };

  //called when a player selects their starting town. Assigns location
  //and starting mon to local state. Tells server which town is chosen and
  //the new location of the player
  const selectStartingTown = async (location, selectedMon, townId) => {
    socket.emit("game-select-startertown", townId, location);
    setActionDialog(false);

    let pokemon = { name: selectedMon, candiesSpent: 0, level: 20 };

    const res = await fetch(
      process.env.NEXT_PUBLIC_ROOT_URL + "/api/generatepokemon",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pokemon),
      }
    );
    const json = await res.json();

    setTeam([json.data]);

    let locationHex = new Hex(location.q, location.r, location.s);

    setPlayerLocation({ tile: townId, coord: locationHex });
  };

  //moves to tile stored in tileToShow state and sends update to server
  const moveToTile = () => {
    checkIfShop();
    setPlayerLocation(tileToShow);
    socket.emit("game-move", tileToShow);
    setMovement((prev) => prev - 1);
  };

  //end turn for movement and action
  const endTurn = () => {
    if (game.phase == "movement") {
      setIsReady(true);
      setMovement(3);
      socket.emit("game-end-turn");
    } else {
      setIsReady(true);
      socket.emit("game-end-turn");
    }
  };

  //called whenever a player wants to start their action
  const takeAction = (action) => {
    setAction(action);
    setTileDrawer(false);
    setActionDialog(true);
  };

  //checks if tileToShow is a town, and if so sets use shop to true
  const checkIfShop = async () => {
    let tileName;

    switch (game.phase) {
      case "movement":
        tileName = tileToShow.tile;
      case "action":
        tileName = playerLocation.tile;
    }

    const res = await fetch(
      process.env.NEXT_PUBLIC_ROOT_URL +
        "/api/tileInfo" +
        game.mapId +
        "/" +
        tileName
    );
    const json = await res.json();
    if (json.data.town) setCanUseShop(true);
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
        actionComplete={actionComplete}
        phase={game.phase}
        playerLocation={playerLocation.coord}
        players={players}
        tileToShow={tileToShow}
        canInteract={canInteract}
        takeAction={takeAction}
        setCanInteract={setCanInteract}
        setTileToShow={setTileToShow}
        setTileDrawer={setTileDrawer}
      />
      {winReady ? (
        <Dashboard
          team={team}
          canUseShop={canUseShop}
          game={game}
          turnToMove={turnToMove}
          movement={movement}
          tileToShow={tileToShow}
          actionComplete={actionComplete}
          moveToTile={moveToTile}
          endTurn={endTurn}
          isReady={isReady}
          candies={candies}
          setCandies={setCandies}
          setTeam={setTeam}
          setBag={setBag}
          setLeaderboardDrawer={setLeaderboardDrawer}
          setBagDrawer={setBagDrawer}
          setShopDialog={setShopDialog}
          setTileDrawer={setTileDrawer}
        />
      ) : (
        ""
      )}
      <Leaderboard
        leaderboardDrawer={leaderboardDrawer}
        setLeaderboardDrawer={setLeaderboardDrawer}
        players={players}
        game={game}
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
      <ActionDialog
        id={id}
        actionDialog={actionDialog}
        playerLocation={playerLocation}
        action={action}
        selectStartingTown={selectStartingTown}
        mapId={game.mapId}
        setActionDialog={setActionDialog}
        setAction={setAction}
      />
    </Box>
  );
};

export default GameBoard;
