import { Box, Grid, Typography, Tabs, Tab, Backdrop } from "@mui/material";
import React, { useState } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import PokemonImg from "./PokemonImg";
import TypeDisplay from "./TypeDisplay";
import ItemDisplay from "./ItemDisplay";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PokemonStats from "./PokemonStats";
import AbilityDisplay from "./AbilityDisplay";
import NatureDisplay from "./NatureDisplay";
import PokemonMoves from "./PokemonMoves";
import EVAndIVs from "./EVAndIVs";
import { useSnackbar } from "notistack";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const PokemonSummary = ({
  pokemon,
  candies,
  team,
  setCandies,
  setBag,
  setTeam,
}) => {
  const [tabValue, setTabValue] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  const upgradeStat = (stat, amount) => {
    let newMon = pokemon;
    let prevCandies = pokemon.candiesSpent;
    newMon.evs[stat] += 28;
    newMon.candiesSpent += amount;

    let b = Math.floor(prevCandies / newMon.levelUpCandies);
    let a = Math.floor(newMon.candiesSpent / newMon.levelUpCandies);

    console.log(a);
    console.log(b);

    let amountOfLvlUps = (a - b) * newMon.levelUpIncrease;

    if (amountOfLvlUps > 0) {
      newMon.level += amountOfLvlUps;
      enqueueSnackbar(`Level Up!`, {
        variant: "success",
      });
    }

    setCandies((prev) => prev - amount);
    updateTeam(pokemon, newMon);
  };

  const takeItem = () => {
    let item = pokemon.item;

    //take item from mon and set team
    let newMon = pokemon;
    newMon.item = "";

    updateTeam(pokemon, newMon);

    //put item in bag
    setBag((prev) => {
      let newBag = prev;
      newBag.heldItems.push(item);
      return newBag;
    });
  };

  const handleEvolve = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_ROOT_URL + "/api/evolve", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pokemon),
    });

    const json = await res.json();
    updateTeam(pokemon, json.data);
  };

  const updateTeam = (oldMon, newMon) => {
    let filteredTeam = team.slice();
    filteredTeam.forEach((mem, index) => {
      if (JSON.stringify(mem) == JSON.stringify(oldMon)) {
        filteredTeam[index] = newMon;
      }
    });

    setTeam([...filteredTeam]);
  };

  return (
    <Box sx={{ pt: 1, pb: 1 }}>
      <Grid container>
        <Grid item xs={4}>
          <Header
            species={pokemon.species}
            level={pokemon.level}
            isShiny={pokemon.isShiny}
          />
          <PokemonImg num={pokemon.num} isShiny={pokemon.isShiny} />
          <Box sx={{ p: 1 }}>
            <TypeDisplay types={pokemon.types} />
            <AbilityDisplay ability={pokemon.ability} />
            <NatureDisplay nature={pokemon.nature} />
            <ItemDisplay item={pokemon.item} takeItem={takeItem} />

            {/* Candies Spent Display */}
            <Box
              sx={{
                backgroundColor: "#2F4562",
                textAlign: "center",
                borderRadius: "3px",
                p: 1,
              }}
            >
              <Typography color="#b8b8b8">Candies Spent</Typography>
              <b>{pokemon.candiesSpent}</b>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={8} sx={{ pl: 2, pr: 2 }}>
          <Tabs
            value={tabValue}
            onChange={(event, newValue) => setTabValue(newValue)}
            centered
            variant="fullWidth"
            sx={{
              backgroundColor: "#2F4562",
              color: "#ededed",
              borderTopRightRadius: "3px",
              borderTopLeftRadius: "3px",
            }}
          >
            <Tab
              icon={<LeaderboardIcon fontSize="small" />}
              iconPosition="end"
              label="Stats"
              {...a11yProps(0)}
            />
            <Tab
              icon={<CatchingPokemonIcon fontSize="small" />}
              iconPosition="end"
              label="Moves"
              {...a11yProps(1)}
            />
            <Tab
              icon={<FitnessCenterIcon fontSize="small" />}
              iconPosition="end"
              label="Evs/Ivs"
              {...a11yProps(2)}
            />
          </Tabs>
          <TabPanel value={tabValue} index={0}>
            <PokemonStats
              pokemon={pokemon}
              upgradeStat={upgradeStat}
              candies={candies}
              handleEvolve={handleEvolve}
            />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <PokemonMoves pokemon={pokemon} team={team} setTeam={setTeam} />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <EVAndIVs
              evs={pokemon.evs}
              ivs={pokemon.ivs}
              baseStats={pokemon.baseStats}
            />
          </TabPanel>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PokemonSummary;
