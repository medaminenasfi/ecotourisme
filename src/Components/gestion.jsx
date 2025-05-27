import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaCommentDots, FaExclamationCircle } from "react-icons/fa";
import { Card } from "react-bootstrap";
import Navbar from "../Components/navbar";
import backgroundImage from "../assest/Accueil.jpg";
import { motion } from "framer-motion";

const Gestion = () => {
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
    <motion.div 
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        paddingTop: '80px'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      
      <motion.div 
        className="container py-5" 
        style={{ maxWidth: '1200px' }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Card className="shadow" style={{
            background: 'rgba(0, 0, 0, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '15px'
          }}>
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card.Header style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <h1 className="text-white mb-0">Avis & Réclamations</h1>
              </Card.Header>
            </motion.div>

            <Card.Body>
              <motion.div 
                className="d-flex gap-3 mb-4"
                variants={itemVariants}
              >
                <NavLink
                  to="avis"
                  className={({ isActive }) => 
                    `btn btn-lg d-flex align-items-center rounded-pill ${
                      isActive ? "btn-primary" : "btn-outline-primary"
                    }`
                  }
                >
                  <FaCommentDots className="me-2" />
                  Avis Clients
                </NavLink>
                
                <NavLink
                  to="reclamations"
                  className={({ isActive }) => 
                    `btn btn-lg d-flex align-items-center rounded-pill ${
                      isActive ? "btn-danger" : "btn-outline-danger"
                    }`
                  }
                >
                  <FaExclamationCircle className="me-2" />
                  Réclamations
                </NavLink>
              </motion.div>

              <motion.div 
                className="p-4 rounded" 
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Outlet />
              </motion.div>
            </Card.Body>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Gestion;