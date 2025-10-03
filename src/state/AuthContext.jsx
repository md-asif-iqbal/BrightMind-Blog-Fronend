// src/state/AuthProvider.jsx
import { useEffect, useState } from 'react';
import AuthContext from './auth-context.js';
import api from '../utils/api.js'; // adjust path if your structure differs

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (!token) return setUser(null);
    api.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => setUser(r.data.user))
      .catch(() => setUser(null));
  }, [token]);

  const login = (tok, usr) => { localStorage.setItem('token', tok); setToken(tok); setUser(usr); };
  const logout = () => { localStorage.removeItem('token'); setToken(''); setUser(null); };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
