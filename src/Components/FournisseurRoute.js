import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const FournisseurRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user || user.role !== 'fournisseur') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default FournisseurRoute;