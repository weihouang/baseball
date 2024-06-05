import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";

export default function Home() {
  const navigate = useNavigate();

  const handleField = () => {
    navigate("/field");
  };

  return <Button onClick={handleField}>field</Button>;
}
