import React from "react";
import { Box, Typography } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const Header = ({ level, species, isShiny }) => {
  return (
    <Box
      sx={{
        p: 2,
        borderTopRightRadius: "3px",
        borderRight: "2px solid #506680",
        borderTop: "2px solid #506680",
        backgroundColor: "#2F4562",
      }}
    >
      <Typography variant="h4">
        {species} {isShiny ? <AutoAwesomeIcon /> : ""}
      </Typography>
      <Typography variant="h5" color="#b8b8b8">
        Lvl. {level}
      </Typography>
    </Box>
  );
};

export default Header;
