import { Server } from "socket.io";
import { createServer } from "http";

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
  phase: "action",
};

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
});

//Start the game once everyone in the lobby is ready
const startGame = () => {
  io.emit("start-game");
  resetPlayerReady();
};

//given the id of a player, will return the index in player array
const pIndex = (id) => {
  for (let index = 0; index < players.length; index++) {
    if (players[index].name == id) return index;
  }

  return Error;
};

//changes the ready count to zero and changes each ready status to false in player array
const resetPlayerReady = () => {
  playersReady = 0;

  for (let i = 0; i < players.length; i++) {
    players[i].ready = false;
  }
};

httpServer.listen(3001);
