import { Box, Dialog, Grid, Typography, Alert, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSocket } from "../../../contexts/SocketProvider";
import PlayerOffer from "./PlayerOffer";
import PokemonToTrade from "./PokemonToTrade";
import TradeOfferOptions from "./TradeOfferOptions";
import TradeWaiting from "./TradeWaiting";

const TradeDialog = ({
  tradeDialog,
  setTradeDialog,
  team,
  setTeam,
  tradeOffer,
  setTradeOffer,
}) => {
  const socket = useSocket();
  const [p1, setP1] = useState();
  const [p2, setP2] = useState();
  const [isP1, setIsP1] = useState();
  const [tradeStart, setTradeStart] = useState(false);
  const [playerOffer, setPlayerOffer] = useState("");
  const [oppPlayerOffer, setOppPlayerOffer] = useState("");
  const [playerAccept, setPlayerAccept] = useState(false);
  const [oppPlayerAccept, setOppPlayerAccept] = useState(false);

  useEffect(() => {
    if (socket === undefined) return;
    socket.on(
      "trade-update",
      (
        player1Offer,
        player2Offer,
        player1Accept,
        player2Accept,
        tradingEnd,
        tradingSuccess
      ) => {
        console.log(player1Offer);
        console.log(player2Offer);
        console.log("p1 " + player1Accept);
        console.log("p2 " + player2Accept);
        console.log("trade success " + tradingSuccess);

        updateTrade(
          player1Offer,
          player2Offer,
          player1Accept,
          player2Accept,
          tradingEnd,
          tradingSuccess
        );
      }
    );

    return () => socket.off("trade-update");
  }, [socket]);

  useEffect(() => {
    if (socket === undefined) return;
    socket.on("trade-start", (isPlayer1, p1Name, p2Name) => {
      console.log("From server isP1=" + isPlayer1);
      setIsP1(isPlayer1);
      setP1(p1Name);
      setP2(p2Name);
      setTradeStart(true);
    });
    return () => socket.off("trade-start");
  }, [socket, tradeStart]);

  useEffect(() => {
    if (socket === undefined) return;
    socket.on("trade-initiate-deny", () => {
      console.log("trade denied");
      setTradeOffer(undefined);
      setTradeDialog(false);
    });
    return () => socket.off("trade-initiate-deny");
  }, [socket, tradeDialog]);

  const updateTrade = (
    player1Offer,
    player2Offer,
    player1Accept,
    player2Accept,
    tradingEnd,
    tradingSuccess
  ) => {
    console.log("isP1 = " + isP1);
    setIsP1((prev) => {
      if (prev) {
        console.log("Changing for p1");
        setPlayerOffer(player1Offer);
        setPlayerAccept(player1Accept);
        setOppPlayerOffer(player2Offer);
        setOppPlayerAccept(player2Accept);
      } else {
        console.log("Changing for p2");
        setPlayerOffer(player2Offer);
        setPlayerAccept(player2Accept);
        setOppPlayerOffer(player1Offer);
        setOppPlayerAccept(player1Accept);
      }

      if (tradingEnd) {
        setTradeOffer(undefined);
        setTradeDialog(false);
      }

      if (tradingSuccess) {
        if (prev) successfulTrade(player1Offer, player2Offer);
        else successfulTrade(player2Offer, player1Offer);
        setTradeOffer(undefined);
      }
      return prev;
    });
    // if (isP1) {
    //   console.log("Changing for p1");
    //   setPlayerOffer(player1Offer);
    //   setPlayerAccept(player1Accept);
    //   setOppPlayerOffer(player2Offer);
    //   setOppPlayerAccept(player2Accept);
    // } else {
    //   console.log("Changing for p2");
    //   setPlayerOffer(player2Offer);
    //   setPlayerAccept(player2Accept);
    //   setOppPlayerOffer(player1Offer);
    //   setOppPlayerAccept(player1Accept);
    // }

    // if (tradingEnd) {
    //   setTradeOffer(undefined);
    //   setTradeDialog(false);
    // }

    // if (tradingSuccess) {
    //   if (isP1) successfulTrade(player1Offer, player2Offer);
    //   else successfulTrade(player2Offer, player1Offer);
    //   setTradeOffer(undefined);
    // }
  };

  const offerTrade = (poke) => {
    setPlayerOffer(poke);
    socket.emit("new-trade-offer", poke);
  };

  const acceptTradeOffer = (accept) => {
    setPlayerAccept(true);
    socket.emit("trade-offer-accept", accept);
  };

  const endTrade = () => {
    socket.emit("end-trade");
    setTradeOffer(undefined);
    setTradeDialog(false);
    tradeStart(false);
  };

  const successfulTrade = (playerOffer, oppPlayerOffer) => {
    var newTeam = team.slice();
    for (let i = 0; i < newTeam.length; i++) {
      if (JSON.stringify(newTeam[i]) == JSON.stringify(playerOffer)) {
        newTeam[i] = oppPlayerOffer;
        setTeam([...newTeam]);
        console.log("Trade success");
        break;
      }
    }

    setTradeDialog(false);
  };

  if (tradeStart)
    return (
      <Dialog fullWidth maxWidth={"md"} open={tradeDialog}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Trade bewtween {p1} and {p2}
          </Typography>
          <Grid container sx={{ mt: "2vh" }} spacing={1}>
            <Grid item xs={6}>
              <PlayerOffer
                pokemon={playerOffer ? playerOffer : ""}
                isPlayer
                accepted={playerAccept}
              />
            </Grid>
            <Grid item xs={6}>
              <PlayerOffer
                pokemon={oppPlayerOffer ? oppPlayerOffer : ""}
                accepted={oppPlayerAccept}
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center", mt: "1vh" }}>
              <Typography variant="h5">Your Pokemon</Typography>
            </Grid>
            <PokemonToTrade team={team} offerTrade={offerTrade} />
            {/* Accept Button */}
            <Grid item xs={6} sx={{ textAlign: "center" }}>
              {playerAccept ? (
                <Alert severity="success" sx={{ width: "75%" }}>
                  Accepted! Waiting for other player...
                </Alert>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  sx={{ width: "75%" }}
                  onClick={() => acceptTradeOffer(true)}
                >
                  Accept
                </Button>
              )}
            </Grid>
            {/* End Trade Button */}
            <Grid item xs={6} sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                fullWidth
                color="error"
                sx={{ width: "75%" }}
                onClick={() => endTrade()}
              >
                End Trade
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    );

  return (
    <Dialog fullWidth maxWidth={"lg"} open={tradeDialog}>
      <Box sx={{ p: 3 }}>
        {tradeOffer?.tradeIndex != undefined ? (
          <TradeOfferOptions
            tradeOffer={tradeOffer}
            setTradeDialog={setTradeDialog}
            setTradeOffer={setTradeOffer}
          />
        ) : (
          <TradeWaiting />
        )}
      </Box>
    </Dialog>
  );
};

export default TradeDialog;
