import React from "react";
import { ChakraProvider, Box, Center, Image } from "@chakra-ui/react";
import PlayerList from "./PlayerList.jsx";

const BaseballField = () => {
  return (
    <Center height="100vh">
      <Box>
        <Image
          src="https://media.istockphoto.com/id/1269757192/vector/baseball-field-icon-flat-illustration-of-baseball-field-vector-design-top-view-web.jpg?s=612x612&w=0&k=20&c=BrRqVmTOMJHjl5erh28rNM40U5e_IbX5UNGaZtVrfo4="
          alt="Description of image"
          boxSize="100em"
          objectFit="contain"
          draggable={false}
          style={{ pointerEvents: "none", userSelect: "none" }}
        />
        <PlayerList />
        <Box
          width="14em"
          height="14em"
          border="2px solid black"
          backgroundColor="transparent"
          transform="rotate(45deg)"
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="absolute" // or 'relative' depending on your layout
          top="40em" // Adjust this value to move the square up or down
          left="32em" // Adjust this value to move the square left or right
        />
        ;
      </Box>
    </Center>
  );
};

export default BaseballField;
