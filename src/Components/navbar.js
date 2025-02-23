import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css"; // Custom styles

const Navbar = () => {
  return (
    <nav className="custom-navbar navbar navbar-expand-lg">
      <div className="container">
        {/* Navbar Toggler */}
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

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">Accueil</Link>
            </li>
            <li className="nav-item">
              <Link to="/Randonée" className="nav-link">Randonée</Link>
            </li>
            <li className="nav-item">
              <Link to="/Reservation" className="nav-link">Réservation</Link>
            </li>
            <li className="nav-item">
              <Link to="/Artisan" className="nav-link">Artisan</Link>
            </li>
            <li className="nav-item">
              <Link to="/Contact" className="nav-link">Contact</Link>
            </li>
          </ul>

          {/* Authentication Buttons */}
          <div className="auth-buttons">
            <Link className="btn btn-outline-light me-2" to="/Seconnecter">
              Se Connecter
            </Link>
            <Link className="btn btn-outline-light" to="/inscrire">
              S'inscrire
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
