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

/* ---------- CREATE ---------- */
export const createStudent = async (student) => {
  const res = await studentApi.post("", student);
  return res.data;
};

/* ---------- DELETE ---------- */
export const deleteStudent = async (id) => {
  const res = await studentApi.delete(`/${id}`);
  return res.data;
};

export default studentApi;
