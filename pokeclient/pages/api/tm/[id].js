const { Dex } = require("pokemon-showdown");

const generateTM = (item) => {
  var itemData = { name: item, id: "", type: "tm" };

  const showdownMove = Dex.moves.get(item);
  itemData.id = showdownMove.type.toLowerCase();
  itemData.move = {
    type: showdownMove.type,
    accuracy: showdownMove.accuracy,
    basePower: showdownMove.basePower,
    category: showdownMove.category,
    desc: showdownMove.desc,
  };

  return itemData;
};

export default function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      res.status(200).json({ data: generateTM(id) });
      break;
  }
}
