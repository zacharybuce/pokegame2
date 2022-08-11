import React, { useEffect, useState } from "react";
import { Grid, Button, Typography } from "@mui/material";
import { HtmlTooltip } from "../../../Utils/HtmlTooltip";
import { typeColor } from "../../../Utils/typeColor";
import { pSBC } from "../../../Utils/colorUtil";

const MoveButton = ({ move, index, sendMoveChoice }) => {
  const [moveInfo, setMoveInfo] = useState();

  const getMoveInfo = async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_ROOT_URL +
        "/api/move/" +
        move.move.toLowerCase().replace(/\s/g, "")
    );
    const data = await res.json();
    setMoveInfo(data.data);
  };

  useEffect(() => {
    getMoveInfo();
  }, [move]);

  const toolTipContent = () => {
    const tooltip = (
      <React.Fragment>
        <Typography>
          <b>Type:</b> {JSON.stringify(moveInfo.type)}
        </Typography>
        <Typography>
          <b>Accuracy:</b> {JSON.stringify(moveInfo.accuracy)}
        </Typography>
        <Typography>
          <b>Base Power:</b> {JSON.stringify(moveInfo.basePower)}
        </Typography>
        <Typography>
          <b>Desc:</b> {JSON.stringify(moveInfo.shortDesc)}
        </Typography>
        <Typography>
          <b>Category: </b>
          {JSON.stringify(moveInfo.category)}
        </Typography>
      </React.Fragment>
    );

    return tooltip;
  };

  const toolTipLoading = (
    <React.Fragment>
      <Typography>loading...</Typography>
    </React.Fragment>
  );

  if (moveInfo)
    return (
      <Grid item xs={6}>
        <HtmlTooltip title={moveInfo ? toolTipContent() : toolTipLoading}>
          <Button
            onClick={() => sendMoveChoice(index + 1)}
            id={index}
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: moveInfo ? typeColor(moveInfo.type) : "",
              height: "45px",
              "&:hover": {
                backgroundColor: pSBC(-0.4, typeColor(moveInfo.type)),
              },
            }}
          >
            {move.move} {move.pp}/{move.maxpp}
          </Button>
        </HtmlTooltip>
      </Grid>
    );

  return <Grid item xs={6}></Grid>;
};

export default MoveButton;
