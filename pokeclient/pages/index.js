import React, { useState, useEffect } from "react";
import { SocketProvider } from "../contexts/SocketProvider";
import useLocalStorage from "../hooks/useLocalStorage";
import HomeScreen from "../components/HomeScreenComps/HomeScreen";
import TrainerDialog from "../components/HomeScreenComps/TrainerDialog";
import LobbyScreen from "../components/LobbyComps/LobbyScreen";
import SettingsDialog from "../components/HomeScreenComps/SettingsDialog";
import GameBoard from "../components/GameBoardComps/GameBoard";
import ContinueLobby from "../components/LobbyComps/ContinueLobby";
import Music from "../components/SoundComps/Music";

export default function Index() {
  const [id, setId] = useLocalStorage("id");
  const [sprite, setSprite] = useLocalStorage("sprite");
  const [screen, setScreen] = useState("Home");
  const [trainerDialogOpen, setTrainerDialogOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [musicVolume, setMusicVolume] = useState(20);
  const [isContinue, setIsContinue] = useState(false);
  const [musicEvent, setMusicEvent] = useState();

  const screenDisplay = (screen) => {
    switch (screen) {
      case "Home":
        return (
          <HomeScreen
            id={id}
            setTrainerDialogOpen={setTrainerDialogOpen}
            setScreen={setScreen}
            setSettingsDialogOpen={setSettingsDialogOpen}
            sprite={sprite}
            setMusicEvent={setMusicEvent}
          />
        );
      case "Lobby":
        return <LobbyScreen setScreen={setScreen} id={id} />;
      case "ContinueLobby":
        return (
          <ContinueLobby
            setScreen={setScreen}
            id={id}
            setIsContinue={setIsContinue}
          />
        );
      case "GameBoard":
        return (
          <GameBoard
            id={id}
            isContinue={isContinue}
            setMusicEvent={setMusicEvent}
            setSettingsDialogOpen={setSettingsDialogOpen}
          />
        );
    }
  };

  return (
    <SocketProvider id={id}>
      {screenDisplay(screen)}
      <TrainerDialog
        trainerDialogOpen={trainerDialogOpen}
        setTrainerDialogOpen={setTrainerDialogOpen}
        id={id}
        setId={setId}
        sprite={sprite}
        setSprite={setSprite}
      />
      <SettingsDialog
        setSettingsDialogOpen={setSettingsDialogOpen}
        settingsDialogOpen={settingsDialogOpen}
        musicVolume={musicVolume}
        setMusicVolume={setMusicVolume}
      />
      <Music volume={musicVolume} event={musicEvent} />
    </SocketProvider>
  );
}
