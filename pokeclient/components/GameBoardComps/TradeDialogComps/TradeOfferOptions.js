import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { useSocket } from "../../../contexts/SocketProvider";

const TradeOfferOptions = ({ tradeOffer, setTradeOffer, setTradeDialog }) => {
  const socket = useSocket();

  const respondToOffer = (accept) => {
    socket.emit("trade-initiate-accept", accept, tradeOffer.tradeIndex);
    if (!accept) {
      setTradeDialog(false);
      setTradeOffer(undefined);
    }
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h4">
        Do you want to trade with {tradeOffer.playerOffering}?
      </Typography>
      <Divider sx={{ backgroundColor: "#ededed", mb: "2vh" }} />
      <Grid container>
        <Grid item xs={6} sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            color="success"
            sx={{ width: "90%" }}
            onClick={() => respondToOffer(true)}
          >
            Accept
          </Button>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            color="error"
            sx={{ width: "90%" }}
            onClick={() => respondToOffer(false)}
          >
            Decline
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TradeOfferOptions;
