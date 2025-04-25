import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaLeaf, FaUser, FaPlusCircle, FaChartLine, FaHiking, FaCalendarAlt, FaHandsHelping, FaEnvelope, FaCog } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsAuthenticated(!!user);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [user]);

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark fixed-top ${isScrolled ? 'bg-dark shadow-lg' : 'bg-transparent'} py-3`}
         style={{ transition: 'all 0.3s ease' }}>
      <div className="container">
        {/* Brand Logo with Animation */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <FaLeaf className="me-2 fs-4 text-success animate-pulse" style={{ animation: 'pulse 2s infinite' }} />
          <span className="fw-bold">EcoTourisme</span>
        </Link>

        {/* Toggler Button */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Items */}
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Main Links with Icons */}
            <li className="nav-item mx-1">
              <NavLink to="/" className="nav-link" end>
                <span className="d-flex align-items-center">
                  <FaUser className="me-1" /> Accueil
                </span>
              </NavLink>
            </li>
            <li className="nav-item mx-1">
              <NavLink to="/Randonée" className="nav-link">
                <span className="d-flex align-items-center">
                  <FaHiking className="me-1" /> Randonnée
                </span>
              </NavLink>
            </li>
            <li className="nav-item mx-1">
              <NavLink to="/Reservation" className="nav-link">
                <span className="d-flex align-items-center">
                  <FaCalendarAlt className="me-1" /> Réservation
                </span>
              </NavLink>
            </li>
            <li className="nav-item mx-1">
              <NavLink to="/Artisan" className="nav-link">
                <span className="d-flex align-items-center">
                  <FaHandsHelping className="me-1" /> Artisan
                </span>
              </NavLink>
            </li>
            <li className="nav-item mx-1">
              <NavLink to="/Contact" className="nav-link">
                <span className="d-flex align-items-center">
                  <FaEnvelope className="me-1" /> Contact
                </span>
              </NavLink>
            </li>
            <li className="nav-item mx-1">
              <NavLink to="/ServicesList" className="nav-link">
                <span className="d-flex align-items-center">
                  <FaCog className="me-1" /> Services
                </span>
              </NavLink>
            </li>

            {/* Conditional Management Link */}
            {isAuthenticated && (
              <li className="nav-item mx-1">
                <NavLink to="/gestion" className="nav-link">
                  <span className="d-flex align-items-center">
                    <FaChartLine className="me-1" /> Avis & Reclamation
                  </span>
                </NavLink>
              </li>
            )}

            {/* Role-Specific Links */}
            {isAuthenticated && user.role === "admin" && (
              <li className="nav-item mx-1">
                <NavLink to="/AdminDashboard" className="nav-link">
                  <span className="d-flex align-items-center">
                    <MdDashboard className="me-1" /> Dashboard Admin
                  </span>
                </NavLink>
              </li>
            )}

            {isAuthenticated && user.role === "fournisseur" && (
              <li className="nav-item mx-1">
                <NavLink to="/create-service" className="nav-link">
                  <span className="d-flex align-items-center">
                    <FaPlusCircle className="me-1" /> Mes Services
                  </span>
                </NavLink>
              </li>
            )}
          </ul>

          {/* Authentication Section */}
          <div className="d-flex align-items-center gap-3">
            {!isAuthenticated ? (
              <>
                <Link 
                  to="/Seconnecter" 
                  className={`btn ${location.pathname === '/Seconnecter' ? 'btn-success' : 'btn-outline-light'} rounded-pill px-3 px-md-4`}
                >
                  Connexion
                </Link>
                <Link 
                  to="/inscrire" 
                  className="btn btn-success rounded-pill px-3 px-md-4"
                >
                  Inscription
                </Link>
              </>
            ) : (
              <div className="dropdown">
                <button
                  className="btn btn-outline-light dropdown-toggle d-flex align-items-center rounded-pill"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div className="me-2 d-flex align-items-center">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt="Profile" 
                        className="rounded-circle me-2" 
                        style={{ width: '30px', height: '30px', objectFit: 'cover' }}
                      />
                    ) : (
                      <div className="bg-success rounded-circle d-flex align-items-center justify-content-center" 
                           style={{ width: '30px', height: '30px' }}>
                        <FaUser className="text-white" />
                      </div>
                    )}
                    <span>{user.first_name}</span>
                  </div>
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="userDropdown">
                  <li>
                    <Link to="/profile" className="dropdown-item d-flex align-items-center">
                      <FaUser className="me-2" /> Profil
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings" className="dropdown-item d-flex align-items-center">
                      <FaCog className="me-2" /> Paramètres
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button 
                      className="dropdown-item d-flex align-items-center text-danger" 
                      onClick={logout}
                    >
                      <span>Déconnexion</span>
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