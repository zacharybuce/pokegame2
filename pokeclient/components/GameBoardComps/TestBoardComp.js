import React, { useState, useEffect } from "react";
import {
  HexGrid,
  Layout,
  Hexagon,
  Text,
  Pattern,
  Path,
  Hex,
  HexUtils,
  GridGenerator,
} from "react-hexgrid";
import { Box } from "@mui/material";
import styles from "../../Styles/TestBoardComp.module.css";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import TileInfoDrawer from "./TileInfoDrawerComps/TileInfoDrawer";

const TestBoardComp = ({
  tileDrawer,
  x,
  y,
  setTileDrawer,
  actionComplete,
  takeAction,
  phase,
  team,
  selected,
  badges,
  playerLocation,
  players,
  tileToShow,
  money,
  setTileToShow,
  canInteract,
  setCanInteract,
  setX,
  setY,
  setSelected,
}) => {
  const { width, height } = useWindowDimensions();
  const hexagonSize = { x: 20, y: 20 };
  const hexToken = { x: 15, y: 15 };

  const layoutDimension = {
    size: hexagonSize,
    orientation: {
      b0: 0.6666666666666666,
      b1: 0,
      b2: -0.3333333333333333,
      b3: 0.5773502691896257,
      f0: 1.5,
      f1: 0,
      f2: 0.8660254037844386,
      f3: 1.7320508075688772,
      startAngle: 0,
    },
    origin: { x: 0, y: 0 },
    spacing: 1,
  };

  const getCoord = (location) => {
    const hex = new Hex(location.q, location.r, location.s);

    var res = HexUtils.hexToPixel(hex, layoutDimension);
    return res;
  };

  const camMovement = 10;

  //moves board based on key presses
  const keyDownHandler = (event) => {
    console.log("User pressed: ", event.dkey);

    if (event.key === "w") {
      setY((prev) => prev - camMovement);
    }
    if (event.key === "a") {
      setX((prev) => prev - camMovement);
    }
    if (event.key === "s") {
      setY((prev) => prev + camMovement);
    }
    if (event.key === "d") {
      setX((prev) => prev + camMovement);
    }
  };

  //During the movement phase, this will see if a tile is next to the tile the player is on
  const isSelectable = (q, r, s) => {
    const hex = new Hex(q, r, s);

    if (phase !== "movement") return true;
    else {
      if (HexUtils.equals(hex, playerLocation)) return true;
      const neighbours = HexUtils.neighbours(playerLocation);
      for (let i = 0; i < neighbours.length; i++) {
        if (HexUtils.equals(hex, neighbours[i])) {
          return true;
        }
      }
      return false;
    }
  };

  //Handles clicking on a tile, depending on action or move phase
  const handleHexSelect = (tile, source) => {
    switch (phase) {
      case "starter":
        hexSelectAction(tile, source);
        break;
      case "movement":
        let { q, r, s } = source.state.hex;
        if (isSelectable(q, r, s)) hexSelectMovement(tile, source);
        else hexSelectAction(tile, source);
        break;
      case "action":
        hexSelectAction(tile, source);
    }
  };

  //when action phase, drawer will open on click showing correct info for tile
  const hexSelectAction = (tile, source) => {
    if (HexUtils.equals(source.state.hex, playerLocation) && phase != "starter")
      setCanInteract(true);
    else setCanInteract(false);

    let info = { tile: tile, location: source.state.hex };
    setTileToShow(info);
    setTileDrawer(true);
  };

  //when movement phase
  const hexSelectMovement = (tile, source) => {
    setTileToShow({ tile: tile, coord: source.state.hex });
    let sel = { tile: tile, coord: source.state.hex };
    setSelected(sel);
  };

  //shows styles depending on tile
  const getClassName = (q, r, s) => {
    if (
      phase === "movement" &&
      selected &&
      HexUtils.equals(new Hex(q, r, s), selected.coord)
    ) {
      return "tile-selected";
    }

    if (isSelectable(q, r, s)) {
      return "tile-selectable";
    }

    return "tile-unselectable";
  };

  //sets up key listener
  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  useEffect(() => {
    console.log("x: " + x + " y: " + y);
  }, [x, y]);

  return (
    <Box className={styles.test} onKeyDown={() => console.log(e.keycode)}>
      <HexGrid
        width={width}
        height={height / 1.3}
        viewBox={`${x} ${y} 200 200`}
      >
        {/*Filler Tiles*/}
        <Layout
          size={hexagonSize}
          flat={true}
          spacing={1}
          origin={{ x: 0, y: 0 }}
        >
          <Hexagon
            q={0}
            r={-1}
            s={1}
            fill={"grass1"}
            className={
              phase != "movement" ? "tile-filler" : "tile-unselectable"
            }
          ></Hexagon>
          <Hexagon
            q={-2}
            r={0}
            s={2}
            fill={"redrock"}
            className={
              phase != "movement" ? "tile-filler" : "tile-unselectable"
            }
          ></Hexagon>
          <Hexagon
            q={0}
            r={-2}
            s={2}
            fill={"grass1"}
            className={
              phase != "movement" ? "tile-filler" : "tile-unselectable"
            }
          ></Hexagon>
          <Hexagon
            q={4}
            r={-2}
            s={-2}
            fill={"grass1"}
            className={
              phase != "movement" ? "tile-filler" : "tile-unselectable"
            }
          ></Hexagon>
          <Hexagon
            q={1}
            r={1}
            s={-2}
            fill={"water1"}
            className={
              phase != "movement" ? "tile-filler" : "tile-unselectable"
            }
          ></Hexagon>
          <Hexagon
            q={1}
            r={2}
            s={-3}
            fill={"grass1"}
            className={
              phase != "movement" ? "tile-filler" : "tile-unselectable"
            }
          ></Hexagon>
          <Hexagon
            q={2}
            r={1}
            s={-3}
            fill={"grass1"}
            className={
              phase != "movement" ? "tile-filler" : "tile-unselectable"
            }
          ></Hexagon>
          <Hexagon
            q={3}
            r={0}
            s={-3}
            fill={"water1"}
            className={
              phase != "movement" ? "tile-filler" : "tile-unselectable"
            }
          ></Hexagon>
          <Hexagon
            q={1}
            r={-3}
            s={2}
            fill={"grass2"}
            className={
              phase != "movement" ? "tile-filler" : "tile-unselectable"
            }
          ></Hexagon>
          <Hexagon
            q={2}
            r={-3}
            s={1}
            fill={"grass2"}
            className={
              phase != "movement" ? "tile-filler" : "tile-unselectable"
            }
          ></Hexagon>
          <Hexagon
            q={3}
            r={-3}
            s={0}
            fill={"grass2"}
            className={
              phase != "movement" ? "tile-filler" : "tile-unselectable"
            }
          ></Hexagon>
          <Hexagon
            q={-4}
            r={0}
            s={4}
            fill={"mountain"}
            className={
              phase != "movement" ? "tile-filler" : "tile-unselectable"
            }
          ></Hexagon>
          <Hexagon
            q={-4}
            r={1}
            s={3}
            fill={"mountain"}
            className={
              phase != "movement" ? "tile-filler" : "tile-unselectable"
            }
          ></Hexagon>
          <Hexagon
            q={-4}
            r={2}
            s={2}
            fill={"grass2"}
            className={
              phase != "movement" ? "tile-filler" : "tile-unselectable"
            }
          ></Hexagon>
          <Hexagon
            q={-3}
            r={2}
            s={1}
            fill={"redrock"}
            className={
              phase != "movement" ? "tile-filler" : "tile-unselectable"
            }
          ></Hexagon>
          <Hexagon
            q={-2}
            r={3}
            s={-1}
            fill={"grass2"}
            className={
              phase != "movement" ? "tile-filler" : "tile-unselectable"
            }
          ></Hexagon>
          <Hexagon
            q={-4}
            r={4}
            s={0}
            fill={"grass2"}
            className={
              phase != "movement" ? "tile-filler" : "tile-unselectable"
            }
          ></Hexagon>
          <Hexagon
            q={-3}
            r={5}
            s={-2}
            fill={"grass2"}
            className={
              phase != "movement" ? "tile-filler" : "tile-unselectable"
            }
          ></Hexagon>
          <Hexagon
            q={-1}
            r={4}
            s={-3}
            fill={"grass2"}
            className={
              phase != "movement" ? "tile-filler" : "tile-unselectable"
            }
          ></Hexagon>
          <Hexagon
            q={-1}
            r={5}
            s={-4}
            fill={"water2"}
            className={
              phase != "movement" ? "tile-filler" : "tile-unselectable"
            }
          ></Hexagon>
          <Hexagon
            q={-2}
            r={6}
            s={-4}
            fill={"water2"}
            className={
              phase != "movement" ? "tile-filler" : "tile-unselectable"
            }
          ></Hexagon>
          <Hexagon
            q={-3}
            r={6}
            s={-3}
            fill={"water2"}
            className={
              phase != "movement" ? "tile-filler" : "tile-unselectable"
            }
          ></Hexagon>
          <Hexagon
            q={-4}
            r={6}
            s={-2}
            fill={"water2"}
            className={
              phase != "movement" ? "tile-filler" : "tile-unselectable"
            }
          ></Hexagon>
          <Hexagon
            q={2}
            r={2}
            s={-4}
            fill={"water1"}
            className={
              phase != "movement" ? "tile-filler" : "tile-unselectable"
            }
          ></Hexagon>
          <Hexagon
            q={3}
            r={1}
            s={-4}
            fill={"water1"}
            className={
              phase != "movement" ? "tile-filler" : "tile-unselectable"
            }
          ></Hexagon>
          <Hexagon
            q={2}
            r={3}
            s={-5}
            fill={"water1"}
            className={
              phase != "movement" ? "tile-filler" : "tile-unselectable"
            }
          ></Hexagon>
          <Hexagon
            q={3}
            r={2}
            s={-5}
            fill={"water1"}
            className={
              phase != "movement" ? "tile-filler" : "tile-unselectable"
            }
          ></Hexagon>
          <Hexagon
            q={4}
            r={2}
            s={-6}
            fill={"water2"}
            className={
              phase != "movement" ? "tile-filler" : "tile-unselectable"
            }
          ></Hexagon>
        </Layout>
        {/* Main grid*/}
        <Layout
          size={hexagonSize}
          flat={true}
          spacing={1}
          origin={{ x: 0, y: 0 }}
        >
          <Hexagon
            q={0}
            r={0}
            s={0}
            className={getClassName(0, 0, 0)}
            fill={"grass1"}
            onClick={(event, source) => {
              handleHexSelect("118", source);
            }}
          >
            <Text>118</Text>
          </Hexagon>
          <Hexagon
            q={1}
            r={-1}
            s={0}
            className={getClassName(1, -1, 0)}
            fill={"grass3"}
            onClick={(event, source) => {
              handleHexSelect("119", source);
            }}
          >
            <Text>119</Text>
          </Hexagon>
          <Hexagon
            q={1}
            r={-2}
            s={1}
            className={
              isSelectable(1, -2, 1)
                ? "tile-selectable-under"
                : "tile-unselectable"
            }
            fill={"grass2"}
          >
            {/* <Text>Fortree</Text> */}
          </Hexagon>
          <Hexagon
            q={1}
            r={0}
            s={-1}
            className={getClassName(1, 0, -1)}
            fill={"grass2"}
            onClick={(event, source) => {
              handleHexSelect("123", source);
            }}
          >
            <Text>123</Text>
          </Hexagon>
          <Hexagon
            q={2}
            r={-2}
            s={0}
            className={getClassName(2, -2, 0)}
            fill={"grass3"}
            onClick={(event, source) => {
              handleHexSelect("120", source);
            }}
          >
            <Text>120</Text>
          </Hexagon>
          <Hexagon
            q={2}
            r={-1}
            s={-1}
            className={
              isSelectable(2, -1, -1)
                ? "tile-selectable-under"
                : "tile-unselectable"
            }
            fill={"water1"}
          >
            {/* <Text>Mt.Pyre</Text> */}
          </Hexagon>
          <Hexagon
            q={3}
            r={-2}
            s={-1}
            className={getClassName(3, -2, -1)}
            fill={"grass2"}
            onClick={(event, source) => {
              handleHexSelect("121", source);
            }}
          >
            <Text>121</Text>
          </Hexagon>
          <Hexagon
            q={2}
            r={0}
            s={-2}
            className={getClassName(2, 0, -2)}
            fill={"water1"}
            onClick={(event, source) => {
              handleHexSelect("122", source);
            }}
          >
            <Text>122</Text>
          </Hexagon>
          <Hexagon
            q={3}
            r={-1}
            s={-2}
            className={
              isSelectable(3, -1, -2)
                ? "tile-selectable-under"
                : "tile-unselectable"
            }
            fill={"grass1"}
          >
            {/* <Text>Safari</Text> */}
          </Hexagon>
          <Hexagon
            q={4}
            r={-1}
            s={-3}
            className={
              isSelectable(4, -1, -3)
                ? "tile-selectable-under"
                : "tile-unselectable"
            }
            fill={"grass1"}
          >
            {/* <Text>lilycove</Text> */}
          </Hexagon>
          <Hexagon
            q={4}
            r={0}
            s={-4}
            className={getClassName(4, 0, -4)}
            fill={"water2"}
            onClick={(event, source) => {
              handleHexSelect("124", source);
            }}
          >
            <Text>124</Text>
          </Hexagon>
          <Hexagon
            q={4}
            r={1}
            s={-5}
            className={getClassName(4, 1, -5)}
            fill={"water2"}
            onClick={(event, source) => {
              handleHexSelect("126", source);
            }}
          >
            <Text>126</Text>
          </Hexagon>
          <Hexagon
            q={5}
            r={0}
            s={-5}
            className={
              isSelectable(5, 0, -5)
                ? "tile-selectable-under"
                : "tile-unselectable"
            }
            fill={"mountain"}
          >
            {/* <Text>Sootopolis</Text> */}
          </Hexagon>
          <Hexagon
            q={5}
            r={-1}
            s={-4}
            className={
              isSelectable(5, -1, -4)
                ? "tile-selectable-under"
                : "tile-unselectable"
            }
            fill={"water2"}
          >
            {/* <Text>Shoal Cave</Text> */}
          </Hexagon>
          <Hexagon
            q={5}
            r={-2}
            s={-3}
            className={getClassName(5, -2, -3)}
            fill={"water2"}
            onClick={(event, source) => {
              handleHexSelect("125", source);
            }}
          >
            <Text>125</Text>
          </Hexagon>
          <Hexagon
            q={6}
            r={-2}
            s={-4}
            className={
              isSelectable(6, -2, -4)
                ? "tile-selectable-under"
                : "tile-unselectable"
            }
            fill={"sand1"}
          >
            {/* <Text>Mossdeep</Text> */}
          </Hexagon>
          <Hexagon
            q={6}
            r={-1}
            s={-5}
            className={getClassName(6, -1, -5)}
            fill={"water2"}
            onClick={(event, source) => {
              handleHexSelect("127", source);
            }}
          >
            <Text>127</Text>
          </Hexagon>
          <Hexagon
            q={6}
            r={0}
            s={-6}
            className={getClassName(6, 0, -6)}
            fill={"water2"}
            onClick={(event, source) => {
              handleHexSelect("128", source);
            }}
          >
            <Text>128</Text>
          </Hexagon>
          <Hexagon
            q={5}
            r={1}
            s={-6}
            className={
              isSelectable(5, 1, -6)
                ? "tile-selectable-under"
                : "tile-unselectable"
            }
            fill={"water2"}
          >
            {/* <Text>Seafloor Cavern</Text> */}
          </Hexagon>
          <Hexagon
            q={6}
            r={1}
            s={-7}
            className={
              isSelectable(6, 1, -7)
                ? "tile-selectable-under"
                : "tile-unselectable"
            }
            fill={"sand1"}
          >
            {/* <Text>Mirage Island</Text> */}
          </Hexagon>
          <Hexagon
            q={7}
            r={-1}
            s={-6}
            className={
              isSelectable(7, -1, -6)
                ? "tile-selectable-under"
                : "tile-unselectable"
            }
            fill={"grass1"}
          >
            {/* <Text>Ever Grande</Text> */}
          </Hexagon>
          <Hexagon
            q={5}
            r={2}
            s={-7}
            className={getClassName(5, 2, -7)}
            fill={"water2"}
            onClick={(event, source) => {
              handleHexSelect("130", source);
            }}
          >
            <Text>130</Text>
          </Hexagon>
          <Hexagon
            q={4}
            r={3}
            s={-7}
            className={getClassName(4, 3, -7)}
            fill={"water2"}
            onClick={(event, source) => {
              handleHexSelect("131", source);
            }}
          >
            <Text>131</Text>
          </Hexagon>
          <Hexagon
            q={3}
            r={3}
            s={-6}
            className={
              isSelectable(3, 3, -6)
                ? "tile-selectable-under"
                : "tile-unselectable"
            }
            fill={"water1"}
          >
            {/* <Text>Sky Pillar</Text> */}
          </Hexagon>
          <Hexagon
            q={3}
            r={4}
            s={-7}
            className={
              isSelectable(3, 4, -7)
                ? "tile-selectable-under"
                : "tile-unselectable"
            }
            fill={"water1"}
          >
            {/* <Text>Pacifilog</Text> */}
          </Hexagon>
          <Hexagon
            q={2}
            r={4}
            s={-6}
            className={getClassName(2, 4, -6)}
            fill={"water1"}
            onClick={(event, source) => {
              handleHexSelect("132", source);
            }}
          >
            <Text>132</Text>
          </Hexagon>
          <Hexagon
            q={1}
            r={4}
            s={-5}
            className={
              isSelectable(1, 4, -5)
                ? "tile-selectable-under"
                : "tile-unselectable"
            }
            fill={"sand1"}
          >
            {/* <Text>FarawayIsland</Text> */}
          </Hexagon>
          <Hexagon
            q={1}
            r={3}
            s={-4}
            className={getClassName(1, 3, -4)}
            fill={"water1"}
            onClick={(event, source) => {
              handleHexSelect("134", source);
            }}
          >
            <Text>134</Text>
          </Hexagon>
          <Hexagon
            q={0}
            r={3}
            s={-3}
            className={
              isSelectable(0, 3, -3)
                ? "tile-selectable-under"
                : "tile-unselectable"
            }
            fill={"sand1"}
          >
            {/* <Text>Slateport</Text> */}
          </Hexagon>
          <Hexagon
            q={0}
            r={2}
            s={-2}
            className={getClassName(0, 2, -2)}
            fill={"grass1"}
            onClick={(event, source) => {
              handleHexSelect("110", source);
            }}
          >
            <Text>110</Text>
          </Hexagon>
          <Hexagon
            q={-1}
            r={2}
            s={-1}
            className={
              isSelectable(-1, 2, -1)
                ? "tile-selectable-under"
                : "tile-unselectable"
            }
            fill={"grass1"}
          >
            {/* <Text>Trick House</Text> */}
          </Hexagon>
          <Hexagon
            q={-1}
            r={1}
            s={0}
            className={
              isSelectable(-1, 1, 0)
                ? "tile-selectable-under"
                : "tile-unselectable"
            }
            fill={"grass1"}
          >
            {/* <Text>Mauville</Text> */}
          </Hexagon>
          <Hexagon
            q={0}
            r={1}
            s={-1}
            className={
              isSelectable(0, 1, -1)
                ? "tile-selectable-under"
                : "tile-unselectable"
            }
            fill={"water1"}
          >
            {/* <Text>New Mauville</Text> */}
          </Hexagon>
          <Hexagon
            q={-1}
            r={0}
            s={1}
            className={getClassName(-1, 0, 1)}
            fill={"grass1"}
            onClick={(event, source) => {
              handleHexSelect("111", source);
            }}
          >
            <Text>111</Text>
          </Hexagon>
          <Hexagon
            q={-1}
            r={-1}
            s={2}
            className={getClassName(-1, -1, 2)}
            fill={"sand2"}
            onClick={(event, source) => {
              handleHexSelect("desert", source);
            }}
          >
            <Text>Desert</Text>
          </Hexagon>
          <Hexagon
            q={-1}
            r={-2}
            s={3}
            className={
              isSelectable(-1, -2, 3)
                ? "tile-selectable-under"
                : "tile-unselectable"
            }
            fill={"sand2"}
          >
            {/* <Text>Mirage Tower</Text> */}
          </Hexagon>
          <Hexagon
            q={-2}
            r={-1}
            s={3}
            className={getClassName(-2, -1, 3)}
            fill={"sand2"}
            onClick={(event, source) => {
              handleHexSelect("113", source);
            }}
          >
            <Text>113</Text>
          </Hexagon>
          <Hexagon
            q={-2}
            r={1}
            s={1}
            className={getClassName(-2, 1, 1)}
            fill={"redrock"}
            onClick={(event, source) => {
              handleHexSelect("112", source);
            }}
          >
            <Text>112</Text>
          </Hexagon>
          <Hexagon
            q={-3}
            r={1}
            s={2}
            className={
              isSelectable(-3, 1, 2)
                ? "tile-selectable-under"
                : "tile-unselectable"
            }
            fill={"redrock"}
          >
            {/* <Text>Lavaridge</Text> */}
          </Hexagon>
          <Hexagon
            q={-3}
            r={0}
            s={3}
            className={
              isSelectable(-3, 0, 3)
                ? "tile-selectable-under"
                : "tile-unselectable"
            }
            fill={"redrock"}
          >
            {/* <Text>Mt.Chimney</Text> */}
          </Hexagon>
          <Hexagon
            q={-3}
            r={-1}
            s={4}
            className={
              isSelectable(-3, -1, 4)
                ? "tile-selectable-under"
                : "tile-unselectable"
            }
            fill={"sand3"}
          >
            {/* <Text>Fallarbor</Text> */}
          </Hexagon>
          <Hexagon
            q={-2}
            r={-2}
            s={4}
            className={getClassName(-2, -2, 4)}
            fill={"sand3"}
            onClick={(event, source) => {
              handleHexSelect("desertpass", source);
            }}
          >
            <Text>Desert Pass</Text>
          </Hexagon>
          <Hexagon
            q={-4}
            r={-1}
            s={5}
            className={getClassName(-4, -1, 5)}
            fill={"grass1"}
            onClick={(event, source) => {
              handleHexSelect("114", source);
            }}
          >
            <Text>114</Text>
          </Hexagon>
          <Hexagon
            q={-5}
            r={0}
            s={5}
            className={getClassName(-5, 0, 5)}
            fill={"mountain"}
            onClick={(event, source) => {
              handleHexSelect("mountainpass", source);
            }}
          >
            <Text>Mountain Pass</Text>
          </Hexagon>
          <Hexagon
            q={-5}
            r={1}
            s={4}
            className={
              isSelectable(-5, 1, 4)
                ? "tile-selectable-under"
                : "tile-unselectable"
            }
            fill={"mountain"}
          >
            {/* <Text>Meteor Falls</Text> */}
          </Hexagon>
          <Hexagon
            q={-5}
            r={2}
            s={3}
            className={getClassName(-5, 2, 3)}
            fill={"mountain"}
            onClick={(event, source) => {
              handleHexSelect("115", source);
            }}
          >
            <Text>115</Text>
          </Hexagon>
          <Hexagon
            q={-5}
            r={3}
            s={2}
            className={
              isSelectable(-5, 3, 2)
                ? "tile-selectable-under"
                : "tile-unselectable"
            }
            fill={"grass1"}
          >
            {/* <Text>Rustboro</Text> */}
          </Hexagon>
          <Hexagon
            q={-4}
            r={3}
            s={1}
            className={getClassName(-4, 3, 1)}
            fill={"grass2"}
            onClick={(event, source) => {
              handleHexSelect("116", source);
            }}
          >
            <Text>116</Text>
          </Hexagon>
          <Hexagon
            q={-3}
            r={3}
            s={0}
            className={
              isSelectable(-3, 3, 0)
                ? "tile-selectable-under"
                : "tile-unselectable"
            }
            fill={"mountain"}
          >
            {/* <Text>Rusturf Tunnel</Text> */}
          </Hexagon>
          <Hexagon
            q={-2}
            r={2}
            s={0}
            className={getClassName(-2, 2, 0)}
            fill={"grass1"}
            onClick={(event, source) => {
              handleHexSelect("117", source);
            }}
          >
            <Text>117</Text>
          </Hexagon>
          <Hexagon
            q={-5}
            r={4}
            s={1}
            className={getClassName(-5, 4, 1)}
            fill={"water1"}
            onClick={(event, source) => {
              handleHexSelect("104", source);
            }}
          >
            <Text>104</Text>
          </Hexagon>
          <Hexagon
            q={-5}
            r={5}
            s={0}
            className={
              isSelectable(-5, 5, 0)
                ? "tile-selectable-under"
                : "tile-unselectable"
            }
            fill={"grass2"}
          >
            {/* <Text>PetalburgWoods</Text> */}
          </Hexagon>
          <Hexagon
            q={-4}
            r={5}
            s={-1}
            className={
              isSelectable(-4, 5, -1)
                ? "tile-selectable-under"
                : "tile-unselectable"
            }
            fill={"grass2"}
          >
            {/* <Text>Petalburg</Text> */}
          </Hexagon>
          <Hexagon
            q={-3}
            r={4}
            s={-1}
            className={getClassName(-3, 4, -1)}
            fill={"grass2"}
            onClick={(event, source) => {
              handleHexSelect("102", source);
            }}
          >
            <Text>102</Text>
          </Hexagon>
          <Hexagon
            q={-2}
            r={4}
            s={-2}
            className={getClassName(-2, 4, -2)}
            fill={"grass2"}
            onClick={(event, source) => {
              handleHexSelect("101", source);
            }}
          >
            <Text>101</Text>
          </Hexagon>
          <Hexagon
            q={-1}
            r={3}
            s={-2}
            className={getClassName(-1, 3, -2)}
            fill={"grass2"}
            onClick={(event, source) => {
              handleHexSelect("103", source);
            }}
          >
            <Text>103</Text>
          </Hexagon>
          <Hexagon
            q={-2}
            r={5}
            s={-3}
            className={
              isSelectable(-2, 5, -3)
                ? "tile-selectable-under"
                : "tile-unselectable"
            }
            fill={"grass2"}
          >
            {/* <Text>Littleroot</Text> */}
          </Hexagon>
          <Hexagon
            q={0}
            r={4}
            s={-4}
            className={getClassName(0, 4, -4)}
            fill={"water1"}
            onClick={(event, source) => {
              handleHexSelect("109", source);
            }}
          >
            <Text>109</Text>
          </Hexagon>
          <Hexagon
            q={0}
            r={5}
            s={-5}
            className={
              isSelectable(0, 5, -5)
                ? "tile-selectable-under"
                : "tile-unselectable"
            }
            fill={"water2"}
          >
            {/* <Text>Sunken Ship</Text> */}
          </Hexagon>
          <Hexagon
            q={-1}
            r={6}
            s={-5}
            className={getClassName(-1, 6, -5)}
            fill={"water2"}
            onClick={(event, source) => {
              handleHexSelect("108", source);
            }}
          >
            <Text>108</Text>
          </Hexagon>
          <Hexagon
            q={-2}
            r={7}
            s={-5}
            className={getClassName(-2, 7, -5)}
            fill={"water2"}
            onClick={(event, source) => {
              handleHexSelect("107", source);
            }}
          >
            <Text>107</Text>
          </Hexagon>
          <Hexagon
            q={-3}
            r={7}
            s={-4}
            className={
              isSelectable(-3, 7, -4)
                ? "tile-selectable-under"
                : "tile-unselectable"
            }
            fill={"sand1"}
          >
            {/* <Text>Dewford</Text> */}
          </Hexagon>
          <Hexagon
            q={-4}
            r={8}
            s={-4}
            className={
              isSelectable(-4, 8, -4)
                ? "tile-selectable-under"
                : "tile-unselectable"
            }
            fill={"sand2"}
          >
            {/* <Text>Granite Cave</Text> */}
          </Hexagon>
          <Hexagon
            q={-4}
            r={7}
            s={-3}
            className={getClassName(-4, 7, -3)}
            fill={"water2"}
            onClick={(event, source) => {
              handleHexSelect("106", source);
            }}
          >
            <Text>106</Text>
          </Hexagon>
          <Hexagon
            q={-5}
            r={7}
            s={-2}
            className={
              isSelectable(-5, 7, -2)
                ? "tile-selectable-under"
                : "tile-unselectable"
            }
            fill={"water2"}
          >
            {/* <Text>Island Cave</Text> */}
          </Hexagon>
          <Hexagon
            q={-5}
            r={6}
            s={-1}
            className={getClassName(-5, 6, -1)}
            fill={"water1"}
            onClick={(event, source) => {
              handleHexSelect("105", source);
            }}
          >
            <Text>105</Text>
          </Hexagon>
        </Layout>
        {/*Event-Town Tiles*/}
        <Layout
          size={hexToken}
          flat={true}
          spacing={1.335}
          origin={{ x: 0, y: 0 }}
        >
          <Hexagon
            q={5}
            r={0}
            s={-5}
            className={getClassName(5, 0, -5)}
            fill={"water2"}
            onClick={(event, source) => {
              handleHexSelect("sootopolis", source);
            }}
          >
            {/* <Text>Sootopolis</Text> */}
            <image
              href="/Tiles-Hoen/sootopolis.png"
              width="13"
              height="13"
              x="-6.4"
              y="-6.4"
            ></image>
          </Hexagon>
          <Hexagon
            q={6}
            r={-2}
            s={-4}
            className={getClassName(6, -2, -4)}
            fill={"grass1"}
            onClick={(event, source) => {
              handleHexSelect("mossdeep", source);
            }}
          >
            {/* <Text>Mossdeep</Text> */}
            <image
              href="/Tiles-Hoen/mossdeep.png"
              width="13"
              height="13"
              x="-6.4"
              y="-6.4"
            ></image>
          </Hexagon>
          <Hexagon
            q={7}
            r={-1}
            s={-6}
            className={getClassName(7, -1, -6)}
            fill={"grass2"}
            onClick={(event, source) => {
              handleHexSelect("evergrande", source);
            }}
          >
            {/* <Text>Ever Grande</Text> */}
            <image
              href="/Tiles-Hoen/evergrande.png"
              width="13"
              height="13"
              x="-6.4"
              y="-6.4"
            ></image>
          </Hexagon>
          <Hexagon
            q={3}
            r={4}
            s={-7}
            className={getClassName(3, 4, -7)}
            fill={"water1"}
            onClick={(event, source) => {
              handleHexSelect("pacifidlog", source);
            }}
          >
            {/* <Text>Pacifilog</Text> */}
            <image
              href="/Tiles-Hoen/pacifilog.png"
              width="13"
              height="13"
              x="-6.4"
              y="-6.4"
            ></image>
          </Hexagon>
          <Hexagon
            q={0}
            r={3}
            s={-3}
            className={getClassName(0, 3, -3)}
            fill={"sand1"}
            onClick={(event, source) => {
              handleHexSelect("slateport", source);
            }}
          >
            {/* <Text>Slateport</Text> */}
            <image
              href="/Tiles-Hoen/slateport.png"
              width="13"
              height="13"
              x="-6.4"
              y="-6.4"
            ></image>
          </Hexagon>
          <Hexagon
            q={-1}
            r={2}
            s={-1}
            className={getClassName(-1, 2, -1)}
            fill={"grass1"}
            onClick={(event, source) => {
              handleHexSelect("trickhouse", source);
            }}
          >
            {/* <Text>Trick House</Text> */}
            <image
              href="/Tiles-Hoen/trickhouse.png"
              width="13"
              height="13"
              x="-6.4"
              y="-6.4"
            ></image>
          </Hexagon>
          <Hexagon
            q={-1}
            r={1}
            s={0}
            className={getClassName(-1, 1, 0)}
            fill={"grass1"}
            onClick={(event, source) => {
              handleHexSelect("mauville", source);
            }}
          >
            {/* <Text>Mauville</Text> */}
            <image
              href="/Tiles-Hoen/mauville.png"
              width="13"
              height="13"
              x="-6.4"
              y="-6.4"
            ></image>
          </Hexagon>
          <Hexagon
            q={0}
            r={1}
            s={-1}
            className={getClassName(0, 1, -1)}
            fill={"water1"}
            onClick={(event, source) => {
              handleHexSelect("newmauville", source);
            }}
          >
            {/* <Text>New Mauville</Text> */}
            <image
              href="/Tiles-Hoen/cave.png"
              width="13"
              height="13"
              x="-6.4"
              y="-6.4"
            ></image>
          </Hexagon>
          <Hexagon
            q={-3}
            r={1}
            s={2}
            className={getClassName(-3, 1, 2)}
            fill={"redrock"}
            onClick={(event, source) => {
              handleHexSelect("lavaridge", source);
            }}
          >
            {/* <Text>Lavaridge</Text> */}
            <image
              href="/Tiles-Hoen/town.png"
              width="13"
              height="13"
              x="-6.4"
              y="-6.4"
            ></image>
          </Hexagon>
          <Hexagon
            q={-3}
            r={-1}
            s={4}
            className={getClassName(-3, -1, 4)}
            fill={"sand3"}
            onClick={(event, source) => {
              handleHexSelect("fallarbor", source);
            }}
          >
            {/* <Text>Fallarbor</Text> */}
            <image
              href="/Tiles-Hoen/town.png"
              width="13"
              height="13"
              x="-6.4"
              y="-6.4"
            ></image>
          </Hexagon>
          <Hexagon
            q={-5}
            r={3}
            s={2}
            className={getClassName(-5, 3, 2)}
            fill={"grass1"}
            onClick={(event, source) => {
              handleHexSelect("rustboro", source);
            }}
          >
            {/* <Text>Rustboro</Text> */}
            <image
              href="/Tiles-Hoen/rustboro.png"
              width="13"
              height="13"
              x="-6.4"
              y="-6.4"
            ></image>
          </Hexagon>
          <Hexagon
            q={-4}
            r={5}
            s={-1}
            className={getClassName(-4, 5, -1)}
            fill={"grass2"}
            onClick={(event, source) => {
              handleHexSelect("petalburg", source);
            }}
          >
            {/* <Text>Petalburg</Text> */}
            <image
              href="/Tiles-Hoen/town.png"
              width="13"
              height="13"
              x="-6.4"
              y="-6.4"
            ></image>
          </Hexagon>
          <Hexagon
            q={-2}
            r={5}
            s={-3}
            className={getClassName(-2, 5, -3)}
            fill={"grass2"}
            onClick={(event, source) => {
              handleHexSelect("littleroot", source);
            }}
          >
            {/* <Text>Littleroot</Text> */}
            <image
              href="/Tiles-Hoen/town.png"
              width="13"
              height="13"
              x="-6.4"
              y="-6.4"
            ></image>
          </Hexagon>
          <Hexagon
            q={-3}
            r={7}
            s={-4}
            className={getClassName(-3, 7, -4)}
            fill={"sand1"}
            onClick={(event, source) => {
              handleHexSelect("dewford", source);
            }}
          >
            {/* <Text>Dewford</Text> */}
            <image
              href="/Tiles-Hoen/dewford.png"
              width="13"
              height="13"
              x="-6.4"
              y="-6.4"
            ></image>
          </Hexagon>
          <Hexagon
            q={4}
            r={-1}
            s={-3}
            className={getClassName(4, -1, -3)}
            fill={"grass1"}
            onClick={(event, source) => {
              handleHexSelect("lilycove", source);
            }}
          >
            {/* <Text>lilycove</Text> */}
            <image
              href="/Tiles-Hoen/lilycove.png"
              width="13"
              height="13"
              x="-6.4"
              y="-6.4"
            ></image>
          </Hexagon>
          <Hexagon
            q={1}
            r={-2}
            s={1}
            className={getClassName(1, -2, 1)}
            fill={"grass3"}
            onClick={(event, source) => {
              handleHexSelect("fortree", source);
            }}
          >
            <image
              href="/Tiles-Hoen/treehouse.png"
              width="13"
              height="13"
              x="-6.4"
              y="-6.4"
            ></image>
          </Hexagon>
          <Hexagon
            q={-1}
            r={-2}
            s={3}
            className={getClassName(-1, -2, 3)}
            fill={"sand2"}
            onClick={(event, source) => {
              handleHexSelect("miragetower", source);
            }}
          >
            <image
              href="/Tiles-Hoen/tower.png"
              width="13"
              height="13"
              x="-6.4"
              y="-6.4"
            ></image>
          </Hexagon>
          <Hexagon
            q={2}
            r={-1}
            s={-1}
            className={getClassName(2, -1, -1)}
            fill={"grass2"}
            onClick={(event, source) => {
              handleHexSelect("mtpyre", source);
            }}
          >
            <image
              href="/Tiles-Hoen/mountains.png"
              width="13"
              height="13"
              x="-6.4"
              y="-6.4"
            ></image>
          </Hexagon>
          <Hexagon
            q={3}
            r={-1}
            s={-2}
            className={getClassName(3, -1, -2)}
            fill={"grass1"}
            onClick={(event, source) => {
              handleHexSelect("safarizone", source);
            }}
          >
            <image
              href="/Tiles-Hoen/binoculars.png"
              width="13"
              height="13"
              x="-6.4"
              y="-6.4"
            ></image>
          </Hexagon>
          <Hexagon
            q={5}
            r={-1}
            s={-4}
            className={getClassName(5, -1, -4)}
            fill={"sand1"}
            onClick={(event, source) => {
              handleHexSelect("shoalcave", source);
            }}
          >
            {/* <Text>Shoal Cave</Text> */}
            <image
              href="/Tiles-Hoen/seacave.png"
              width="13"
              height="13"
              x="-6.4"
              y="-6.4"
            ></image>
          </Hexagon>
          <Hexagon
            q={5}
            r={1}
            s={-6}
            className={getClassName(5, 1, -6)}
            fill={"water3"}
            onClick={(event, source) => {
              handleHexSelect("seafloorcavern", source);
            }}
          >
            {/* <Text>Seafloor Cavern</Text> */}
            <image
              href="/Tiles-Hoen/seacave.png"
              width="13"
              height="13"
              x="-6.4"
              y="-6.4"
            ></image>
          </Hexagon>
          <Hexagon
            q={3}
            r={3}
            s={-6}
            className={getClassName(3, 3, -6)}
            fill={"sand1"}
            onClick={(event, source) => {
              handleHexSelect("skypillar", source);
            }}
          >
            {/* <Text>Sky Pillar</Text> */}
            <image
              href="/Tiles-Hoen/tower.png"
              width="13"
              height="13"
              x="-6.4"
              y="-6.4"
            ></image>
          </Hexagon>
          <Hexagon
            q={-3}
            r={0}
            s={3}
            className={getClassName(-3, 0, 3)}
            fill={"redrock"}
            onClick={(event, source) => {
              handleHexSelect("mtchimney", source);
            }}
          >
            {/* <Text>Mt.Chimney</Text> */}
            <image
              href="/Tiles-Hoen/volcano.png"
              width="13"
              height="13"
              x="-6.4"
              y="-6.4"
            ></image>
          </Hexagon>
          <Hexagon
            q={-5}
            r={1}
            s={4}
            className={getClassName(-5, 1, 4)}
            fill={"mountain"}
            onClick={(event, source) => {
              handleHexSelect("meteorfalls", source);
            }}
          >
            {/* <Text>Meteor Falls</Text> */}
            <image
              href="/Tiles-Hoen/cave.png"
              width="13"
              height="13"
              x="-6.4"
              y="-6.4"
            ></image>
          </Hexagon>
          <Hexagon
            q={-3}
            r={3}
            s={0}
            className={getClassName(-3, 3, 0)}
            fill={"mountain"}
            onClick={(event, source) => {
              handleHexSelect("rusturftunnel", source);
            }}
          >
            {/* <Text>Rusturf Tunnel</Text> */}
            <image
              href="/Tiles-Hoen/cave.png"
              width="13"
              height="13"
              x="-6.4"
              y="-6.4"
            ></image>
          </Hexagon>
          <Hexagon
            q={-5}
            r={5}
            s={0}
            className={getClassName(-5, 5, 0)}
            fill={"grass3"}
            onClick={(event, source) => {
              handleHexSelect("petalburgwoods", source);
            }}
          >
            {/* <Text>PetalburgWoods</Text> */}
            <image
              href="/Tiles-Hoen/forest.png"
              width="13"
              height="13"
              x="-6.4"
              y="-6.4"
            ></image>
          </Hexagon>
          <Hexagon
            q={0}
            r={5}
            s={-5}
            className={getClassName(0, 5, -5)}
            fill={"water1"}
            onClick={(event, source) => {
              handleHexSelect("abandonedship", source);
            }}
          >
            {/* <Text>Sunken Ship</Text> */}
            <image
              href="/Tiles-Hoen/boat.png"
              width="13"
              height="13"
              x="-6.4"
              y="-6.4"
            ></image>
          </Hexagon>
          <Hexagon
            q={-4}
            r={8}
            s={-4}
            className={getClassName(-4, 8, -4)}
            fill={"sand2"}
            onClick={(event, source) => {
              handleHexSelect("granitecave", source);
            }}
          >
            {/* <Text>Granite Cave</Text> */}
            <image
              href="/Tiles-Hoen/seacave.png"
              width="13"
              height="13"
              x="-6.4"
              y="-6.4"
            ></image>
          </Hexagon>
          <Hexagon
            q={-5}
            r={7}
            s={-2}
            className={getClassName(-5, 7, -2)}
            fill={"sand1"}
            onClick={(event, source) => {
              handleHexSelect("islandcave", source);
            }}
          >
            {/* <Text>Island Cave</Text> */}
            <image
              href="/Tiles-Hoen/seacave.png"
              width="13"
              height="13"
              x="-6.4"
              y="-6.4"
            ></image>
          </Hexagon>
          <Hexagon
            q={6}
            r={1}
            s={-7}
            className={getClassName(6, 1, -7)}
            onClick={(event, source) => {
              handleHexSelect("mirageisland", source);
            }}
            fill={"grass1"}
          >
            {/* <Text>Mirage Island</Text> */}
            <image
              href="/Tiles-Hoen/island.png"
              width="13"
              height="13"
              x="-6.4"
              y="-6.4"
            ></image>
          </Hexagon>
          <Hexagon
            q={1}
            r={4}
            s={-5}
            className={getClassName(1, 4, -5)}
            onClick={(event, source) => {
              handleHexSelect("farawayisland", source);
            }}
            fill={"grass1"}
          >
            {/* <Text>FarawayIsland</Text> */}
            <image
              href="/Tiles-Hoen/island.png"
              width="13"
              height="13"
              x="-6.4"
              y="-6.4"
            ></image>
          </Hexagon>
        </Layout>
        {/*player tokens*/}
        <Layout
          size={hexagonSize}
          flat={true}
          spacing={1}
          origin={{ x: 0, y: 0 }}
        >
          {players.map((player, index) => {
            const pos = getCoord(player.location);
            var offsetX = -5 * index;
            var offsetY = -5 * index;
            return (
              <image
                x={pos.x + offsetX}
                y={pos.y}
                href={`/Avatar/${player.sprite}.png`}
                height="10"
                width="10"
              >
                <title>{player.name}</title>
              </image>
            );
          })}
        </Layout>

        <Pattern
          id="grass1"
          link="/Tiles-Hoen/grass1.png"
          size={{ x: "20", y: "20" }}
        />
        <Pattern
          id="grass2"
          link="/Tiles-Hoen/grass2.png"
          size={{ x: "20", y: "20" }}
        />
        <Pattern
          id="grass3"
          link="/Tiles-Hoen/grass3.png"
          size={{ x: "20", y: "20" }}
        />
        <Pattern
          id="water1"
          link="/Tiles-Hoen/water1.png"
          size={{ x: "20", y: "20" }}
        />
        <Pattern
          id="water2"
          link="/Tiles-Hoen/water2.png"
          size={{ x: "20", y: "20" }}
        />
        <Pattern
          id="water3"
          link="/Tiles-Hoen/water3.png"
          size={{ x: "20", y: "20" }}
        />
        <Pattern
          id="sand1"
          link="/Tiles-Hoen/sand1.png"
          size={{ x: "20", y: "20" }}
        />
        <Pattern
          id="sand2"
          link="/Tiles-Hoen/sand2.png"
          size={{ x: "20", y: "20" }}
        />
        <Pattern
          id="sand3"
          link="/Tiles-Hoen/sand3.png"
          size={{ x: "20", y: "20" }}
        />
        <Pattern
          id="redrock"
          link="/Tiles-Hoen/redrock.png"
          size={{ x: "20", y: "20" }}
        />
        <Pattern
          id="mountain"
          link="/Tiles-Hoen/mountain.png"
          size={{ x: "20", y: "20" }}
        />
      </HexGrid>
      <TileInfoDrawer
        tileName={tileToShow?.tile}
        tileDrawer={tileDrawer}
        takeAction={takeAction}
        badges={badges}
        team={team}
        actionComplete={actionComplete}
        selected={selected}
        campaignId={"Hoen"}
        canInteract={canInteract}
        phase={phase}
        money={money}
        setTileDrawer={setTileDrawer}
        setTileToShow={setTileToShow}
      />
    </Box>
  );
};

export default TestBoardComp;
