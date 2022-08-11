import { Box, Typography, Fade } from "@mui/material";
import React from "react";

const Message = ({ message }) => {
  return (
    <Fade in>
      <Box
        sx={{
          borderRadius: 3,
          boxShadow: 3,
          backgroundColor: "gray",
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
