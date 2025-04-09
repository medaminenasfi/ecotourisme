import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; 
import { Navigate } from "react-router-dom";

function AuthRedirectRoute({ children }) {
  const { user, loading } = useContext(AuthContext); 

  if (loading) {
    return <p className="text-center text-gray-500">Chargement...</p>; 
  }

  return user ? <Navigate to="/" /> : children; 
}

export default AuthRedirectRoute;
