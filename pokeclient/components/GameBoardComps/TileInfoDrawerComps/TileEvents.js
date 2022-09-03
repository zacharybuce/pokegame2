import { Box } from "@mui/material";
import React from "react";
import ChampionEvent from "../EventComponents/ChampionEvent";
import DaycareEvent from "../EventComponents/DaycareEvent";
import DepartmentStore from "../EventComponents/DepartmentStore";
import FerryEvent from "../EventComponents/FerryEvent";
import FlyEvent from "../EventComponents/FlyEvent";
import GymLeaderEvent from "../EventComponents/GymLeaderEvent";
import Market from "../EventComponents/Market";
import MegaStoneStore from "../EventComponents/MegaStoneStore";
import SafariZoneEvent from "../EventComponents/SafariZoneEvent";
import TrickHouseEvent from "../EventComponents/TrickHouseEvent";

const TileEvents = ({
  badges,
  money,
  events,
  canInteract,
  takeAction,
  phase,
  team,
}) => {
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
            phase={phase}
          />
        );
      case "SafariZone":
        return (
          <SafariZoneEvent
            campaignId={"Hoen"}
            money={money}
            takeAction={takeAction}
            canInteract={canInteract}
            phase={phase}
            badges={badges}
          />
        );
      case "TrickHouse":
        return (
          <TrickHouseEvent
            campaignId={"Hoen"}
            money={money}
            takeAction={takeAction}
            canInteract={canInteract}
            phase={phase}
          />
        );
      case "FlyingTaxi":
        return (
          <FlyEvent
            badges={badges}
            event={event}
            campaignId={"Hoen"}
            money={money}
            takeAction={takeAction}
            canInteract={canInteract}
            phase={phase}
          />
        );
      case "Ferry":
        return (
          <FerryEvent
            badges={badges}
            event={event}
            campaignId={"Hoen"}
            money={money}
            takeAction={takeAction}
            canInteract={canInteract}
            phase={phase}
          />
        );
      case "DepartmentStore":
        return (
          <DepartmentStore
            campaignId={"Hoen"}
            money={money}
            takeAction={takeAction}
            canInteract={canInteract}
            phase={phase}
            badges={badges}
          />
        );

      case "Market":
        return (
          <Market
            campaignId={"Hoen"}
            money={money}
            takeAction={takeAction}
            canInteract={canInteract}
            phase={phase}
          />
        );

      case "ChampionBattle":
        return (
          <ChampionEvent
            badges={badges}
            event={event}
            campaignId={"Hoen"}
            takeAction={takeAction}
            canInteract={canInteract}
            phase={phase}
          />
        );
      case "MegaMarket":
        return (
          <MegaStoneStore
            campaignId={"Hoen"}
            money={money}
            takeAction={takeAction}
            canInteract={canInteract}
            phase={phase}
            badges={badges}
          />
        );
      case "Daycare":
        return (
          <DaycareEvent
            badges={badges}
            event={event}
            campaignId={"Hoen"}
            takeAction={takeAction}
            canInteract={canInteract}
            phase={phase}
            team={team}
          />
        );

      default:
        return <div></div>;
    }
  };

  return (
    <Box
      sx={{
        pl: "2vw",
        pr: "2vw",
        width: "600px",
      }}
    >
      {events.map((event) => eventMapper(event))}
    </Box>
  );
};

export default TileEvents;
