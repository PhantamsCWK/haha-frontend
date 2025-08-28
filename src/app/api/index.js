import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000"

export const publicApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: { 
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true" // ✅ correct header
  }
});

export const privateApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: { 
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true" // ✅ correct header
  }
});

privateApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
