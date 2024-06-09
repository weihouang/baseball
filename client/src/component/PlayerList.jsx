import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Center, 
  Image,
  CSSReset,
  Button,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import DraggablePlayer from "./DraggablePlayer";

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
    { color: "red.700", label: "R1" }, // runner 1
    { color: "red.700", label: "R2" }, // runner 2
    { color: "red.700", label: "R3" }, // runner 3
    { color: "red.700", label: "R4" }, // runner 4
    { color: "blue.500", label: "P" },
    { color: "blue.500", label: "C" },
    { color: "blue.500", label: "1B" },
    { color: "blue.500", label: "2B" },
    { color: "blue.500", label: "3B" },
    { color: "blue.500", label: "SS" },
    { color: "blue.500", label: "LF" },
    { color: "blue.500", label: "CF" },
    { color: "blue.500", label: "RF" },
    { color: "blue.500", label: "BB" }, // baseball
  ];

  const [positions, setPositions] = useState(initialPositions);
  const [initial, setInitial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [records, setRecords] = useState(() => {
    const savedRecords = localStorage.getItem("records");
    return savedRecords ? JSON.parse(savedRecords) : [];
  });
  const [isPlaying, setIsPlaying] = useState(false);

  const updatePosition = (id, newPosition) => {
    const updatedPositions = positions.map((pos, index) =>
      index === id ? newPosition : pos
    );
    setPositions(updatedPositions);
  };

  const recordPositions = () => {
    const recordName = prompt("Enter a name for this record:");
    if (recordName) {
      const newRecords = [
        ...records,
        {
          name: recordName,
          initial: [...initial],
          positions,
        },
      ];
      setRecords(newRecords);
      localStorage.setItem("records", JSON.stringify(newRecords));
    }
  };

  const clearRecords = () => {
    setPositions(initialPositions);
    setIsPlaying(false);
  };

  const [isListVisible, setIsListVisible] = useState(false);

  const handleRemoveRecord = (index) => {
    const updatedRecords = records.filter((_, i) => i !== index);
    setRecords(updatedRecords);
    localStorage.setItem("records", JSON.stringify(updatedRecords));
    setCurrentIndex(-1);
  };

  const handleStart = () => {
    setInitial([...positions]);
    setIsPlaying(false);
  };

  const handlePlay = () => {
    setIsPlaying(true);
    if (records[currentIndex]) {
      setPositions(records[currentIndex].initial);
      setTimeout(() => {
        setPositions(records[currentIndex].positions);
      }, 1000); // Animate for 1 second
    }
  };

  const handleButtonClick = (index) => {
    const recordIndex = index;
    if (recordIndex >= 0 && recordIndex < records.length) {
      setPositions(records[recordIndex].initial);
    }
    setCurrentIndex(index);
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

        <Button colorScheme="red" onClick={clearRecords}>
          Clear
        </Button>
        <Button onClick={() => navigate("/table")}>Table</Button>
        <Box>
          <Button onClick={() => setIsListVisible(!isListVisible)}>
            {isListVisible ? "Hide List" : "Show List"}
          </Button>
          {isListVisible && records.length > 0 && (
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
        {currentIndex !== -1 && (
          <Button colorScheme="teal" onClick={handlePlay}>
            Play
          </Button>
        )}
      </Box>
      {positions.map((position, index) => (
        <DraggablePlayer
          key={index}
          id={index}
          position={position}
          color={players[index].color}
          label={players[index].label}
          updatePosition={updatePosition}
          isPlaying={isPlaying}
        />
      ))}
    </ChakraProvider>
  
);
};

export default PlayerList;
