import { useState } from "react";

export function useAuth() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const isAuthed = !!token;

  const login = () => {
    localStorage.setItem("token", "demo-token");
    setToken("demo-token");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return { isAuthed, login, logout };
}
