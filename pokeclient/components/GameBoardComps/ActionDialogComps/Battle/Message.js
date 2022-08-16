import { Box, Typography, Fade } from "@mui/material";
import React from "react";

const Message = ({ message }) => {
  const getColor = () => {
    switch (message.severity) {
      case "error":
        return "#E64848";
      case "warning":
        return "#D89216";
      case "info":
        return "#607EAA";
      case "success":
        return "#4E9F3D";
    }
  };

  return (
    <Fade in>
      <Box
        sx={{
          borderRadius: 3,
          boxShadow: 3,
          backgroundColor: getColor(),
          p: 1,
          mb: "3px",
        }}
      >
        <Typography>{message.message}</Typography>
      </Box>
    </Fade>
  );
};

export default Message;
