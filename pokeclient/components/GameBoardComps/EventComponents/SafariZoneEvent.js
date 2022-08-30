import React, { useState, useEffect } from "react";
import { Card, Grid, Typography, Divider, Box, Button } from "@mui/material";
import { typeColor } from "../../Utils/typeColor";
import { useSocket } from "../../../contexts/SocketProvider";
import PokemonEncounterCard from "../TileInfoDrawerComps/PokemonEncounterCard";
import { pSBC } from "../../Utils/colorUtil";
import CurrencyYen from "@mui/icons-material/CurrencyYen";

const SafariZoneEvent = ({
  campaignId,
  canInteract,
  money,
  takeAction,
  phase,
  badges,
}) => {
  const [encounters, setEncounters] = useState(); //array with enounters at index 0 and cost at index 1
  const socket = useSocket();

  useEffect(() => {
    socket.emit("game-get-safari");
  }, []);

  useEffect(() => {
    if (socket === undefined) return;
    socket.on("safari-encounters", (encounters) => {
      setEncounters(encounters);
    });

    return () => socket.off("safari-encounters");
  }, [socket, encounters]);

  if (encounters)
    return (
      <Card
        sx={{
          p: 1,
          backgroundColor: typeColor("Normal") + "d4",
          mb: "3vh",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h4">Safari Zone</Typography>
          </Grid>
          <Grid item xs={12} sx={{ mb: "1vh" }}>
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ backgroundColor: typeColor("Normal") }}>
              <Box
                sx={{
                  backgroundImage: `url(/Tiles-${campaignId}/binoculars.png)`,
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
              Current cost: <CurrencyYen />
              {encounters[1]}
            </Typography>
            <Divider sx={{ backgroundColor: "#ededed", mb: "5px" }} />
            <Typography>
              Cost of entry is based on the strength of the current Pokemon
            </Typography>
            <Typography variant="body2">*Must have 4 badges to play</Typography>
          </Grid>

          <Grid item container xs={12}>
            {encounters[0].map((pokemon) => (
              <Grid item xs={12}>
                <PokemonEncounterCard pokemon={pokemon} encounterRate={25} />
              </Grid>
            ))}
          </Grid>
          <Grid item xs={12}>
            <Button
              disabled={
                !canInteract ||
                money < encounters[1] ||
                phase == "movement" ||
                badges.length < 4
              }
              fullWidth
              variant="contained"
              onClick={() => {
                let rand = Math.random(0, 100);
                let mon;
                if (rand <= 25) mon = encounters[0][0];
                else if (rand <= 50) mon = encounters[0][1];
                else if (rand <= 75) mon = encounters[0][2];
                else if (rand <= 100) mon = encounters[0][3];
                takeAction("safarizone", {
                  pokemon: mon,
                  cost: encounters[1],
                });
              }}
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
        </Grid>
      </Card>
    );

  return <div></div>;
};

export default SafariZoneEvent;
