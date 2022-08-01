const { Dex } = require("pokemon-showdown");
const itemTable = require("../../../../data/item-rarities.json");

//better than math rand
function rand(min, max) {
  return (
    (Math.floor(Math.pow(10, 14) * Math.random() * Math.random()) %
      (max - min + 1)) +
    min
  );
}

const generateShop = () => {
  const items = [];

  for (let i = 0; i < 3; i++) {
    let rarity = rollRarity();
    let itemName = rollItem(rarity);
    if (!isDuplicate(items, itemName)) {
      let item = generateItem(itemName, rarity);
      items.push(item);
    } else {
      i--;
    }
  }

  return items;
};

const rollRarity = () => {
  let roll = rand(1, 100);

  if (roll < 35) return "common";
  if (35 <= roll && roll < 68) return "uncommon";
  if (68 <= roll && roll < 86) return "rare";
  if (86 <= roll && roll < 94) return "epic";
  if (94 <= roll) return "legendary";
};

const rollItem = (rarity) => {
  let max = itemTable[rarity].items.length;
  let roll = rand(0, max - 1);
  return itemTable[rarity].items[roll];
};

const generateItem = (itemName, rarity) => {
  let item;
  const showdownItem = Dex.items.get(itemName);

  console.log(showdownItem);

  if (showdownItem.exists) item = generateHeldItem(showdownItem);
  else item = generateTm(itemName);

  item.cost = itemTable[rarity].cost;
  item.rarity = rarity;
  return item;
};

const generateHeldItem = (showdownItem) => {
  var itemData = {};
  itemData.name = showdownItem.name;

  if (showdownItem.isBerry) {
    itemData.type = "berry";
    itemData.id = showdownItem.name.split(" ")[0].toLowerCase();
  } else if (showdownItem.isGem) {
    itemData.type = "gem";
    itemData.id = showdownItem.name.split(" ")[0].toLowerCase();
  } else if (showdownItem.onPlate) {
    itemData.type = "plate";
    itemData.id = showdownItem.name.split(" ")[0].toLowerCase();
  } else if (showdownItem.name.split(" ")[1] == "Incense") {
    itemData.type = "incense";
    itemData.id = showdownItem.name.split(" ")[0].toLowerCase();
  } else {
    itemData.type = "hold-item";
    itemData.id = showdownItem.name.replace(" ", "-").toLowerCase();
  }

  itemData.desc = showdownItem.desc;

  return itemData;
};

const generateTm = (itemName) => {
  var itemData = { name: itemName, id: "", type: "tm" };

  const showdownMove = Dex.moves.get(itemName);
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

const isDuplicate = (items, itemName) => {
  for (let i = 0; i < items.length; i++) {
    if (items[i].name == itemName) return true;
  }

  return false;
};

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      const items = generateShop();
      res.status(200).json({ data: items });
      break;
  }
}
