import { Box, Button, Typography } from "@mui/material";
import React from "react";
import ItemSprite from "../../Utils/ItemSprite";
import { HtmlTooltip } from "../../Utils/HtmlTooltip";

const Tms = ({ bag, setBag }) => {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: "1vh" }}>
        TMs
      </Typography>
      <Box sx={{ overflowY: "auto", height: "23vh" }}>
        {bag.tms.map((item) => (
          <HtmlTooltip
            title={
              <React.Fragment>
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
        ))}
      </Box>
    </Box>
  );
};

export default Tms;
