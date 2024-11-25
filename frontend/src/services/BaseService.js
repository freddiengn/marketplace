import axios from "axios";

// Set up the base URL and default settings
const API_URL = "http://localhost:8080"; // Update with your backend URL

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default api;