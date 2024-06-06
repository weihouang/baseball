import React, { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
export default function Testing() {
  const [original, setOriginal] = useState();

  const handleMove = () => {
    setOriginal(!original);
  };
  return (
    <Box
      position={"absolute"}
      mt={"20em"}
      ml={"20em"}
      borderRadius={original ? "lg" : 0}
      transition="all 10s"
      transform={`translateX(${original ? "15em" : "0"}) translateY(${
        original ? "15em" : "0"
      })`}
      zIndex="1000"
    >
      <Button onClick={handleMove}>hi</Button>
    </Box>
  );
}
