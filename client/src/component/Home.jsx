import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";
import LoginButton from "./Nav/Login";
import LogoutButton from "./Nav/Logout";
import Profile from "./Profile";
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
      <Button onClick={() => navigate("/testing")}>testing</Button>
      <LoginButton></LoginButton>
      <LogoutButton></LogoutButton>
      <Profile></Profile>
    </Box>
  );
}
