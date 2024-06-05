import React, { useState, useRef } from "react";
import {
  ChakraProvider,
  Box,
  CSSReset,
  Button,
  Select,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import DraggablePlayer from "./Player";
import { motion } from "framer-motion";

const PlayerList = () => {
  const navigate = useNavigate();
  const initialPositions = [
    { x: 100, y: 100 },
    { x: 200, y: 100 },
    { x: 300, y: 100 },
    { x: 400, y: 100 },
    { x: 100, y: 200 },
    { x: 200, y: 200 },
    { x: 300, y: 200 },
    { x: 400, y: 200 },
    { x: 100, y: 300 },
    { x: 200, y: 300 },
    { x: 300, y: 300 },
    { x: 400, y: 300 },
    { x: 100, y: 400 },
    { x: 200, y: 400 },
  ];

  const players = [
    { color: "red.700", label: "R1" },
    { color: "red.700", label: "R2" },
    { color: "red.700", label: "R3" },
    { color: "red.700", label: "R4" },
    { color: "blue.500", label: "P" },
    { color: "blue.500", label: "C" },
    { color: "blue.500", label: "1B" },
    { color: "blue.500", label: "2B" },
    { color: "blue.500", label: "3B" },
    { color: "blue.500", label: "SS" },
    { color: "blue.500", label: "LF" },
    { color: "blue.500", label: "CF" },
    { color: "blue.500", label: "RF" },
    { color: "blue.500", label: "DH" }, // Designated Hitter
  ];

  const [positions, setPositions] = useState(initialPositions);
  const [initialPositionsState, setInitialPositionsState] = useState(null);
  const [records, setRecords] = useState(() => {
    const savedRecords = localStorage.getItem("records");
    return savedRecords ? JSON.parse(savedRecords) : [];
  });

  const updatePosition = (id, newPosition) => {
    const updatedPositions = positions.map((pos, index) =>
      index === id ? newPosition : pos
    );
    setPositions(updatedPositions);
  };

  const handleTable = () => {
    navigate("/table");
  };

  const recordPositions = () => {
    const recordName = prompt("Enter a name for this record:");
    if (recordName) {
      const newRecords = [...records, { name: recordName, positions }];
      setRecords(newRecords);
      localStorage.setItem("records", JSON.stringify(newRecords));
    }
  };

  const clearRecords = () => {
    setRecords([]);
    localStorage.removeItem("records");
  };

  const handleSelectRecord = (event) => {
    const recordIndex = parseInt(event.target.value, 10);
    if (recordIndex >= 0 && recordIndex < records.length) {
      setPositions(records[recordIndex].positions);
    }
  };

  const [isListVisible, setIsListVisible] = useState(false);

  const toggleListVisibility = () => {
    setIsListVisible(!isListVisible);
  };

  const handleRemoveRecord = (index) => {
    const updatedRecords = records.filter((_, i) => i !== index);
    setRecords(updatedRecords);
    localStorage.setItem("records", JSON.stringify(updatedRecords));
  };

  const handleStart = () => {
    setInitialPositionsState([...positions]);
  };

  const handlePlay = () => {
    if (initialPositionsState) {
      initialPositionsState.forEach((initialPos, index) => {
        updatePosition(index, initialPos);
      });

      setTimeout(() => {
        records[records.length - 1].positions.forEach((finalPos, index) => {
          updatePosition(index, finalPos);
        });
      }, 1000); // Animate for 1 second
    }
  };

  return (
    <ChakraProvider>
      <CSSReset />
      <Box position="absolute" top="10px" left="10px" display="flex" gap="10px">
        <Button colorScheme="teal" onClick={handleStart}>
          Start
        </Button>
        <Button colorScheme="teal" onClick={recordPositions}>
          Record
        </Button>
        <Button colorScheme="teal" onClick={handlePlay}>
          Play
        </Button>
        <Button colorScheme="red" onClick={clearRecords}>
          Clear
        </Button>
        <Button onClick={handleTable}>Table</Button>
        <Box>
          <Button mt={2} onClick={toggleListVisibility}>
            {isListVisible ? "Hide List" : "Show List"}
          </Button>
          {isListVisible && (
            <VStack
              spacing={2}
              overflowY={"auto"}
              maxH={"10em"}
              position={"relative"}
              zIndex={1000}
              bg={"white"}
              p={"1em"}
              borderRadius={"1em"}
              border={"1px"}
            >
              {records.map((record, index) => (
                <Box key={index}>
                  <Button onClick={() => handleButtonClick(index)}>
                    {record.name}
                  </Button>
                  <Button
                    onClick={() => handleRemoveRecord(index)}
                    colorScheme="red"
                    ml={2}
                  >
                    Remove
                  </Button>
                </Box>
              ))}
            </VStack>
          )}
        </Box>
      </Box>
      {positions.map((position, index) => (
        <DraggablePlayer
          key={index}
          id={index}
          position={position}
          color={players[index].color}
          label={players[index].label}
          updatePosition={updatePosition}
        />
      ))}
    </ChakraProvider>
  );
};

export default PlayerList;

