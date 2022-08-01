import { Box, Button } from "@mui/material";
import React from "react";
import {
  HexGrid,
  Layout,
  Hexagon,
  Text,
  Pattern,
  Path,
  Hex,
  GridGenerator,
} from "react-hexgrid";
import styles from "../../Styles/HoenBoard.module.css";

const HoenBoard = () => {
  const hexagons = GridGenerator.parallelogram(-2, 3, -2, 1);
  return (
    <Box className={styles.test}>
      <HexGrid width={1000} height={1000}>
        <Layout size={{ x: 7, y: 7 }}>
          {hexagons.map((hex, i) => (
            <Hexagon key={i} q={hex.q} r={hex.r} s={hex.s} />
          ))}
        </Layout>
      </HexGrid>
    </Box>
  );
};

export default HoenBoard;
