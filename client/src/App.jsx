import React from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import BaseballField from "./component/Field";
import Table from "./component/Table";
export default function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/field" element={<BaseballField></BaseballField>} />
        <Route path="/table" element={<Table></Table>}/>
      </Routes>
    </ChakraProvider>
  );
}
