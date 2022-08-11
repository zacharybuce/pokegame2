const natureMod = {
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

const calcStat = (stat, base, level, iv, ev, nature) => {
  let A = 0;
  let B = 5;

  if (stat == "hp") {
    A = 100;
    B = 10;
  }

  let num =
    (((2 * base + iv + ev / 4 + A) * level) / 100 + B) *
    natureMod[nature][stat];

  return Math.floor(num);
};

export const genStats = (pokemon) => {
  let stats = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };
  for (const key in stats) {
    if (Object.hasOwnProperty.call(stats, key)) {
      stats[key] = calcStat(
        key,
        pokemon.baseStats[key],
        pokemon.level,
        pokemon.ivs[key],
        pokemon.evs[key],
        pokemon.nature
      );
    }
  }

  return stats;
};
