import React from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import ItemSprite from "../../Utils/ItemSprite";
import { HtmlTooltip } from "../../Utils/HtmlTooltip";
import SellIcon from "@mui/icons-material/Sell";
import EquipButton from "./EquipButton";

const Item = ({ item, team, index, sellItem, equipItem }) => {
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
          <IconButton onClick={() => sellItem(index, item.cost, item.name)}>
            <SellIcon sx={{ color: "#ededed" }} />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item xs={9}>
        <HtmlTooltip
          title={
            <React.Fragment>
              <Typography>{item.desc}</Typography>
            </React.Fragment>
          }
        >
          <Button
            variant="outlined"
            fullWidth
            sx={{ mb: "3px", justifyContent: "left" }}
            disableRipple
          >
            <ItemSprite item={item} /> {item.name}
          </Button>
        </HtmlTooltip>
      </Grid>
      <Grid item container alignItems="center" justifyContent="end" xs={2}>
        <EquipButton
          index={index}
          team={team}
          item={item}
          equipItem={equipItem}
        />
      </Grid>
    </Grid>
  );
};

export default Item;
