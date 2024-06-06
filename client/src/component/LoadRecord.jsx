import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import axios from "axios";

export default function LoadRecord() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get("http://localhost:5000/records");
        setRecords(response.data);
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };

    fetchRecords();
  }, []);

  return <Box>{JSON.stringify(records)}</Box>; // Display records for debugging
}
