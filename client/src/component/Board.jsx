import React from "react";
import { useState, useEffect } from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";

const BaseballTacticalBoard = () => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handlePointerDown = (e) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handlePointerMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
    } else {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    }

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
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
        onPointerDown={handlePointerDown}
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
