import LocalFireDepartment from "@mui/icons-material/LocalFireDepartment";
import { Box, List, ListItem } from "@mui/material";
import React, { useRef, useEffect } from "react";
import Message from "./Message";

const BattleLog = ({ log }) => {
  const scrollRef = useRef(null);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [log]);

  if (log)
    return (
      <List
        sx={{
          overflowY: "scroll",
          height: "553px",
          p: 1,
          borderLeft: "1px solid grey",
        }}
      >
        {log.map((message, index) => (
          <li ref={scrollRef}>
            <Message message={message} />
          </li>
        ))}
        <li ref={scrollRef}></li>
      </List>
    );

  return <div></div>;
};

export default BattleLog;
