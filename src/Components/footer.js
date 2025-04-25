import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Components/footer.css";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white pt-5">
      <div className="container">
        <div className="row g-4">
          {/* Section Logo */}
          <div className="col-12 col-md-4 text-center text-md-start">
            <div className="logo mb-4">
              <h2 className="fw-bold mb-0">
                <span className="text-success">Eco</span>Tourisme
              </h2>
              <p className="text-muted mt-2">Découvrez la Tunisie Autrement</p>
            </div>
            <div className="social-icons d-flex gap-3 justify-content-center justify-content-md-start">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaFacebookF className="fs-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaInstagram className="fs-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaTwitter className="fs-5" />
              </a>
            </div>
          </div>

          {/* Section Liens */}
          <div className="col-12 col-md-4 text-center text-md-start">
            <h5 className="fw-bold mb-3 text-success">Navigation</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="footer-link">Accueil</Link>
              </li>
              <li className="mb-2">
                <Link to="/Randonée" className="footer-link">Randonnées</Link>
              </li>
              <li className="mb-2">
                <Link to="/Reservation" className="footer-link">Réservations</Link>
              </li>
              <li className="mb-2">
                <Link to="/Artisan" className="footer-link">Artisans</Link>
              </li>
              <li>
                <Link to="/Contact" className="footer-link">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Section Contact */}
          <div className="col-12 col-md-4 text-center text-md-start">
            <h5 className="fw-bold mb-3 text-success">Contact</h5>
            <ul className="list-unstyled">
              <li className="mb-2 d-flex align-items-center justify-content-center justify-content-md-start">
                <FaMapMarkerAlt className="me-2 text-success" />
                Gabes, Tunisia
              </li>
              <li className="mb-2 d-flex align-items-center justify-content-center justify-content-md-start">
                <FaPhone className="me-2 text-success" />
                +216 22 000 000
              </li>
              <li className="d-flex align-items-center justify-content-center justify-content-md-start">
                <FaEnvelope className="me-2 text-success" />
                tnecotourisme@gmail.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-top border-success mt-5 pt-3">
          <center>
          <p className="mb-0 ">
            &copy; {new Date().getFullYear()} EcoTourisme TN - Tous droits réservés
          </p></center>
        </div>
      </div>
    </footer>
  );
};

export default Footer;