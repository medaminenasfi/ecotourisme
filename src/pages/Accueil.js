  import React from "react";
  import Navbar from "../Components/navbar";
  import "./accueil.css";
  import Footer from "../Components/footer";


  const Accueil = () => {
    return (
      <div className="page-container">
        <div className="hero-section">
          <Navbar />
        </div>
<Footer/>
      </div>
      

    );
  };

  export default Accueil;