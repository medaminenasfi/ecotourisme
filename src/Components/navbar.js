import React from "react";
import { Link } from "react-router-dom"; // For navigation
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="main-container">
      <nav>
        <ul className="frame-1">
          <li className="frame-2">
            <Link to="/" className="accueil">
              Accueil
            </Link>
          </li>
          <li className="frame-3">
            <Link to="/Randonée" className="randonee">
              Randonée
            </Link>
          </li>
          <li className="frame-4">
            <Link to="/Reservation" className="reservation">
              Reservation
            </Link>
          </li>
          <li className="frame-5">
            <Link to="/Artisan" className="artisan">
              Artisan
            </Link>
          </li>
          <li className="frame-6">
            <Link to="/Contact" className="contact">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      <div className="header-section">
      <div className="cta-container">
  <Link to="/signin" className="cta">
    <span>Se Connecter</span>
  </Link>
</div>
        <Link to="/signin" className="sign-in">
          S'inscrire
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
