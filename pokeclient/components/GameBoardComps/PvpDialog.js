import { Box, Button, Dialog, Divider, Typography } from "@mui/material";
import React from "react";
import { useSocket } from "../../contexts/SocketProvider";

const PvpDialog = ({ pvpDialog, setPvpDialog, battleIndex }) => {
  const socket = useSocket();

  const sendRes = (confirm) => {
    socket.emit("game-respond-pvp", confirm, battleIndex);
    setPvpDialog(false);
  };

  return (
    <Dialog fullWidth maxWidth={"sm"} open={pvpDialog}>
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h4">Do you want to initiate a battle?</Typography>
        <Divider sx={{ backgroundColor: "#ededed", mb: "2vh" }} />
        <Button
          variant="contained"
          onClick={() => sendRes(true)}
          sx={{ width: "45%", mr: "10px" }}
        >
          Yes
        </Button>
        <Button
          variant="contained"
          onClick={() => sendRes(false)}
          sx={{ width: "45%" }}
        >
          No
        </Button>
      </Box>
    </Dialog>
  );
};

export default PvpDialog;
