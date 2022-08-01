import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Tooltip,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SpriteSelect from "./SpriteSelect";

const TrainerDialog = ({
  trainerDialogOpen,
  setTrainerDialogOpen,
  id,
  setId,
  sprite,
  setSprite,
}) => {
  const [editingName, setEditingName] = useState(id ? false : true);
  const [nameFieldVal, setNameFieldVal] = useState();

  useEffect(() => {
    if (!sprite) setSprite("AceTrainerM");
  }, []);

  const trainerName = (
    <Box>
      <Typography variant="h3">
        {id}{" "}
        <IconButton onClick={() => setEditingName(true)}>
          <EditIcon />
        </IconButton>
      </Typography>
    </Box>
  );

  const changeId = () => {
    setId(nameFieldVal);
    setEditingName(false);
  };

  return (
    <Dialog
      fullWidth
      maxWidth={"md"}
      open={trainerDialogOpen}
      onClose={(event, reason) => {
        setTrainerDialogOpen(false);
        setEditingName(false);
      }}
    >
      <DialogTitle>Trainer Options</DialogTitle>
      <DialogContent>
        <Grid container spacing={1} sx={{ mt: "1vh" }}>
          <Grid item xs={1}>
            <Avatar
              src={
                sprite
                  ? "/Avatar/" + sprite + ".png"
                  : "/Avatar/AceTrainerM.png"
              }
              sx={{ width: 56, height: 56 }}
            />
          </Grid>
          <Grid item xs={11}>
            {editingName ? (
              <Box>
                <TextField
                  id="outlined-basic"
                  label="Trainer Name"
                  variant="outlined"
                  autoComplete="off"
                  onChange={(event) => setNameFieldVal(event.target.value)}
                />
                <Button onClick={() => changeId()}>Submit</Button>
              </Box>
            ) : (
              trainerName
            )}
          </Grid>
          <Grid item xs={12}>
            <SpriteSelect sprite={sprite} setSprite={setSprite} />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default TrainerDialog;
