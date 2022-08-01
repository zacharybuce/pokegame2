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

const Item = ({ item, index, sellItem }) => {
  return (
    <Grid container>
      <Grid
        item
        container
        xs={1}
        direction="row"
        alignItems="flex-end"
        justifyContent="center"
      >
        <Tooltip title={"Sell"}>
          <IconButton onClick={() => sellItem(index, item.cost, item.name)}>
            <SellIcon sx={{ color: "#ededed" }} />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item xs={11}>
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
          >
            <ItemSprite item={item} /> {item.name}
          </Button>
        </HtmlTooltip>
      </Grid>
    </Grid>
  );
};

export default Item;
