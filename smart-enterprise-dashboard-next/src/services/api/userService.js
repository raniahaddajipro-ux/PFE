// src/services/api/userService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/user"; // ✅ Match your backend port

// ✅ Get token from localStorage
const getAuthToken = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return user?.token || "";
};

export const updateProfile = async (formData) => {
  try {
    console.log("🔵 Sending profile update..."); // Debug log
    
    const token = getAuthToken();
    console.log("🔵 Token:", token ? "Present" : "Missing"); // Debug log
    
    const response = await axios.put(`${API_URL}/update-profile`, formData, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    });
    
    console.log("✅ Profile update response:", response.data); // Debug log
    return response.data;
    
  } catch (error) {
    console.error("❌ Profile update error:", error.response?.data || error.message);
    throw error;
  }
};

export const updatePassword = async (currentPassword, newPassword) => {
  try {
    const token = getAuthToken();
    
    const response = await axios.put(
      `${API_URL}/update-password`,
      { currentPassword, newPassword },
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );
    
    return response.data;
    
  } catch (error) {
    console.error("❌ Password update error:", error.response?.data || error.message);
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const token = getAuthToken();
    
    const response = await axios.get(`${API_URL}/profile`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    
    return response.data;
    
  } catch (error) {
    console.error("❌ Get profile error:", error.response?.data || error.message);
    throw error;
  }
};