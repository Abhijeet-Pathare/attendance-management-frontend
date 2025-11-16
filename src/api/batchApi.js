import axios from "axios";

const BATCH_BASE_URL = "http://localhost:8080/batches";

// ✅ Create Axios instance with base URL and auth header
const batchApi = axios.create({
  baseURL: BATCH_BASE_URL,
  headers: { "Content-Type": "application/json" }
});

// Add JWT token if it exists
batchApi.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ✅ Use the Axios instance in all functions

export const getBatches = async () => {
  const res = await batchApi.get(""); // use instance
  return res.data;
};

export const getBatchById = async (id) => {
  const res = await batchApi.get(`/${id}`);
  return res.data;
};

export const createBatch = async (batch) => {
  const res = await batchApi.post("", batch);
  return res.data;
};

export const updateBatch = async (id, batch) => {
  const res = await batchApi.put(`/${id}`, batch);
  return res.data;
};

export const deleteBatch = async (id) => {
  const res = await batchApi.delete(`/${id}`);
  return res.data;
};

export default batchApi; // still export default instance if needed elsewhere
