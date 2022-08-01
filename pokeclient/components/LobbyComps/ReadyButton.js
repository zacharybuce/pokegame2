import { Alert, Button } from "@mui/material";
import React from "react";

const ReadyButton = ({ readyUp, isReady }) => {
  if (!isReady)
    return (
      <Button variant="contained" fullWidth onClick={() => readyUp()}>
        Ready
      </Button>
    );

  return <Alert severity="info">Waiting for other players...</Alert>;
};

export default ReadyButton;
