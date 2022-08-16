import { Box } from "@mui/material";
import React from "react";
import GymLeaderEvent from "../EventComponents/GymLeaderEvent";

const TileEvents = ({ badges, events, canInteract, takeAction }) => {
  const eventMapper = (event) => {
    const eventType = event.split("-")[0];
    switch (eventType) {
      case "GymBattle":
        return (
          <GymLeaderEvent
            badges={badges}
            event={event}
            campaignId={"Hoen"}
            takeAction={takeAction}
            canInteract={canInteract}
          />
        );
      default:
        return <div></div>;
    }
  };

  return (
    <Box sx={{ pl: "2vw", pr: "2vw", width: "600px" }}>
      {events.map((event) => eventMapper(event))}
    </Box>
  );
};

export default TileEvents;
