import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link to="/" className="footer-link">Accueil</Link>
          <Link to="/Randonée" className="footer-link">Randonée</Link>
          <Link to="/Reservation" className="footer-link">Reservation</Link>
          <Link to="/Artisan" className="footer-link">Artisan</Link>
          <Link to="/Contact" className="footer-link">Contact</Link>
        </div>
        
        <div className="copyright">
          © 2025 Eco-Tourism TN. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;