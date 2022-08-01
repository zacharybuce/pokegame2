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
  const getDelay = () => {
    switch (index) {
      case 0:
        return 200;
      case 1:
        return 400;
      case 2:
        return 600;
    }
  };

  if (item !== "bought")
    return (
      <Slide direction="left" in timeout={getDelay()}>
        <Box>
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
