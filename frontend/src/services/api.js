import axios from "axios";

// Single source of truth for the backend URL. Override with a .env
// file (VITE_API_URL=https://your-deployed-api.com/api) for production.
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({ baseURL });

// Attach the JWT (if present) to every outgoing request automatically,
// so individual components/pages don't need to do it by hand.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// If the token has expired/been rejected, clear local auth state so the
// UI doesn't stay stuck showing a "logged in" state that no longer works.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }

    return Promise.reject(error);
  }
);

export default api;
