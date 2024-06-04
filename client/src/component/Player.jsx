import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, CSSReset, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const DraggablePlayer = ({ id, initialPosition, color, label, updatePosition }) => {
  const [position, setPosition] = useState(initialPosition);
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
      setPosition(newPosition);
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

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUpGlobal);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUpGlobal);
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
      cursor={isDragging ? 'grabbing' : 'grab'}
      userSelect="none"
      webkitUserSelect="none"
      mozUserSelect="none"
      msUserSelect="none"
    >
      <Text color="white" fontWeight="bold">{label}</Text>
    </Box>
  );
};

const App = () => {
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
    { color: "blue.500", label: "P" },  // Pitcher
    { color: "blue.500", label: "C" },  // Catcher
    { color: "blue.500", label: "1B" }, // First Base
    { color: "blue.500", label: "2B" }, // Second Base
    { color: "blue.500", label: "3B" }, // Third Base
    { color: "blue.500", label: "SS" }, // Shortstop
    { color: "blue.500", label: "LF" }, // Left Field
    { color: "blue.500", label: "CF" }, // Center Field
    { color: "blue.500", label: "RF" }, // Right Field
    { color: "blue.500", label: "DH" }, // Designated Hitter
  ];

  const [positions, setPositions] = useState(initialPositions);

  const updatePosition = (id, newPosition) => {
    const updatedPositions = positions.map((pos, index) =>
      index === id ? newPosition : pos
    );
    setPositions(updatedPositions);
  };

  return (
    <ChakraProvider>
      <CSSReset />
      {initialPositions.map((position, index) => (
        <DraggablePlayer 
          key={index} 
          id={index} 
          initialPosition={position} 
          color={players[index].color} 
          label={players[index].label} 
          updatePosition={updatePosition} 
        />
      ))}
      <Box position="absolute" top="500px" left="50px">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Player</Th>
              <Th>X</Th>
              <Th>Y</Th>
            </Tr>
          </Thead>
          <Tbody>
            {positions.map((pos, index) => (
              <Tr key={index}>
                <Td>{players[index].label}</Td>
                <Td>{pos.x}</Td>
                <Td>{pos.y}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </ChakraProvider>
  );
};

export default App;
