import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Adjust the import path if needed
import { Navigate } from "react-router-dom";

// The AuthRedirectRoute component handles redirecting based on the user authentication state
function AuthRedirectRoute({ children }) {
  const { user, loading } = useContext(AuthContext); // Access user and loading state from AuthContext

  // If the authentication data is still loading, display a loading message
  if (loading) {
    return <p className="text-center text-gray-500">Chargement...</p>; // Change the message if needed
  }

  // If the user is authenticated, redirect them to the homepage
  return user ? <Navigate to="/" /> : children; // Redirect to homepage if logged in
}

export default AuthRedirectRoute;
