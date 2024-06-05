import React, { useEffect, useState } from "react";
import { Box, Thead, Tr, Th, Tbody, Button, Table, Td } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const TablePage = () => {
  const [records, setRecords] = useState(() => {
    const savedRecords = localStorage.getItem("records");
    return savedRecords ? JSON.parse(savedRecords) : [];
  });

  const navigate = useNavigate();

  const handleField = () => {
    navigate("/field");
  };

  useEffect(() => {
    const savedRecords = localStorage.getItem("records");
    if (savedRecords) {
      setRecords(JSON.parse(savedRecords));
    }
  }, []);

  return (
    <Box position="absolute" top="150px" left="50px">
      <Button onClick={handleField}>Field</Button>
      <Table variant="simple" mt="20px">
        <Thead>
          <Tr>
            <Th>Record #</Th>
            <Th>Player</Th>
            <Th>X</Th>
            <Th>Y</Th>
          </Tr>
        </Thead>
        <Tbody>
          {records.map((record, recordIndex) =>
            record.positions.map((pos, playerIndex) => (
              <Tr key={`${recordIndex}-${playerIndex}`}>
                <Td>{recordIndex + 1}</Td>
                <Td>{playerIndex}</Td>
                <Td>{pos.x}</Td>
                <Td>{pos.y}</Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TablePage;
