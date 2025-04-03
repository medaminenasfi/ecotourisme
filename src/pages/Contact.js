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
        <section className="contact-section">
          <Container>
            <h2 className="section-title">Formulaire de Contact</h2>
            <Row className="g-4">
              <Col lg={6} className="contact-info-col">
                <div className="contact-info">
                  <h3>Let’s Talk</h3>
                  <p>
                    Have some big idea or brand to develop and need help? Then reach out,
                    we’d love to hear about your project and provide help.
                  </p>
                  <div className="contact-details">
                    <div className="detail-item">
                      <i className="bi bi-envelope me-2"></i>
                      <span>beebs@gmail.com</span>
                    </div>
                    <div className="detail-item">
                      <i className="bi bi-phone me-2"></i>
                      <span>+216 12 345 678</span>
                    </div>
                  </div>
                </div>
              </Col>

              <Col lg={6} className="form-col">
                <form className="contact-form">
                  <div className="form-group">
                    <label>Nom Complet</label>
                    <input 
                      type="text" 
                      className="form-control"
                      placeholder="Entrez votre nom"
                    />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Entrez votre email"
                    />
                  </div>

                  <div className="form-group">
                    <label>Message</label>
                    <textarea
                      className="form-control"
                      rows="5"
                      placeholder="Écrivez votre message"
                    ></textarea>
                  </div>

                  <button type="submit" className="submit-btn">
                    Envoyer
                    <i className="bi bi-send ms-2"></i>
                  </button>
                </form>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
};
export default Accueil;
