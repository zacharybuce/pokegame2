const hoenTownData = require("../../../../data/start-towns-hoen.json");

export default function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      let townData;
      switch (id) {
        case "Hoen":
          townData = hoenTownData;
          break;
      }

      res.status(200).json({ data: townData });
      break;
  }
}
