import axios from "axios";

const ATTENDANCE_BASE_URL = "http://localhost:8080/attendance";

const attendanceApi = axios.create({
  baseURL: ATTENDANCE_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Add JWT token automatically if available
attendanceApi.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Mark attendance
export const markAttendance = async (attendance) => {
  const res = await attendanceApi.post("/mark", attendance);
  return res.data;
};

// Get daily attendance by batch and date
export const getDailyAttendance = async (batchId, date) => {
  const res = await attendanceApi.get(`/daily?batchId=${batchId}&date=${date}`);
  return res.data;
};

// Get monthly attendance by student and month
export const getMonthlyAttendance = async (studentId, month) => {
  const res = await attendanceApi.get(`/monthly?studentId=${studentId}&month=${month}`);
  return res.data;
};

export default attendanceApi;
