import { Dialog, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import Battle from "./Battle/Battle";
import StarterTown from "./StarterTown/StarterTown";
import { useSocket } from "../../../contexts/SocketProvider";
const ActionDialog = ({
  action,
  actionDialog,
  mapId,
  playerLocation,
  id,
  setActionDialog,
  selectStartingTown,
  setAction,
}) => {
  const socket = useSocket();
  const [wildMon, setWildMon] = useState();

  useEffect(() => {
    if (action == "wildbattle" && !wildMon) getWildMon();
  }, [action]);

  //depending on action, will display different components
  const display = () => {
    switch (action) {
      case "starter":
        return (
          <StarterTown id={id} mapId={mapId} selectTown={selectStartingTown} />
        );
      case "wildbattle":
        return <Battle />;
      case "trainerbattle":
        break;
      case "pvpbattle":
        break;
    }
  };

  //randomly gens a wild mon then generates its data
  const getWildMon = async () => {
    const wildRes = await fetch(
      `${process.env.NEXT_PUBLIC_ROOT_URL}/api/getwildpokemon`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tile: playerLocation.tile }),
      }
    );
    const wildJson = await wildRes.json();

    const genRes = await fetch(
      `${process.env.NEXT_PUBLIC_ROOT_URL}/api/generatepokemon`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: wildJson.data,
          candiesSpent: 0,
          level: 20,
        }),
      }
    );
    const genJson = await genRes.json();
    setWildMon(genJson.data);

    socket.emit("game-start-wildbattle", genJson.data);
  };

  return (
    <Dialog maxWidth={"lg"} fullWidth open={actionDialog}>
      {display()}
    </Dialog>
  );
};

export default ActionDialog;
