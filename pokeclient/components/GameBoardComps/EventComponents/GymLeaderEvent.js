import { Box, Button, Card, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { typeColor } from "../../Utils/typeColor";

const GymLeaderEvent = ({ event, campaignId, canInteract }) => {
  const [leader, setLeader] = useState();

  useEffect(() => {
    getGymLeaderInfo(event.split("-")[1]);
  }, []);

  const getGymLeaderInfo = async (leaderName) => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_ROOT_URL +
        "/api/trainerInfo" +
        campaignId +
        "/" +
        leaderName
    );
    const json = await res.json();
    setLeader(json.data);
  };

  const getGymLeaderImg = () => {
    const leader = event.split("-")[1];
    return `url(/TrainerVSImages-${campaignId}/${leader}.png)`;
  };

  const gymLeaderImage = (
    <Box
      sx={{
        backgroundImage: getGymLeaderImg(),
        backgroundSize: "cover",
        height: "150px",
        border: "solid",
        borderWidth: "1px",
        borderRadius: "3px",
        borderColor: "lightgray",
      }}
    />
  );

  const leaderName = event.split("-")[1];

  if (leader)
    return (
      <Card
        sx={{
          height: "280px",
          p: 1,
          backgroundColor: typeColor(leader.Type) + "d4",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Typography variant="h4">Gym Challenge</Typography>
          </Grid>
          <Grid item xs={12} sx={{ mb: "1vh" }}>
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ backgroundColor: typeColor(leader.Type) }}>
              {gymLeaderImage}
            </Box>
          </Grid>
          <Grid item container xs={6}>
            <Grid item xs={12}>
              <Typography variant="h5">{leaderName}</Typography>
              <Typography variant="h5">
                {leader.Type} Type Specialist
              </Typography>
              <Typography variant="h5">3v3 Battle</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button disabled={!canInteract} fullWidth variant="contained">
              Challenge
            </Button>
          </Grid>
        </Grid>
      </Card>
    );

  return <div></div>;
};

export default GymLeaderEvent;
