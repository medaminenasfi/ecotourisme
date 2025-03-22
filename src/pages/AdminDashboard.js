import React from "react";
import { NavLink } from "react-router-dom";
import { FaUsers, FaBox, FaClipboardList, FaMapMarkedAlt } from "react-icons/fa";
import Navbar from "../Components/navbar";

const AdminSidebar = () => {
  return (
    <div className="container-fluid p-0">
      <Navbar /> {/* Keep Navbar at the top */}
      <br/><br/><br/>
      <div className="row g-0 vh-100">
        {/* Sidebar Column */}
        <div className="col-md-3 bg-white shadow-sm" style={{minHeight: 'calc(100vh - 80px)'}}>
          <div className="p-4">
            {/* Sidebar Header */}
            <div className="text-center mb-5">
              <h2 className="text-primary fw-bold mb-3">Admin Dashboard</h2>
              <p className="text-muted small">
                Bienvenue, Admin !<br />
                Gérez tous les utilisateurs, fournisseurs,<br />
                réservations et circuits ici.
              </p>
            </div>

            {/* Navigation Links */}
            <nav className="d-flex flex-column gap-2">
              <NavLink
                to="/admin/utilisateurs"
                className={({ isActive }) => 
                  `text-decoration-none p-3 rounded-3 d-flex align-items-center ${
                    isActive 
                      ? 'bg-primary text-white' 
                      : 'bg-light text-dark hover-bg-primary-10'
                  }`
                }
              >
                <FaUsers className="me-3 fs-5" />
                <span className="fw-medium">Gestion Utilisateurs</span>
              </NavLink>

              <NavLink
                to="/admin/circuits"
                className={({ isActive }) => 
                  `text-decoration-none p-3 rounded-3 d-flex align-items-center ${
                    isActive 
                      ? 'bg-primary text-white' 
                      : 'bg-light text-dark hover-bg-primary-10'
                  }`
                }
              >
                <FaMapMarkedAlt className="me-3 fs-5" />
                <span className="fw-medium">Gestion Circuits</span>
              </NavLink>

              <NavLink
                to="/admin/reservations"
                className={({ isActive }) => 
                  `text-decoration-none p-3 rounded-3 d-flex align-items-center ${
                    isActive 
                      ? 'bg-primary text-white' 
                      : 'bg-light text-dark hover-bg-primary-10'
                  }`
                }
              >
                <FaClipboardList className="me-3 fs-5" />
                <span className="fw-medium">Gestion Réservations</span>
              </NavLink>

              <NavLink
                to="/admin/fournisseurs"
                className={({ isActive }) => 
                  `text-decoration-none p-3 rounded-3 d-flex align-items-center ${
                    isActive 
                      ? 'bg-primary text-white' 
                      : 'bg-light text-dark hover-bg-primary-10'
                  }`
                }
              >
                <FaBox className="me-3 fs-5" />
                <span className="fw-medium">Gestion Fournisseurs</span>
              </NavLink>
            </nav>
          </div>
        </div>

        {/* Main Content Column */}
        <div className="col-md-9 bg-light p-4">
          {/* Your main content will be injected here */}
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;