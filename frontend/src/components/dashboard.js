import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${process.env.REACT_APP_API_URL}/api/protected`, {
  headers: { Authorization: `Bearer ${token}` }
})
      .then(res => setMessage(res.data.message))
      .catch(() => setMessage("Unauthorized"));
  }, []);

  return <h2>{message}</h2>;
};

export default Dashboard;
