// src/axiosInstance.js
import axios from "axios";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8081/api", // Backend base URL
});

// Automatically add token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
