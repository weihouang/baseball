import React, { useState, useEffect } from "react";
import { Box, Button } from "@chakra-ui/react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export default function LoadRecord() {
  const [records, setRecords] = useState([]);
  const { user } = useAuth0();

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/records", {
          params: { email: user.email },
        });
        setRecords(response.data);
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };

    fetchRecords();
  }, [user.email]);

  const postRecord = async () => {
    if (user?.email) {
      try {
        const newRecord = { email: user.email, data: "Some data" }; // Replace "Some data" with actual data
        const response = await axios.post(
          "http://127.0.0.1:5000/api/record",
          newRecord
        );
      } catch (error) {
        console.error("Error posting record:", error);
      }
    }
  };

  const deleteRecord = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/record/${id}`);
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };
  return (
    <Box>
      <Button onClick={postRecord}>Post Record</Button>
      <Box>{JSON.stringify(records)}</Box>
      <Box>
        <Button onClick={() => deleteRecord("666726be274f801df8fb35df")}>
          Delete
        </Button>
      </Box>
    </Box>
  );
}
