import React from "react";
import Navbar from "../Components/navbar";
import "../pages/forgot.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Components/footer";
import backgroundImage from "../assest/Accueil.jpg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";





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
          <a href="/Seconnecter" className="back-to-login"> &lt; Back to login </a><br/>
          <h2 className="forgot-password-title">Forgot your password?</h2><br/>
        </div>
        <p className="password-recovery-message">
          Don’t worry, it happens to all of us. Enter your email below to recover your password.<br/>
        </p>
        <form className="password-recovery-form">
          <label className="email-label">Email</label><br/>
          <input type="email" className="email-input" placeholder="johnsondoe@nomail.com" required /><br/>
          <button type="submit" className="btn-continue">CONTINUE</button><br/>
        </form>
        
        <div className="divider">
          <span className="or-text">Or</span><br/>
        </div>

        <button className="btn-google">
          <span className="google-text">Log In with Google</span><br/>
        </button><br/>
      </div>
    </div>


        </section>
        
  
      </main>
      <Footer />
    </>
  );
};

export default Accueil;
