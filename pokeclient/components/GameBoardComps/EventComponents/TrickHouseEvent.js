import React from "react";
import { Card, Grid, Typography, Divider, Box, Button } from "@mui/material";
import { typeColor } from "../../Utils/typeColor";
import { pSBC } from "../../Utils/colorUtil";
import CurrencyYen from "@mui/icons-material/CurrencyYen";

const TrickHouseEvent = ({
  campaignId,
  canInteract,
  money,
  takeAction,
  phase,
}) => {
  const startTrickHouse = async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_ROOT_URL + "/api/generatetrickhouse",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const json = await res.json();

    takeAction("trickhouse", {
      trainer: json.trainer,
      item: json.item,
    });
  };

  return (
    <Card
      sx={{
        p: 1,
        backgroundColor: typeColor("Psychic") + "d4",
        mb: "3vh",
      }}
    >
      <Grid container spacing={1} sx={{ mb: "3vh" }}>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography variant="h4">Trick House</Typography>
        </Grid>
        <Grid item xs={12} sx={{ mb: "1vh" }}>
          <Divider />
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ backgroundColor: typeColor("Psychic") }}>
            <Box
              sx={{
                backgroundImage: `url(/Tiles-${campaignId}/trickhouse.png)`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPositionX: "50%",
                height: "150px",
                border: "solid",
                borderWidth: "1px",
                borderRadius: "3px",
                borderColor: "lightgray",
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5">
            Fight a trainer for the chance at a random item. Entry fee is{" "}
            <CurrencyYen />
            500
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button
          disabled={!canInteract || money < 500 || phase == "movement"}
          fullWidth
          variant="contained"
          onClick={() => startTrickHouse()}
          sx={{
            backgroundColor: "#2F4562",
            "&:hover": {
              backgroundColor: pSBC(-0.4, "#2F4562"),
            },
          }}
        >
          Challenge
        </Button>
      </Grid>
    </Card>
  );
};

export default TrickHouseEvent;
