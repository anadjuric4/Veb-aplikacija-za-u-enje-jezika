import { useState } from "react";
import { authAPI } from "../services/api";

export function useAuth() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isAuthed = !!token;

  const login = async ({ email, password }) => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await authAPI.login(email, password);
      const { token: authToken, user: authUser } = response.data;

      localStorage.setItem("token", authToken);
      localStorage.setItem("user", JSON.stringify(authUser));
      setToken(authToken);
      setUser(authUser);

      return true; // ← Vraća true za success
    } catch (err) {
      console.error("Login error:", err);
      
      // Postavi error poruku
      const message = err.response?.data?.message || 
                     (err.response?.status === 422 ? "Neispravni podaci." : "Login nije uspeo.");
      setError(message);
      
      return false; // ← Vraća false za failure
    } finally {
      setLoading(false);
    }
  };

  const register = async ({ name, email, password, password_confirmation }) => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await authAPI.register(name, email, password, password_confirmation);
      const { token: authToken, user: authUser } = response.data;

      localStorage.setItem("token", authToken);
      localStorage.setItem("user", JSON.stringify(authUser));
      setToken(authToken);
      setUser(authUser);

      return true;
    } catch (err) {
      console.error("Register error:", err);
      const message = err.response?.data?.message || 
                     (err.response?.status === 422 ? "Proveri polja." : "Registracija nije uspela.");
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setToken(null);
      setUser(null);
    }
  };

  return { 
    user, 
    isAuthed, 
    loading, 
    error, 
    login, 
    register, 
    logout 
  };
}