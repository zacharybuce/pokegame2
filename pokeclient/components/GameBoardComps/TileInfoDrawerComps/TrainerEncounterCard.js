import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { typeColor } from "../../Utils/typeColor";

const TrainerEncounterCard = ({ trainer, regionId }) => {
  const [trainerInfo, setTrainerInfo] = useState();

  //calls api to get info from trainer json file for passed in trainer
  const getTrainerInfo = async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_ROOT_URL +
        "/api/trainerInfo" +
        regionId +
        "/" +
        trainer
    );
    const json = await res.json();
    setTrainerInfo(json.data);
  };

  //on creation get info
  useEffect(() => {
    getTrainerInfo();
  }, []);

  const trainerImage = (
    <Box
      sx={{
        width: "200px",
        height: "120px",
        backgroundImage:
          "url(/TrainerVsImages-" + regionId + "/" + trainer + ".png)",
        backgroundSize: "cover",
      }}
    />
  );

  if (trainerInfo)
    return (
      <Grid
        item
        xs={5}
        className={"trainer-encounter-card"}
        sx={{ backgroundColor: typeColor(trainerInfo.Type) + "d4" }}
      >
        <Box
          sx={{
            border: "solid",
            borderWidth: "1px",
            borderRadius: "2px",
            borderColor: "lightgray",
            backgroundColor: typeColor(trainerInfo.Type),
          }}
        >
          {trainerImage}
        </Box>
        <Typography variant="h6" sx={{ mt: "5px" }}>
          {trainer}
        </Typography>
      </Grid>
    );

  return <div></div>;
};

export default TrainerEncounterCard;
