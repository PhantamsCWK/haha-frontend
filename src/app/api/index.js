import axios from "axios";

export const publicApi = axios.create({
  baseURL: "http://192.168.35.221:1234/api",
  headers: { "Content-Type": "application/json" },
});

export const privateApi = axios.create({
  baseURL: "http://192.168.35.221:1234/api",
  headers: { "Content-Type": "application/json" },
});

privateApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

