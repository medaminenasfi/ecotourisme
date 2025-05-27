import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaLeaf, FaUser, FaPlusCircle, FaChartLine, FaHiking, FaCalendarAlt, FaHandsHelping, FaEnvelope, FaCog, FaSignOutAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsAuthenticated(!!user);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [user]);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <nav 
      className={`navbar navbar-expand-lg navbar-dark fixed-top ${isScrolled ? 'bg-dark shadow-lg' : 'bg-transparent'} py-3`}
      style={{ 
        transition: 'all 0.3s ease',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        backgroundColor: isScrolled ? 'rgba(33, 37, 41, 0.95)' : 'transparent'
      }}
    >
      <div className="container">
        {/* Brand Logo with Animation */}
        <Link 
          className="navbar-brand d-flex align-items-center" 
          to="/"
          aria-label="Accueil EcoTourisme"
        >
          <FaLeaf 
            className="me-2 fs-4 text-success" 
            style={{ 
              animation: 'pulse 2s infinite',
              filter: 'drop-shadow(0 0 2px rgba(40, 167, 69, 0.5))'
            }} 
          />
          <span className="fw-bold">EcoTourisme</span>
        </Link>

        {/* Toggler Button */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Items */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="mainNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Main Links with Icons */}
            <li className="nav-item mx-1">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `nav-link d-flex align-items-center ${isActive ? 'active' : ''}`
                }
                end
              >
                <FaUser className="me-1" /> Accueil
              </NavLink>
            </li>
            <li className="nav-item mx-1">
              <NavLink 
                to="/Randonée" 
                className={({ isActive }) => 
                  `nav-link d-flex align-items-center ${isActive ? 'active' : ''}`
                }
              >
                <FaHiking className="me-1" /> Randonnée
              </NavLink>
            </li>

            {!(isAuthenticated && user.role === 'admin') && (
              <li className="nav-item mx-1">
                <NavLink 
                  to="/Reservation" 
                  className={({ isActive }) => 
                    `nav-link d-flex align-items-center ${isActive ? 'active' : ''}`
                  }
                >
                  <FaCalendarAlt className="me-1" /> Réservation
                </NavLink>
              </li>
            )}

            <li className="nav-item mx-1">
              <NavLink 
                to="/Artisan" 
                className={({ isActive }) => 
                  `nav-link d-flex align-items-center ${isActive ? 'active' : ''}`
                }
              >
                <FaHandsHelping className="me-1" /> Artisan
              </NavLink>
            </li>
            <li className="nav-item mx-1">
              <NavLink 
                to="/Contact" 
                className={({ isActive }) => 
                  `nav-link d-flex align-items-center ${isActive ? 'active' : ''}`
                }
              >
                <FaEnvelope className="me-1" /> Contact
              </NavLink>
            </li>
            <li className="nav-item mx-1">
              <NavLink 
                to="/ServicesList" 
                className={({ isActive }) => 
                  `nav-link d-flex align-items-center ${isActive ? 'active' : ''}`
                }
              >
                <FaCog className="me-1" /> Services
              </NavLink>
            </li>

            {/* Conditional Management Link */}
            {isAuthenticated && (
              <li className="nav-item mx-1">
                <NavLink 
                  to="/gestion" 
                  className={({ isActive }) => 
                    `nav-link d-flex align-items-center ${isActive ? 'active' : ''}`
                  }
                >
                  <FaChartLine className="me-1" /> Avis & Réclamation
                </NavLink>
              </li>
            )}

            {/* Role-Specific Links */}
            {isAuthenticated && user.role === "admin" && (
              <li className="nav-item mx-1">
                <NavLink 
                  to="/AdminDashboard" 
                  className={({ isActive }) => 
                    `nav-link d-flex align-items-center ${isActive ? 'active' : ''}`
                  }
                >
                  <MdDashboard className="me-1" /> Tableau de bord 
                </NavLink>
              </li>
            )}

            {isAuthenticated && user.role === "fournisseur" && (
              <li className="nav-item mx-1">
                <NavLink 
                  to="/create-service" 
                  className={({ isActive }) => 
                    `nav-link d-flex align-items-center ${isActive ? 'active' : ''}`
                  }
                >
                  <FaPlusCircle className="me-1" /> Mes Services
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
                  className={`btn ${location.pathname === '/Seconnecter' ? 'btn-success' : 'btn-outline-light'} rounded-pill px-3 px-md-4 hover-scale`}
                  style={{ transition: 'transform 0.2s ease' }}
                >
                  Connexion
                </Link>
                <Link 
                  to="/inscrire" 
                  className="btn btn-success rounded-pill px-3 px-md-4 hover-scale"
                  style={{ transition: 'transform 0.2s ease' }}
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
                  style={{ transition: 'all 0.2s ease' }}
                >
                  <div className="me-2 d-flex align-items-center">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={`${user.first_name}'s profile`}
                        className="rounded-circle me-2" 
                        style={{ 
                          width: '30px', 
                          height: '30px', 
                          objectFit: 'cover',
                          border: '2px solid rgba(255,255,255,0.2)'
                        }}
                      />
                    ) : (
                      <div 
                        className="bg-success rounded-circle d-flex align-items-center justify-content-center" 
                        style={{ 
                          width: '30px', 
                          height: '30px',
                          border: '2px solid rgba(255,255,255,0.2)'
                        }}
                      >
                        <FaUser className="text-white" />
                      </div>
                    )}
                    <span className="d-none d-md-inline">{user.first_name}</span>
                  </div>
                </button>
                <ul 
                  className="dropdown-menu dropdown-menu-end shadow-lg" 
                  aria-labelledby="userDropdown"
                  style={{
                    borderRadius: '1rem',
                    border: 'none',
                    padding: '0.5rem'
                  }}
                >
                  <li>
                    <Link 
                      to="/profile" 
                      className="dropdown-item d-flex align-items-center py-2 px-3 rounded"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FaUser className="me-2" /> Profil
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button 
                      className="dropdown-item d-flex align-items-center text-danger py-2 px-3 rounded" 
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt className="me-2" /> Déconnexion
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .hover-scale:hover {
          transform: scale(1.05);
        }
        .nav-link {
          position: relative;
          transition: all 0.3s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: #28a745;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }
        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }
        .dropdown-item {
          transition: all 0.2s ease;
        }
        .dropdown-item:hover {
          background-color: rgba(40, 167, 69, 0.1);
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;