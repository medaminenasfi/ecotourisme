import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decodedUser = decodeToken(token);
      console.log("🟢 Decoded User from Token:", decodedUser);

      if (decodedUser?.UserInfo && !isTokenExpired(decodedUser)) {
        setUser({
          id: decodedUser.UserInfo.id,
          email: decodedUser.UserInfo.email,
          first_name: decodedUser.UserInfo.first_name,
          last_name: decodedUser.UserInfo.last_name,
          phone_number: decodedUser.UserInfo.phone_number,
          gender: decodedUser.UserInfo.gender,
          role: decodedUser.UserInfo.role,
        });
      } else {
        logout();
      }
    }
  }, []);

  useEffect(() => {
    console.log("🔄 Mise à jour de l'utilisateur :", user);
  }, [user]);

  const login = (token, userData = {}) => {
    localStorage.setItem("accessToken", token);
    const decodedUser = decodeToken(token);

    if (decodedUser?.UserInfo && !isTokenExpired(decodedUser)) {
      setUser({
        id: decodedUser.UserInfo.id,
        email: decodedUser.UserInfo.email,
        first_name: decodedUser.UserInfo.first_name,
        last_name: decodedUser.UserInfo.last_name,
        phone_number: decodedUser.UserInfo.phone_number,
        gender: decodedUser.UserInfo.gender,
        role: decodedUser.UserInfo.role,
        ...userData, // Ensure userData does not override JWT data
      });
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
      const decoded = JSON.parse(window.atob(base64));

      console.log("🟢 Decoded Token:", decoded);
      return decoded;
    } catch (error) {
      console.error("❌ Erreur de décodage du token:", error);
      return null;
    }
  };

  const isTokenExpired = (decodedToken) => {
    if (!decodedToken?.exp) return true;
    return Math.floor(Date.now() / 1000) >= decodedToken.exp;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
