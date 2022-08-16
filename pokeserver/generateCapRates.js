import Poke from "pokemon-showdown";
import Sim from "pokemon-showdown";
import { readFile, writeFile } from "fs/promises";
import fs from "fs";
import path from "path";
import csv from "fast-csv";

var ids = {};

fs.createReadStream("C:/Users/zacha/VSCode/pokegame2/data/pokemon_species.csv")
  .pipe(csv.parse({ headers: true }))
  .on("error", (error) => console.error(error))
  .on("data", (row) => {
    ids[row.identifier] = row.capture_rate;
  })
  .on("end", (rowCount) => {
    writeFile("capture-rates.json", JSON.stringify(ids), "utf8");
  });
