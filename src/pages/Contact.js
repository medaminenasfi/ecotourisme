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
        <Col>1 of 2</Col>
        <Col>2 of 2</Col>
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
