// src/api.js
import axios from "axios";

// Backend: http://localhost:5000/api/books (from server.js + .env)
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
