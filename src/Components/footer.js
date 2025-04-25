  import React from "react";
  import { Link } from "react-router-dom";
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
              <div className="social-icons">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                  <i className="fab fa-facebook fa-lg"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                  <i className="fab fa-instagram fa-lg"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white">
                  <i className="fab fa-twitter fa-lg"></i>
                </a>
              </div>
            </div>

            {/* Section Liens */}
            <div className="col-12 col-md-4 text-center text-md-start">
              <h5 className="fw-bold mb-3">Navigation</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link to="/" className="text-white text-decoration-none hover-primary">Accueil</Link>
                </li>
                <li className="mb-2">
                  <Link to="/Randonée" className="text-white text-decoration-none hover-primary">Randonées</Link>
                </li>
                <li className="mb-2">
                  <Link to="/Reservation" className="text-white text-decoration-none hover-primary">Réservations</Link>
                </li>
                <li className="mb-2">
                  <Link to="/Artisan" className="text-white text-decoration-none hover-primary">Artisans</Link>
                </li>
                <li>
                  <Link to="/Contact" className="text-white text-decoration-none hover-primary">Contact</Link>
                </li>
              </ul>
            </div>

            {/* Section Contact */}
            <div className="col-12 col-md-4 text-center text-md-start">
              <h5 className="fw-bold mb-3">Contact</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <i className="fas fa-map-marker-alt me-2"></i>
                  Gabes, Tunisia
                </li>
                <li className="mb-2">
                  <i className="fas fa-phone me-2"></i>
                  +216 22 000 000
                </li>
                <li>
                  <i className="fas fa-envelope me-2"></i>
                  tnecotourisme@gmail.com
                  </li>
              </ul>
            </div>
          </div>

          <div className="border-top border-secondary mt-5 pt-3">
            <center>
            <p className="mb-0">
              &copy; {new Date().getFullYear()} EcoTourisme TN - Tous droits réservés
            </p></center>
          </div>
        </div>
      </footer>
    );
  };

  export default Footer;