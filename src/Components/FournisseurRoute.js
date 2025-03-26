import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const FournisseurRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // Check if user exists and has fournisseur role
  if (!user || user.role !== 'fournisseur') {
    // Redirect to home if not authorized
    return <Navigate to="/" replace />;
  }

  // Return protected content if authorized
  return children;
};

export default FournisseurRoute;