const hoenTownData = require("../../../../data/start-towns-hoen.json");

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      res.status(200).json({ data: hoenTownData });
      break;
  }
}
