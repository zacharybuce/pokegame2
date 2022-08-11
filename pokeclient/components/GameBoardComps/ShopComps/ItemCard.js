import {
  Box,
  Grid,
  Typography,
  Card,
  CardActionArea,
  Button,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import React from "react";
import ItemSprite from "../../Utils/ItemSprite";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import styles from "../../../Styles/ItemCard.module.css";
import { HtmlTooltip } from "../../Utils/HtmlTooltip";

const ItemCard = ({ item, index, buyRandomItem }) => {
  const genTooltip = () => {
    if (item.type === "tm") {
      return (
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
      );
    }

    return (
      <React.Fragment>
        <Typography>{item.desc}</Typography>
      </React.Fragment>
    );
  };

  if (item !== "bought")
    return (
      <Slide direction="left" in timeout={200 + index * 200}>
        <Box>
          <HtmlTooltip title={genTooltip()}>
            <Button
              variant="outlined"
              fullWidth
              sx={{
                mb: "1vh",
                justifyContent: "left",
                backgroundColor: "#152642",
                color: "#ededed",
              }}
              className={`${styles.itemcard} ${styles[item.rarity]}`}
              onClick={() => buyRandomItem(item, index)}
            >
              <Grid container>
                <Grid item container justifyContent="left" xs={2}>
                  <ItemSprite item={item} />
                </Grid>
                <Grid
                  item
                  container
                  justifyContent="left"
                  alignItems="center"
                  xs={8}
                >
                  {item.name}
                </Grid>
                <Grid
                  item
                  container
                  justifyContent="right"
                  alignItems="center"
                  xs={2}
                >
                  <CurrencyYenIcon /> {item.cost}
                </Grid>
              </Grid>
            </Button>
          </HtmlTooltip>
        </Box>
      </Slide>
    );

  return (
    <Button
      variant="outlined"
      fullWidth
      sx={{
        mb: "1vh",
        justifyContent: "left",
        backgroundColor: "#152642",
        color: "#ededed",
      }}
      disableRipple
      disableTouchRipple
    >
      <Grid container>
        <Grid item container justifyContent="left" xs={2}></Grid>
        <Grid item container justifyContent="left" alignItems="center" xs={8}>
          Purchased
        </Grid>
        <Grid
          item
          container
          justifyContent="right"
          alignItems="center"
          xs={2}
        ></Grid>
      </Grid>
    </Button>
  );
};

export default ItemCard;
