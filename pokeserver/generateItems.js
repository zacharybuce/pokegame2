import Poke from "pokemon-showdown";
import Sim from "pokemon-showdown";
import { readFile, writeFile } from "fs/promises";

const Dex = Poke.Dex;
const itemData = { name: "", id: "", type: "", desc: "" };

console.log(Dex.items.get("Choice Scarf"));

// writeFile("items.json", JSON.stringify(itemData), "utf8");
