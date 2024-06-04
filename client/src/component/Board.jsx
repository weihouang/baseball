import React from "react";
import { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Flex,
  Image,
  Center,
  Button,
} from "@chakra-ui/react";
import { Stage, Layer, Line } from "react-konva";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const BaseballTacticalBoard = () => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
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
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
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
    <ChakraProvider>
      <Box
        position="absolute"
        left={position.x}
        top={position.y}
        width="50px"
        height="50px"
        backgroundColor="blue.500"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        cursor={isDragging ? "grabbing" : "grab"}
        userSelect="none"
        webkitUserSelect="none"
        mozUserSelect="none"
        msUserSelect="none"
      />
    </ChakraProvider>
  );
};
export default BaseballTacticalBoard;
