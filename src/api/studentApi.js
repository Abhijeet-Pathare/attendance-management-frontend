import axios from "axios";

const studentApi = axios.create({
  baseURL: "http://localhost:8080/students",
  headers: { "Content-Type": "application/json" }
});

studentApi.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default studentApi;
