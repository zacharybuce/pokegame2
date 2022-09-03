import React, { useState, useEffect } from "react";
import { Grid, Typography, Button } from "@mui/material";
import { HtmlTooltip } from "../../../Utils/HtmlTooltip";
import PokeSprite from "../../../Utils/PokeSprite";

const SwitchButton = ({ poke, disabled, sendSwitchChoice, slot }) => {
  const [id, setId] = useState();

  useEffect(() => {
    getPokemonData();
  }, [poke]);

  const getPokemonData = async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_ROOT_URL +
        "/api/pokemon/" +
        poke.ident.split(":")[1]
    );
    const json = await res.json();

    setId(json.data.id);
  };

  const toolTipTitle = (
    <React.Fragment>
      <Typography>
        <b>{poke.details}</b>
      </Typography>
      <Typography>
        <b>{poke.condition}</b>
      </Typography>
      <Typography>
        <b>Item:</b> {poke.item}
      </Typography>
      <Typography>
        <b>Ability:</b> {poke.ability}
      </Typography>
      <Typography>
        <b>Moves:</b>
      </Typography>
      <Typography>
        {poke.moves[0]} {poke.moves[1]}
      </Typography>
      <Typography>
        {poke.moves[2]} {poke.moves[3]}
      </Typography>
    </React.Fragment>
  );

  // console.log(poke.details.split(",")[3]);
  return (
    <Grid item xs={2}>
      <HtmlTooltip title={toolTipTitle}>
        <Button
          variant="contained"
          disabled={disabled}
          onClick={() => {
            sendSwitchChoice(slot + 1);
          }}
          sx={{ backgroundColor: "#767D92", p: 0 }}
        >
          {id ? (
            <PokeSprite name={id} shiny={poke.details.includes("shiny")} />
          ) : (
            ""
          )}
        </Button>
      </HtmlTooltip>
    </Grid>
  );
};

export default SwitchButton;
