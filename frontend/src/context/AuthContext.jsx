import { createContext, useContext, useState } from "react";
import axios from "axios";

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
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

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
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

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

    // true when token exists
    isAuthenticated: !!token,
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