//src/services/api/auth.js - REPLACE YOUR ENTIRE FILE WITH THIS
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const login = async (mail, password, selectedRole) => {
  console.log("🔵 auth.js - login function called with:", {
    mail,
    password: "***",
    selectedRole
  });

  const payload = { 
    mail, 
    password,
    selectedRole
  };

  console.log("🔵 auth.js - Sending payload:", payload);

  const response = await axios.post(`${API_URL}/login`, payload);

  console.log("🔵 auth.js - Response received:", response.data);

  if (!response.data || !response.data.token) {
    throw new Error("Authentication failed");
  }

  return response.data;
};