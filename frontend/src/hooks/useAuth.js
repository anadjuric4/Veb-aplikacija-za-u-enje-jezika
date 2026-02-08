import { useEffect, useState } from "react";
import { csrf, loginApi, logoutApi, meApi, registerApi } from "../api/auth";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // bitno za refresh
  const [error, setError] = useState(null);

  const fetchMe = async () => {
    try {
      const res = await meApi();
      setUser(res.data?.user ?? res.data); // zavisi kako si vratio JSON
      return res.data;
    } catch (e) {
      setUser(null);
      return null;
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchMe();
      setLoading(false);
    })();
  }, []);

  const login = async ({ email, password }) => {
    setError(null);
    setLoading(true);
    try {
      await csrf();
      await loginApi({ email, password });
      await fetchMe();
      setLoading(false);
      return true;
    } catch (e) {
      const msg =
        e?.response?.data?.message ||
        (e?.response?.status === 422 ? "Neispravni podaci." : "Login nije uspeo.");
      setError(msg);
      setLoading(false);
      return false;
    }
  };

  const register = async ({ name, email, password, password_confirmation }) => {
    setError(null);
    setLoading(true);
    try {
      await csrf();
      await registerApi({ name, email, password, password_confirmation });
      await fetchMe();
      setLoading(false);
      return true;
    } catch (e) {
      const msg =
        e?.response?.data?.message ||
        (e?.response?.status === 422 ? "Proveri polja (validacija)." : "Registracija nije uspela.");
      setError(msg);
      setLoading(false);
      return false;
    }
  };

  const logout = async () => {
    setError(null);
    setLoading(true);
    try {
      await logoutApi();
    } catch (e) {
      // i ako failuje, očisti user
    } finally {
      setUser(null);
      setLoading(false);
    }
  };

  return { user, loading, error, login, register, logout };
}
