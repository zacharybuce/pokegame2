import { Button, Grid, Box } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { useSocket } from "../../contexts/SocketProvider";

const TitleContainer = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("xs")]: {
    fontSize: "50px",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "25px",
  },
}));

const HomeScreenContainer = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("xs")]: {
    marginLeft: "10vw",
    marginRight: "10vw",
  },
  [theme.breakpoints.up("md")]: {
    marginLeft: "20vw",
    marginRight: "20vw",
  },
}));

const HomeScreen = ({
  setTrainerDialogOpen,
  id,
  setScreen,
  setSettingsDialogOpen,
  sprite,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const socket = useSocket();

  const playButtonClick = () => {
    if (!id)
      enqueueSnackbar(`No id found...`, {
        variant: "error",
      });
    else {
      setScreen("Lobby");
      console.log("sending join-lobby...");
      socket.emit("join-lobby", sprite);
    }
  };

  return (
    <HomeScreenContainer>
      <Grid container spacing={1} textAlign="center" sx={{ mt: "10vh" }}>
        <Grid item xs={12} sx={{ mb: "2vh" }}>
          <TitleContainer>PokeQuest</TitleContainer>
        </Grid>
        <Grid item xs={12} sx={{ ml: "4vw", mr: "4vw" }}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => playButtonClick()}
          >
            Play
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            onClick={() => setTrainerDialogOpen(true)}
            fullWidth
            variant="contained"
          >
            Trainer
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            onClick={() => setSettingsDialogOpen(true)}
            fullWidth
            variant="contained"
          >
            Settings
          </Button>
        </Grid>
      </Grid>
    </HomeScreenContainer>
  );
};

export default HomeScreen;
