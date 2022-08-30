import { Box, Fade, Slide, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const EntranceAnim = ({ trainer }) => {
  const [textSlide, setTextSlide] = useState(false);

  useEffect(() => {
    setTimeout(() => setTextSlide(true), 800);
  }, []);

  return (
    <Box sx={{ p: 5 }}>
      <Box sx={{ border: "1px solid #ededed", borderRadius: 3 }}>
        <Fade in timeout={700}>
          <Box
            sx={{
              width: "400px",
              height: "240px",
              backgroundImage:
                "url(/TrainerVsImages-Hoen/" +
                (trainer.sprite ? trainer.sprite : trainer.trainer) +
                ".png)",
              backgroundSize: "cover",
            }}
          />
        </Fade>
      </Box>
      <Slide in={textSlide} direction="right" timeout={100}>
        <Typography sx={{ mt: "30px" }} variant="h3">
          {trainer.name ? trainer.name : trainer.trainer} wants to fight!
        </Typography>
      </Slide>
    </Box>
  );
};

export default EntranceAnim;
