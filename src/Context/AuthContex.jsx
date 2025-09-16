import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { api } from "../Services/api";

const AuthContext = createContext();

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve essere usato dentro AuthProvider");
  return ctx;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const res = await api.me();
      if (res.success) {
        setUser(res.user);
      } else {
        logout();
      }
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (credentials) => {
    try {
      const res = await api.login(credentials.username, credentials.password);
      if (res.success) {
        localStorage.setItem("token", res.token);
        setToken(res.token);
        setUser(res.user);
        return { success: true };
      }
      return { success: false, error: res.error };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}