import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // Access user info and logout function

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {/* Brand / Logo */}
        <Link className="navbar-brand" to="/">
          EcoTourisme
        </Link>

        {/* Navbar Toggler for Mobile View */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Items */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Accueil
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Randonée" className="nav-link">
                Randonée
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Reservation" className="nav-link">
                Réservation
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Artisan" className="nav-link">
                Artisan
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Contact" className="nav-link">
                Contact
              </Link>
            </li>

            {/* Admin Dashboard Link (only visible for admin users) */}
            {user && user.role === "admin" && (
              <li className="nav-item">
                <Link to="/AdminDashboard" className="nav-link">
                  Admin Dashboard
                </Link>
              </li>
            )}
          </ul>

          {/* Authentication Buttons (Right Side) */}
          <div className="d-flex align-items-center">
            {!user ? (
              <>
                <Link className="btn btn-outline-light me-2" to="/Seconnecter">
                  Se Connecter
                </Link>
                <Link className="btn btn-primary" to="/inscrire">
                  S'inscrire
                </Link>
              </>
            ) : (
              <>
                <Link className="btn btn-outline-light me-2" to="/profile">
                  Profile
                </Link>
                <button className="btn btn-danger" onClick={logout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
