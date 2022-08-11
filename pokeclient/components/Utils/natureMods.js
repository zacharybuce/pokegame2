const natureMods = {
  Adamant: { hp: 1, atk: 1.1, def: 1, spa: 0.9, spd: 1, spe: 1 },
  Bashful: { hp: 1, atk: 1, def: 1, spa: 1, spd: 1, spe: 1 },
  Bold: { hp: 1, atk: 0.9, def: 1.1, spa: 1, spd: 1, spe: 1 },
  Brave: { hp: 1, atk: 1.1, def: 1, spa: 1, spd: 1, spe: 0.9 },
  Calm: { hp: 1, atk: 0.9, def: 1, spa: 1, spd: 1.1, spe: 1 },
  Careful: { hp: 1, atk: 1, def: 1, spa: 0.9, spd: 1.1, spe: 1 },
  Docile: { hp: 1, atk: 1, def: 1, spa: 1, spd: 1, spe: 1 },
  Gentle: { hp: 1, atk: 1, def: 0.9, spa: 1, spd: 1.1, spe: 1 },
  Hardy: { hp: 1, atk: 1, def: 1, spa: 1, spd: 1, spe: 1 },
  Hasty: { hp: 1, atk: 1, def: 0.9, spa: 1, spd: 1, spe: 1.1 },
  Impish: { hp: 1, atk: 1, def: 1.1, spa: 0.9, spd: 1, spe: 1 },
  Jolly: { hp: 1, atk: 1, def: 1, spa: 0.9, spd: 1, spe: 1.1 },
  Lax: { hp: 1, atk: 1, def: 1.1, spa: 1, spd: 0.9, spe: 1 },
  Lonely: { hp: 1, atk: 1.1, def: 0.9, spa: 1, spd: 1, spe: 1 },
  Mild: { hp: 1, atk: 1, def: 0.9, spa: 1.1, spd: 1, spe: 1 },
  Modest: { hp: 1, atk: 0.9, def: 1, spa: 1.1, spd: 1, spe: 1 },
  Naive: { hp: 1, atk: 1, def: 1, spa: 1, spd: 0.9, spe: 1.1 },
  Naughty: { hp: 1, atk: 1.1, def: 1, spa: 1, spd: 0.9, spe: 1 },
  Quiet: { hp: 1, atk: 1, def: 1, spa: 1.1, spd: 1, spe: 0.9 },
  Quirky: { hp: 1, atk: 1, def: 1, spa: 1, spd: 1, spe: 1 },
  Rash: { hp: 1, atk: 1, def: 1, spa: 1.1, spd: 0.9, spe: 1 },
  Relaxed: { hp: 1, atk: 1, def: 1.1, spa: 1, spd: 1, spe: 0.9 },
  Sassy: { hp: 1, atk: 1, def: 1, spa: 1, spd: 1.1, spe: 0.9 },
  Serious: { hp: 1, atk: 1, def: 1, spa: 1, spd: 1, spe: 1 },
  Timid: { hp: 1, atk: 0.9, def: 1, spa: 1, spd: 1, spe: 1.1 },
};

export const natureMod = (nature) => {
  let mod = natureMods[nature];
  let natMod = [];

  for (const key in mod) {
    if (Object.hasOwnProperty.call(mod, key)) {
      if (mod[key] == 1.1) natMod[0] = "+ " + key;
      if (mod[key] == 0.9) natMod[1] = "- " + key;
    }
  }

  if (natMod.length == 0) natMod.push("None");

  return natMod;
};
