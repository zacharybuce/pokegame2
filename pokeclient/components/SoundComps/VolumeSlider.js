import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Grid, Typography, Slider } from "@mui/material";
import MuiInput from "@mui/material/Input";
import VolumeUp from "@mui/icons-material/VolumeUp";

const Input = styled(MuiInput)`
  width: 42px;
`;

const VolumeSlider = ({ musicVolume, setMusicVolume }) => {
  const handleSliderChange = (event, newValue) => {
    setMusicVolume(newValue);
  };

  const handleInputChange = (event) => {
    setMusicVolume(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (musicVolume < 0) {
      setMusicVolume(0);
    } else if (musicVolume > 100) {
      setMusicVolume(100);
    }
  };
  return (
    <Box sx={{ width: 350 }}>
      <Typography id="input-slider" gutterBottom>
        Volume
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <VolumeUp />
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof musicVolume === "number" ? musicVolume : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            value={musicVolume}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default VolumeSlider;
