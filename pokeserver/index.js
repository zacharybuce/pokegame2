import { Server } from "socket.io";
import { createServer } from "http";
import Sim from "pokemon-showdown";
import Poke from "pokemon-showdown";

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
  maxTurns: 30,
  moveOrder: [],
  moving: 0,
  newPhase: false,
};
var startTown = { pickOrder: [], townsChoosen: [] };

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
      });
      if (players.length == 1) {
        players[0].isHost = true;
      }
      //reconnect player by sending game info
    } else {
      io.to(id).emit("reconnect");
    }

    io.emit("lobby-player-update", players);
  });

  //Player is ready to start the game
  socket.on("lobby-player-ready", () => {
    console.log(id + " is ready");
    players[pIndex(id)].ready = true;
    io.emit("lobby-player-update", players);
    playersReady++;

    if (playersReady == players.length) startGame();
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
    players[pIndex(id)].badges = badges;
    io.emit("game-update-players", players);
  });

  //a player has moved to a new tile
  socket.on("game-move", (location) => {
    players[pIndex(id)].location = {
      q: location.coord.q,
      r: location.coord.r,
      s: location.coord.s,
    };

    let message = id + " moved to " + location.tile;

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
      break;
    case "movement":
      game.phase = "action";
      break;
    case "action":
      game.phase = "movement";
      setMoveOrder();
      game.turn += 1;
      game.moving = 0;
      break;
  }

  game.newPhase = true;
  resetPlayerReady();
  io.emit("game-update-state", game);
  game.newPhase = false;
};

//sets order in which players will move.
const setMoveOrder = () => {
  let hold = game.moveOrder[0];
  game.moveOrder[0] = game.moveOrder[game.moveOrder.length - 1];
  game.moveOrder[game.moveOrder.length - 1] = hold;
};

//logic for wild battles
const wildBattle = (socket, id, wildPokemon) => {
  let stream = new Sim.BattleStream();
  let aiState = [];
  let playerTeam = modifyTeam(players[pIndex(id)].team);
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
      stream.write(`>p2 move ${aiChoice(playerTeam, aiState, oppTeam)}`);
    }
  });

  socket.on("send-switch", (message) => {
    if (stream) {
      console.log("Switch from " + id + ": " + message);
      stream.write(`>p1 switch ${message}`);
      console.log("wrote to sream p1");
    }
  });

  socket.on("end-wild-battle", () => {
    stream = undefined;
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

//will choose the best move for the ai to use
const aiChoice = (playerTeam, aiState, oppTeam) => {
  let playerPokeType = Dex.species.get(playerTeam[0].species).types;
  let aiMoves = JSON.parse(aiState);
  aiMoves = aiMoves.active[0].moves;
  let movePowers = {};

  for (let i = 0; i < aiMoves.length; i++) {
    let move = Dex.moves.get(aiMoves[i].move);
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
  }

  var bestMove = 1;
  for (let i = 1; i <= 4; i++) {
    if (movePowers[i] > movePowers[bestMove]) bestMove = i;
  }

  if (movePowers[bestMove] <= 1) {
    let rand = getRand(0, 100);
    if (rand < 25) {
      bestMove = getRand(0, aiMoves.length - 1) + 1;
    }
  }

  return bestMove;
};

//modifies team for showdown simulator
const modifyTeam = (team) => {
  let newTeam = [];
  team.forEach((pokemon) => {
    let modMon = pokemon;
    modMon.shiny = pokemon.shiny;
    modMon.item = pokemon.item.name;
    newTeam.push(modMon);
  });

  return newTeam;
};

httpServer.listen(3001);
