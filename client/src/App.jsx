import React from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import BaseballField from "./component/Field";
export default function App() {
  return (
    <ChakraProvider>
      <Box>hello world</Box>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/field" element={<BaseballField></BaseballField>} />
      </Routes>
    </ChakraProvider>
  );
}
