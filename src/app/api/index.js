import axios from "axios";

export const publicApi = axios.create({
  baseURL: "https://fa0dbb7decb6.ngrok-free.app/api",
  headers: { 
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true" // ✅ correct header
  }
});

export const privateApi = axios.create({
  baseURL: "https://fa0dbb7decb6.ngrok-free.app/api",
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
