import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ username: "", token: "" });

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const username = localStorage.getItem("username");
    if (token && username) {
      setUser({ username, token });
    }
  }, []);

  const login = ({ username, token }) => {
    localStorage.setItem("access_token", token);
    localStorage.setItem("username", username);
    setUser({ username, token });
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");
    setUser({ username: "", token: "" });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
