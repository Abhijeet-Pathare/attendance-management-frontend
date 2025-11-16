// src/api/attendanceReportApi.js
import axios from "axios";

const BASE_URL = "http://localhost:8080/attendance/report";

// Add token if exists
const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Batch report
export const getBatchReport = async (batchId) => {
  const res = await api.get(`/batch/${batchId}`);
  return res.data;
};

// Student monthly report
export const getStudentReport = async (studentId, month, year) => {
  const res = await api.get(`/student/${studentId}`, {
    params: { month, year },
  });
  return res.data;
};

export default api;
