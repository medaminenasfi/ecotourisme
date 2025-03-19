import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  console.log("ProtectedRoute: User state is", user);

  // If user is undefined, we can either render a loading spinner or nothing
  if (user === undefined) {
    return null; // or <LoadingSpinner />
  }

  if (!user) {
    // If the user is not authenticated, redirect them to the login page
    return <Navigate to="/Seconnecter" />;
  }

  // If the user is authenticated, return the children (protected content)
  return children;
}

export default ProtectedRoute;
