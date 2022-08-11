import { Box, Grid, Typography, Fade } from "@mui/material";
import React, { useEffect, useState } from "react";
import CategoryIcon from "../../Utils/CategoryIcon";
import { typeColor } from "../../Utils/typeColor";
import { HtmlTooltip } from "../../Utils/HtmlTooltip";
import { pSBC } from "../../Utils/colorUtil";

const Move = ({ move }) => {
  const [moveInfo, setMoveInfo] = useState();
  const [fadeAnim, setFadeAnim] = useState();

  useEffect(() => {
    getMove();
    setFadeAnim(true);
  }, [move]);

  const getMove = async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_ROOT_URL + "/api/move/" + move
    );
    const json = await res.json();

    setMoveInfo(json.data);
  };

  if (moveInfo)
    return (
      <Fade in={fadeAnim}>
        <Box>
          <HtmlTooltip
            title={
              <React.Fragment>
                <Typography>{moveInfo.desc}</Typography>
              </React.Fragment>
            }
          >
            <Box
              sx={{
                backgroundColor: pSBC(-0.4, typeColor(moveInfo.type)),
                p: 1,
                border: "1px solid lightgray",
                borderRadius: "2px",
                mb: "1vh",
                transition: "all .2s",
                ":hover": {
                  transform: "translate(0px, -2px)",
                  boxShadow:
                    "0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06)",
                },
              }}
            >
              <Grid container>
                <Grid
                  item
                  xs={8}
                  sx={{ borderBottom: "1px solid #353C51", mb: "2px" }}
                >
                  <Typography>{moveInfo.name}</Typography>
                </Grid>
                <Grid item container justifyContent="end" xs={4}>
                  <CategoryIcon category={moveInfo.category} />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    Power {moveInfo.basePower ? moveInfo.basePower : "-"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    Accuracy {moveInfo.accuracy ? moveInfo.accuracy : "-"}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </HtmlTooltip>
        </Box>
      </Fade>
    );

  return <div></div>;
};

export default Move;
