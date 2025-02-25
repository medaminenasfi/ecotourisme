import React from "react";
import Navbar from "../Components/navbar";
import "./accueil.css";
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
        <Container>
        <center>

      <Row>
        <Col>1 of 2</Col>
        <Col>
        
        <div className="main-container">
      <div className="main-div">
        <div className="header">
          <span className="lets-get-started">WELCOME BACK</span><br/>
          <h2 className="create-account">Log In to your Account</h2><br/>
        </div>
        <form className="form">
          <label>Email</label><br/>
          <input type="email" placeholder="johnsondoe@nomail.com" /><br/>

          <label>Password</label><br/>
          <input type="password" placeholder="***************" /><br/>
          
          <div className="options"><br/>
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="/forgot" className="forgot-password">Forgot Password?</a><br/>
          </div>

          <button type="submit" className="btn-pry">CONTINUE</button><br/>
        </form>
        
        <div className="divider-label">
          <span className="or">Or</span><br/>
        </div>

        <button className="btn-outline">
          <span className="sign-up-with-google">Log In with Google</span><br/>
        </button>

        <div className="already-have-account">
          <span>New User? </span><br/>
          <a href="/inscrire" className="sign-up-here">SIGN UP HERE</a><br/>
        </div>
      </div>
    </div>
        
        
        
        </Col>
      </Row>
      </center>

    </Container>

        
        </section>
      
    
      </main>
      <Footer />
    </>
  );
};

export default Accueil;
