import React from "react";
import { NavLink } from "react-router-dom";
import { FaUsers, FaBox, FaClipboardList, FaMapMarkedAlt } from "react-icons/fa";
import Navbar from "../Components/navbar"; // Import Navbar component

const AdminSidebar = () => {
  return (
    <div className="container-fluid">
      <div className="row vh-100">
        {/* Sidebar */}
        <div className="col-md-3 p-0 bg-white shadow-sm">
          <div className="text-center py-4">
            <Navbar /> {/* Include Navbar inside sidebar */}
          </div>

          {/* Sidebar Title */}
<br/><br/>         <div className="text-center mb-4">
            <h2 className="text-primary">Admin Dashboard</h2>
            <p className="text-muted">Bienvenue, Admin ! Gérez tous les utilisateurs, fournisseurs, réservations et circuits ici.</p>
          </div>

          {/* Sidebar Links */}
          <ul className="list-unstyled px-3">
            <li className="mb-3">
              <NavLink
                to="/admin/utilisateurs"
                className="d-flex align-items-center p-3 bg-light text-dark rounded-lg transition-all"
                activeClassName="active"
              >
                <FaUsers size={24} className="mr-3" />
                <span>Gestion Utilisateurs</span>
              </NavLink>
            </li>

            <li className="mb-3">
              <NavLink
                to="/admin/circuits"
                className="d-flex align-items-center p-3 bg-light text-dark rounded-lg transition-all"
                activeClassName="active"
              >
                <FaMapMarkedAlt size={24} className="mr-3" />
                <span>Gestion Circuits</span>
              </NavLink>
            </li>
            
            <li className="mb-3">
              <NavLink
                to="/admin/reservations"
                className="d-flex align-items-center p-3 bg-light text-dark rounded-lg transition-all"
                activeClassName="active"
              >
                <FaClipboardList size={24} className="mr-3" />
                <span>Gestion Réservations</span>
              </NavLink>
            </li>
            <li className="mb-3">
              <NavLink
                to="/admin/fournisseurs"
                className="d-flex align-items-center p-3 bg-light text-dark rounded-lg transition-all"
                activeClassName="active"
              >
                <FaBox size={24} className="mr-3" />
                <span>Gestion Fournisseurs</span>
              </NavLink>
            </li>
          </ul>
        </div>

        
      </div>
    </div>
  );
};

export default AdminSidebar;
