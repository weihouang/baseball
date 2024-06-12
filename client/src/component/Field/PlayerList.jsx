import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  CSSReset,
  Button,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import DraggablePlayer from "./DraggablePlayer";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { initialPositions, players } from "./Data.js";

const PlayerList = () => {
  const navigate = useNavigate();

  const { user, isAuthenticated, isLoading } = useAuth0();
  const [positions, setPositions] = useState(initialPositions);
  const [initial, setInitial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isListVisible, setIsListVisible] = useState(false);
  const [records, setRecords] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isLoading && user && user.email) {
      fetchRecords();
    }
  }, [user, isLoading]);

  const fetchRecords = async () => {
    if (user && user.email) {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/records", {
          params: { email: user.email },
        });
        setRecords(response.data);
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    }
  };

  const postRecord = async (name, positions) => {
    if (user?.email) {
      try {
        const newRecord = {
          email: user.email,
          name: name,
          position: positions,
        };
        const response = await axios.post(
          "http://127.0.0.1:5000/api/record",
          newRecord
        );
      } catch (error) {
        console.error("Error posting record:", error);
      }
      setRecords(fetchRecords());
    } else {
      postRecord(name, positions);
    }
  };

  const deleteRecord = async (id) => {
    try {
      const newid = id.$oid.toString();
      await axios.delete(`http://127.0.0.1:5000/api/record/${newid}`);
      setRecords(fetchRecords());
      setCurrentIndex(-1);
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  const updatePosition = (id, newPosition) => {
    const updatedPositions = positions.map((pos, index) =>
      index === id ? newPosition : pos
    );
    setPositions(updatedPositions);
  };

  const recordPositions = () => {
    const recordName = prompt("Enter a name for this record:");
    if (recordName) {
      const position = { initial: [...initial], final: positions };
      postRecord(recordName, position);
      setRecords(fetchRecords());
    }
  };

  const clearRecords = () => {
    setPositions(initialPositions);
    setIsPlaying(false);
  };

  const handleStart = () => {
    setInitial([...positions]);
    setIsPlaying(false);
  };

  const handlePlay = () => {
    setIsPlaying(true);
    if (records[currentIndex]) {
      setPositions(records[currentIndex].position.initial);
      setTimeout(() => {
        setPositions(records[currentIndex].position.final);
      }, 1000); // Animate for 1 second
    }
  };

  const handleButtonClick = (index) => {
    const recordIndex = index;
    if (recordIndex >= 0 && recordIndex < records.length) {
      setPositions(records[recordIndex].position.initial);
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
                    onClick={() => deleteRecord(record._id)}
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
