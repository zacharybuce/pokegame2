import CurrencyYen from "@mui/icons-material/CurrencyYen";
import { Box, Button, Card, Divider, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { pSBC } from "../../Utils/colorUtil";
import { typeColor } from "../../Utils/typeColor";
import FerryDialog from "./FerryDialog";

const FerryEvent = ({
  badges,
  money,
  campaignId,
  canInteract,
  takeAction,
  phase,
}) => {
  const [ferryDialog, setFerryDialog] = useState();

  return (
    <Card
      sx={{
        height: "280px",
        p: 1,
        backgroundColor: typeColor("Water"),
        mb: "2vh",
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography variant="h4">Ferry</Typography>
        </Grid>
        <Grid item xs={12} sx={{ mb: "1vh" }}>
          <Divider />
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ backgroundColor: pSBC(-0.5, typeColor("Water")) }}>
            <Box
              sx={{
                backgroundImage: "url(/Tiles-Hoen/Ferry.png)",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPositionX: "50%",
                height: "150px",
                border: "solid",
                borderWidth: "1px",
                borderRadius: "3px",
                borderColor: "black",
              }}
            />
          </Box>
        </Grid>
        <Grid item container xs={6}>
          <Grid item xs={12}>
            <Typography variant="h5">
              Take the ferry to a town on the water
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button
            disabled={!canInteract || phase == "movement" || money < 1000}
            fullWidth
            variant="contained"
            onClick={() => setFerryDialog(true)}
            sx={{
              backgroundColor: "#2F4562",
              "&:hover": {
                backgroundColor: pSBC(-0.4, "#2F4562"),
              },
            }}
          >
            Pay <CurrencyYen />
            1000{" "}
          </Button>
        </Grid>
      </Grid>

      <FerryDialog
        takeAction={takeAction}
        ferryDialog={ferryDialog}
        campaignId={campaignId}
        setFerryDialog={setFerryDialog}
      />
    </Card>
  );
};

export default FerryEvent;
