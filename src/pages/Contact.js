import React, { useState } from "react";
import Navbar from "../Components/navbar";
import Footer from "../Components/footer";
import { Container, Row, Col } from "react-bootstrap";
import { init } from 'emailjs-com';
import emailjs from 'emailjs-com';
import { FiSend, FiMail, FiPhone } from "react-icons/fi";
import { motion } from "framer-motion";
import backgroundImage from "../assest/Accueil.jpg";
import "./Contact.css";

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
    setFormData(prev => ({ ...prev, [name]: value }));
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
      formData
    ).then(() => {
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    }, (err) => {
      setError('Erreur lors de l\'envoi: ' + err.text);
    }).finally(() => setLoading(false));
  };

  return (
    <>
      <Navbar />
      
      <main className="contact-page">
        {/* Hero Section */}
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





        {/* Contact Section */}
        <section className="contact-section">
          <Container>
            <Row className="g-5 justify-content-center">
              <Col lg={5} className="contact-info-col">
                <motion.div 
                  className="contact-info-card"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3>Informations de Contact</h3>
                  <div className="contact-details">
                    <div className="detail-item">
                      <div className="icon-box">
                        <FiMail className="icon" />
                      </div>
                      <span>contact@tnecotourisme.com</span>
                    </div>
                    <div className="detail-item">
                      <div className="icon-box">
                        <FiPhone className="icon" />
                      </div>
                      <span>+216 12 345 678</span>
                    </div>
                  </div>
                </motion.div>
              </Col>

              <Col lg={7} className="form-col">
                <motion.div 
                  className="form-card"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {error && <div className="alert error">{error}</div>}
                  {success && <div className="alert success">Message envoyé avec succès!</div>}

                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        name="name"
                        placeholder="Votre nom complet"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={loading}
                      />
                    </div>

                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        placeholder="Votre adresse email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={loading}
                      />
                    </div>

                    <div className="form-group">
                      <textarea
                        name="message"
                        placeholder="Votre message..."
                        value={formData.message}
                        onChange={handleInputChange}
                        disabled={loading}
                        rows="6"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      className="submit-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="spinner" />
                      ) : (
                        <>
                          Envoyer
                          <FiSend className="send-icon" />
                        </>
                      )}
                    </motion.button>
                  </form>
                </motion.div>
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