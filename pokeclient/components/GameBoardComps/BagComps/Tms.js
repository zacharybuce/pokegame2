import { Box, Typography } from "@mui/material";
import React from "react";
import { useSnackbar } from "notistack";
import TmItem from "./TmItem";

const Tms = ({ bag, team, teachTm, setBag, setMoney }) => {
  const { enqueueSnackbar } = useSnackbar();

  const sellTm = (index, cost, tmName) => {
    let newBag = bag;
    newBag.tms.splice(index, 1);

    setBag(newBag);
    let refund = cost / 2;
    setMoney((prev) => prev + refund);

    enqueueSnackbar(`Sold the ${tmName} for ${refund}`, {
      variant: "info",
    });
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: "1vh" }}>
        TMs
      </Typography>
      <Box sx={{ overflowY: "auto", height: "23vh" }}>
        {bag.tms.map((item, index) => (
          <TmItem
            item={item}
            index={index}
            team={team}
            sellTm={sellTm}
            teachTm={teachTm}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Tms;
