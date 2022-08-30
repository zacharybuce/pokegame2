import pokemon from "../data/pokemon.json" assert { type: "json" };
import trainers from "../data/trainers-hoen.json" assert { type: "json" };

//spell check
// Object.keys(trainers).forEach((trainer) => {
//   Object.keys(trainers[trainer]).forEach((difficulty, index) => {
//     if (index != 3)
//       trainers[trainer][difficulty].forEach((mon) => {
//         if (!pokemon[mon]) console.log(mon + " is spelled wrong");
//       });
//   });
// });

Object.keys(pokemon).forEach((mon) => {
  if (!pokemon[mon].num) console.log(mon + " - no num");
});
