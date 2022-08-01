import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import WildEncounters from "./WildEncounters";
import TrainerEncounters from "./TrainerEncounters";

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

const EncounterTabs = ({ encounters, encounterRates, trainers }) => {
  const [tabValue, setTabValue] = useState(0);

  const changeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Tabs variant="fullWidth" centered value={tabValue} onChange={changeTab}>
        <Tab
          label="Wild Pokemon"
          disabled={encounters.length == 0}
          {...a11yProps(0)}
        />
        <Tab label="Trainers" disabled={!trainers.length} {...a11yProps(1)} />
      </Tabs>
      <TabPanel disabled={encounters.length == 0} value={tabValue} index={0}>
        <WildEncounters
          encounters={encounters}
          encounterRates={encounterRates}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <TrainerEncounters trainers={trainers} />
      </TabPanel>
    </Box>
  );
};

export default EncounterTabs;
