import React from "react";
import { Card, Grid, Typography, Divider, Box, Button } from "@mui/material";
import { typeColor } from "../../Utils/typeColor";
import { pSBC } from "../../Utils/colorUtil";
import CurrencyYen from "@mui/icons-material/CurrencyYen";

const Market = ({ campaignId, canInteract, money, takeAction, phase }) => {
  return (
    <Card
      sx={{
        p: 1,
        backgroundColor: typeColor("Normal") + "d4",
        mb: "3vh",
      }}
    >
      <Grid container spacing={1} sx={{ mb: "3vh" }}>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography variant="h4">Slateport Market</Typography>
        </Grid>
        <Grid item xs={12} sx={{ mb: "1vh" }}>
          <Divider />
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ backgroundColor: typeColor("Normal") }}>
            <Box
              sx={{
                backgroundImage: `url(/Tiles-${campaignId}/market.png)`,
                backgroundSize: "50%",
                backgroundRepeat: "no-repeat",
                backgroundPositionX: "50%",
                backgroundPositionY: "50%",
                height: "150px",
                border: "solid",
                borderWidth: "1px",
                borderRadius: "3px",
                borderColor: "lightgray",
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5">
            Entry fee: 500 <CurrencyYen />
          </Typography>
          <Divider sx={{ backgroundColor: "#ededed", mb: "5px" }} />
          <Typography>
            After paying for enrty into the market, the limited supply items in
            your shop will be updated with new items.
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button
          disabled={!canInteract || money < 500 || phase == "movement"}
          fullWidth
          variant="contained"
          onClick={() => takeAction("resetshop")}
          sx={{
            backgroundColor: "#2F4562",
            "&:hover": {
              backgroundColor: pSBC(-0.4, "#2F4562"),
            },
          }}
        >
          Reroll
        </Button>
      </Grid>
    </Card>
  );
};

export default Market;
