import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSocket } from "../../contexts/SocketProvider";
import { Hex, HexUtils } from "react-hexgrid";
import HoenBoard from "./HoenBoard";
import TestBoardComp from "./TestBoardComp";
import Dashboard from "./DashboardComps/Dashboard";
import Leaderboard from "./LeaderboardComps/Leaderboard";
import ResourceBar from "./ResourceBarComps/ResourceBar";
import BagDrawer from "./BagComps/BagDrawer";
import ShopDialog from "./ShopComps/ShopDialog";
import ActionDialog from "./ActionDialogComps/ActionDialog";
import { useSnackbar } from "notistack";
import IndicatorDialog from "./IndicatiorDialogComps/IndicatorDialog";

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
  exhaustion: 0,
  fainted: false,
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
  moves: ["roost", "dragonrush", "firepunch", "thunderpunch"],
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

const testMon3 = {
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
  isShiny: false,
  candiesSpent: 0,
  exhaustion: 0,
  fainted: false,
  id: "pikachu",
  dragId: "1659353138620",
};

const testMon4 = {
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
  moves: ["roost", "dragonrush", "firepunch", "thunderpunch"],
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
  isShiny: true,
  candiesSpent: 0,
  exhaustion: 0,
  fainted: false,
  id: "dragonite",
  dragId: "1659608236050",
};

const testMon5 = {
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
  moves: ["roost", "dragonrush", "firepunch", "thunderpunch"],
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
  dragId: "16596082363",
};

const GameBoard = ({ id }) => {
  //---server driven variables
  const socket = useSocket();
  const [players, setPlayers] = useState();
  const [game, setGame] = useState();

  //---player stuff variables
  const [team, setTeam] = useState([]);
  const [money, setMoney] = useState(3000);
  const [candies, setCandies] = useState(0);
  const [bag, setBag] = useState({
    heldItems: [],
    medicine: { potions: 0, superPotions: 0, hyperPotions: 0, revives: 0 },
    balls: { poke: 5, great: 0, ultra: 0 },
    tms: [],
  });
  const [badges, setBadges] = useState([]);
  const [shop, setShop] = useState([]);
  const [movement, setMovement] = useState(3);
  const [startTown, setStartTown] = useState();

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
  const [x, setX] = useState(-100); //for viewbox
  const [y, setY] = useState(-100); //for viewbox
  const [event, setEvent] = useState();

  //---Open/Close variables for drawers and dialogs
  const [leaderboardDrawer, setLeaderboardDrawer] = useState(false);
  const [bagDrawer, setBagDrawer] = useState(false);
  const [tileDrawer, setTileDrawer] = useState(false);
  const [shopDialog, setShopDialog] = useState(false);
  const [actionDialog, setActionDialog] = useState(false);
  const [indicatorDialog, setIndicatorDialog] = useState(false);

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
        setIndicatorDialog(true);
        setAction("none");
        if (game?.phase == "movement" || game?.phase == "starter") {
          setCanUseShop(false);
          setTileToShow(false);
        }
        if (game.phase == "action") {
          //checkForHeal();
          getShop();
        }
      }

      if (game.moveOrder[game.moving] == id) {
        setTurnToMove(true);
      } else {
        setTurnToMove(false);
      }
      console.log(game);
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
    socket.emit("game-badges-update", badges);
  }, [badges]);

  useEffect(() => {
    if (team.length != 0) {
      let numFainted = 0;
      team.forEach((pokemon) => {
        if (pokemon.fainted) numFainted++;
      });

      if (numFainted == team.length) {
        sendPlayerHome();
      } else if (action == "gymchallenge") {
        healTeam();
        setCanUseShop(true);
      } else {
        setCanUseShop(false);
      }
    }
  }, [actionComplete]);

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

    setTeam([...team, json.data]);

    let locationHex = new Hex(location.q, location.r, location.s);

    setPlayerLocation({ tile: townId, coord: locationHex });
    setStartTown({ tile: townId, coord: locationHex });
    let { x, y } = getCoord(locationHex);
    console.log("getCoord -> x: " + x + " y: " + y);
    setX(x - 120);
    setY(y - 100);
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
      checkForHeal();
      checkIfShop();
    } else {
      setIsReady(true);
      socket.emit("game-end-turn");
    }
  };

  //called whenever a player wants to start their action
  const takeAction = (action, event) => {
    if (action != "wildbattle") {
      setEvent(event);
    }

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

  //gets the coords of players current location to shift viewbox there on turn start
  const getCoord = (location) => {
    const layoutDimension = {
      size: { x: 20, y: 20 },
      orientation: {
        b0: 0.6666666666666666,
        b1: 0,
        b2: -0.3333333333333333,
        b3: 0.5773502691896257,
        f0: 1.5,
        f1: 0,
        f2: 0.8660254037844386,
        f3: 1.7320508075688772,
        startAngle: 0,
      },
      origin: { x: 0, y: 0 },
      spacing: 1,
    };

    var res = HexUtils.hexToPixel(location, layoutDimension);
    return res;
  };

  //triggers when the take action button is clicked
  const actionButtonClick = () => {
    switch (game.phase) {
      case "action":
        setCanInteract(true);
        setTileToShow(playerLocation);
        setTileDrawer(true);
        break;
    }
  };

  //Checks if an action is taken on a town tile. If so heals the players team
  const checkForHeal = async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_ROOT_URL +
        "/api/tileInfo" +
        game.mapId +
        "/" +
        playerLocation.tile
    );
    const json = await res.json();

    if (json.data.town) {
      healTeam();
    }
  };

  //sets player location to startTown and notifies the server
  const sendPlayerHome = () => {
    setPlayerLocation(startTown);
    socket.emit("game-move", startTown, true);
    healTeam();
  };

  //heals the players team
  const healTeam = () => {
    let newTeam = team.slice();
    team.forEach((pokemon, index) => {
      let newMon = pokemon;
      newMon.exhaustion = 0;
      newMon.fainted = false;
      newTeam[index] = newMon;
    });

    setTeam([...newTeam]);
    enqueueSnackbar("Your party was healed!", {
      variant: "success",
    });
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
        badges={badges}
        x={x}
        y={y}
        takeAction={takeAction}
        setCanInteract={setCanInteract}
        setTileToShow={setTileToShow}
        setTileDrawer={setTileDrawer}
        setX={setX}
        setY={setY}
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
          playerLocation={playerLocation}
          actionButtonClick={actionButtonClick}
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
        money={money}
        actionComplete={actionComplete}
        bag={bag}
        team={team}
        event={event}
        playerLocation={playerLocation}
        action={action}
        selectStartingTown={selectStartingTown}
        mapId={game.mapId}
        badges={badges}
        setActionDialog={setActionDialog}
        setAction={setAction}
        setMoney={setMoney}
        setBag={setBag}
        setCandies={setCandies}
        setTeam={setTeam}
        setBadges={setBadges}
        setActionComplete={setActionComplete}
      />
      <IndicatorDialog
        round={game.turn}
        phase={game.phase}
        indicatorDialog={indicatorDialog}
        setIndicatorDialog={setIndicatorDialog}
      />
    </Box>
  );
};

export default GameBoard;
