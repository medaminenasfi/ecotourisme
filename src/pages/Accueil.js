import React from "react";
import Navbar from "../Components/navbar";
import "./accueil.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Accueil = () => {
  console.log("Rendering Accueil page");
  return (
    <>
      <Navbar />
      <h1>Welcome to Accueil</h1>
    </>
  );
};

export default Accueil;
