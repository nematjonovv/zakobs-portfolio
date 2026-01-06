import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          id: decoded.id,
          username: decoded.username,
          role: decoded.role,
        });
      } catch (err) {
        localStorage.removeItem("access_token");
        setUser(null);
      }
    }
  }, []);

  const login = (token) => {
    const decoded = jwtDecode(token);

    setUser({
      id: decoded.id,
      username: decoded.username,
      role: decoded.role,
    });

    localStorage.setItem("access_token", token);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
