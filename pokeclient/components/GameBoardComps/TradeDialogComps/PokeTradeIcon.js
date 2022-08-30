import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import { HtmlTooltip } from "../../Utils/HtmlTooltip";
import PokeSprite from "../../Utils/PokeSprite";

const PokeTradeIcon = ({ pokemon, offerTrade }) => {
  const toolTipTitle = (
    <React.Fragment>
      <Typography>
        <b>{pokemon.species}</b>
      </Typography>
      <Typography>
        <b>{pokemon.level}</b>
      </Typography>
      <Typography>
        <b>Item:</b> {pokemon.item}
      </Typography>
      <Typography>
        <b>Ability:</b> {pokemon.ability}
      </Typography>
      <Typography>
        <b>Moves:</b>
      </Typography>
      <Typography>
        {pokemon.moves[0]} {pokemon.moves[1]}
      </Typography>
      <Typography>
        {pokemon.moves[2]} {pokemon.moves[3]}
      </Typography>
    </React.Fragment>
  );

  return (
    <Grid item xs={2}>
      <HtmlTooltip title={toolTipTitle}>
        <Button
          variant="contained"
          onClick={() => offerTrade(pokemon)}
          sx={{ backgroundColor: "#767D92", p: 0 }}
        >
          {pokemon ? (
            <PokeSprite name={pokemon.id} shiny={pokemon.isShiny} />
          ) : (
            ""
          )}
        </Button>
      </HtmlTooltip>
    </Grid>
  );
};

export default PokeTradeIcon;
