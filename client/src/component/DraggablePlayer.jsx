import React, { useState, useEffect } from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import baseballImage from "../assets/baseball.png"; // Adjust the path if necessary

const DraggablePlayer = ({ id, position, color, label, updatePosition, isPlaying }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Define the boundaries for the black square
  const squareBoundaries = {
    top: 300, // Adjust based on the actual position of the square
    bottom: 500, // Adjust based on the actual position of the square
    left: 400, // Adjust based on the actual position of the square
    right: 600, // Adjust based on the actual position of the square
  };

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
      let newPosition = {
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      };

      // Restrict movement along the border of the black square for runners 1 to 4
      if (["R1", "R2", "R3", "R4"].includes(label)) {
        if (newPosition.x < squareBoundaries.left) {
          newPosition.x = squareBoundaries.left;
        } else if (newPosition.x > squareBoundaries.right - 50) {
          newPosition.x = squareBoundaries.right - 50;
        }

        if (newPosition.y < squareBoundaries.top) {
          newPosition.y = squareBoundaries.top;
        } else if (newPosition.y > squareBoundaries.bottom - 50) {
          newPosition.y = squareBoundaries.bottom - 50;
        }

        // Calculate the closest point on the border
        const leftDistance = Math.abs(newPosition.x - squareBoundaries.left);
        const rightDistance = Math.abs(newPosition.x - (squareBoundaries.right - 50));
        const topDistance = Math.abs(newPosition.y - squareBoundaries.top);
        const bottomDistance = Math.abs(newPosition.y - (squareBoundaries.bottom - 50));

        const minDistance = Math.min(leftDistance, rightDistance, topDistance, bottomDistance);

        if (minDistance === leftDistance) {
          newPosition.x = squareBoundaries.left;
        } else if (minDistance === rightDistance) {
          newPosition.x = squareBoundaries.right - 50;
        } else if (minDistance === topDistance) {
          newPosition.y = squareBoundaries.top;
        } else if (minDistance === bottomDistance) {
          newPosition.y = squareBoundaries.bottom - 50;
        }
      }

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
      style={{
        transition: isPlaying && !isDragging ? "left 0.5s, top 0.5s" : "none",
      }}
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

export default DraggablePlayer;
