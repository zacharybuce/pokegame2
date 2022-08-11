const { Dex } = require("pokemon-showdown");
const pokemonData = require("../../../../data/pokemon.json");

//better than math rand
function genRand(min, max) {
  return (
    (Math.floor(Math.pow(10, 14) * Math.random() * Math.random()) %
      (max - min + 1)) +
    min
  );
}

const evolve = (sentMon) => {
  const evoSpecies = Dex.species.get(sentMon.species).evos;
  var chosenEvo;

  if (evoSpecies.length == 1) chosenEvo = evoSpecies[0];
  else {
    let num = genRand(0, evoSpecies.length - 1);
    chosenEvo = evoSpecies[num];
  }

  //gen new mon
  let pokemon = pokemonData[chosenEvo];
  const showdownMon = Dex.species.get(chosenEvo);
  if (pokemon.evolveCandies != "MAX")
    pokemon.evolveCandies += sentMon.evolveCandies;

  pokemon.level = sentMon.level;
  pokemon.ability = generateAbility(showdownMon, sentMon);
  pokemon.nature = sentMon.nature;
  pokemon.gender = sentMon.gender;
  pokemon.types = showdownMon.types;
  pokemon.item = sentMon.item;
  pokemon.moves = sentMon.moves;
  pokemon.learnset = generateLearnset(pokemon, sentMon);
  pokemon.evs = sentMon.evs;
  pokemon.ivs = sentMon.ivs;
  pokemon.baseStats = showdownMon.baseStats;
  pokemon.isShiny = sentMon.isShiny;
  pokemon.candiesSpent = sentMon.candiesSpent;
  pokemon.exhaustion = sentMon.exhaustion;
  pokemon.fainted = sentMon.fainted;
  pokemon.id = pokemon.species.toLowerCase().replace("’", ""); //for sprite
  pokemon.dragId = sentMon.dragId; //for drag and drop

  return pokemon;
};

const generateAbility = (showdownMon, sentMon) => {
  //the pokemon wont get a new ability if abilities are the same for evo
  if (Object.values(showdownMon.abilities).includes(sentMon.ability))
    return sentMon.ability;

  let rand = genRand(0, Object.keys(showdownMon.abilities).length - 1);

  if (showdownMon.abilities["H"]) {
    if (rand == Object.keys(showdownMon.abilities).length - 1) rand = "H";
    if (rand != "H") rand = JSON.stringify(rand);
  } else if (Object.keys(showdownMon.abilities).length == 1) {
    rand = 0;
  }

  return showdownMon.abilities[rand];
};

const generateLearnset = (pokemon, sentMon) => {
  let learnset = sentMon.learnset; //one to return
  let learnsetMod = modifyLearnset(learnset); //modify for algo
  let learnsetNames = Object.keys(learnsetMod); // for the use of includes

  for (let i = 0; i < pokemon.learnset.length; i++) {
    if (!learnsetNames.includes(pokemon.learnset[i].move)) {
      learnset.push(pokemon.learnset[i]);
    } else {
      let oldLearnLevel = learnsetMod[pokemon.learnset[i].move].level;
      let newLearnLevel = pokemon.learnset[i].level;

      if (
        sentMon.candiesSpent < Math.round(oldLearnLevel / 4) &&
        oldLearnLevel < newLearnLevel
      ) {
        learnset[learnsetMod[pokemon.learnset[i].move].index].level =
          pokemon.learnset[i].level;
      }
    }
  }

  learnset.sort(sortFunc);

  return learnset;
};

const modifyLearnset = (learnset) => {
  let names = {};

  for (let i = 0; i < learnset.length; i++) {
    names[learnset[i].move] = {};
    names[learnset[i].move].level = learnset[i].level;
    names[learnset[i].move].index = i;
  }

  return names;
};

const sortFunc = (a, b) => {
  return a.level - b.level;
};

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      const pokemon = evolve(req.body);
      res.status(200).json({ data: pokemon });
      break;
  }
}
