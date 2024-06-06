// TestComponent.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TestComponent() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get("http://localhost:5000/test");
        setMessage(response.data.message);
      } catch (error) {
        console.error("Error fetching message:", error);
      }
    };

    fetchMessage();
  }, []);

  return <div>{message}</div>;
}
