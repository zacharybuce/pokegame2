import { Button } from "@mui/material";
import React from "react";

//only displays the button to the player who is the host
const GameSettingsButton = ({ setSettingsOpen, isHost }) => {
  if (isHost)
    return (
      <Button
        variant="contained"
        fullWidth
        onClick={() => setSettingsOpen(true)}
      >
        Game Settings
      </Button>
    );

  return <div></div>;
};

export default GameSettingsButton;
