import axios from "axios";

const authApi = axios.create({
  baseURL: "http://localhost:8080/auth",
  headers: { "Content-Type": "application/json" }
});

// Add token if exists (for future endpoints that need it)
authApi.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default authApi;
