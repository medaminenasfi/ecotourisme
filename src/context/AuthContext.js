import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decodedUser = decodeToken(token);
      if (decodedUser && !isTokenExpired(decodedUser)) {
        setUser(decodedUser.UserInfo);  // Set full user data
      } else {
        logout();
      }
    }
  }, []);

  useEffect(() => {
    console.log("🔄 Mise à jour de l'utilisateur :", user);
  }, [user]);

  const login = (token, userData) => {
    localStorage.setItem("accessToken", token);
    const decodedUser = decodeToken(token);
    if (decodedUser && !isTokenExpired(decodedUser)) {
      setUser(userData);  // Set full user data, including role and other fields
    } else {
      logout();
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
  };

  const decodeToken = (token) => {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) {
        throw new Error("Format du token invalide");
      }
      const base64Url = parts[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(window.atob(base64));
    } catch (error) {
      console.error("❌ Erreur de décodage du token:", error);
      return null;
    }
  };

  const isTokenExpired = (decodedToken) => {
    if (!decodedToken || !decodedToken.exp) return true;
    return Date.now() > decodedToken.exp * 1000;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
