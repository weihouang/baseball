import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  CSSReset,
  Button,
  Select,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import DraggablePlayer from "./component/Player"; // Adjust the path if necessary

const App = () => {
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

  return (
    <ChakraProvider>
      <CSSReset />
      <Box position="absolute" top="10px" left="10px" display="flex" gap="10px">
        <Button colorScheme="teal" onClick={recordPositions}>
          Record
        </Button>
        <Button colorScheme="red" onClick={clearRecords}>
          Clear
        </Button>
        <Button onClick={handleTable}>Table</Button>
        <Select placeholder="Select record" onChange={handleSelectRecord}>
          {records.map((record, index) => (
            <option key={index} value={index}>
              {record.name}
            </option>
          ))}
        </Select>
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

export default App;
