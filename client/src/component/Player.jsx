import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  CSSReset,
  Text,
  Button,
  Select,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const DraggablePlayer = ({ id, position, color, label, updatePosition }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    e.preventDefault(); // Prevent text selection or other default actions
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newPosition = {
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      };
      updatePosition(id, newPosition);
      e.preventDefault(); // Prevent default actions
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleMouseUpGlobal = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUpGlobal);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUpGlobal);
    };
  }, [isDragging]);

  return (
    <Box
      position="absolute"
      left={position.x}
      top={position.y}
      width="50px"
      height="50px"
      backgroundColor={color}
      borderRadius="50%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      onMouseDown={handleMouseDown}
      cursor={isDragging ? "grabbing" : "grab"}
      userSelect="none"
      webkitUserSelect="none"
      mozUserSelect="none"
      msUserSelect="none"
    >
      <Text color="white" fontWeight="bold">
        {label}
      </Text>
    </Box>
  );
};

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
    { color: "blue.500", label: "DH" },
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
