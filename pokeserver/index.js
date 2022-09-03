import { Server } from "socket.io";
import { createServer } from "http";
import Sim from "pokemon-showdown";
import Poke from "pokemon-showdown";
import pokemonData from "../data/pokemon.json" assert { type: "json" };
import saveData from "../data/savedata.json" assert { type: "json" };
import { readFile, writeFile } from "fs/promises";

const Teams = Poke.Teams;
const Dex = Poke.Dex;

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

//-----Global Variables-----//
var players = [];
var rules = {
  campaign: "Hoen Adventure",
  StartingTown: "Standard",
  Starters: "Standard",
};
var playersReady = 0;
var game = {
  turn: 0,
  phase: "starter",
  mapId: "",
  maxTurns: 20,
  moveOrder: [],
  moving: 0,
  newPhase: false,
  semiTurn: 10,
};
var startTown = { pickOrder: [], townsChoosen: [] };
var battles = [];
var trades = [];
var inBattle = [];
var sockets = [];
var safariEncounters = [];
var isContinue = false;
var playerData = {};

//--------------------------//
io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);

  //player joins the lobby and server instantiates a new player
  //or reconnects player and sends them prev info
  socket.on("join-lobby", (sprite) => {
    console.log(id + " joined the lobby");
    //initial connect
    if (!players.includes(id)) {
      players.push({
        name: id,
        team: [],
        badges: 0,
        location: { q: 0, r: 0, s: 0 },
        ready: false,
        sprite: sprite,
        isHost: false,
        inAction: false,
      });
      playerData[id] = { candiesSpent: 0 };
      sockets.push(socket);
      if (players.length == 1) {
        players[0].isHost = true;
      }
      //reconnect player by sending game info
    } else {
      io.to(id).emit("reconnect");
    }

    io.emit("lobby-player-update", players);
  });

  //join lobby for games that are continued
  socket.on("join-lobby-continue", (sprite) => {
    if (!players.length) {
      players = saveData.players;
      game = saveData.game;
      rules = saveData.rules;
      safariEncounters = saveData.safariEncounters;
      isContinue = true;
    }

    sockets[pIndex(id)] = socket;
    io.emit("lobby-player-update", players);
  });

  //player sends data to save
  socket.on(
    "save-data",
    (bag, money, candies, badges, startTown, playerLocation) => {
      if (!playerData[id]) playerData[id] = {};
      playerData[id].bag = bag;
      playerData[id].money = money;
      playerData[id].badges = badges;
      playerData[id].candies = candies;
      playerData[id].startTown = startTown;
      playerData[id].playerLocation = playerLocation;
      playerData[id].team = players[pIndex(id)].team;
    }
  );

  //req data from save file for player to load
  socket.on("request-player-data", () => {
    console.log(saveData.playerData[id]);
    io.to(id).emit("player-data", saveData.playerData[id]);
  });

  //Player is ready to start the game
  socket.on("lobby-player-ready", () => {
    console.log(id + " is ready");
    players[pIndex(id)].ready = true;
    io.emit("lobby-player-update", players);
    playersReady++;

    if (playersReady == players.length) {
      if (isContinue) {
        io.emit("start-game");
        resetPlayerReady();
      } else startGame();
    }
  });

  //Player sends a rules change, triggers an emit for new rules
  socket.on("lobby-rules-change", (rules) => {
    console.log("Recieved a rules change");
    rules = rules;
    io.emit("lobby-rules-update", rules);
  });

  //if player requests, the server will send the player array and game obj
  socket.on("game-request-state", () => {
    io.to(id).emit("game-update-players", players);
    io.to(id).emit("game-update-state", game);
  });

  //player requests the pickorder which sends an obj with pick order and towns chosen
  socket.on("game-request-pickorder", () => {
    io.to(id).emit("game-update-pickorder", startTown);
  });

  //player has choosen a town to start in
  socket.on("game-select-startertown", (starterTown, location) => {
    startTown.townsChoosen.push(starterTown);
    startTown.pickOrder = startTown.pickOrder.slice(1);
    players[pIndex(id)].location = location;

    io.emit("game-update-pickorder", startTown);
    io.emit("game-update-players", players);

    if (startTown.pickOrder.length === 0) {
      nextPhase();
    }
  });

  //player sends their updated team to the server
  socket.on("game-team-update", (team) => {
    players[pIndex(id)].team = team;
    io.emit("game-update-players", players);
  });

  //player sends their updated badges to the server
  socket.on("game-badges-update", (badges) => {
    players[pIndex(id)].badges = badges.length;
    io.emit("game-update-players", players);
  });

  //a player has moved to a new tile
  socket.on("game-move", (location, whiteout) => {
    players[pIndex(id)].location = {
      q: location.coord.q,
      r: location.coord.r,
      s: location.coord.s,
    };
    let message;
    if (whiteout) message = id + " whited out and was sent to " + location.tile;
    else message = id + " moved to " + location.tile;

    io.emit("game-update-players", players, message);
  });

  //A player has finished their turn, both action or movement
  socket.on("game-end-turn", () => {
    playersReady++;
    players[pIndex(id)].ready = true;

    if (game.phase == "movement" && playersReady != players.length) {
      game.moving += 1;
      io.emit("game-update-state", game);
    }
    if (playersReady == players.length) nextPhase();

    io.emit("game-update-players", players);
  });

  //A player wants to start a wild battle
  socket.on("game-start-wildbattle", (wildPokemon) => {
    wildBattle(socket, id, wildPokemon);
  });

  //a player starts a gym challenge
  socket.on("game-start-gymchallenge", (gymTeam) => {
    gymBattle(socket, id, gymTeam);
  });

  //player starts a trainer battle
  socket.on("game-start-trainerbattle", (pokemon) => {
    trainerBattle(socket, id, pokemon);
  });

  socket.on("game-start-championbattle", (team) => {
    championBattle(socket, id, team);
  });

  //player responds to prompt of if they want to initiate a pvp battle
  socket.on("game-respond-pvp", (confirm, battleIndex) => {
    if (confirm) {
      battles[battleIndex].confirm = true;
      console.log(id + " confirmed battle");
      let player1 = players[battles[battleIndex].p1].name;
      let player2 = players[battles[battleIndex].p2].name;
      io.to(player1).emit(
        "pvpbattle-confirmed",
        battleIndex,
        battles[battleIndex].p1,
        battles[battleIndex].p2,
        players
      );
      io.to(player2).emit(
        "pvpbattle-confirmed",
        battleIndex,
        battles[battleIndex].p1,
        battles[battleIndex].p2,
        players
      );
    } else {
      let p2 = players[battles[battleIndex].p2].name;
      if (id != p2) io.to(p2).emit("pvp-request", battles.length - 1);
    }
  });

  //player has readied up for a pvp battle (clicked take action bttn)
  socket.on("pvpbattle-ready", (battleIndex) => {
    console.log(id + " - " + battleIndex);
    if (battles[battleIndex].p1 == pIndex(id))
      battles[battleIndex].p1Ready = true;
    else battles[battleIndex].p2Ready = true;

    if (battles[battleIndex].p1Ready && battles[battleIndex].p2Ready)
      startPvPBattle(battles[battleIndex], battleIndex);
  });

  //player wants current safari encounters
  socket.on("game-get-safari", () => {
    io.to(id).emit("safari-encounters", safariEncounters);
  });

  //player wants to initiate a trade with another player
  socket.on("trade-initiate", (player) => {
    trades.push({ p1: id, p2: player });
    io.to(player).emit("trade-offer-initiate", id, trades.length - 1);
  });

  //a player has accepted the offer to start a trade
  socket.on("trade-initiate-accept", (accept, tradeIndex) => {
    if (accept) {
      let player1 = players[pIndex(trades[tradeIndex].p1)];
      let player2 = players[pIndex(trades[tradeIndex].p2)];
      let socket1 = sockets[pIndex(trades[tradeIndex].p1)];
      let socket2 = sockets[pIndex(trades[tradeIndex].p2)];
      trade(player1, player2, socket1, socket2, tradeIndex);
    } else {
      console.log("trade denied");
      io.to(trades[tradeIndex].p1).emit("trade-initiate-deny");
      trades[tradeIndex] = undefined;
    }
  });

  //player is in an action. Preventing trade reqs
  socket.on("in-action", () => {
    players[pIndex(id)].inAction = true;
    io.emit("game-update-players", players);
  });

  //player has left action
  socket.on("out-of-action", () => {
    players[pIndex(id)].inAction = false;
    io.emit("game-update-players", players);
  });

  socket.on("spend-candy", (amount) => {
    console.log(id + " spent " + amount);
    if (playerData[id].candiesSpent) playerData[id].candiesSpent += amount;
    else playerData[id].candiesSpent = amount;
  });
});

//Start the game once everyone in the lobby is ready
const startGame = () => {
  if (rules.campaign == "Hoen Adventure") game.mapId = "Hoen";

  if ((rules.StartingTown = "Standard")) {
    startTown.pickOrder = startTownPickOrder();
    game.moveOrder = startTown.pickOrder;
  }

  io.emit("start-game");
  resetPlayerReady();
};

//randomly decide the order in which players pick a start town
const startTownPickOrder = () => {
  let pickOrder = [];

  for (let i = 0; i < players.length; i++) {
    let rand = getRand(0, players.length - 1);
    if (pickOrder.includes(players[rand].name)) i--;
    else pickOrder.push(players[rand].name);
  }

  return pickOrder;
};

//given the id of a player, will return the index in player array
const pIndex = (id) => {
  for (let index = 0; index < players.length; index++) {
    if (players[index].name == id) return index;
  }

  return Error;
};

//better than math rand
function getRand(min, max) {
  return (
    (Math.floor(Math.pow(10, 14) * Math.random() * Math.random()) %
      (max - min + 1)) +
    min
  );
}

//changes the ready count to zero and changes each ready status to false in player array
const resetPlayerReady = () => {
  playersReady = 0;

  for (let i = 0; i < players.length; i++) {
    players[i].ready = false;
  }
};

//depending on current phase, will update the game obj accordingly
const nextPhase = () => {
  switch (game.phase) {
    case "starter":
      game.phase = "movement";
      game.turn += 1;
      setMoveOrder();
      safariEncounters = genSafariEncounters();
      players.forEach((player, index) => {
        players[index].inAction = false;
      });
      break;
    case "movement":
      game.phase = "action";
      if (game.turn != game.semiTurn) {
        let order = game.moveOrder.slice();
        order.reverse();
        order.forEach((player) => {
          checkForPvP(pIndex(player));
        });
      }
      break;
    case "action":
      game.phase = "movement";
      setMoveOrder();
      game.turn += 1;
      game.moving = 0;
      inBattle = [];
      battles = [];
      safariEncounters = genSafariEncounters();
      break;
  }

  game.newPhase = true;
  resetPlayerReady();
  io.emit("game-update-state", game);
  game.newPhase = false;
  saveGame();
  if (game.turn == game.semiTurn && game.phase == "action")
    startSemiTournament();
};

//sees if a player is on a tile with another player
const checkForPvP = (i) => {
  let location = players[i].location;
  players.forEach((player, index) => {
    if (
      JSON.stringify(location) == JSON.stringify(player.location) &&
      i != index &&
      !inBattle.includes(index)
    ) {
      battles.push({
        p1: i,
        p2: index,
        confirm: false,
        p1Ready: false,
        p2Ready: false,
      });
      inBattle.push(i);
      inBattle.push(index);
      io.to(players[i].name).emit("pvp-request", battles.length - 1);
    }
  });
};

//starts all queued battles
const startPvPBattle = (battle, index) => {
  if (battle.confirm) {
    let player1 = players[battle.p1];
    let player2 = players[battle.p2];
    let socket1 = sockets[battle.p1];
    let socket2 = sockets[battle.p2];
    pvpBattle(player1, player2, socket1, socket2, index);
  }
};

//sets order in which players will move.
const setMoveOrder = () => {
  let hold = game.moveOrder[0];
  let newMoveOrder = game.moveOrder.slice(1);
  newMoveOrder.push(hold);
  game.moveOrder = newMoveOrder;
  console.log(game.moveOrder);
};

//logic for wild battles
const wildBattle = (socket, id, wildPokemon) => {
  let stream = new Sim.BattleStream();
  let aiState = [];

  //use the first non fainted pokemon
  let indexToUse = 0;
  for (let i = 0; i < players[pIndex(id)].team.length; i++) {
    if (!players[pIndex(id)].team[i].fainted) {
      indexToUse = i;
      break;
    }
  }

  let playerTeam = modifyTeam([players[pIndex(id)].team[indexToUse]]);
  let oppTeam = modifyTeam([wildPokemon]);
  const p1spec = {
    //player
    name: id,
    team: Teams.pack(playerTeam),
  };
  const p2spec = {
    //wild pokemon
    name: "WildBattle",
    team: Teams.pack(oppTeam),
  };

  //starting battle
  stream.write(`>start {"formatid":"gen8ou"}`);
  stream.write(`>player p1 ${JSON.stringify(p1spec)}`);
  stream.write(`>player p2 ${JSON.stringify(p2spec)}`);
  stream.write(`>p1 team 1`);
  stream.write(`>p2 team 1`);

  //---Getting choices from player and writing them to stream---
  socket.on("send-move", (message) => {
    if (stream) {
      console.log("Move from " + id + ": " + message);
      stream.write(`>p1 move ${message}`);
      console.log("wrote to sream p1");
      stream.write(
        `>p2 move ${aiChoice(playerTeam, aiState, oppTeam, "wildbattle")}`
      );
    }
  });

  socket.on("send-switch", (message) => {
    if (stream) {
      console.log("Switch from " + id + ": " + message);
      stream.write(`>p1 switch ${message}`);
      console.log("wrote to sream p1");
    }
  });

  socket.on("end-battle", () => {
    stream = undefined;
    console.log("ending battle...");
  });

  //Battle Stream
  (async () => {
    for await (const output of stream) {
      var tokens = output.split("|");
      console.log(tokens);
      if (tokens[0].includes("sideupdate")) {
        if (tokens[0].includes("p1")) {
          console.log("sending team to p1");
          io.to(id).emit("battle-side-update", tokens[2], true);
        }
        if (tokens[0].includes("p2")) {
          console.log("sending team to p2");
          aiState = tokens[2];
        }
      } else if (tokens[0].includes("update")) {
        console.log("in update");
        io.to(id).emit("battle-field-update", output);
      }

      if (tokens.includes("win")) {
      }
    }
  })();
};

//logic for gymBattle
const gymBattle = (socket, id, gymTeam) => {
  let stream = new Sim.BattleStream();
  let aiState = [];
  let aiAliveMon = { 1: true, 2: true, 3: true };
  let aiMonCurrent = 1;
  let delay = 0;

  //use the first 3 non fainted pokemon
  let monToUse = [];
  players[pIndex(id)].team.forEach((pokemon) => {
    if (!pokemon.fained && monToUse.length < 3) monToUse.push(pokemon);
  });

  let playerTeam = modifyTeam(monToUse);
  let oppTeam = modifyTeam(gymTeam);
  const p1spec = {
    //player
    name: id,
    team: Teams.pack(playerTeam),
  };
  const p2spec = {
    //gym leader
    name: "Gym Leader",
    team: Teams.pack(oppTeam),
  };

  //starting battle
  stream.write(`>start {"formatid":"gen8ou"}`);
  stream.write(`>player p1 ${JSON.stringify(p1spec)}`);
  stream.write(`>player p2 ${JSON.stringify(p2spec)}`);
  stream.write(`>p1 team 1`);
  stream.write(`>p2 team 1`);

  //---Getting choices from player and writing them to stream---
  socket.on("send-move", (message) => {
    if (stream) {
      console.log("Move from " + id + ": " + message);
      stream.write(`>p1 move ${message}`);
      console.log("wrote to sream p1");
      if (aiState.forceSwitch) {
        let rand;
        do {
          rand = getRand(1, 3);
        } while (rand == aiMonCurrent);
        aiMonCurrent = rand;
        setTimeout(() => stream.write(`>p2 switch ${aiMonCurrent}`), delay);
      } else {
        stream.write(
          `>p2 move ${aiChoice(playerTeam, aiState, oppTeam, "gymchallenge")}`
        );
      }
    }
  });

  socket.on("send-switch", (message) => {
    if (stream) {
      console.log("Switch from " + id + ": " + message);
      stream.write(`>p1 switch ${message}`);
      console.log("wrote to sream p1");

      if (!JSON.parse(aiState).wait)
        stream.write(
          `>p2 move ${aiChoice(playerTeam, aiState, oppTeam, "gymchallenge")}`
        );
    }
  });

  socket.on("end-battle", () => {
    stream = undefined;
    console.log("ending battle...");
  });

  //Battle Stream
  (async () => {
    for await (const output of stream) {
      var tokens = output.split("|");
      console.log(tokens);
      delay = calcDelay(output);

      if (tokens[0].includes("sideupdate")) {
        if (tokens[0].includes("p1")) {
          console.log("sending team to p1");
          io.to(id).emit("battle-side-update", tokens[2], true);
        }
        if (tokens[0].includes("p2")) {
          console.log("sending team to p2");
          aiState = tokens[2];
        }
      } else if (tokens[0].includes("update")) {
        console.log("in update");
        io.to(id).emit("battle-field-update", output);
      }

      if (!output.includes("|win") && output.includes("|faint|p2a:")) {
        aiAliveMon[aiMonCurrent] = false;
        aiMonCurrent++;
        setTimeout(() => stream.write(`>p2 switch ${aiMonCurrent}`), delay);
      }

      if (tokens.includes("win")) {
      }
    }
  })();
};

//logic for championBattle
const championBattle = (socket, id, gymTeam) => {
  let stream = new Sim.BattleStream();
  let aiState = [];
  let aiAliveMon = { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true };
  let aiMonCurrent = 1;
  let delay = 0;

  let playerTeam = modifyTeam(players[pIndex(id)].team);
  let oppTeam = modifyTeam(gymTeam);
  const p1spec = {
    //player
    name: id,
    team: Teams.pack(playerTeam),
  };
  const p2spec = {
    //gym leader
    name: "Champion",
    team: Teams.pack(oppTeam),
  };

  //starting battle
  stream.write(`>start {"formatid":"gen8ou"}`);
  stream.write(`>player p1 ${JSON.stringify(p1spec)}`);
  stream.write(`>player p2 ${JSON.stringify(p2spec)}`);
  stream.write(`>p1 team 1`);
  stream.write(`>p2 team 1`);

  //---Getting choices from player and writing them to stream---
  socket.on("send-move", (message) => {
    if (stream) {
      console.log("Move from " + id + ": " + message);
      stream.write(`>p1 move ${message}`);
      console.log("wrote to sream p1");
      if (aiState.forceSwitch) {
        let rand;
        do {
          rand = getRand(1, 3);
        } while (rand == aiMonCurrent);
        aiMonCurrent = rand;
        setTimeout(() => stream.write(`>p2 switch ${aiMonCurrent}`), delay);
      } else {
        stream.write(
          `>p2 move ${aiChoice(playerTeam, aiState, oppTeam, "gymchallenge")}`
        );
      }
    }
  });

  socket.on("send-switch", (message) => {
    if (stream) {
      console.log("Switch from " + id + ": " + message);
      stream.write(`>p1 switch ${message}`);
      console.log("wrote to sream p1");

      if (!JSON.parse(aiState).wait)
        stream.write(
          `>p2 move ${aiChoice(playerTeam, aiState, oppTeam, "gymchallenge")}`
        );
    }
  });

  socket.on("end-battle", () => {
    stream = undefined;
    console.log("ending battle...");
  });

  //Battle Stream
  (async () => {
    for await (const output of stream) {
      var tokens = output.split("|");
      console.log(tokens);
      delay = calcDelay(output);

      if (tokens[0].includes("sideupdate")) {
        if (tokens[0].includes("p1")) {
          console.log("sending team to p1");
          io.to(id).emit("battle-side-update", tokens[2], true);
        }
        if (tokens[0].includes("p2")) {
          console.log("sending team to p2");
          aiState = tokens[2];
        }
      } else if (tokens[0].includes("update")) {
        console.log("in update");
        io.to(id).emit("battle-field-update", output);
      }

      if (!output.includes("|win") && output.includes("|faint|p2a:")) {
        aiAliveMon[aiMonCurrent] = false;
        aiMonCurrent++;
        setTimeout(() => stream.write(`>p2 switch ${aiMonCurrent}`), delay);
      }

      if (tokens.includes("win")) {
      }
    }
  })();
};

//logic for trainer battles
const trainerBattle = (socket, id, pokemon) => {
  let stream = new Sim.BattleStream();
  let aiState = [];

  //use the first non fainted pokemon
  let indexToUse = 0;
  for (let i = 0; i < players[pIndex(id)].team.length; i++) {
    if (!players[pIndex(id)].team[i].fainted) {
      indexToUse = i;
      break;
    }
  }

  let playerTeam = modifyTeam([players[pIndex(id)].team[indexToUse]]);
  let oppTeam = modifyTeam([pokemon]);
  const p1spec = {
    //player
    name: id,
    team: Teams.pack(playerTeam),
  };
  const p2spec = {
    //wild pokemon
    name: "Trainer",
    team: Teams.pack(oppTeam),
  };

  //starting battle
  stream.write(`>start {"formatid":"gen8ou"}`);
  stream.write(`>player p1 ${JSON.stringify(p1spec)}`);
  stream.write(`>player p2 ${JSON.stringify(p2spec)}`);
  stream.write(`>p1 team 1`);
  stream.write(`>p2 team 1`);

  //---Getting choices from player and writing them to stream---
  socket.on("send-move", (message) => {
    if (stream) {
      console.log("Move from " + id + ": " + message);
      stream.write(`>p1 move ${message}`);
      console.log("wrote to sream p1");
      stream.write(
        `>p2 move ${aiChoice(playerTeam, aiState, oppTeam, "trainerbattle")}`
      );
    }
  });

  socket.on("send-switch", (message) => {
    if (stream) {
      console.log("Switch from " + id + ": " + message);
      stream.write(`>p1 switch ${message}`);
      console.log("wrote to sream p1");
    }
  });

  socket.on("end-battle", () => {
    stream = undefined;
    console.log("ending battle...");
  });

  //Battle Stream
  (async () => {
    for await (const output of stream) {
      var tokens = output.split("|");
      console.log(tokens);
      if (tokens[0].includes("sideupdate")) {
        if (tokens[0].includes("p1")) {
          console.log("sending team to p1");
          io.to(id).emit("battle-side-update", tokens[2], true);
        }
        if (tokens[0].includes("p2")) {
          console.log("sending team to p2");
          aiState = tokens[2];
        }
      } else if (tokens[0].includes("update")) {
        console.log("in update");
        io.to(id).emit("battle-field-update", output);
      }

      if (tokens.includes("win")) {
      }
    }
  })();
};

//logic for pvp battles
const pvpBattle = (player1, player2, socket1, socket2, battleIndex) => {
  let stream = new Sim.BattleStream();
  socket1.join("battle" + battleIndex);
  socket2.join("battle" + battleIndex);
  let partySize = game.turn > 20 ? 6 : 3;

  //use the first 3 non fainted pokemon for player 1
  let monToUse = [];
  player1.team.forEach((pokemon) => {
    if (!pokemon.fained && monToUse.length < partySize) monToUse.push(pokemon);
  });

  let p1Team = modifyTeam(monToUse);

  //use the first 3 non fainted pokemon for player 2
  monToUse = [];
  player2.team.forEach((pokemon) => {
    if (!pokemon.fained && monToUse.length < partySize) monToUse.push(pokemon);
  });

  let p2Team = modifyTeam(monToUse);

  const p1spec = {
    //player
    name: player1.name,
    team: Teams.pack(p1Team),
  };
  const p2spec = {
    //gym leader
    name: player2.name,
    team: Teams.pack(p2Team),
  };

  //starting battle
  stream.write(`>start {"formatid":"gen8ou"}`);
  stream.write(`>player p1 ${JSON.stringify(p1spec)}`);
  stream.write(`>player p2 ${JSON.stringify(p2spec)}`);
  stream.write(`>p1 team 1`);
  stream.write(`>p2 team 1`);

  //---Getting choices from players and writing them to stream---
  socket1.on("send-move", (message) => {
    if (stream) {
      console.log("Move from " + player1 + ": " + message);
      stream.write(`>p1 move ${message}`);
      console.log("wrote to sream p1");
    }
  });

  socket1.on("send-switch", (message) => {
    if (stream) {
      console.log("Switch from " + player1 + ": " + message);
      stream.write(`>p1 switch ${message}`);
      console.log("wrote to sream p1");
    }
  });

  socket2.on("send-move", (message) => {
    if (stream) {
      console.log("Move from " + player2 + ": " + message);
      stream.write(`>p2 move ${message}`);
      console.log("wrote to sream p2");
    }
  });

  socket2.on("send-switch", (message) => {
    if (stream) {
      console.log("Switch from " + player2 + ": " + message);
      stream.write(`>p2 switch ${message}`);
      console.log("wrote to sream p2");
    }
  });

  //Battle Stream
  (async () => {
    for await (const output of stream) {
      var tokens = output.split("|");
      console.log(tokens);
      if (tokens[0].includes("sideupdate")) {
        if (tokens[0].includes("p1")) {
          console.log("sending team to p1");
          io.to(player1.name).emit("battle-side-update", tokens[2], true);
        }
        if (tokens[0].includes("p2")) {
          console.log("sending team to p2");
          io.to(player2.name).emit("battle-side-update", tokens[2], false);
        }
      } else if (tokens[0].includes("update")) {
        console.log("in update");
        io.to("battle" + battleIndex).emit("battle-field-update", output);
      }

      if (tokens.includes("win")) {
        stream = undefined;
        socket1.leave("battle" + battleIndex);
        socket2.leave("battle" + battleIndex);
        battles[battleIndex] = undefined;
      }
    }
  })();
};

const genSafariEncounters = () => {
  let encounters = [];
  let cost = 1000;
  for (let i = 0; i < 4; i++) {
    let rand = getRand(0, Object.keys(pokemonData).length - 1);
    let mon = Object.keys(pokemonData)[rand];
    if (encounters.includes(mon)) i--;
    else {
      encounters.push(mon);
      cost += Math.round(Dex.species.get(mon).bst) * 2;
    }
  }

  console.log(encounters);
  return [encounters, cost];
};

//will choose the best move for the ai to use
const aiChoice = (playerTeam, aiState, oppTeam, battletype) => {
  let playerPokeType = Dex.species.get(playerTeam[0].species).types;
  let aiMoves = JSON.parse(aiState);

  aiMoves = aiMoves.active[0].moves;
  let movePowers = {};
  let disabledMoves = [];
  for (let i = 0; i < aiMoves.length; i++) {
    console.log(aiMoves[i]);
    let move = Dex.moves.get(aiMoves[i].move);
    if (!aiMoves[i].disabled) {
      let power = move.basePower;
      switch (Dex.getEffectiveness(move.type, playerPokeType)) {
        case 1:
          power *= 2;
          break;
        case 0:
          break;
        case -1:
          power /= 2;
          break;
      }
      if (oppTeam[0].types.includes(move.type)) power *= 1.5;
      if (!Dex.getImmunity(move.type, playerPokeType)) power = 0;

      movePowers[i + 1] = power;
    } else {
      movePowers[i + 1] = 0;
      disabledMoves.push(i + 1);
    }
  }

  var bestMove = 1;
  for (let i = 1; i <= 4; i++) {
    if (movePowers[i] > movePowers[bestMove]) bestMove = i;
  }

  //chance of picking a random move
  do {
    let rand = getRand(0, 100);
    if (battletype == "wildbattle") {
      if (rand < 75) {
        bestMove = getRand(0, aiMoves.length - 1) + 1;
      }
    }

    if (battletype == "trainerbattle") {
      if (rand < 30) {
        bestMove = getRand(0, aiMoves.length - 1) + 1;
      }
    }

    if (battletype == "gymchallenge") {
      if (rand < 15) {
        bestMove = getRand(0, aiMoves.length - 1) + 1;
      }
    }

    console.log(disabledMoves);
    console.log(bestMove);
  } while (disabledMoves.includes(bestMove));

  return bestMove;
};

//modifies team for showdown simulator
const modifyTeam = (team) => {
  let newTeam = [];
  team.forEach((pokemon) => {
    let modMon = pokemon;
    modMon.shiny = pokemon.isShiny;
    modMon.item = pokemon.item?.name;
    newTeam.push(modMon);
  });

  return newTeam;
};

//approx calc of how long the player has to wait for anims
const calcDelay = (output) => {
  let stream = output.split(/\r?\n/);
  let change = 1;
  let outDelay = 500;
  const addDelay = 1200;

  for (const token of stream) {
    let splitToken = token.split("|");
    let type = splitToken[1];

    switch (type) {
      case "switch":
        if (change % 2 == 0) outDelay += addDelay;
        change++;
        break;
      case "move":
        outDelay += addDelay;
        break;
      case "-supereffective":
        outDelay += addDelay;
        break;
      case "-crit":
        outDelay += addDelay;
        break;
      case "-resisted":
        outDelay += addDelay;
        break;
      case "-immune":
        outDelay += addDelay;

        break;
      case "-heal":
        if (change % 2 == 0) outDelay += addDelay * 2;
        change++;
        break;
      case "-damage":
        if (change % 2 == 0) outDelay += addDelay * 2;
        change++;

        break;
      case "faint":
        outDelay += addDelay;
        break;
      case "cant":
        outDelay += addDelay;
        break;
      case "-fail":
        outDelay += addDelay;
        break;
      case "-status":
        outDelay += addDelay * 2;
        break;
      case "-curestatus":
        outDelay += addDelay * 2;
        break;
      case "-miss":
        outDelay += addDelay;
        break;
      case "-weather":
        outDelay += addDelay;
        break;
      case "-enditem":
        outDelay += addDelay;
        break;
      case "-activate":
        outDelay += addDelay;
        break;
      case "-end":
        outDelay += addDelay;
        break;
      case "-anim":
        outDelay += addDelay;
        break;
      case "-prepare":
        outDelay += addDelay;
        break;
      case "-ability":
        outDelay += addDelay;
        break;
      case "-start":
        outDelay += addDelay;

        break;
      case "-boost":
        outDelay += addDelay * 2;
        break;
      case "-unboost":
        outDelay += addDelay * 2;
        break;
      case "-setboost":
        outDelay += addDelay * 2;
        break;
    }
  }

  return outDelay;
};

//logic for trade
const trade = (player1, player2, socket1, socket2, index) => {
  let player1Accept = false;
  let player2Accept = false;
  let player1Offer = "";
  let player2Offer = "";
  let tradeId = "trade" + index;
  let tradingEnd = false;
  let tradingSuccess = false;

  const updateTrade = () => {
    io.to(tradeId).emit(
      "trade-update",
      player1Offer,
      player2Offer,
      player1Accept,
      player2Accept,
      tradingEnd,
      tradingSuccess
    );

    if (tradingSuccess) {
      tradingEnd = true;
      socket1.leave(tradeId);
      socket2.leave(tradeId);
      trades[index] = undefined;
    }
  };

  socket1.join(tradeId);
  socket2.join(tradeId);

  io.to(player1.name).emit("trade-start", true, player1.name, player2.name);
  io.to(player2.name).emit("trade-start", false, player1.name, player2.name);

  socket1.on("new-trade-offer", (pokemon) => {
    if (!tradingEnd) {
      console.log("p1 Offer - ");
      console.log(pokemon);
      player1Offer = pokemon;

      player1Accept = false;
      player2Accept = false;

      updateTrade();
    }
  });

  socket2.on("new-trade-offer", (pokemon) => {
    if (!tradingEnd) {
      console.log("p2 Offer - ");
      console.log(pokemon);
      player2Offer = pokemon;

      player1Accept = false;
      player2Accept = false;

      updateTrade();
    }
  });

  socket1.on("trade-offer-accept", (accept) => {
    if (!tradingEnd) {
      console.log("p1 accepts trade offer");
      player1Accept = accept;

      if (player1Accept && player2Accept) {
        tradingSuccess = true;
      }

      updateTrade();
    }
  });

  socket2.on("trade-offer-accept", (accept) => {
    if (!tradingEnd) {
      console.log("p2 accepts trade offer");
      player2Accept = accept;

      if (player1Accept && player2Accept) {
        tradingSuccess = true;
      }

      updateTrade();
    }
  });

  socket1.on("end-trade", () => {
    if (!tradingEnd) {
      tradingEnd = true;
      updateTrade();
      socket1.leave(tradeId);
      socket2.leave(tradeId);
      trades[index] = undefined;
      console.log("ending trade");
    }
  });

  socket2.on("end-trade", () => {
    if (!tradingEnd) {
      tradingEnd = true;
      updateTrade();
      socket1.leave(tradeId);
      socket2.leave(tradeId);
      trades[index] = undefined;
      console.log("ending trade");
    }
  });
};

//called when wanting to save the game state
const saveGame = () => {
  let saveData = {};
  saveData.players = players;
  saveData.rules = rules;
  saveData.game = game;
  saveData.safariEncounters = safariEncounters;
  saveData.playerData = playerData;

  writeFile("../data/savedata.json", JSON.stringify(saveData), "utf8");
};

const startSemiTournament = () => {
  let seededPlayers = players.slice();

  seededPlayers.sort((a, b) => {
    if (playerData[a.name].candiesSpent < playerData[b.name].candiesSpent)
      return 1;
    if (playerData[a.name].candiesSpent > playerData[b.name].candiesSpent)
      return -1;
    return 0;
  });

  let battleIndex = 0;
  for (let i = seededPlayers.length - 1; i > 0; i = i - 2) {
    if (i - 1 >= 0)
      battles.push({
        p1: pIndex(seededPlayers[i].name),
        p2: pIndex(seededPlayers[i - 1].name),
        confirm: true,
        p1Ready: false,
        p2Ready: false,
      });
    inBattle.push(pIndex(seededPlayers[i].name));
    inBattle.push(pIndex(seededPlayers[i - 1].name));
    // io.to(seededPlayers[i].name).emit("pvp-request", battles.length - 1);
    io.to(seededPlayers[i].name).emit(
      "pvpbattle-confirmed",
      battleIndex,
      battles[battleIndex].p1,
      battles[battleIndex].p2,
      players
    );
    io.to(seededPlayers[i - 1].name).emit(
      "pvpbattle-confirmed",
      battleIndex,
      battles[battleIndex].p1,
      battles[battleIndex].p2,
      players
    );
    battleIndex++;
  }
};

httpServer.listen(3001);
