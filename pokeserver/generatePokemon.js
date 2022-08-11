import Poke from "pokemon-showdown";
import Sim from "pokemon-showdown";
import { readFile, writeFile } from "fs/promises";
import fs from "fs";
import path from "path";
import csv from "fast-csv";

const pokeEx = {
  exists: true,
  tags: [],
  num: 60,
  name: "Poliwag",
  types: ["Water"],
  baseStats: { hp: 40, atk: 50, def: 40, spa: 40, spd: 40, spe: 90 },
  abilities: { 0: "Water Absorb", 1: "Damp", H: "Swift Swim" },
  heightm: 0.6,
  weightkg: 12.4,
  color: "Blue",
  evos: ["Poliwhirl"],
  eggGroups: ["Water 1"],
  tier: "LC",
  id: "poliwag",
  fullname: "pokemon: Poliwag",
  effectType: "Pokemon",
  gen: 1,
  shortDesc: "",
  desc: "",
  isNonstandard: null,
  duration: undefined,
  noCopy: false,
  affectsFainted: false,
  status: undefined,
  weather: undefined,
  sourceEffect: "",
  baseSpecies: "Poliwag",
  forme: "",
  baseForme: "",
  cosmeticFormes: undefined,
  otherFormes: undefined,
  formeOrder: undefined,
  spriteid: "poliwag",
  addedType: undefined,
  prevo: "",
  doublesTier: "LC",
  evoType: undefined,
  evoMove: undefined,
  evoLevel: undefined,
  nfe: true,
  canHatch: true,
  gender: "",
  genderRatio: { M: 0.5, F: 0.5 },
  requiredItem: undefined,
  requiredItems: undefined,
  bst: 300,
  weighthg: 124,
  unreleasedHidden: false,
  maleOnlyHidden: false,
  maxHP: undefined,
  isMega: undefined,
  canGigantamax: undefined,
  gmaxUnreleased: false,
  cannotDynamax: false,
  battleOnly: undefined,
  changesFrom: undefined,
};
const Dex = Poke.Dex;
var ids = [];

//sorting function to sort moves by level learned - increasing
const moveSortFunction = (a, b) => {
  if (parseInt(a.level) < parseInt(b.level)) return -1;
  if (parseInt(a.level) > parseInt(b.level)) return 1;
  return 0;
};

//takes a pokemons id and gen and returns the moves it can learn through level up as an array
const getMoves = (pokemon, gen) => {
  if (!gen) gen = 8;
  const learnset = Dex.species.getLearnset(pokemon.id);
  const newLearnset = [];
  var i = 0;

  while (newLearnset.length == 0) {
    gen = gen - i;
    for (const move in learnset) {
      learnset[move].forEach((entry) => {
        if (entry.startsWith(gen + "L")) {
          const moveEntry = {
            move: move,
            level: `${entry.charAt(2)}${entry.charAt(3)}`,
          };
          newLearnset.push(moveEntry);
        }
      });
    }
    i++;
  }
  newLearnset.sort(moveSortFunction);
  return newLearnset;
};

//takes a pokemon obj and returns the candies needed to evolve the pokemon
//based on the bst of its evolution
const getEvolveCandies = (pokemon) => {
  if (pokemon.evos.length < 1) return "MAX";
  const evolutionBST = Dex.species.get(pokemon.evos[0]).bst;
  const evolveCandies = Math.round(evolutionBST / 60);
  return evolveCandies;
};

//takes a pokemon obj and returns the candies needed to lvl up. This is based
//on the final evolution of the pokemon
const getLevelUpCandies = (pokemon) => {
  var finalEvo = pokemon;
  while (finalEvo.evos.length >= 1) {
    finalEvo = Dex.species.get(finalEvo.evos[0]);
  }
  const lvlUpCandy = Math.floor(finalEvo.bst / 100);
  return lvlUpCandy;
};

//takes a pokemon obj and returns the amount of levels a pokemon increases per lvl up.
const getLevelUpIncrease = (pokemon) => {
  var finalEvo = pokemon;
  while (finalEvo.evos.length >= 1) {
    finalEvo = Dex.species.get(finalEvo.evos[0]);
  }

  const levelUpIncrease = Math.round(1340 / finalEvo.bst);
  if (levelUpIncrease < 1) levelUpIncrease = 1;
  return levelUpIncrease;
};

//generates data for a pokemon given an pokemon obj from showdown dex
const genPokemonData = (pokemon) => {
  const data = {
    species: pokemon.name,
    num: ids[pokemon.spriteid],
    learnset: getMoves(pokemon, 8),
    evolveCandies: getEvolveCandies(pokemon),
    levelUpCandies: getLevelUpCandies(pokemon),
    levelUpIncrease: getLevelUpIncrease(pokemon),
  };

  return data;
};

//------------------------------------------------
const showdownMon = Dex.species.all();

fs.createReadStream("C:/Users/zacha/VSCode/pokegame2/data/pokemon_forms.csv")
  .pipe(csv.parse({ headers: true }))
  .on("error", (error) => console.error(error))
  .on("data", (row) => {
    ids[row.identifier] = row.pokemon_id;
  })
  .on("end", (rowCount) => {
    console.log(`Parsed ${rowCount} rows`);

    const pokemonData = {};
    showdownMon.forEach((pokemon, index) => {
      console.log(index);
      if (
        (pokemon.forme === "" ||
          pokemon.forme === "Alola" ||
          pokemon.forme === "Galar") &&
        pokemon.num > 0
      )
        pokemonData[pokemon.name] = genPokemonData(pokemon);
    });

    writeFile("pokemon.json", JSON.stringify(pokemonData), "utf8");
  });

// console.log(Dex.species.get("raichu-alola"));

const learnEx = {
  aerialace: ["7M", "6M", "5M", "4M", "3M"],
  agility: ["8M", "8L20", "8V", "7L30", "7V", "6L30", "5L42", "4L39", "3L43"],
  attract: ["8M", "7M", "7V", "6M", "5M", "4M", "3M"],
  bide: ["7V"],
  bite: [
    "8L8",
    "8V",
    "7L1",
    "7V",
    "6L1",
    "5L1",
    "5D",
    "4L1",
    "3L1",
    "3S1",
    "3S2",
  ],
  bodyslam: ["8M", "7E", "7V", "6E", "5E", "5D", "4E", "3T", "3E"],
  burnup: ["7E"],
  captivate: ["4M"],
  charm: ["3S2"],
  closecombat: ["8M", "7E", "6E", "5E"],
  confide: ["7M", "6M"],
  covet: ["8E", "7T", "7E", "6T", "6E", "5T", "5E"],
  crunch: [
    "8M",
    "8L32",
    "8V",
    "7L39",
    "7E",
    "7V",
    "6L39",
    "6E",
    "5L45",
    "5E",
    "4L42",
    "4E",
    "3E",
  ],
  curse: ["7V"],
  dig: ["8M", "8V", "7V", "6M", "5M", "4M", "3M"],
  doubleedge: ["8E", "7E", "7V", "6E", "5E", "4E", "3T"],
  doublekick: ["8E", "7E", "6E", "5E"],
  doubleteam: ["7M", "7V", "6M", "5M", "4M", "3M"],
  dragonbreath: ["7V"],
  dragonrage: ["7V"],
  ember: ["8L1", "8V", "7L6", "7V", "6L6", "5L6", "4L6", "3L7", "3S1"],
  endure: ["8M", "7V", "5D", "4M", "3T"],
  facade: ["8M", "8V", "7M", "6M", "5M", "4M", "3M"],
  fireblast: ["8M", "8V", "7M", "7V", "6M", "5M", "4M", "3M"],
  firefang: ["8M", "8L24", "7L21", "6L21", "5L28", "4L28"],
  firespin: ["8M", "7E", "7V", "6E", "5E", "4E", "3E"],
  flameburst: ["7L28", "6L28", "5L31"],
  flamecharge: ["7M", "6M", "5M"],
  flamethrower: [
    "8M",
    "8L40",
    "8V",
    "7M",
    "7L34",
    "7V",
    "6M",
    "6L34",
    "5M",
    "5L39",
    "4M",
    "4L34",
    "3M",
    "3L49",
    "3S2",
  ],
  flamewheel: ["8L12", "7L17", "7V", "6L17", "5L20", "4L20", "3L31", "3S0"],
  flareblitz: [
    "8M",
    "8L56",
    "8V",
    "7L45",
    "7E",
    "6L45",
    "6E",
    "5L56",
    "5E",
    "4L48",
    "4E",
  ],
  frustration: ["7M", "7V", "6M", "5M", "4M", "3M"],
  headbutt: ["8V", "7V", "4T"],
  heatwave: [
    "8M",
    "8V",
    "7T",
    "7L41",
    "7E",
    "6T",
    "6L41",
    "6E",
    "5T",
    "5L51",
    "5E",
    "4T",
    "4L45",
    "4E",
    "3E",
  ],
  helpinghand: [
    "8M",
    "8L16",
    "8V",
    "7T",
    "7L12",
    "6T",
    "6L12",
    "5T",
    "5L17",
    "4T",
    "4L17",
    "3L37",
  ],
  hiddenpower: ["7M", "7V", "6M", "5M", "4M", "3M"],
  howl: ["8L4", "7E", "6E", "5E", "4E", "3E"],
  incinerate: ["6M", "5M"],
  irontail: ["8M", "8V", "7T", "7E", "7V", "6T", "6E", "5T", "5E", "4M", "3M"],
  leer: ["8L1", "8V", "7L8", "7V", "6L8", "5L9", "4L9", "3L13", "3S0"],
  mimic: ["7V", "3T"],
  morningsun: ["8E", "7E", "6E", "5E", "4E"],
  mudslap: ["4T"],
  naturalgift: ["4M"],
  odorsleuth: ["7L10", "6L10", "5L14", "4L14", "3L19", "3S0"],
  outrage: ["8M", "8V", "7T", "7L43", "6T", "6L43", "5T", "5L43"],
  overheat: ["8M", "7M", "6M", "5M", "4M", "3M"],
  playrough: ["8M", "8L48", "8V"],
  protect: ["8M", "8V", "7M", "7V", "6M", "5M", "4M", "3M"],
  psychicfangs: ["8M"],
  rage: ["7V"],
  reflect: ["8V", "7V"],
  rest: ["8M", "8V", "7M", "7V", "6M", "5M", "4M", "3M"],
  retaliate: ["8M", "8L28", "7L32", "6M", "6L32", "5M", "5L48"],
  return: ["7M", "7V", "6M", "5M", "4M", "3M"],
  reversal: ["8M", "8L52", "7L19", "6L19", "5L25", "4L25"],
  roar: [
    "8L44",
    "8V",
    "7M",
    "7L1",
    "7V",
    "6M",
    "6L1",
    "5M",
    "5L1",
    "5D",
    "4M",
    "4L1",
    "3M",
    "3L1",
    "3S1",
  ],
  rocksmash: ["7V", "6M", "5M", "4M", "3M"],
  round: ["8M", "7M", "6M", "5M"],
  safeguard: ["8M", "7M", "7V", "6M", "5M", "4E", "3E"],
  secretpower: ["6M", "4M", "3M"],
  skullbash: ["7V"],
  sleeptalk: ["8M", "7M", "7V", "6M", "5T", "4M", "3T"],
  snarl: ["8M", "7M", "6M", "5M"],
  snore: ["8M", "7T", "7V", "6T", "5T", "4T", "3T"],
  strength: ["6M", "5M", "4M", "3M"],
  substitute: ["8M", "8V", "7M", "7V", "6M", "5M", "4M", "3T"],
  sunnyday: ["8M", "7M", "7V", "6M", "5M", "4M", "3M"],
  swagger: ["7M", "7V", "6M", "5M", "4M", "3T"],
  toxic: ["8V", "7M", "7V", "6M", "5M", "4M", "3M"],
  wildcharge: ["8M", "7M", "6M", "5M"],
  willowisp: ["8M", "8V", "7M", "6M", "5M", "4M"],
};
