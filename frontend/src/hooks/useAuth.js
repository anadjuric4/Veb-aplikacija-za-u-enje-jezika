import { useState } from "react";
import { authAPI } from "../services/api";

export function useAuth() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
  );
  const [loading, setLoading] = useState(false);

  const isAuthed = !!token;

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await authAPI.login(email, password);
      const { token: authToken, user: authUser } = response.data;

      localStorage.setItem("token", authToken);
      localStorage.setItem("user", JSON.stringify(authUser));
      setToken(authToken);
      setUser(authUser);

      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      const message = error.response?.data?.message || "Invalid credentials";
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      setLoading(true);
      const response = await authAPI.register(name, email, password);
      const { token: authToken, user: authUser } = response.data;

      localStorage.setItem("token", authToken);
      localStorage.setItem("user", JSON.stringify(authUser));
      setToken(authToken);
      setUser(authUser);

      return { success: true };
    } catch (error) {
      console.error("Register error:", error);
      const message = error.response?.data?.message || "Registration failed";
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setToken(null);
      setUser(null);
    }
  };

  return { isAuthed, user, login, register, logout, loading };
}