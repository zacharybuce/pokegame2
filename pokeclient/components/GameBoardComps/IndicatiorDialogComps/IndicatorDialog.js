import { Box, Dialog, Typography } from "@mui/material";
import React, { useEffect } from "react";

const IndicatorDialog = ({
  phase,
  round,
  indicatorDialog,
  setIndicatorDialog,
}) => {
  useEffect(() => {
    setTimeout(() => setIndicatorDialog(false), 1000);
  }, [phase, round]);

  const capitalize = (word) => {
    let letter = word.toUpperCase().charAt(0);
    let newWord = letter + word.slice(1);
    return newWord;
  };

  return (
    <Dialog fullWidth maxWidth={"sm"} open={indicatorDialog}>
      <Box sx={{ textAlign: "center", m: 3 }}>
        <Typography variant="h3" color="text.secondary">
          Round {round}
        </Typography>
        <Typography variant="h2">{capitalize(phase)} Phase</Typography>
      </Box>
    </Dialog>
  );
};

export default IndicatorDialog;
