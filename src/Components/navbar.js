import React from "react";
import { Link } from "react-router-dom"; // For navigation

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li>
          <Link to="/Randonée">Randonée</Link>
        </li>
        <li>
          <Link to="/Artisan">Artisan</Link>
        </li>
        
        <li>
          <Link to="/Reservation">Reservation</Link>
        </li>
        <li>
          <Link to="/Contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
