import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  CSSReset,
  Text,
  Button,
  Select,
  Image,
} from "@chakra-ui/react";
import baseballImage from "../assets/baseball.png"; // Adjust the path if necessary

export default function DraggablePlayer  ({ id, position, color, label, updatePosition })  {
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
      backgroundColor={label === "DH" ? "transparent" : color}
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
      {label === "DH" ? (
        <Image
          src={baseballImage}
          alt="Baseball"
          boxSize="30px"
        />
      ) : (
        <Text color="white" fontWeight="bold">
          {label}
        </Text>
      )}
    </Box>
  );
};


