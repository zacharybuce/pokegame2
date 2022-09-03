import React from "react";
import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

const SettingsButton = ({ setSettingsDialogOpen }) => {
  return (
    <IconButton
      sx={{ top: 0, right: 0, position: "fixed" }}
      onClick={() => setSettingsDialogOpen(true)}
    >
      <SettingsIcon />
    </IconButton>
  );
};

export default SettingsButton;
