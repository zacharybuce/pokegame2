import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { HtmlTooltip } from "./HtmlTooltip";

const Ability = ({ ability }) => {
  const [abilityDesc, setAbilityDesc] = useState();

  useEffect(() => {
    getAbilityDesc();
  }, []);

  const getAbilityDesc = async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_ROOT_URL + "/api/ability/" + ability
    );
    const json = await res.json();

    const tooltip = (
      <React.Fragment>
        <Typography>{json.data}</Typography>
      </React.Fragment>
    );

    setAbilityDesc(tooltip);
  };

  return (
    <HtmlTooltip title={abilityDesc ? abilityDesc : ""}>
      <Typography>
        <b>{ability}</b>
      </Typography>
    </HtmlTooltip>
  );
};

export default Ability;
