import React, { createContext, useState, useEffect, useCallback } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData"); 
  }, []);

  const saveUserData = (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData));
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

  const login = (token, userData = {}) => {
    if (!token) {
      console.error("❌ Token is missing");
      return;
    }

    localStorage.setItem("accessToken", token);
    const decodedUser = decodeToken(token);

    if (decodedUser?.UserInfo && !isTokenExpired(decodedUser)) {
      const fullUserData = {
        id: decodedUser.UserInfo.id,
        email: decodedUser.UserInfo.email,
        role: decodedUser.UserInfo.role,
        ...userData,
      };
      
      setUser(fullUserData);
      saveUserData(fullUserData); 
    } else {
      logout();
    }
  };

  const updateUser = (updatedData) => {
    const newUserData = { ...user, ...updatedData };
    setUser(newUserData);
    saveUserData(newUserData); 
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const savedUserData = localStorage.getItem("userData");
    
    if (token && savedUserData) {
      const decodedUser = decodeToken(token);
      
      if (decodedUser?.UserInfo && !isTokenExpired(decodedUser)) {
        try {
          const parsedUserData = JSON.parse(savedUserData);
          
          if (decodedUser.UserInfo.id === parsedUserData.id) {
            setUser(parsedUserData);
          } else {
            logout();
          }
        } catch (e) {
          console.error("Error parsing user data", e);
          logout();
        }
      } else {
        logout();
      }
    } else if (token) {
      fetch("http://localhost:5000/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error("Failed to fetch user");
        })
        .then((userData) => {
          setUser(userData);
          saveUserData(userData);
        })
        .catch((error) => {
          console.error("User fetch error:", error);
          logout();
        });
    }
    
    setLoading(false);
  }, [logout]);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;