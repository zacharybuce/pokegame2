import React from "react";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

export const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#2F4562",
    color: "rgba(255, 255, 255, 0.87)",
    maxWidth: 500,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid ",
  },
}));
