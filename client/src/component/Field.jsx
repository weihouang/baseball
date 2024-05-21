// BaseballField.jsx
import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";

const BaseballField = () => {
  return (
    <Box
      position="relative"
      width="500px"
      height="500px"
      bg="green.700"
      borderRadius="lg"
      boxShadow="lg"
    >
      {/* Infield Diamond */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        width="300px"
        height="300px"
        transform="translate(-50%, -50%) rotate(45deg)"
        bgGradient="linear(to-br, brown.500, brown.700)"
        borderRadius="md"
        boxShadow="md"
      >
        {/* Bases */}
        <Box
          position="absolute"
          top="0"
          left="50%"
          transform="translate(-50%, -50%)"
          width="30px"
          height="30px"
          bg="white"
          borderRadius="md"
        />
        <Box
          position="absolute"
          top="50%"
          left="100%"
          transform="translate(-50%, -50%)"
          width="30px"
          height="30px"
          bg="white"
          borderRadius="md"
        />
        <Box
          position="absolute"
          top="100%"
          left="50%"
          transform="translate(-50%, -50%)"
          width="30px"
          height="30px"
          bg="white"
          borderRadius="md"
        />
        <Box
          position="absolute"
          top="50%"
          left="0"
          transform="translate(-50%, -50%)"
          width="30px"
          height="30px"
          bg="white"
          borderRadius="md"
        />
      </Box>

      {/* Pitcher's Mound */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        width="40px"
        height="40px"
        transform="translate(-50%, -50%)"
        bg="brown.600"
        borderRadius="50%"
        boxShadow="md"
      />

      {/* Outfield Labels */}
      <Flex
        position="absolute"
        top="10%"
        left="50%"
        transform="translateX(-50%)"
        justify="center"
      >
        <Text color="white" fontWeight="bold" fontSize="lg">
          Center Field
        </Text>
      </Flex>
      <Flex
        position="absolute"
        bottom="10%"
        left="50%"
        transform="translateX(-50%)"
        justify="center"
      >
        <Text color="white" fontWeight="bold" fontSize="lg">
          Home Plate
        </Text>
      </Flex>
      <Flex
        position="absolute"
        top="50%"
        left="10%"
        transform="translateY(-50%)"
        justify="center"
      >
        <Text color="white" fontWeight="bold" fontSize="lg">
          Left Field
        </Text>
      </Flex>
      <Flex
        position="absolute"
        top="50%"
        right="10%"
        transform="translateY(-50%)"
        justify="center"
      >
        <Text color="white" fontWeight="bold" fontSize="lg">
          Right Field
        </Text>
      </Flex>
    </Box>
  );
};

export default BaseballField;
