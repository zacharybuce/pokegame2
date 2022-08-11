import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import ReactCardCarousel from "react-card-carousel";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import TownCard from "./TownCard";

const StartTownCarousel = ({
  townsChoosen,
  startingTowns,
  mapId,
  selectTown,
}) => {
  const [carousel, setCarousel] = useState();

  return (
    <Box
      sx={{
        mt: "100px",
        position: "relative",
        height: "150px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        onClick={() => carousel.prev()}
        sx={{ ml: "10px", color: "#767D92" }}
      >
        <ArrowLeftIcon sx={{ fontSize: "100px" }} />
      </Button>
      <ReactCardCarousel
        spread={"wide"}
        autoplay={false}
        ref={(Carousel) => setCarousel(Carousel)}
      >
        {Object.keys(startingTowns).map((town) => {
          if (!townsChoosen.includes(town))
            return (
              <TownCard
                location={startingTowns[town].location}
                townId={town}
                name={startingTowns[town].name}
                mapId={mapId}
                color={startingTowns[town].color}
                img={startingTowns[town].img}
                starters={startingTowns[town].starters}
                selectTown={selectTown}
              />
            );
        })}
      </ReactCardCarousel>
      <Button
        onClick={() => carousel.next()}
        sx={{ mr: "10px", color: "#767D92" }}
      >
        <ArrowRightIcon sx={{ fontSize: "100px" }} />
      </Button>
    </Box>
  );
};

export default StartTownCarousel;
