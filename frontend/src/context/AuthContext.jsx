import { createContext, useContext, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Get saved user when the application starts
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Get saved JWT token when the application starts
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  // =========================
  // LOGIN
  // =========================
  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });

      const data = response.data;

      // Backend sends token and user
      const savedToken = data.token;
      const savedUser = data.user;

      // Save in React state
      setToken(savedToken);
      setUser(savedUser);

      // Save in browser
      localStorage.setItem("token", savedToken);
      localStorage.setItem("user", JSON.stringify(savedUser));

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error("Login error:", error);

      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Login failed. Please try again.",
      };
    }
  };

  // =========================
  // REGISTER
  // =========================
  const register = async (name, email, password) => {
    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Registration error:", error);

      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Registration failed. Please try again.",
      };
    }
  };

  // =========================
  // FORGOT / RESET PASSWORD
  // =========================
  const forgotPassword = async (email) => {
    try {
      const response = await api.post("/auth/forgot-password", { email });

      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Could not process that request. Please try again.",
      };
    }
  };

  const resetPassword = async (resetToken, password) => {
    try {
      const response = await api.post("/auth/reset-password", {
        token: resetToken,
        password,
      });

      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Could not reset password. The link may have expired.",
      };
    }
  };

  // =========================
  // UPDATE PROFILE (local state sync after a successful API update)
  // =========================
  const updateStoredUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    updateStoredUser,

    // true when token exists
    isAuthenticated: !!token,
    isAdmin: user?.role === "admin",
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};
