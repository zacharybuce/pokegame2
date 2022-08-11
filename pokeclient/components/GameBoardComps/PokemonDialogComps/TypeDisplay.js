import React from "react";
import { Grid, Typography } from "@mui/material";
import { typeColor } from "../../Utils/typeColor";

const TypeDisplay = ({ types }) => {
  return (
    <Grid container xs={12} sx={{ mb: "1vh" }}>
      {types.map((type) => (
        <Grid
          item
          container
          xs={6}
          sx={{
            backgroundColor: "#506680",
            borderRadius: "3px",
          }}
        >
          <Grid
            item
            xs={3}
            sx={{
              backgroundColor: typeColor(type),
              borderRadius: "3px",
            }}
          ></Grid>
          <Grid
            item
            xs={9}
            sx={{
              textAlign: "center",
            }}
          >
            <Typography variant="h6">{type}</Typography>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default TypeDisplay;
