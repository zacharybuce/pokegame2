import React, { useState, useEffect } from "react";
import ReactAudioPlayer from "react-audio-player";

const Music = ({ volume, event }) => {
  const [song, setSong] = useState();
  const actionSongs = ["Desert", "Fallarbor", "Verdanturf", "Slateport"];

  //better than math rand
  function genRand(min, max) {
    return (
      (Math.floor(Math.pow(10, 14) * Math.random() * Math.random()) %
        (max - min + 1)) +
      min
    );
  }

  useEffect(() => {
    handleEvent(event);
  }, [event]);

  const handleEvent = (e) => {
    switch (e) {
      case "lobby":
        setSong("Opening");
        break;
      case "start-game":
        setSong("Welcome");
        break;
      case "wild-battle":
        setSong("WildBattle");
        break;
      case "trainer-battle":
        setSong("GymBattle");
        break;
      case "elite-battle":
        setSong("EliteBattle");
        break;
      case "movement":
        setSong("CyclingRoad");
        break;
      case "action":
        getRandSong();
        break;
    }
  };

  const getRandSong = () => {
    let rand = genRand(0, actionSongs.length - 1);
    setSong(actionSongs[rand]);
  };

  return (
    <ReactAudioPlayer
      autoPlay
      volume={volume / 100}
      src={"/Music/" + song + ".mp3"}
      loop
    />
  );
};

export default Music;
