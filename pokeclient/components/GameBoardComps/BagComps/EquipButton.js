import { Button, Grid, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import BuildIcon from "@mui/icons-material/Build";
import PokeSprite from "../../Utils/PokeSprite";
import { HtmlTooltip } from "../../Utils/HtmlTooltip";

const EquipButton = ({ index, item, team, equipItem }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <HtmlTooltip
      title={
        <React.Fragment>
          <Typography variant="h6">Equip Item</Typography>
          <Grid container sx={{ width: "200px" }}>
            {team.map((pokemon) => (
              <Grid item xs={12} sx={{ mb: "3px" }}>
                <Button
                  variant="outlined"
                  disabled={pokemon.item}
                  fullWidth
                  sx={{ justifyContent: "start" }}
                  onClick={() => {
                    equipItem(item, pokemon, index);
                    setTooltipOpen(false);
                  }}
                >
                  <PokeSprite name={pokemon.id} isShiny={pokemon.isShiny} />
                  {pokemon.species}
                </Button>
              </Grid>
            ))}
          </Grid>
        </React.Fragment>
      }
      open={tooltipOpen}
      onClose={(event) => {
        if (event.type != "blur") setTooltipOpen(false);
      }}
    >
      <IconButton onClick={() => setTooltipOpen(true)}>
        <BuildIcon />
      </IconButton>
    </HtmlTooltip>
  );
};

export default EquipButton;
