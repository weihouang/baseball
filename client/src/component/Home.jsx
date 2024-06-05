import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";

export default function Home() {
  const navigate = useNavigate();

  const handleField = () => {
    navigate("/field");
  };
  const handleRecord = () => {
    navigate("/record");
  };

  return (
    <Box>
      <Button onClick={handleField}>field</Button>
      <Button onClick={handleRecord}>Record</Button>
    </Box>
  );
}
