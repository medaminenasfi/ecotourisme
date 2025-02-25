import React from "react";
import Navbar from "../Components/navbar";
import "../pages/Contact.css";
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
          <div className="overlay"></div>
          <div className="content text-center">
            <h1>
            Nous Sommes à Votre Écoute              </h1>
            <p className="lead">
            Contactez-Nous
            </p>
          </div>
          
        </section>
        <section className="bg-black text-white p-5 shadow-lg">
          <h1 classname="hell">Formulaire de Contact</h1>
          


<center>
          <Container>
      <Row>
        <Col>
        
        <div className="contact-info">
        <h2>Let’s Talk</h2>
        <p>
          Have some big idea or brand to develop and need help? Then reach out,
          we’d love to hear about your project and provide help.
        </p>
        <div className="contact-email">
          <h3>Email</h3> 
          <p>beebs@gmail.com</p>
        </div>
      </div>
        
        
        </Col>
        <Col>
        
        
        
        <div className="contact-form">
        <form>
          <label>Name</label><br/>
          <input type="text" placeholder="Enter your name" />  <br/>          
          <label>Email</label><br/>
          <input type="email" placeholder="Enter your email" /><br/>
          
          
          
          <label>Message</label>
          <textarea placeholder="Write your message"></textarea><br/>
          
          <button type="submit">Submit</button>
        </form>
      </div>
        
        
        
        
        
        
        </Col>
      </Row>
          
    </Container> 
    </center>






        </section>
      
      </main>
      <Footer />
    </>
  );
};

export default Accueil;
