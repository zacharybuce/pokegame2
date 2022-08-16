const tileInfoHoen = require("../../../../data/tileinfo-hoen.json");

export default function handler(req, res) {
  const { method } = req;

  //better than math rand
  function getRand(min, max) {
    return (
      (Math.floor(Math.pow(10, 14) * Math.random() * Math.random()) %
        (max - min + 1)) +
      min
    );
  }

  const getWildMon = (req) => {
    const tileData = tileInfoHoen[req.tile];
    const rand = getRand(1, 100);
    let total = tileData.encounterRates[0];
    let encounterIndex = 0;

    console.log(rand);

    while (total < rand) {
      encounterIndex++;
      total += tileData.encounterRates[encounterIndex];
    }

    console.log(tileData.encounters[encounterIndex]);
    return tileData.encounters[encounterIndex];
  };

  switch (method) {
    case "POST":
      res.status(200).json({ data: getWildMon(req.body) });
      break;
  }
}
