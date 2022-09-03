import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSocket } from "../../contexts/SocketProvider";
import { Hex, HexUtils } from "react-hexgrid";
import TestBoardComp from "./TestBoardComp";
import Dashboard from "./DashboardComps/Dashboard";
import Leaderboard from "./LeaderboardComps/Leaderboard";
import ResourceBar from "./ResourceBarComps/ResourceBar";
import BagDrawer from "./BagComps/BagDrawer";
import ShopDialog from "./ShopComps/ShopDialog";
import ActionDialog from "./ActionDialogComps/ActionDialog";
import { useSnackbar } from "notistack";
import IndicatorDialog from "./IndicatiorDialogComps/IndicatorDialog";
import PvpDialog from "./PvpDialog";
import TradeDialog from "./TradeDialogComps/TradeDialog";
import SettingsButton from "./SettingsButton";

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
  species: "Ledian",
  num: "166",
  learnset: [
    {
      move: "supersonic",
      level: "1",
    },
    {
      move: "swift",
      level: "1",
    },
    {
      move: "tackle",
      level: "1",
    },
    {
      move: "lightscreen",
      level: "12",
    },
    {
      move: "reflect",
      level: "12",
    },
    {
      move: "safeguard",
      level: "12",
    },
    {
      move: "machpunch",
      level: "15",
    },
    {
      move: "silverwind",
      level: "20",
    },
    {
      move: "cometpunch",
      level: "24",
    },
    {
      move: "batonpass",
      level: "29",
    },
    {
      move: "agility",
      level: "33",
    },
    {
      move: "bugbuzz",
      level: "38",
    },
    {
      move: "airslash",
      level: "42",
    },
    {
      move: "doubleedge",
      level: "47",
    },
  ],
  evolveCandies: "MAX",
  levelUpCandies: 3,
  levelUpIncrease: 3,
  level: 20,
  ability: "Iron Fist",
  nature: "Lonely",
  gender: "M",
  types: ["Bug", "Flying"],
  item: "",
  moves: ["lightscreen", "reflect", "cometpunch", "spikes"],
  evs: {
    hp: 0,
    atk: 0,
    def: 0,
    spa: 0,
    spd: 0,
    spe: 0,
  },
  ivs: {
    hp: 6,
    atk: 19,
    def: 23,
    spa: 7,
    spd: 23,
    spe: 11,
  },
  baseStats: {
    hp: 55,
    atk: 35,
    def: 50,
    spa: 55,
    spd: 110,
    spe: 85,
  },
  isShiny: false,
  candiesSpent: 20,
  exhaustion: 0,
  fainted: false,
  id: "ledian",
  dragId: "1661774552160",
};

const testMon4 = {
  species: "Wishiwashi",
  num: "746",
  learnset: [
    {
      move: "growl",
      level: "1",
    },
    {
      move: "watergun",
      level: "1",
    },
    {
      move: "helpinghand",
      level: "4",
    },
    {
      move: "beatup",
      level: "8",
    },
    {
      move: "brine",
      level: "12",
    },
    {
      move: "tearfullook",
      level: "16",
    },
    {
      move: "dive",
      level: "20",
    },
    {
      move: "soak",
      level: "24",
    },
    {
      move: "uproar",
      level: "28",
    },
    {
      move: "aquatail",
      level: "32",
    },
    {
      move: "aquaring",
      level: "36",
    },
    {
      move: "endeavor",
      level: "40",
    },
    {
      move: "hydropump",
      level: "44",
    },
    {
      move: "doubleedge",
      level: "48",
    },
  ],
  evolveCandies: "MAX",
  levelUpCandies: 1,
  levelUpIncrease: 8,
  level: 20,
  ability: "Schooling",
  nature: "Lax",
  gender: "M",
  types: ["Water"],
  item: "",
  moves: ["growl", "watergun", "helpinghand", "beatup"],
  evs: {
    hp: 0,
    atk: 0,
    def: 0,
    spa: 0,
    spd: 0,
    spe: 0,
  },
  ivs: {
    hp: 17,
    atk: 29,
    def: 20,
    spa: 15,
    spd: 26,
    spe: 29,
  },
  baseStats: {
    hp: 45,
    atk: 20,
    def: 20,
    spa: 25,
    spd: 25,
    spe: 40,
  },
  isShiny: false,
  candiesSpent: 0,
  exhaustion: 0,
  fainted: false,
  id: "wishiwashi",
  dragId: "1661859610874",
};

const testMon5 = {
  species: "Ampharos",
  num: "181",
  learnset: [
    {
      move: "dragonpulse",
      level: "1",
    },
    {
      move: "firepunch",
      level: "1",
    },
    {
      move: "growl",
      level: "1",
    },
    {
      move: "iondeluge",
      level: "1",
    },
    {
      move: "magneticflux",
      level: "1",
    },
    {
      move: "tackle",
      level: "1",
    },
    {
      move: "thunderpunch",
      level: "1",
    },
    {
      move: "thundershock",
      level: "1",
    },
    {
      move: "thunderwave",
      level: "1",
    },
    {
      move: "zapcannon",
      level: "1",
    },
    {
      move: "cottonspore",
      level: "11",
    },
    {
      move: "charge",
      level: "16",
    },
    {
      move: "takedown",
      level: "20",
    },
    {
      move: "electroball",
      level: "25",
    },
    {
      move: "confuseray",
      level: "29",
    },
    {
      move: "powergem",
      level: "35",
    },
    {
      move: "discharge",
      level: "40",
    },
    {
      move: "cottonguard",
      level: "46",
    },
    {
      move: "signalbeam",
      level: "51",
    },
    {
      move: "lightscreen",
      level: "57",
    },
    {
      move: "thunder",
      level: "62",
    },
  ],
  evolveCandies: "MAX",
  levelUpCandies: 5,
  levelUpIncrease: 3,
  level: 20,
  ability: "Static",
  nature: "Naive",
  gender: "M",
  types: ["Electric"],
  item: "",
  moves: ["discharge", "thunderwave", "magneticflux", "growl"],
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
    atk: 24,
    def: 15,
    spa: 20,
    spd: 1,
    spe: 13,
  },
  baseStats: {
    hp: 90,
    atk: 75,
    def: 85,
    spa: 115,
    spd: 90,
    spe: 55,
  },
  isShiny: false,
  candiesSpent: 20,
  exhaustion: 0,
  fainted: false,
  id: "ampharos",
  dragId: "1661856266351",
};

const GameBoard = ({
  id,
  isContinue,
  setMusicEvent,
  setSettingsDialogOpen,
}) => {
  //---server driven variables
  const socket = useSocket();
  const [players, setPlayers] = useState();
  const [game, setGame] = useState();
  const [battleId, setBattleId] = useState();

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
  const [maxMovement, setMaxMovement] = useState(1);
  const [movement, setMovement] = useState(1);
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
  const [willPvpBattle, setWillPvpBattle] = useState();
  const [tradeOffer, setTradeOffer] = useState();
  const [selected, setSelected] = useState();
  const [startTimer, setStartTimer] = useState(false);

  //---Open/Close variables for drawers and dialogs
  const [leaderboardDrawer, setLeaderboardDrawer] = useState(false);
  const [bagDrawer, setBagDrawer] = useState(false);
  const [tileDrawer, setTileDrawer] = useState(false);
  const [shopDialog, setShopDialog] = useState(false);
  const [actionDialog, setActionDialog] = useState(false);
  const [indicatorDialog, setIndicatorDialog] = useState(false);
  const [pvpDialog, setPvpDialog] = useState(false);
  const [tradeDialog, setTradeDialog] = useState(false);

  //---Use Effects----------------------------------------------------
  //checks for updates to players
  useEffect(() => {
    if (socket === undefined) return;

    socket.on("game-update-players", (players, message) => {
      if (players) setPlayers(players);

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
        setWillPvpBattle(false);
        saveData();
        if (game?.phase == "movement" || game?.phase == "starter") {
          if (game?.phase == "movement") {
            setMusicEvent("movement");
          }
          setCanUseShop(false);
          setTileToShow(false);
        }
        if (game.phase == "action") {
          //checkForHeal();
          setMusicEvent("action");
          getShop();
        }
      }

      if (game.moveOrder[game.moving] == id) {
        setTurnToMove(true);
        if (game?.phase == "movement") setStartTimer(true);
      } else {
        setTurnToMove(false);
      }
      console.log(game);
    });
    return () => socket.off("game-update-state");
  }, [socket, game]);

  //checks for player data
  useEffect(() => {
    if (socket === undefined) return;

    socket.on("player-data", (playerData) => {
      if (playerData) loadPlayer(playerData);
    });

    return () => socket.off("player-data");
  }, [socket]);

  //checks for a pvp request
  useEffect(() => {
    if (socket === undefined) return;

    socket.on("pvp-request", (id) => {
      setBattleId(id);
      setPvpDialog(true);
    });

    return () => socket.off("pvp-request");
  }, [socket, battleId]);

  //checks for a pvp confirm
  useEffect(() => {
    if (socket === undefined) return;
    socket.on("pvpbattle-confirmed", (battleId, p1, p2, players) => {
      genPvpBattle(battleId, p1, p2, players);
    });

    return () => socket.off("pvpbattle-confirmed");
  }, [socket, willPvpBattle]);

  //checks for trade offers
  useEffect(() => {
    if (socket === undefined) return;
    socket.on("trade-offer-initiate", (playerOffering, tradeIndex) => {
      console.log(tradeIndex);
      setTradeOffer({
        playerOffering: playerOffering,
        tradeIndex: tradeIndex,
        start: false,
      });
      setTradeDialog(true);
    });
    return () => socket.off("trade-offer-initiate");
  }, [socket, tradeOffer]);

  //request state for first time setup
  useEffect(() => {
    setTimeout(() => socket.emit("game-request-state"), 1000);
    setwinReady(true); //--render mon correctly for drag
    getShop();
    setMusicEvent("start-game");

    if (isContinue) {
      socket.emit("request-player-data");
    } else {
      newGameStart();
    }
  }, []);

  //If team has changed, will send new team to server for updates
  useEffect(() => {
    socket.emit("game-team-update", team);
  }, [team]);

  //If badges has changed, will send new team to server for updates
  useEffect(() => {
    if (badges.length >= 1) setMaxMovement(2);
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

      if (actionComplete) endTurn();
    }
  }, [actionComplete]);

  //---Utility Funcs--------------------------------------------------

  const saveData = () => {
    var sendBag = bag;
    var sendMoney = money;
    var sendCandies = candies;
    var sendBadges = badges;
    var sendPlayerLocation = playerLocation;

    console.log(bag);
    socket.emit(
      "save-data",
      sendBag,
      sendMoney,
      sendCandies,
      sendBadges,
      startTown,
      sendPlayerLocation
    );
  };

  const newGameStart = () => {
    setActionDialog(true);
  };

  const loadPlayer = (playerData) => {
    setTeam(playerData.team);
    setCandies(playerData.candies);
    setBadges(playerData.badges);
    setMoney(playerData.money);
    setPlayerLocation(playerData.playerLocation);
    setStartTown(playerData.startTown);

    if (playerData.badges.length < 1) setMaxMovement(1);
    else if (playerData.badges.length < 2) setMaxMovement(2);
    if (playerData.badges.length < 4) setMaxMovement(3);
  };

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
      setStartTimer(false);
      setIsReady(true);
      setMovement(maxMovement);
      socket.emit("game-end-turn");
      checkForHeal();
      checkIfShop();
    } else {
      setSelected({ tile: "none", coord: { q: -100, r: 0, s: 100 } });
      setMovement(maxMovement);
      setIsReady(true);
      socket.emit("game-end-turn");
    }
  };

  //called whenever a player wants to start their action
  const takeAction = (action, event) => {
    if (action != "wildbattle") {
      setEvent(event);
    }
    if (action == "safarizone") setMoney((prev) => prev - event.cost);
    if (action == "trickhouse") setMoney((prev) => prev - 500);
    if (action == "flyingtaxi") {
      setMoney((prev) => prev - 3000);
      setPlayerLocation(event.location);
      socket.emit("game-move", event.location);
      setTileDrawer(false);
      return;
    }
    if (action == "ferry") {
      setMoney((prev) => prev - 1000);
      setPlayerLocation(event.location);
      socket.emit("game-move", event.location);
      setTileDrawer(false);
      return;
    }
    if (action == "buyitem") {
      let item = event;
      setMoney(money - item.cost);
      let newBag = bag;

      if (item.move) {
        newBag.tms.push(item);
      } else {
        newBag.heldItems.push(item);
      }

      enqueueSnackbar(`${item.name} was purchased`, {
        variant: "info",
      });
      setBag(newBag);
      return;
    }
    if (action == "resetshop") {
      setMoney((prev) => prev - 500);
      getShop();
      enqueueSnackbar(`Items in the shop have changed!`, {
        variant: "info",
      });
      return;
    }
    if (action == "releasemon") {
      setCandies((prev) => prev + event.candies);

      let filteredTeam = team.filter((mem) => mem.dragId != event.mon);

      setTeam(filteredTeam);
      enqueueSnackbar(`Gained ${event.candies} candies!`, {
        variant: "info",
      });

      return;
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
    if (!willPvpBattle) {
      switch (game.phase) {
        case "action":
          setCanInteract(true);
          setTileToShow(playerLocation);
          setTileDrawer(true);
          break;
      }
    } else {
      setWillPvpBattle(true);
      setAction("pvpbattle");
      setActionDialog(true);
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

  //sets up the pvp battle
  const genPvpBattle = (battleId, p1, p2, players) => {
    console.log("gen pvp battle");
    setBattleId(battleId);
    if (players[p1].name == id)
      setEvent({ sprite: players[p2].sprite, name: players[p2].name });
    else setEvent({ sprite: players[p1].sprite, name: players[p1].name });
    setWillPvpBattle(true);
  };

  const initiateTrade = (player) => {
    socket.emit("trade-initiate", player);
    setTradeOffer({
      playerOffering: id,
      start: false,
    });
    setLeaderboardDrawer(false);
    setTradeDialog(true);
  };

  const pvpBattleLost = () => {
    sendPlayerHome();
    healTeam();
    setCanUseShop(true);
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
        maxTurns={game.maxTurns}
        money={money}
        candies={candies}
        bag={bag}
        badges={badges.length}
      />
      <SettingsButton setSettingsDialogOpen={setSettingsDialogOpen} />
      <TestBoardComp
        tileDrawer={tileDrawer}
        actionComplete={actionComplete}
        phase={game.phase}
        playerLocation={playerLocation.coord}
        players={players}
        tileToShow={tileToShow}
        team={team}
        canInteract={canInteract}
        badges={badges}
        x={x}
        y={y}
        selected={selected}
        money={money}
        takeAction={takeAction}
        setCanInteract={setCanInteract}
        setTileToShow={setTileToShow}
        setTileDrawer={setTileDrawer}
        setX={setX}
        setY={setY}
        setSelected={setSelected}
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
          startTimer={startTimer}
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
        initiateTrade={initiateTrade}
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
        battleId={battleId}
        pvpBattleLost={pvpBattleLost}
        setActionDialog={setActionDialog}
        setAction={setAction}
        setMoney={setMoney}
        setBag={setBag}
        setCandies={setCandies}
        setTeam={setTeam}
        setBadges={setBadges}
        setActionComplete={setActionComplete}
        setMusicEvent={setMusicEvent}
      />
      <IndicatorDialog
        round={game.turn}
        phase={game.phase}
        semi={game.semiTurn}
        indicatorDialog={indicatorDialog}
        setIndicatorDialog={setIndicatorDialog}
      />
      <PvpDialog
        pvpDialog={pvpDialog}
        setPvpDialog={setPvpDialog}
        battleIndex={battleId}
      />

      {tradeOffer ? (
        <TradeDialog
          tradeDialog={tradeDialog}
          team={team}
          tradeOffer={tradeOffer}
          setTradeOffer={setTradeOffer}
          setTeam={setTeam}
          setTradeDialog={setTradeDialog}
        />
      ) : (
        ""
      )}
    </Box>
  );
};

export default GameBoard;
