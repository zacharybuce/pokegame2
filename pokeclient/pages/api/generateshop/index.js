const { Dex } = require("pokemon-showdown");
const itemTable = require("../../../../data/item-rarities.json");
const tmTable = require("../../../../data/tm-rarities.json");

//better than math rand
function rand(min, max) {
  return (
    (Math.floor(Math.pow(10, 14) * Math.random() * Math.random()) %
      (max - min + 1)) +
    min
  );
}

//called to generate the shop array that will be sent to players
const generateShop = (itemAmount, tmAmount) => {
  const heldItems = heldItemsGen(itemAmount);
  const tms = tmsGen(tmAmount);
  const items = heldItems.concat(tms);

  return items;
};

//will generate amount of tms based on tmAmount and return an array of tms
const tmsGen = (tmAmount) => {
  const tms = [];

  for (let i = 0; i < tmAmount; i++) {
    let rarity = rollRarity();
    let itemName = rollTm(rarity);
    if (!isDuplicate(tms, itemName)) {
      let item = generateItem(itemName, rarity);
      tms.push(item);
    } else {
      i--;
    }
  }

  return tms;
};

//will generate amount of held items based on itemAmount and return an array of items
const heldItemsGen = (itemAmount) => {
  const heldItems = [];

  for (let i = 0; i < itemAmount; i++) {
    let rarity = rollRarity();
    let itemName = rollItem(rarity);
    if (!isDuplicate(heldItems, itemName)) {
      let item = generateItem(itemName, rarity);
      heldItems.push(item);
    } else {
      i--;
    }
  }

  return heldItems;
};

//gen a rand num between 1,100 and return corresponding rarity
const rollRarity = () => {
  let roll = rand(1, 100);

  if (roll < 35) return "common";
  if (35 <= roll && roll < 68) return "uncommon";
  if (68 <= roll && roll < 86) return "rare";
  if (86 <= roll && roll < 94) return "epic";
  if (94 <= roll) return "legendary";
};

//will select rand item from corresponding rarity table of held items
const rollItem = (rarity) => {
  let max = itemTable[rarity].items.length;
  let roll = rand(0, max - 1);
  return itemTable[rarity].items[roll];
};

//will select rand tm from corresponding rarity table of tms
const rollTm = (rarity) => {
  let max = tmTable[rarity].tms.length;
  let roll = rand(0, max - 1);
  return tmTable[rarity].tms[roll];
};

//will generate an item object based on the name of it, using showdown
const generateItem = (itemName, rarity) => {
  let item;
  const showdownItem = Dex.items.get(itemName);

  if (showdownItem.exists) item = generateHeldItem(showdownItem, rarity);
  else item = generateTm(itemName, rarity);

  item.rarity = rarity;
  return item;
};

//generation specific for held items, returns obj
const generateHeldItem = (showdownItem, rarity) => {
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
  itemData.cost = itemTable[rarity].cost;

  return itemData;
};

//generation specific for tms, returns obj
const generateTm = (itemName, rarity) => {
  var itemData = { name: itemName, id: "", type: "tm" };

  const showdownMove = Dex.moves.get(itemName);
  itemData.id = showdownMove.type.toLowerCase();
  itemData.move = {
    type: showdownMove.type,
    accuracy: showdownMove.accuracy,
    basePower: showdownMove.basePower,
    category: showdownMove.category,
    desc: showdownMove.desc,
    id: showdownMove.id,
  };

  itemData.cost = tmTable[rarity].cost;

  console.log(itemData);
  return itemData;
};

//checks if item has already been generated
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
      const items = generateShop(3, 1);
      res.status(200).json({ data: items });
      break;
  }
}
