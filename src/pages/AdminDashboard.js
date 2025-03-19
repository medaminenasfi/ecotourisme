import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/profile");
    }
  }, [user, navigate]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="admin-dashboard p-6">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      <p>Bienvenue, Admin! Gérez les utilisateurs et les paramètres ici.</p>
    </div>
  );
};

export default AdminDashboard;
