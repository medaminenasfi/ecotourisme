import React, { useState, useEffect } from "react";
import Navbar from "../Components/navbar";
import Footer from "../Components/footer";
import { Container, Row, Col } from "react-bootstrap";
import { init } from 'emailjs-com';
import emailjs from 'emailjs-com';
import { FiSend, FiMail, FiPhone } from "react-icons/fi";
import { motion } from "framer-motion";
import backgroundImage from "../assest/Accueil.jpg";
import "./Contact.css";
import ScrollToTopButton from "../Components/ScrollToTopButton";

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


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <>
      <Navbar />
      
      <main className="contact-page">
        {/* Hero Section */}
        <motion.section
          className="d-flex align-items-center justify-content-center text-white"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "100vh",
            width: "100%",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="overlay"></div>
          <motion.div 
            className="content text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Nous Sommes à Votre Écoute
            </motion.h1>
            <motion.p 
              className="lead"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Contactez-Nous
            </motion.p>
          </motion.div>
        </motion.section>

        {/* Contact Section */}
        <section className="contact-section">
          <Container>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Row className="g-5 justify-content-center">
                <Col lg={5} className="contact-info-col">
                  <motion.div 
                    className="contact-info-card"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3>Informations de Contact</h3>
                    <div className="contact-details">
                      <motion.div 
                        className="detail-item"
                        whileHover={{ x: 10 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <div className="icon-box">
                          <FiMail className="icon" />
                        </div>
                        <span>contact@tnecotourisme.com</span>
                      </motion.div>
                      <motion.div 
                        className="detail-item"
                        whileHover={{ x: 10 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <div className="icon-box">
                          <FiPhone className="icon" />
                        </div>
                        <span>+216 12 345 678</span>
                      </motion.div>
                    </div>
                  </motion.div>
                </Col>

                <Col lg={7} className="form-col">
                  <motion.div 
                    className="form-card"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {error && (
                      <motion.div 
                        className="alert error"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        {error}
                      </motion.div>
                    )}
                    {success && (
                      <motion.div 
                        className="alert success"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        Message envoyé avec succès!
                      </motion.div>
                    )}

                    <form onSubmit={handleSubmit}>
                      <motion.div 
                        className="form-group"
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <input
                          type="text"
                          name="name"
                          placeholder="Votre nom complet"
                          value={formData.name}
                          onChange={handleInputChange}
                          disabled={loading}
                        />
                      </motion.div>

                      <motion.div 
                        className="form-group"
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <input
                          type="email"
                          name="email"
                          placeholder="Votre adresse email"
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled={loading}
                        />
                      </motion.div>

                      <motion.div 
                        className="form-group"
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <textarea
                          name="message"
                          placeholder="Votre message..."
                          value={formData.message}
                          onChange={handleInputChange}
                          disabled={loading}
                          rows="6"
                        />
                      </motion.div>

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
            </motion.div>
          </Container>
        </section>
      </main>

      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default Contact;