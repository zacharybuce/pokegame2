import React from "react";
import { Grid } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import CookieIcon from "@mui/icons-material/Cookie";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import ScienceIcon from "@mui/icons-material/Science";
import MedicationIcon from "@mui/icons-material/Medication";
import { HtmlTooltip } from "../../Utils/HtmlTooltip";

const Resources = ({ money, candies, bag, badges }) => {
  const pokeballTooltip = (
    <React.Fragment>
      <Grid
        container
        direction="row"
        alignItems="flex-end"
        justifyContent="center"
      >
        <CatchingPokemonIcon sx={{ color: "#ee1515" }} /> {bag.balls.poke}
      </Grid>
      <Grid
        container
        direction="row"
        alignItems="flex-end"
        justifyContent="center"
      >
        <CatchingPokemonIcon sx={{ color: "#3b82c4" }} /> {bag.balls.great}
      </Grid>
      <Grid
        container
        direction="row"
        alignItems="flex-end"
        justifyContent="center"
      >
        <CatchingPokemonIcon sx={{ color: "#fdd23c" }} /> {bag.balls.ultra}
      </Grid>
    </React.Fragment>
  );

  const potionsTooltip = (
    <React.Fragment>
      <Grid
        container
        direction="row"
        alignItems="flex-end"
        justifyContent="center"
      >
        <ScienceIcon sx={{ color: "#7b5a9f" }} /> {bag.medicine.potions}
      </Grid>
      <Grid
        container
        direction="row"
        alignItems="flex-end"
        justifyContent="center"
      >
        <ScienceIcon sx={{ color: "#ba5b57" }} /> {bag.medicine.superPotions}
      </Grid>
      <Grid
        container
        direction="row"
        alignItems="flex-end"
        justifyContent="center"
      >
        <ScienceIcon sx={{ color: "#ea609e" }} /> {bag.medicine.hyperPotions}
      </Grid>
    </React.Fragment>
  );

  return (
    <Grid item container justifyContent="center" spacing={1} xs={8}>
      <Grid
        item
        container
        xs={2}
        direction="row"
        alignItems="flex-end"
        justifyContent="center"
      >
        <Tooltip title="Money" placement="bottom" arrow>
          <CurrencyYenIcon sx={{ mt: "auto" }} />
        </Tooltip>
        {money}
      </Grid>
      <Grid
        item
        container
        xs={1}
        direction="row"
        alignItems="flex-end"
        justifyContent="center"
      >
        <Tooltip title="Candies" placement="bottom" arrow>
          <CookieIcon sx={{ mt: "auto" }} />
        </Tooltip>
        {candies}
      </Grid>
      <Grid
        item
        container
        xs={1}
        direction="row"
        alignItems="flex-end"
        justifyContent="center"
      >
        <Tooltip title="Badges" placement="bottom" arrow>
          <MilitaryTechIcon sx={{ mt: "auto" }} />
        </Tooltip>
        {badges}
      </Grid>
      <Grid
        item
        container
        xs={1}
        direction="row"
        alignItems="flex-end"
        justifyContent="center"
      >
        <HtmlTooltip title={pokeballTooltip}>
          <CatchingPokemonIcon sx={{ mt: "auto" }} />
        </HtmlTooltip>
        {bag.balls.poke + bag.balls.great + bag.balls.ultra}
      </Grid>
      <Grid
        item
        container
        xs={1}
        direction="row"
        alignItems="flex-end"
        justifyContent="center"
      >
        <HtmlTooltip title={potionsTooltip}>
          <ScienceIcon sx={{ mt: "auto" }} />
        </HtmlTooltip>
        {bag.medicine.potions +
          bag.medicine.superPotions +
          bag.medicine.hyperPotions}
      </Grid>
      <Grid
        item
        container
        xs={1}
        direction="row"
        alignItems="flex-end"
        justifyContent="center"
      >
        <Tooltip title="Revives" placement="bottom" arrow>
          <MedicationIcon sx={{ mt: "auto" }} />
        </Tooltip>
        {bag.medicine.revives}
      </Grid>
    </Grid>
  );
};

export default Resources;
