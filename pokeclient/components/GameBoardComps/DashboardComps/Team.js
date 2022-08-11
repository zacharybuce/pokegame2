import React from "react";
import { Box } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import PokemonCard from "./PokemonCard";

const Team = ({ team, candies, setCandies, setTeam, setBag }) => {
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newTeam = reorder(
      team,
      result.source.index,
      result.destination.index
    );

    setTeam(newTeam);
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  return (
    <Box>
      <DragDropContext onDragEnd={onDragEnd}>
        <Box
          sx={{
            border: "solid",
            borderColor: "#767D92",
            borderWidth: "1px",
            borderRadius: "2px",
            mt: "5px",
            height: "20vh",
            backgroundColor: "#2F4562",
            p: 1,
          }}
        >
          <Droppable droppableId="team" direction="horizontal">
            {(provided) => (
              <Box
                ref={provided.innerRef}
                {...provided.droppableProps}
                sx={{ height: "100%" }}
              >
                {team.map((pokemon, index) => (
                  <Draggable
                    key={pokemon.dragId}
                    draggableId={pokemon.dragId}
                    index={index}
                  >
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{
                          height: "100%",
                          width: "17%",
                          display: "inline-block",
                          mr: index - 1 !== team.length ? "2px" : "0px",
                        }}
                      >
                        <PokemonCard
                          pokemon={pokemon}
                          candies={candies}
                          team={team}
                          setTeam={setTeam}
                          setBag={setBag}
                          setCandies={setCandies}
                        />
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </Box>
      </DragDropContext>
    </Box>
  );
};

export default Team;
