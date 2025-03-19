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
                  &lt; Back to login
                </a>
                <h2 className="forgot-password-title">Forgot your password?</h2>
              </div>
              <p className="password-recovery-message">
                Don’t worry, it happens to all of us. Enter your email below
                to recover your password.
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
                  CONTINUE
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
