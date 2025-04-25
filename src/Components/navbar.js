import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaLeaf, FaUser, FaPlusCircle, FaChartLine } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3">
      <div className="container">
        {/* Brand Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <FaLeaf className="me-2 fs-4 text-success" />
          <span className="font-weight-bold">EcoTourisme</span>
        </Link>

        {/* Mobile Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Items */}
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) => 
                  `nav-link ${isActive ? "active text-success" : ""}`
                }
                end
              >
                Accueil
              </NavLink>
            </li>
            
            <li className="nav-item">
              <NavLink
                to="/Randonée"
                className={({ isActive }) => 
                  `nav-link ${isActive ? "active text-success" : ""}`
                }
              >
                Randonnée
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/Reservation"
                className={({ isActive }) => 
                  `nav-link ${isActive ? "active text-success" : ""}`
                }
              >
                Réservation
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/Artisan"
                className={({ isActive }) => 
                  `nav-link ${isActive ? "active text-success" : ""}`
                }
              >
                Artisan
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/Contact"
                className={({ isActive }) => 
                  `nav-link ${isActive ? "active text-success" : ""}`
                }
              >
                Contact
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/ServicesList"
                className={({ isActive }) => 
                  `nav-link ${isActive ? "active text-success" : ""}`
                }
              >
                Services
              </NavLink>
            </li>

            {/* Conditional Admin/Fournisseur Links */}
            {isAuthenticated && (
              <li className="nav-item">
                <NavLink
                  to="/gestion"
                  className={({ isActive }) => 
                    `nav-link ${isActive ? "active text-success" : ""}`
                  }
                >
                  <FaChartLine className="me-1" />
                  Avis & Réclamation
                </NavLink>
              </li>
            )}

            {isAuthenticated && user.role === "admin" && (
              <li className="nav-item">
                <NavLink
                  to="/AdminDashboard"
                  className={({ isActive }) => 
                    `nav-link ${isActive ? "active text-success" : ""}`
                  }
                >
                  Dashboard Admin
                </NavLink>
              </li>
            )}

            {isAuthenticated && user.role === "fournisseur" && (
              <li className="nav-item">
                <NavLink
                  to="/create-service"
                  className={({ isActive }) => 
                    `nav-link ${isActive ? "active text-success" : ""}`
                  }
                >
                  <FaPlusCircle className="me-1" />
                  Mes Services
                </NavLink>
              </li>
            )}
          </ul>

          {/* Auth Section */}
          <div className="d-flex align-items-center gap-3">
            {!isAuthenticated ? (
              <>
                <Link to="/Seconnecter" className="btn btn-outline-light rounded-pill px-4">
                  Connexion
                </Link>
                <Link to="/inscrire" className="btn btn-success rounded-pill px-4">
                  Inscription
                </Link>
              </>
            ) : (
              <div className="dropdown">
                <button
                  className="btn btn-outline-light d-flex align-items-center gap-2 rounded-pill"
                  type="button"
                  id="userMenu"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FaUser />
                  <span>{user.first_name}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
                  <li>
                    <Link to="/profile" className="dropdown-item">
                      Profil
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button 
                      className="dropdown-item text-danger" 
                      onClick={logout}
                    >
                      Déconnexion
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Inline Styles */}
      <style>
        {`
          .nav-link {
            transition: all 0.2s ease;
            position: relative;
            border-bottom: 2px solid transparent;
          }
          .nav-link:hover {
            transform: translateY(-2px);
            color: #20c997 !important;
          }
          .nav-link.active {
            border-bottom-color: #20c997;
          }
          .dropdown-item:active {
            background-color: #20c997;
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;