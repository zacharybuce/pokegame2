import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Autocomplete,
} from "@mui/material";
import React, { useState } from "react";
import { useSocket } from "../../contexts/SocketProvider";

const campaignOptions = [
  { label: "Hoen Adventure" },
  { label: "Test Adventure" },
];
const startingTownOptions = [{ label: "Standard" }];
const startersOptions = [{ label: "Standard" }];

const GameSettingsDialog = ({ settingsOpen, setSettingsOpen }) => {
  const socket = useSocket();
  const [campaign, setCampaign] = useState("Hoen Adventure");
  const [startingTown, setStartingTown] = useState("Standard");
  const [starters, setStarters] = useState("Standard");

  const handleChangeCampaign = (event) => {
    setCampaign(event.target.innerText);
  };

  const handleChangeTown = (event) => {
    setStartingTown(event.target.innerText);
  };

  const handleChangeStarters = (event) => {
    setStarters(event.target.innerText);
  };

  const submitNewRules = () => {
    const newRules = {
      campaign: campaign,
      StartingTown: startingTown,
      Starters: starters,
    };

    socket.emit("lobby-rules-change", newRules);
    setSettingsOpen(false);
  };

  return (
    <Dialog
      maxWidth={"md"}
      open={settingsOpen}
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          setSettingsOpen(false);
        }
      }}
    >
      <DialogTitle>Game Settings</DialogTitle>
      <DialogContent>
        <Grid container sx={{ mt: "2vh", mb: "2vh", width: "40vw" }}>
          <Grid item xs={12} sx={{ mb: "2vh" }}>
            <Autocomplete
              disablePortal
              id="Campaign"
              options={campaignOptions}
              defaultValue={campaignOptions[0]}
              sx={{ width: "100%" }}
              onChange={handleChangeCampaign}
              renderInput={(params) => (
                <TextField {...params} label="Campaign" />
              )}
            />
          </Grid>
          <Grid item xs={12} sx={{ mb: "2vh" }}>
            <Autocomplete
              disablePortal
              id="StartingTown"
              options={startingTownOptions}
              defaultValue={startingTownOptions[0]}
              sx={{ width: "100%" }}
              onChange={handleChangeTown}
              renderInput={(params) => (
                <TextField {...params} label="Starting Town" />
              )}
            />
          </Grid>
          <Grid item xs={12} sx={{ mb: "2vh" }}>
            <Autocomplete
              disablePortal
              id="Starters"
              options={startersOptions}
              defaultValue={startersOptions[0]}
              sx={{ width: "100%" }}
              onChange={handleChangeStarters}
              renderInput={(params) => (
                <TextField {...params} label="Starters" />
              )}
            />
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              sx={{ width: "75%" }}
              onClick={() => submitNewRules()}
            >
              Confirm
            </Button>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "center" }}>
            <Button
              color="error"
              variant="contained"
              onClick={() => setSettingsOpen(false)}
              sx={{ width: "75%" }}
            >
              Close
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default GameSettingsDialog;
