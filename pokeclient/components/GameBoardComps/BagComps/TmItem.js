import React, { useState } from "react";
import { Button, Grid, Typography, IconButton, Tooltip } from "@mui/material";
import ItemSprite from "../../Utils/ItemSprite";
import { HtmlTooltip } from "../../Utils/HtmlTooltip";
import SellIcon from "@mui/icons-material/Sell";
import TMDialog from "./TMDialog";

const TmItem = ({ item, index, team, sellTm, teachTm }) => {
  const [tmDialog, setTmDialog] = useState(false);

  return (
    <Grid container>
      <Grid
        item
        container
        xs={1}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Tooltip title={"Sell"}>
          <IconButton onClick={() => sellTm(index, item.cost, item.name)}>
            <SellIcon sx={{ color: "#ededed" }} />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item xs={11}>
        <HtmlTooltip
          title={
            <React.Fragment>
              <Typography>
                <b>Type:</b> {item.move.type}
              </Typography>
              <Typography>
                <b>Accuracy:</b> {item.move.accuracy}
              </Typography>
              <Typography>
                <b>Base Power:</b> {item.move.basePower}
              </Typography>
              <Typography>
                <b>Category: </b>
                {item.move.category}
              </Typography>
              <Typography>
                <b>Desc:</b> {item.move.desc}
              </Typography>
            </React.Fragment>
          }
        >
          <Button
            variant="outlined"
            fullWidth
            sx={{ mb: "3px", justifyContent: "left" }}
            onClick={() => setTmDialog(true)}
          >
            <ItemSprite item={item} /> {item.name}
          </Button>
        </HtmlTooltip>
      </Grid>
      <TMDialog
        tm={item}
        team={team}
        index={index}
        tmDialog={tmDialog}
        teachTm={teachTm}
        setTmDialog={setTmDialog}
      />
    </Grid>
  );
};

export default TmItem;
