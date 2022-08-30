export default function handler(req, res) {
  const { method } = req;
  const itemTable = require("../../../../data/item-rarities.json");
  const { Dex } = require("pokemon-showdown");

  const generateItem = (item) => {
    var itemData = {};
    let showdownItem = Dex.items.get(item);
    let rarity = "common";
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

  //better than math rand
  function genRand(min, max) {
    return (
      (Math.floor(Math.pow(10, 14) * Math.random() * Math.random()) %
        (max - min + 1)) +
      min
    );
  }

  const getRandItem = () => {
    let itemList = itemTable.rare.items
      .concat(itemTable.epic.items)
      .concat(itemTable.legendary.items);
    let rand = genRand(0, itemList.length - 1);
    let item = generateItem(itemList[rand]);
    return item;
  };

  const getRandTrainer = () => {
    let trainerList = ["AceTrainer", "CoolTrainer"];
    let rand = genRand(0, trainerList.length - 1);
    return trainerList[rand];
  };

  switch (method) {
    case "POST":
      const item = getRandItem();
      const trainer = getRandTrainer();
      res.status(200).json({ item: item, trainer: trainer });
      break;
  }
}
