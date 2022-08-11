import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { useSocket } from "../../../../contexts/SocketProvider";
import StartTownCarousel from "./StartTownCarousel";

const StarterTown = ({ mapId, id, selectTown }) => {
  const socket = useSocket();
  const [pickOrder, setPickOrder] = useState();
  const [startingTowns, setStartingTowns] = useState();

  useEffect(() => {
    socket.emit("game-request-pickorder");
    getStartingTowns();
  }, []);

  //checks for updates to pickOrder
  useEffect(() => {
    if (socket === undefined) return;

    socket.on("game-update-pickorder", (pickOrder) => setPickOrder(pickOrder));

    return () => socket.off("game-update-pickorder");
  }, [socket, pickOrder]);

  const getStartingTowns = async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_ROOT_URL + "/api/startingtowns/" + mapId
    );
    const json = await res.json();

    setStartingTowns(json.data);
  };

  return (
    <Box sx={{ textAlign: "center", p: 3, height: "50vh" }}>
      {pickOrder ? (
        <Grid container>
          <Grid item xs={2} sx={{ borderRight: "2px solid #ededed" }}>
            {pickOrder.pickOrder?.map((player, index) => (
              <Box
                alignContent="center"
                sx={{ display: "flex", fontSize: "25px" }}
              >
                {player}
                {index == 0 ? <ArrowLeftIcon fontSize="large" /> : ""}
              </Box>
            ))}
          </Grid>

          <Grid item xs={10}>
            {startingTowns && pickOrder.pickOrder[0] == id ? (
              <Box>
                <Typography variant="h3">Choose a Starting Town</Typography>
                <StartTownCarousel
                  townsChoosen={pickOrder.townsChoosen}
                  startingTowns={startingTowns}
                  mapId={mapId}
                  selectTown={selectTown}
                />
              </Box>
            ) : (
              <Box
                sx={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: "20%",
                }}
              >
                <Typography variant="h3">
                  Waiting for other players...
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      ) : (
        <Box>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default StarterTown;
