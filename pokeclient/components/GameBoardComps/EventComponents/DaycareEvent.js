import { Box, Button, Card, Divider, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { pSBC } from "../../Utils/colorUtil";
import { typeColor } from "../../Utils/typeColor";
import DayCareDialog from "./DayCareDialog";

const DaycareEvent = ({
  badges,
  campaignId,
  canInteract,
  takeAction,
  phase,
  team,
}) => {
  const [teamDialog, setTeamDialog] = useState();

  return (
    <Card
      sx={{
        height: "280px",
        p: 1,
        backgroundColor: typeColor("Normal") + "d4",
        mb: "2vh",
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography variant="h4">Daycare Sanctuary</Typography>
        </Grid>
        <Grid item xs={12} sx={{ mb: "1vh" }}>
          <Divider />
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ backgroundColor: typeColor("Normal") }}>
            <Box
              sx={{
                backgroundImage: "url(/Tiles-Hoen/Farm.png)",
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
            <Typography>
              The daycare also acts as a pokemon sanctuary. Release a pokemon
              here to gain candy.
            </Typography>
            <Typography variant="body2">*Must have 2 badges</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button
            disabled={!canInteract || phase == "movement"}
            fullWidth
            variant="contained"
            onClick={() => setTeamDialog(true)}
            sx={{
              backgroundColor: "#2F4562",
              "&:hover": {
                backgroundColor: pSBC(-0.4, "#2F4562"),
              },
            }}
          >
            Select Pokemon
          </Button>
        </Grid>
        <DayCareDialog
          teamDialog={teamDialog}
          team={team}
          takeAction={takeAction}
          setTeamDialog={setTeamDialog}
        />
      </Grid>
    </Card>
  );
};

export default DaycareEvent;
