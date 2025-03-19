import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Components/footer.css";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-5">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center flex-wrap">
        <div className="logo text-center text-md-start mb-4 mb-md-0" style={{ fontFamily: "Cursive", fontSize: "2rem" }}>
          <span className="fw-bold">Ecotourism</span> <br /> <span className="text-primary">Tn</span>
        </div>
        <div className="menu text-center text-md-start mt-3 mt-md-0">
        <center> <h5 className="fw-bold mb-3">Ecotourisme TN</h5></center> 
          <ul className="list-unstyled d-flex flex-column flex-md-row justify-content-center justify-content-md-start">
            <li className="nav-item mx-2">
              <Link to="/" className="nav-link text-white">Accueil</Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/Randonée" className="nav-link text-white">Randonée</Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/Reservation" className="nav-link text-white">Reservation</Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/Artisan" className="nav-link text-white">Artisan</Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/Contact" className="nav-link text-white">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="social-icons text-center my-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white mx-3">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white mx-3">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white mx-3">
          <i className="fab fa-twitter"></i>
        </a>
      </div>
      <div className="text-center mt-4">
        <p>&copy; {new Date().getFullYear()} Ecotourism TN. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
