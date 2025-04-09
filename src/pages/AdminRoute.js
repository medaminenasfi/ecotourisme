import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function AdminRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (user === undefined) {
    return <p className="text-center text-gray-500">Chargement...</p>; 
  }

  return user && user.role === "admin" ? children : <Navigate to="/" />;
}

export default AdminRoute;
