import { Box, Grid, Typography, Badge, IconButton } from "@mui/material";
import React from "react";
import PokeSprite from "../../Utils/PokeSprite";
import ItemSprite from "../../Utils/ItemSprite";
import { typeColor } from "../../Utils/typeColor";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MenuIcon from "@mui/icons-material/Menu";
import { HtmlTooltip } from "../../Utils/HtmlTooltip";
import { pSBC } from "../../Utils/colorUtil";

const PokemonCard = ({ pokemon }) => {
  const exhaustionTooltip = (
    <React.Fragment>
      <Typography>Exhaustion</Typography>
    </React.Fragment>
  );

  return (
    <Box
      sx={{
        border: "2px solid #767D92",
        borderRadius: "5px",
        backgroundColor: typeColor(pokemon.types[0]),
        height: "100%",
        p: 1,
      }}
    >
      <Typography sx={{ color: "black" }}>{pokemon.name}</Typography>
      <Box
        sx={{
          textAlign: "center",
          backgroundColor: "#e2e2e2",
          borderRadius: "3px",
        }}
      >
        <PokeSprite name={pokemon.id} shiny={pokemon.isShiny} />
      </Box>
      <Grid container sx={{ textAlign: "center", mt: "3px" }}>
        {/* Held Item Display */}
        <Grid
          item
          xs={6}
          container
          direction="row"
          alignItems="flex-end"
          justifyContent="center"
          sx={{ backgroundColor: pSBC(-0.4, typeColor(pokemon.types[0])) }}
        >
          {pokemon.item ? <ItemSprite item={pokemon.item} showTooltip /> : ""}
        </Grid>
        {/* Exauhstion Badge */}
        <Grid
          item
          xs={6}
          container
          direction="row"
          alignItems="flex-end"
          justifyContent="center"
        >
          <HtmlTooltip title={exhaustionTooltip}>
            <Badge badgeContent={pokemon.exhaustion} color="error" showZero>
              <ArrowDownwardIcon sx={{ color: "black" }} />
            </Badge>
          </HtmlTooltip>
        </Grid>
      </Grid>
      {/* Button to open summary */}
      <Box sx={{ textAlign: "center" }}>
        <IconButton>
          <MenuIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default PokemonCard;
