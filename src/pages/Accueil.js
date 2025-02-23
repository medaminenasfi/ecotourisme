import React from "react";
import Navbar from "../Components/navbar";
import "./accueil.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Components/footer";
const Accueil = () => {
  console.log("Rendering Accueil page");
  return (
    <>
      <Navbar />
      <main>
      <h1>Welcome to Accueil</h1>


      </main>
      <Footer/>
    </>
  );
};

export default Accueil;
