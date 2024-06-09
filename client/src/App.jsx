import React from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import BaseballField from "./component/Field";
import Table from "./component/Table";
import LoadRecord from "./component/LoadRecord";
import Testing from "./component/Testing";
import Min from "./component/Min";

export default function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/field" element={<BaseballField></BaseballField>} />
        <Route path="/table" element={<Table></Table>} />
        <Route path="/record" element={<Min></Min>}></Route>
        <Route path="/testing" element={<Testing></Testing>}></Route>
      </Routes>
    </ChakraProvider>
  );
}
