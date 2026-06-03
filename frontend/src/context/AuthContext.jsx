import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import * as authService from '../services/authService';
import {
  clearStoredAuth,
  getStoredToken,
  getStoredUser,
  setStoredAuth,
} from '../utils/storage';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedToken = getStoredToken();
    const storedUser = getStoredUser();
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const applyAuth = useCallback((authData) => {
    const { token: authToken, _id, name, email } = authData;
    const authUser = { _id, name, email };
    setToken(authToken);
    setUser(authUser);
    setStoredAuth(authToken, authUser);
    setError(null);
  }, []);

  const login = useCallback(async (email, password) => {
    setError(null);
    const data = await authService.loginUser(email, password);
    applyAuth(data);
    return data;
  }, [applyAuth]);

  const register = useCallback(async (name, email, password) => {
    setError(null);
    const data = await authService.registerUser(name, email, password);
    applyAuth(data);
    return data;
  }, [applyAuth]);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setError(null);
    clearStoredAuth();
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      error,
      setError,
      login,
      register,
      logout,
      isAuthenticated: Boolean(token && user),
    }),
    [user, token, loading, error, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
