import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Grid, Typography, Divider, Box, Tabs, Tab } from "@mui/material";
import { typeColor } from "../../Utils/typeColor";
import ItemCard from "../ShopComps/ItemCard";
import { useSnackbar } from "notistack";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const DepartmentStore = ({
  campaignId,
  canInteract,
  money,
  takeAction,
  phase,
  badges,
}) => {
  const [tabValue, setTabValue] = useState(0);
  const [depStore, setDepStore] = useState();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getDepStore();
  }, []);

  const getDepStore = async () => {
    let res = await fetch(
      process.env.NEXT_PUBLIC_ROOT_URL + "/api/departmentstore"
    );
    let json = await res.json();

    setDepStore(json.data);
  };

  const buyRandomItem = (item, index) => {
    if (item.cost > money) {
      enqueueSnackbar(`Not enough money`, {
        variant: "error",
      });
    } else {
      takeAction("buyitem", item);
    }
  };

  return (
    <Card
      sx={{
        p: 1,
        backgroundColor: typeColor("Normal") + "d4",
        mb: "3vh",
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography variant="h4">Department Store</Typography>
        </Grid>
        <Grid item xs={12} sx={{ mb: "1vh" }}>
          <Divider />
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ backgroundColor: typeColor("Normal") }}>
            <Box
              sx={{
                backgroundImage: `url(/Tiles-${campaignId}/lilycove.png)`,
                backgroundSize: "50%",
                backgroundRepeat: "no-repeat",
                backgroundPositionX: "50%",
                backgroundPositionY: "50%",
                height: "150px",
                border: "solid",
                borderWidth: "1px",
                borderRadius: "3px",
                borderColor: "lightgray",
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Typography>
            Different Items are available based on the amount of badges you
            have.
          </Typography>
          <Divider sx={{ backgroundColor: "#ededed", mb: "5px" }} />
          <Typography>Store 1: 0 Badges</Typography>
          <Typography>Store 2: 2 Badges</Typography>
          <Typography>Store 3: 4 Badges</Typography>
          <Typography>Store 4: 6 Badges</Typography>
          <Typography>Store 5: 8 Badges</Typography>
        </Grid>

        <Grid item xs={12}>
          <Tabs
            centered
            value={tabValue}
            onChange={(e, newVal) => setTabValue(newVal)}
          >
            <Tab
              disabled={!canInteract || phase == "movement"}
              label="Store 1"
              {...a11yProps(0)}
            />
            <Tab
              disabled={
                !canInteract || phase == "movement" || badges.length < 2
              }
              label="Store 2"
              {...a11yProps(1)}
            />
            <Tab
              disabled={
                !canInteract || phase == "movement" || badges.length < 4
              }
              label="Store 3"
              {...a11yProps(2)}
            />
            <Tab
              disabled={
                !canInteract || phase == "movement" || badges.length < 6
              }
              label="Store 4"
              {...a11yProps(3)}
            />
            <Tab
              disabled={
                !canInteract || phase == "movement" || badges.length < 8
              }
              label="Store 5"
              {...a11yProps(3)}
            />
          </Tabs>
        </Grid>
        <TabPanel value={tabValue} index={0}>
          {canInteract && phase != "movement" ? (
            <Grid container>
              {depStore?.store1.map((item, index) => (
                <Grid item xs={12}>
                  <ItemCard
                    item={item}
                    index={index}
                    buyRandomItem={buyRandomItem}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            ""
          )}
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Grid container>
            {depStore?.store2.map((item, index) => (
              <Grid item xs={12}>
                <ItemCard
                  item={item}
                  index={index}
                  buyRandomItem={buyRandomItem}
                />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Grid container>
            {depStore?.store3.map((item, index) => (
              <Grid item xs={12}>
                <ItemCard
                  item={item}
                  index={index}
                  buyRandomItem={buyRandomItem}
                />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <Grid container>
            {depStore?.store4.map((item, index) => (
              <Grid item xs={12}>
                <ItemCard
                  item={item}
                  index={index}
                  buyRandomItem={buyRandomItem}
                />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value={tabValue} index={4}>
          <Grid container>
            {depStore?.store5.map((item, index) => (
              <Grid item xs={12}>
                <ItemCard
                  item={item}
                  index={index}
                  buyRandomItem={buyRandomItem}
                />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </Grid>
    </Card>
  );
};

export default DepartmentStore;
