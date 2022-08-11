import React from "react";
import { Grid, Box, Typography, Tooltip, IconButton } from "@mui/material";
import ItemSprite from "../../Utils/ItemSprite";
import BackpackIcon from "@mui/icons-material/Backpack";

const ItemDisplay = ({ item, takeItem }) => {
  return (
    <Grid container xs={12} sx={{ mb: "1vh" }}>
      <Grid
        item
        container
        xs={6}
        sx={{ backgroundColor: "#506680", borderRadius: "3px" }}
      >
        <Grid container alignContent="center" item xs={4}>
          <Typography sx={{ ml: "5px" }}>Item</Typography>
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          alignContent="center"
          xs={8}
          sx={{ borderRadius: "3px" }}
        >
          {item ? (
            <ItemSprite item={item} showTooltip />
          ) : (
            <Box sx={{ width: "32px", height: "32px" }}></Box>
          )}
        </Grid>
      </Grid>
      <Grid container alignContent="center" item xs={6}>
        {item ? (
          <Tooltip title="Take Item">
            <IconButton onClick={() => takeItem()}>
              <BackpackIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        ) : (
          ""
        )}
      </Grid>
    </Grid>
  );
};

export default ItemDisplay;
