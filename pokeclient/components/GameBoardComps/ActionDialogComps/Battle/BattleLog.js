import LocalFireDepartment from "@mui/icons-material/LocalFireDepartment";
import { Box, List, ListItem } from "@mui/material";
import React, { useRef, useEffect } from "react";
import Message from "./Message";

const AlwaysScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};

const BattleLog = ({ log }) => {
  const scrollRef = useRef(null);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [log]);

  if (log)
    return (
      <Box
        sx={{
          overflowY: "scroll",
          display: "flex",
          flexDirection: "column",
          height: "553px",
          p: 1,
          borderLeft: "1px solid grey",
        }}
      >
        {log.map((message, index) => (
          <Message message={message} />
        ))}
        <AlwaysScrollToBottom />
      </Box>
    );

  return <div></div>;
};

export default BattleLog;
