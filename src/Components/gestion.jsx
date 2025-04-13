import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaCommentDots, FaExclamationCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Gestion.css";
import Navbar from "../Components/navbar";


const Gestion = () => {
  return (
    <div className="gestion-container">
            <Navbar />
<br/><br/><br/><br/>
      <div className="container">
        <h1 className="mb-4 display-4 fw-bold text-primary">Avis & Reclamations</h1>
        
        <div className="d-flex gap-3 mb-4">
          <NavLink
            to="avis"
            className={({ isActive }) => 
              `btn btn-lg d-flex align-items-center ${
                isActive ? "btn-primary" : "btn-outline-primary"
              }`
            }
          >
            <FaCommentDots className="me-2" />
            Avis Clients
          </NavLink>
          
          <NavLink
            to="reclamations"
            className={({ isActive }) => 
              `btn btn-lg d-flex align-items-center ${
                isActive ? "btn-danger" : "btn-outline-danger"
              }`
            }
          >
            <FaExclamationCircle className="me-2" />
            Réclamations
          </NavLink>
        </div>

        <div className="dashboard-card p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Gestion;