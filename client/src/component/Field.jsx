import React from "react";
import { ChakraProvider, Box, Center, Image } from "@chakra-ui/react";
import BaseballTacticalBoard from "./Board";

const BaseballField = () => {
  return (
    <Center height="100vh">
      <Box>
        <Image
          src="https://media.istockphoto.com/id/1269757192/vector/baseball-field-icon-flat-illustration-of-baseball-field-vector-design-top-view-web.jpg?s=612x612&w=0&k=20&c=BrRqVmTOMJHjl5erh28rNM40U5e_IbX5UNGaZtVrfo4="
          alt="Description of image"
          boxSize="60em"
          objectFit="contain"
          draggable={false}
          style={{ pointerEvents: "none", userSelect: "none" }}
        />
        <BaseballTacticalBoard />
      </Box>
    </Center>
  );
};

export default BaseballField;
