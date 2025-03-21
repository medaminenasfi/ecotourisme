import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  console.log("ProtectedRoute: User state is", user);

  if (loading) {
    return <p className="text-center text-gray-500">Chargement...</p>; // 🔥 Show loading while checking auth state
  }

  return user ? children : <Navigate to="/Seconnecter" />;
}

export default ProtectedRoute;
