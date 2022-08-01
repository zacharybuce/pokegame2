import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import React from "react";
import VolumeSlider from "../SoundComps/VolumeSlider";

const SettingsDialog = ({
  setSettingsDialogOpen,
  settingsDialogOpen,
  musicVolume,
  setMusicVolume,
}) => {
  return (
    <Dialog
      maxWidth={"md"}
      open={settingsDialogOpen}
      onClose={(event, reason) => {
        setSettingsDialogOpen(false);
      }}
    >
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={12} sx={{ mb: "2vh" }}>
            <VolumeSlider
              musicVolume={musicVolume}
              setMusicVolume={setMusicVolume}
            />
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color="error"
              onClick={() => setSettingsDialogOpen(false)}
            >
              Close
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
