import React from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaBox, FaClipboardList, FaMapMarkedAlt, FaHome } from "react-icons/fa";

const AdminSidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4 fixed">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/AdminDashboard" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
            <FaHome /> <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/utilisateurs" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
            <FaUsers /> <span>Gestion Utilisateurs</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/fournisseurs" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
            <FaBox /> <span>Gestion Fournisseurs</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/reservations" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
            <FaClipboardList /> <span>Gestion Réservations</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/circuits" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
            <FaMapMarkedAlt /> <span>Gestion Circuits</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
