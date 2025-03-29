import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaLeaf, FaUser, FaPlusCircle, FaChartLine,FaCommentDots,FaExclamationTriangle } from "react-icons/fa";

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
          EcoTourisme
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-expanded="false"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Items */}
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Liens principaux */}
            <li className="nav-item">
              <NavLink to="/" className="nav-link" end>Accueil</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/Randonée" className="nav-link">Randonnée</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/Reservation" className="nav-link">Réservation</NavLink>
            </li>
            <li className="nav-item"><Link to="/Artisan" className="nav-link">Artisan</Link></li>
            <li className="nav-item"><Link to="/Contact" className="nav-link">Contact</Link></li>
            <li className="nav-item">
              <NavLink to="/ServicesList" className="nav-link">Services</NavLink>
            </li>

            {/* Lien Gestion conditionnel */}
            {isAuthenticated && (
              <li className="nav-item">
                <NavLink to="/gestion" className="nav-link">
                  <FaChartLine className="me-1" />
                  Gestion
                </NavLink>
              </li>
            )}

            {/* Liens spécifiques aux rôles */}
            {isAuthenticated && user.role === "admin" && (
              <li className="nav-item">
                <NavLink to="/AdminDashboard" className="nav-link">
                  Dashboard Admin
                </NavLink>
              </li>
            )}

            {isAuthenticated && user.role === "fournisseur" && (
              <li className="nav-item">
                <NavLink to="/create-service" className="nav-link">
                  <FaPlusCircle className="me-1" />
                  Mes Services
                </NavLink>
              </li>
            )}
          </ul>

          {/* Section authentification */}
          <div className="d-flex align-items-center gap-2">
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
                  className="btn btn-outline-light dropdown-toggle d-flex align-items-center"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  <FaUser className="me-2" />
                  {user.first_name}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link to="/profile" className="dropdown-item">
                      Profil
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={logout}>
                      Déconnexion
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;