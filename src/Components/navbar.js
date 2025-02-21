import React from "react";
import { Link } from "react-router-dom"; // For navigation

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Circuit</Link>
        </li>
        <li>
          <Link to="/about">Artisan</Link>
        </li>
        <li>
          <Link to="/new-page">Circuits</Link>
        </li>
        <li>
          <Link to="/new-page">Reservation</Link>
        </li>
        <li>
          <Link to="/new-page">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
