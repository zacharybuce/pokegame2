const { Dex } = require("pokemon-showdown");

export default function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      res.status(200).json({ data: Dex.moves.get(id) });
      break;
  }
}
