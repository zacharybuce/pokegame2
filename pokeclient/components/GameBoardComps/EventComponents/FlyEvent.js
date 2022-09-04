import CurrencyYen from "@mui/icons-material/CurrencyYen";
import { Box, Button, Card, Divider, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { pSBC } from "../../Utils/colorUtil";
import FlyingTaxiDialog from "./FlyingTaxiDialog";

const FlyEvent = ({
  badges,
  money,
  campaignId,
  canInteract,
  takeAction,
  phase,
}) => {
  const [taxiDialog, setTaxiDialog] = useState();

  return (
    <Card
      sx={{
        height: "280px",
        p: 1,
        backgroundColor: "#f1cb1dd4",
        color: "black",
        mb: "2vh",
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography variant="h4">Flying Taxi</Typography>
        </Grid>
        <Grid item xs={12} sx={{ mb: "1vh" }}>
          <Divider />
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ backgroundColor: pSBC(-0.5, "#f1cb1d") }}>
            <Box
              sx={{
                backgroundImage: "url(/Tiles-Hoen/FlyingTaxi.png)",
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
            <Typography variant="h5">Fly to any town</Typography>
            <Typography variant="body2">*Must have 3 badges</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button
            disabled={
              !canInteract ||
              phase == "movement" ||
              badges.length < 3 ||
              money < 3000
            }
            fullWidth
            variant="contained"
            onClick={() => setTaxiDialog(true)}
            sx={{
              backgroundColor: "#2F4562",
              "&:hover": {
                backgroundColor: pSBC(-0.4, "#2F4562"),
              },
            }}
          >
            Pay <CurrencyYen />
            3000{" "}
          </Button>
        </Grid>
      </Grid>

      <FlyingTaxiDialog
        takeAction={takeAction}
        taxiDialog={taxiDialog}
        campaignId={campaignId}
        setTaxiDialog={setTaxiDialog}
      />
    </Card>
  );
};

export default FlyEvent;
