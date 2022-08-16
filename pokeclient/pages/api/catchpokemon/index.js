const { Dex } = require("pokemon-showdown");
const captureRates = require("../../../../data/capture-rates.json");

//better than math rand
function genRand(min, max) {
  return (
    (Math.floor(Math.pow(10, 14) * Math.random() * Math.random()) %
      (max - min + 1)) +
    min
  );
}

const catchPokemon = (data) => {
  let id = Dex.species.get(data.name).id;
  let rate = captureRates[id];
  let ballBonus;
  let hp = data.hp;
  let status = data.status == "none" ? 1 : 1.5;

  console.log(data);

  switch (data.ball) {
    case "poke":
      ballBonus = 1;
      break;
    case "great":
      ballBonus = 1.5;
      break;
    case "ultra":
      ballBonus = 2;
      break;
  }

  let a = (((300 - 2 * hp) * rate * ballBonus) / 300) * status;
  let b = 1048560 / Math.sqrt(Math.sqrt(16711680 / a));

  let shakes = 0;

  for (let i = 0; i < 4; i++) {
    let rand = genRand(0, 65535);
    if (rand < b) shakes++;
  }

  let caught = shakes == 4;
  console.log(caught);
  return { shakes: shakes, caught: caught };
};

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      res.status(200).json({ data: catchPokemon(req.body) });
      break;
  }
}
