import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaCommentDots, FaExclamationCircle } from "react-icons/fa";
import { Card } from "react-bootstrap";
import Navbar from "../Components/navbar";
import backgroundImage from "../assest/Accueil.jpg";

const Gestion = () => {
  return (
    <div style={{
      background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      paddingTop: '80px'
    }}>
      <Navbar />
      
      <div className="container py-5" style={{ maxWidth: '1200px' }}>
        <Card className="shadow" style={{
          background: 'rgba(0, 0, 0, 0.7)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '15px'
        }}>
          <Card.Header style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h1 className="text-white mb-0">Avis & Réclamations</h1>
          </Card.Header>

          <Card.Body>
            <div className="d-flex gap-3 mb-4">
              <NavLink
                to="avis"
                className={({ isActive }) => 
                  `btn btn-lg d-flex align-items-center rounded-pill ${
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
                  `btn btn-lg d-flex align-items-center rounded-pill ${
                    isActive ? "btn-danger" : "btn-outline-danger"
                  }`
                }
              >
                <FaExclamationCircle className="me-2" />
                Réclamations
              </NavLink>
            </div>

            <div className="p-4 rounded" style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <Outlet />
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Gestion;