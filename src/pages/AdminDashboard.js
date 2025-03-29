import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaUsers, FaBox, FaClipboardList, FaMapMarkedAlt } from "react-icons/fa";
import Navbar from "../Components/navbar";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard bg-light min-vh-100">
      <Navbar />
      <br/><br/><br/>
      <div className="container-fluid px-4 pt-5">
        <div className="d-flex flex-column gap-3 mb-5">
          {/* Header Section */}
          <div className="text-center mb-4">
            <h1 className="display-5 fw-bold text-dark mb-3">
              <span className="text-primary">Tableau de Bord</span> Administrateur
            </h1>
            <p className="text-muted fs-5">
              Gérez l'ensemble des activités de votre plateforme
            </p>
          </div>

          {/* Navigation Cards */}
          <div className="row g-4 mb-4">
            <div className="col-12 col-md-6 col-xl-3">
              <NavLink
                to="/admin/utilisateurs"
                className={({ isActive }) => 
                  `card card-hover h-100 text-decoration-none ${
                    isActive ? "border-primary bg-primary text-white" : "border"
                  }`
                }
              >
                <div className="card-body d-flex align-items-center">
                  <FaUsers className="fs-2 me-3" />
                  <div>
                    <h5 className="mb-0">Utilisateurs</h5>
                    <small className="opacity-75">Gestion des comptes</small>
                  </div>
                </div>
              </NavLink>
            </div>

            <div className="col-12 col-md-6 col-xl-3">
              <NavLink
                to="/admin/circuits"
                className={({ isActive }) => 
                  `card card-hover h-100 text-decoration-none ${
                    isActive ? "border-primary bg-primary text-white" : "border"
                  }`
                }
              >
                <div className="card-body d-flex align-items-center">
                  <FaMapMarkedAlt className="fs-2 me-3" />
                  <div>
                    <h5 className="mb-0">Circuits</h5>
                    <small className="opacity-75">Gestion des parcours</small>
                  </div>
                </div>
              </NavLink>
            </div>

            <div className="col-12 col-md-6 col-xl-3">
              <NavLink
                to="/admin/reservations"
                className={({ isActive }) => 
                  `card card-hover h-100 text-decoration-none ${
                    isActive ? "border-primary bg-primary text-white" : "border"
                  }`
                }
              >
                <div className="card-body d-flex align-items-center">
                  <FaClipboardList className="fs-2 me-3" />
                  <div>
                    <h5 className="mb-0">Réservations</h5>
                    <small className="opacity-75">Suivi des bookings</small>
                  </div>
                </div>
              </NavLink>
            </div>

            <div className="col-12 col-md-6 col-xl-3">
              <NavLink
                to="/admin/fournisseurs"
                className={({ isActive }) => 
                  `card card-hover h-100 text-decoration-none ${
                    isActive ? "border-primary bg-primary text-white" : "border"
                  }`
                }
              >
                <div className="card-body d-flex align-items-center">
                  <FaBox className="fs-2 me-3" />
                  <div>
                    <h5 className="mb-0">Fournisseurs</h5>
                    <small className="opacity-75">Partenaires services</small>
                  </div>
                </div>
              </NavLink>
            </div>
          </div>

          {/* Content Section */}
          
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;