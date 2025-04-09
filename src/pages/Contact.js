import React, { useState } from "react";
import Navbar from "../Components/navbar";
import "../pages/Contact.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Components/footer";
import backgroundImage from "../assest/Accueil.jpg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { init } from 'emailjs-com';
import emailjs from 'emailjs-com';

init("PpvCGv7Qe60PVbyR7"); 



const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Le nom est requis');
      return false;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
      setError('Email invalide');
      return false;
    }
    if (formData.message.length < 10) {
      setError('Le message doit contenir au moins 10 caractères');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;

    setLoading(true);

    emailjs.send(
      'service_t688zch', 
      'template_dgfpx5s', 
    )
    .then((response) => {
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    }, (err) => {
      setError('Erreur lors de l\'envoi: ' + err.text);
    })
    .finally(() => {
      setLoading(false);
    });
  };
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

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">Message envoyé avec succès!</div>}

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
                      <span>tnecotourisle@gmail.com</span>
                    </div>
                    <div className="detail-item">
                      <i className="bi bi-phone me-2"></i>
                      <span>+216 12 345 678</span>
                    </div>
                  </div>
                </div>              </Col>

              <Col lg={6} className="form-col">
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label>Nom Complet</label>
                    <input 
                      type="text" 
                      name="name"
                      className="form-control"
                      placeholder="Entrez votre nom"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Entrez votre email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </div>

                  <div className="form-group">
                    <label>Message</label>
                    <textarea
                      name="message"
                      className="form-control"
                      rows="5"
                      placeholder="Écrivez votre message"
                      value={formData.message}
                      onChange={handleInputChange}
                      disabled={loading}
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        Envoi en cours...
                        <div className="spinner-border spinner-border-sm ms-2"></div>
                      </>
                    ) : (
                      <>
                        Envoyer
                        <i className="bi bi-send ms-2"></i>
                      </>
                    )}
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
export default Contact;
