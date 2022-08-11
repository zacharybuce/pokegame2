import React from "react";
import { Grid, Typography } from "@mui/material";
import { natureMod } from "../../Utils/natureMods";
import { HtmlTooltip } from "../../Utils/HtmlTooltip";

const NatureDisplay = ({ nature }) => {
  return (
    <Grid container xs={12} sx={{ mb: "1vh" }}>
      <Grid
        item
        container
        xs={8}
        sx={{ backgroundColor: "#506680", borderRadius: "3px" }}
      >
        <Grid container alignContent="center" item xs={4}>
          <Typography sx={{ ml: "5px" }}>Nature</Typography>
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          alignContent="center"
          xs={8}
          sx={{ borderRadius: "3px", height: "36px" }}
        >
          <HtmlTooltip
            title={
              <React.Fragment>
                {natureMod(nature).map((nat) => (
                  <Typography>{nat}</Typography>
                ))}
              </React.Fragment>
            }
          >
            <Typography>
              <b>{nature}</b>
            </Typography>
          </HtmlTooltip>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NatureDisplay;
