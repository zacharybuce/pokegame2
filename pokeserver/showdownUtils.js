import Poke from "pokemon-showdown";
const Dex = Poke.Dex;

const pokemon = {
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

const natureMod = {
  Adamant: { hp: 1, atk: 1.1, def: 1, spa: 0.9, spd: 1, spe: 1 },
  Bashful: { hp: 1, atk: 1, def: 1, spa: 1, spd: 1, spe: 1 },
  Bold: { hp: 1, atk: 0.9, def: 1.1, spa: 1, spd: 1, spe: 1 },
  Brave: { hp: 1, atk: 1.1, def: 1, spa: 1, spd: 1, spe: 0.9 },
  Calm: { hp: 1, atk: 0.9, def: 1, spa: 1, spd: 1.1, spe: 1 },
  Careful: { hp: 1, atk: 1, def: 1, spa: 0.9, spd: 1.1, spe: 1 },
  Docile: { hp: 1, atk: 1, def: 1, spa: 1, spd: 1, spe: 1 },
  Gentle: { hp: 1, atk: 1, def: 0.9, spa: 1, spd: 1.1, spe: 1 },
  Hardy: { hp: 1, atk: 1, def: 1, spa: 1, spd: 1, spe: 1 },
  Hasty: { hp: 1, atk: 1, def: 0.9, spa: 1, spd: 1, spe: 1.1 },
  Impish: { hp: 1, atk: 1, def: 1.1, spa: 0.9, spd: 1, spe: 1 },
  Jolly: { hp: 1, atk: 1, def: 1, spa: 0.9, spd: 1, spe: 1.1 },
  Lax: { hp: 1, atk: 1, def: 1.1, spa: 1, spd: 0.9, spe: 1 },
  Lonely: { hp: 1, atk: 1.1, def: 0.9, spa: 1, spd: 1, spe: 1 },
  Mild: { hp: 1, atk: 1, def: 0.9, spa: 1.1, spd: 1, spe: 1 },
  Modest: { hp: 1, atk: 0.9, def: 1, spa: 1.1, spd: 1, spe: 1 },
  Naive: { hp: 1, atk: 1, def: 1, spa: 1, spd: 0.9, spe: 1.1 },
  Naughty: { hp: 1, atk: 1.1, def: 1, spa: 1, spd: 0.9, spe: 1 },
  Quiet: { hp: 1, atk: 1, def: 1, spa: 1.1, spd: 1, spe: 0.9 },
  Quirky: { hp: 1, atk: 1, def: 1, spa: 1, spd: 1, spe: 1 },
  Rash: { hp: 1, atk: 1, def: 1, spa: 1.1, spd: 0.9, spe: 1 },
  Relaxed: { hp: 1, atk: 1, def: 1.1, spa: 1, spd: 1, spe: 0.9 },
  Sassy: { hp: 1, atk: 1, def: 1, spa: 1, spd: 1.1, spe: 0.9 },
  Serious: { hp: 1, atk: 1, def: 1, spa: 1, spd: 1, spe: 1 },
  Timid: { hp: 1, atk: 0.9, def: 1, spa: 1, spd: 1, spe: 1.1 },
};

const calcStat = (stat, base, level, iv, ev, nature) => {
  let A = 0;
  let B = 5;

  if (stat == "hp") {
    A = 100;
    B = 10;
  }

  let num =
    (((2 * base + iv + ev / 4 + A) * level) / 100 + B) *
    natureMod[nature][stat];

  return Math.floor(num);
};

const genStats = (pokemon) => {
  let stats = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };
  for (const key in stats) {
    if (Object.hasOwnProperty.call(stats, key)) {
      stats[key] = calcStat(
        key,
        pokemon.baseStats[key],
        pokemon.level,
        pokemon.ivs[key],
        pokemon.evs[key],
        pokemon.nature
      );
    }
  }

  return stats;
};

console.log(genStats(pokemon));
