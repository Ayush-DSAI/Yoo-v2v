import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach JWT
api.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_DEV_JWT;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
// Keeping apiClient export for backwards compatibility with other files if needed
export const apiClient = api;
