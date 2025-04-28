import React from "react";
import Navbar from "../Components/navbar";
import "../pages/forgot.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Components/footer";
import backgroundImage from "../assest/Accueil.jpg";

const Accueil = () => {
  console.log("Rendering Accueil page");
  return (
    <>
      <Navbar />
      <main>
        <section
          className="d-flex align-items-center justify-content-center text-white"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "100vh",
            width: "100%",
          }}
        >
          <div className="main-container">
            <div className="main-div">
              <div className="header">
                <a href="/Seconnecter" className="back-to-login">
                  &lt; Retour à la connexion
                </a>
                <h2 className="forgot-password-title">Mot de passe oublié?</h2>
              </div>
              <p className="password-recovery-message">
              Ne vous inquiétez pas, cela nous arrive à tous. Saisissez votre adresse e-mail ci-dessous pour récupérer votre mot de passe.
              </p>
              <form className="password-recovery-form">
                <label className="email-label">Email</label>
                <input
                  type="email"
                  className="email-input"
                  placeholder="johnsondoe@nomail.com"
                  required
                />
                <button type="submit" className="btn-continue">
                CONTINUER
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Accueil;
