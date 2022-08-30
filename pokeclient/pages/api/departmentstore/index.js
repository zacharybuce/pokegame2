const { Dex } = require("pokemon-showdown");
const depStore = require("../../../../data/department-store-items.json");

const generateStore = () => {
  let shop = {};

  Object.keys(depStore).forEach((store) => {
    let heldItems = heldItemsGen(depStore[store].heldItems, store);
    let tms = tmsGen(depStore[store].tms, store);

    shop[store] = heldItems.concat(tms);
  });

  return shop;
};

const heldItemsGen = (heldItems, store) => {
  let retItems = [];

  heldItems.forEach((item) => {
    let showdownItem = Dex.items.get(item);
    retItems.push(generateHeldItem(showdownItem, store));
  });

  return retItems;
};

const tmsGen = (tms, store) => {
  let retTms = [];

  tms.forEach((tm) => {
    retTms.push(generateTm(tm, store));
  });

  return retTms;
};

//generation specific for held items, returns obj
const generateHeldItem = (showdownItem, store) => {
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
  itemData.cost = depStore[store].heldItemsCost;

  return itemData;
};

//generation specific for tms, returns obj
const generateTm = (itemName, store) => {
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

  itemData.cost = depStore[store].tmsCost;
  return itemData;
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
