const trainersHoen = require("../../../../data/trainers-hoen.json");

export default function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      res.status(200).json({ data: trainersHoen[id] });
      break;
  }
}
