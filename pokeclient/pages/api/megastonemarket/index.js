const { Dex } = require("pokemon-showdown");
const megaStore = require("../../../../data/mega-stones.json");

const generateStore = () => {
  let store = [];

  Object.keys(megaStore).forEach((stone) => {
    let showdownInfo = Dex.items.get(stone);
    let stoneInfo = {
      name: showdownInfo.name,
      id: showdownInfo.id,
      type: "mega-stone",
      desc: showdownInfo.desc,
      cost: megaStore[stone].cost,
    };
    store.push(stoneInfo);
  });

  return store;
};

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      let shop = generateStore();
      res.status(200).json({ data: shop });
      break;
  }
}
