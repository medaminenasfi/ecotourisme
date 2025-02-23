import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Components/footer.css";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-4">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center flex-wrap">
        <div className="logo text-center text-md-start" style={{ fontFamily: "cursive", fontSize: "1.5rem" }}>
          <span>Ecotourism</span> <br /> <span>Tn</span>
        </div>
        <div className="menu text-center text-md-start mt-3 mt-md-0">
          <h5>Ecotourisme TN</h5>
          <ul className="list-unstyled">
            <li className="nav-item"><Link to="/" className="nav-link text-white">Accueil</Link></li>
            <li className="nav-item"><Link to="/Randonée" className="nav-link text-white">Randonée</Link></li>
            <li className="nav-item"><Link to="/Reservation" className="nav-link text-white">Reservation</Link></li>
            <li className="nav-item"><Link to="/Artisan" className="nav-link text-white">Artisan</Link></li>
            <li className="nav-item"><Link to="/Contact" className="nav-link text-white">Contact</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
