const { Dex } = require("pokemon-showdown");

const generateItem = (item) => {
  var itemData = { name: "", id: "", type: "", desc: "" };
  const showdownItem = Dex.items.get(item);

  if (showdownItem.exists) {
    itemData.name = showdownItem.name;

    if (showdownItem.isBerry) {
      itemData.type = "berry";
      itemData.id = showdownItem.name.split(" ")[0].toLowerCase();
    } else if (showdownItem.isPokeball) {
      itemData.type = "ball";
      itemData.id = showdownItem.name.split(" ")[0].toLowerCase();
    } else if (showdownItem.megaStone) {
      itemData.type = "mega-stone";
      itemData.id = showdownItem.name.split(" ")[0].toLowerCase();
      itemData.cost = 5000;
    } else {
      itemData.type = "hold-item";
      itemData.id = showdownItem.name.replace(" ", "-").toLowerCase();
    }

    itemData.desc = showdownItem.desc;
  }

  return itemData;
};

export default function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      res.status(200).json({ data: generateItem(id) });
      break;
  }
}
