import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope, FaLeaf } from "react-icons/fa";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Components/footer.css";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <motion.footer 
      className="footer bg-dark text-white pt-5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="container">
        <div className="row g-4">
          {/* Section Logo */}
          <motion.div 
            className="col-12 col-md-4 text-center text-md-start"
            variants={itemVariants}
          >
            <motion.div 
              className="logo mb-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="fw-bold mb-0 d-flex align-items-center">
                <FaLeaf 
                  className="me-2 text-success" 
                  style={{ 
                    animation: 'pulse 2s infinite',
                    filter: 'drop-shadow(0 0 2px rgba(40, 167, 69, 0.5))'
                  }} 
                />
                <span><span className="text-success">Eco</span>Tourisme</span>
              </h2>
              <p className="text-muted mt-2">Découvrez la Tunisie Autrement</p>
            </motion.div>
            <motion.div 
              className="social-icons d-flex gap-3 justify-content-center justify-content-md-start"
              variants={itemVariants}
            >
              <motion.a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon"
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <FaFacebookF className="fs-5" />
              </motion.a>
              <motion.a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon"
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <FaInstagram className="fs-5" />
              </motion.a>
              <motion.a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon"
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <FaTwitter className="fs-5" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Section Liens */}
          <motion.div 
            className="col-12 col-md-4 text-center text-md-start"
            variants={itemVariants}
          >
            <h5 className="fw-bold mb-3 text-success">Navigation</h5>
            <ul className="list-unstyled">
              {[
                { to: "/", text: "Accueil" },
                { to: "/Randonée", text: "Randonnées" },
                { to: "/Reservation", text: "Réservations" },
                { to: "/Artisan", text: "Artisans" },
                { to: "/Contact", text: "Contact" }
              ].map((link, index) => (
                <motion.li 
                  key={index}
                  className="mb-2"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Link to={link.to} className="footer-link">
                    {link.text}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Section Contact */}
          <motion.div 
            className="col-12 col-md-4 text-center text-md-start"
            variants={itemVariants}
          >
            <h5 className="fw-bold mb-3 text-success">Contact</h5>
            <ul className="list-unstyled">
              <motion.li 
                className="mb-2 d-flex align-items-center justify-content-center justify-content-md-start"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <FaMapMarkerAlt className="me-2 text-success" />
                Gabes, Tunisia
              </motion.li>
              <motion.li 
                className="mb-2 d-flex align-items-center justify-content-center justify-content-md-start"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <FaPhone className="me-2 text-success" />
                +216 22 000 000
              </motion.li>
              <motion.li 
                className="d-flex align-items-center justify-content-center justify-content-md-start"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <FaEnvelope className="me-2 text-success" />
                tnecotourisme@gmail.com
              </motion.li>
            </ul>
          </motion.div>
        </div>

        <motion.div 
          className="border-top border-success mt-5 pt-3"
          variants={itemVariants}
        >
          <motion.p 
            className="mb-0 text-center"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            &copy; {new Date().getFullYear()} EcoTourisme TN - Tous droits réservés
          </motion.p>
        </motion.div>
      </div>

      <style jsx>{`
        .footer {
          position: relative;
          overflow: hidden;
        }
        .footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #28a745, transparent);
        }
        .footer-link {
          color: #fff;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
        }
        .footer-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: #28a745;
          transition: all 0.3s ease;
        }
        .footer-link:hover {
          color: #28a745;
        }
        .footer-link:hover::after {
          width: 100%;
        }
        .social-icon {
          color: #fff;
          text-decoration: none;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(5px);
        }
        .social-icon:hover {
          color: #28a745;
          background: rgba(40, 167, 69, 0.1);
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
    </motion.footer>
  );
};

export default Footer;