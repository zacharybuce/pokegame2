import React, { useState, useEffect } from "react";
import {
  Drawer,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import CardImage from "./CardImage";
import HeaderDescription from "./HeaderDescription";
import EncounterTabs from "./EncounterTabs";
import GrassIcon from "@mui/icons-material/Grass";
import PersonIcon from "@mui/icons-material/Person";
import TileEvents from "./TileEvents";

const TileInfoDrawer = ({
  tileDrawer,
  setTileDrawer,
  tileName,
  campaignId,
  canInteract,
}) => {
  const [tileInfo, setTileInfo] = useState();

  //on opening of drawer get tile info from api
  useEffect(() => {
    if (tileDrawer) {
      getTileInfo(tileName);
    } else {
      setTileInfo(undefined);
    }
  }, [tileDrawer]);

  //calls api to get tile info from json
  const getTileInfo = async (tileName) => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_ROOT_URL +
        "/api/tileInfo" +
        campaignId +
        "/" +
        tileName
    );
    const json = await res.json();

    setTileInfo(json.data);
  };

  const EncounterButtons = (
    <CardActions>
      <Button
        disabled={tileInfo ? tileInfo.encounters.length == 0 : false}
        variant="contained"
        sx={{ width: "50%" }}
      >
        Fight Wild Pokemon <GrassIcon sx={{ ml: "1vw" }} />
      </Button>
      <Button
        disabled={tileInfo ? tileInfo.trainers.length == 0 : false}
        variant="contained"
        sx={{ width: "50%" }}
      >
        Fight Trainer <PersonIcon sx={{ ml: "1vw" }} />
      </Button>
    </CardActions>
  );

  return (
    <Drawer
      anchor={"right"}
      open={tileDrawer}
      onClose={() => setTileDrawer(false)}
      sx={{ overflowY: "auto" }}
    >
      {tileInfo ? (
        <Box>
          <Card sx={{ width: "600px", mb: "1vh" }}>
            <CardImage image={tileInfo.img} />
            <CardContent>
              <HeaderDescription
                name={tileInfo.name}
                desc={tileInfo.desc}
                isTown={tileInfo.town}
              />
              <EncounterTabs
                encounters={tileInfo.encounters}
                encounterRates={tileInfo.encounterRates}
                trainers={tileInfo.trainers}
              />
            </CardContent>
            {canInteract ? EncounterButtons : ""}
          </Card>
          <TileEvents events={tileInfo.events} canInteract={canInteract} />
        </Box>
      ) : (
        <Box sx={{ textAlign: "center", width: "300px" }}>
          <CircularProgress sx={{ mt: "10vh" }} />
        </Box>
      )}
    </Drawer>
  );
};

export default TileInfoDrawer;
