import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
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
        });
      } else {
        logout();
      }
    }
  }, []);

  const login = (token, userData = {}) => {
    if (!token) {
      console.error("❌ Token is missing");
      return;
    }

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
        ...userData,
      });
    } else {
      logout();
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    window.location.reload(); // Force app to refresh
};


  const decodeToken = (token) => {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) {
        throw new Error("Invalid token format");
      }
      const base64Url = parts[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = JSON.parse(atob(base64));
      return jsonPayload;
    } catch (error) {
      console.error("❌ Token decoding error:", error);
      return null;
    }
  };

  const isTokenExpired = (decodedToken) => {
    if (!decodedToken?.exp) return true;
    const now = Math.floor(Date.now() / 1000);
    return now >= decodedToken.exp;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
