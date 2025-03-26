import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]); // 🔥 Update when user changes

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          EcoTourisme
        </Link>

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

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item"><Link to="/" className="nav-link">Accueil</Link></li>
            <li className="nav-item"><Link to="/Randonée" className="nav-link">Randonée</Link></li>
            <li className="nav-item"><Link to="/Reservation" className="nav-link">Réservation</Link></li>
            <li className="nav-item"><Link to="/Artisan" className="nav-link">Artisan</Link></li>
            <li className="nav-item"><Link to="/Contact" className="nav-link">Contact</Link></li>

            {isAuthenticated && user.role === "admin" && (
              <li className="nav-item"><Link to="/AdminDashboard" className="nav-link">Admin Dashboard</Link></li>
            )}
          </ul>

          <div className="d-flex align-items-center">
            {!isAuthenticated ? (
              <>
                <Link className="btn btn-outline-light me-2" to="/Seconnecter">Se Connecter</Link>
                <Link className="btn btn-primary" to="/inscrire">S'inscrire</Link>
              </>
            ) : (
              <>
                <Link className="btn btn-outline-light me-2" to="/profile">Profile</Link>
                <button className="btn btn-danger" onClick={logout}>Logout</button>
              </>
            )}
          </div>
        </div>
      </div>


      {isAuthenticated && user.role === "fournisseur" && (
  <li className="nav-item">
    <Link to="/creer-service" className="nav-link">
      Créer un Service
    </Link>
  </li>
)}
    </nav>
  );
};

export default Navbar;
