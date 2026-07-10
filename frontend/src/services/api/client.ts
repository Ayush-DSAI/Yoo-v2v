import axios from "axios";

// Strictly require the environment variable
const baseURL = process.env.NEXT_PUBLIC_API_URL;
if (!baseURL && typeof window !== 'undefined') {
  console.warn("NEXT_PUBLIC_API_URL is missing! API calls will fail.");
}

const api = axios.create({
  baseURL,
  // We DO NOT set "Content-Type": "application/json" globally here.
  // Axios will automatically set application/json for plain JS objects, 
  // and will correctly set multipart/form-data (with boundaries) when sending FormData().
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
export const apiClient = api;
