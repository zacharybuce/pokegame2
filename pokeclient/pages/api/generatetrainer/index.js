const { Dex } = require("pokemon-showdown");
const pokemonData = require("../../../../data/pokemon.json");
const trainerData = require("../../../../data/trainers-hoen.json");

//better than math rand
function genRand(min, max) {
  return (
    (Math.floor(Math.pow(10, 14) * Math.random() * Math.random()) %
      (max - min + 1)) +
    min
  );
}

const generatePokemon = (req) => {
  let pokemon = pokemonData[req.name];
  const showdownMon = Dex.species.get(req.name);

  pokemon.level = req.level;
  pokemon.ability = generateAbility(showdownMon);
  pokemon.nature = generateNature();
  pokemon.gender = generateGender();
  pokemon.types = showdownMon.types;
  pokemon.item = "";
  pokemon.moves = generateMoves(
    req.candiesSpent,
    pokemon.levelUpIncrease,
    pokemon.learnset
  );
  pokemon.evs = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };
  pokemon.ivs = generateIvs();
  pokemon.baseStats = showdownMon.baseStats;
  pokemon.isShiny = generateShiny();
  pokemon.candiesSpent = req.candiesSpent;
  pokemon.exhaustion = 0;
  pokemon.fainted = false;
  pokemon.id = pokemon.species.toLowerCase().replace("’", ""); //for sprite
  pokemon.dragId = JSON.stringify(Date.now()); //for drag and drop

  if (pokemon.isShiny)
    pokemon.ivs = { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 };
  return pokemon;
};

const generateAbility = (showdownMon) => {
  let rand = genRand(0, Object.keys(showdownMon.abilities).length - 1);

  return showdownMon.abilities[Object.keys(showdownMon.abilities)[rand]];
};

const generateNature = () => {
  const natures = [
    "Hardy",
    "Lonely",
    "Brave",
    "Adamant",
    "Naughty",
    "Bold",
    "Docile",
    "Relaxed",
    "Impish",
    "Lax",
    "Timid",
    "Hasty",
    "Serious",
    "Jolly",
    "Naive",
    "Modest",
    "Mild",
    "Quiet",
    "Bashful",
    "Rash",
    "Calm",
    "Gentle",
    "Sassy",
    "Careful",
    "Quirky",
  ];

  let rand = genRand(0, natures.length);
  return natures[rand];
};

const generateGender = () => {
  let rand = genRand(1, 100);

  if (rand < 50) return "M";
  else return "F";
};

const generateMoves = (candiesSpent, levelUpIncrease, learnset) => {
  let moves = [];
  let learnLevel = candiesSpent * levelUpIncrease;
  if (learnLevel === 0) learnLevel = 1;

  let possibleMoves = getPossibleMoves(learnLevel, learnset);

  if (possibleMoves.length == 4) moves = possibleMoves;
  else moves = selectMoves(possibleMoves);

  return moves;
};

const getPossibleMoves = (learnLevel, learnset) => {
  const possibleMoves = [];

  for (let i = 0; i < learnset.length; i++) {
    if (learnset[i].level <= learnLevel || possibleMoves.length < 4) {
      possibleMoves.push(learnset[i].move);
    } else break;
  }

  return possibleMoves;
};

const selectMoves = (possibleMoves) => {
  let moves = [];
  let maxMoves = 4;

  if (possibleMoves.length < 4) maxMoves = possibleMoves.length;

  for (let i = 0; i < maxMoves; i++) {
    let move = possibleMoves[genRand(0, possibleMoves.length - 1)];

    if (moves.includes(move)) i--;
    else moves.push(move);
  }

  return moves;
};

const generateIvs = () => {
  let ivs = {};
  ivs.hp = genRand(1, 31);
  ivs.atk = genRand(1, 31);
  ivs.def = genRand(1, 31);
  ivs.spa = genRand(1, 31);
  ivs.spd = genRand(1, 31);
  ivs.spe = genRand(1, 31);

  return ivs;
};

const generateShiny = () => {
  let rand = genRand(1, 100);

  if (rand == 100) return true;
  else return false;
};

const getRandPokemon = (trainer, badges) => {
  let difficulty;

  if (badges < 3) difficulty = "Easy";
  else if (badges < 6) difficulty = "Medium";
  else if (badges < 9) difficulty = "Hard";

  let possibleMon = trainerData[trainer][difficulty];

  let rand = genRand(0, possibleMon.length - 1);
  return possibleMon[rand];
};

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      console.log(req.body);

      let pokemon = getRandPokemon(req.body.trainer, req.body.badges);
      let data = req.body;
      data.name = pokemon;
      console.log(data);
      res.status(200).json({ data: generatePokemon(data) });
      break;
  }
}
