import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  ListGroup, 
  Button, 
  Spinner, 
  Alert, 
  Card, 
  Badge,
  Container,
  Row,
  Col
} from "react-bootstrap";
import Navbar from "../Components/navbar";
import { format } from 'date-fns';
import frLocale from 'date-fns/locale/fr';
import { toast } from 'react-toastify';
import backgroundImage from "../assest/Accueil.jpg";
import ScrollToTopButton from "../Components/ScrollToTopButton";
import { motion, AnimatePresence } from "framer-motion";

const Profile = () => {
  const { user, logout, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [reservationsLoading, setReservationsLoading] = useState(false);
  const [error, setError] = useState("");
  const [reservations, setReservations] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/Seconnecter");
    } else if (user) {
      fetchUserReservations();
    }
  }, [user, authLoading, navigate]);

  const fetchUserReservations = async () => {
    try {
      setReservationsLoading(true);
      setError("");
      
      const response = await fetch("http://localhost:5000/api/reservations/my-reservations", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          logout();
          return;
        }
        throw new Error("Échec du chargement des réservations");
      }

      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error("Erreur de récupération des réservations:", error);
      setError(error.message);
    } finally {
      setReservationsLoading(false);
    }
  };

  const handleDeleteReservation = async (reservationId) => {
    if (!window.confirm("Êtes-vous sûr de vouloir annuler cette réservation ?")) return;
    
    try {
      setDeletingId(reservationId);
      setError("");

      const response = await fetch(`http://localhost:5000/api/reservations/${reservationId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        }
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("Vous n'êtes pas autorisé à supprimer cette réservation");
        }
        throw new Error("Échec de la suppression de la réservation");
      }

      setReservations(prev => prev.filter(r => r._id !== reservationId));
      toast.success("Réservation annulée avec succès");
    } catch (error) {
      console.error("Erreur de suppression:", error);
      toast.error(error.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/Seconnecter");
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'dd MMMM yyyy', { locale: frLocale });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Date inconnue";
    }
  };

  const getCircuitInfo = (reservation) => {
    if (reservation.circuitDetails) {
      return {
        name: reservation.circuitDetails.name || "Circuit personnalisé",
        isCustom: true
      };
    }
    
    if (reservation.circuit) {
      return {
        name: reservation.circuit.name || "Circuit indisponible",
        isCustom: false
      };
    }

    return { name: "Circuit indisponible", isCustom: false };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  if (authLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        paddingTop: '80px'
      }}
    >
      <Navbar />
      <Container className="py-5" style={{ maxWidth: '1200px' }}>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="shadow" style={{
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '15px'
          }}>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card.Header style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <h2 style={{ 
                  color: '#f1faee', 
                  margin: 0,
                  fontWeight: '600',
                  letterSpacing: '0.5px'
                }}>
                  Profil Utilisateur
                </h2>
              </Card.Header>
            </motion.div>
            
            <Card.Body>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Alert variant="danger">{error}</Alert>
                </motion.div>
              )}

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <Row className="g-4">
                  <Col md={6}>
                    <ListGroup variant="flush">
                      {['first_name', 'last_name', 'email'].map((field, index) => (
                        <motion.div
                          key={field}
                          variants={itemVariants}
                          custom={index}
                        >
                          <ListGroup.Item style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            color: '#fff',
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                            padding: '1.2rem',
                            transition: 'all 0.3s ease'
                          }}
                          whileHover={{ scale: 1.02, background: 'rgba(255, 255, 255, 0.08)' }}
                          >
                            <strong style={{ 
                              color: '#20c997',
                              minWidth: '90px',
                              display: 'inline-block'
                            }}>
                              {{
                                first_name: 'Prénom',
                                last_name: 'Nom',
                                email: 'Email'
                              }[field]}
                            </strong>
                            <span style={{ marginLeft: '15px' }}>
                              {user[field] || "Non fourni"}
                            </span>
                          </ListGroup.Item>
                        </motion.div>
                      ))}
                    </ListGroup>
                  </Col>
                  <Col md={6}>
                    <ListGroup variant="flush">
                      {['phone_number', 'gender', 'role'].map((field, index) => (
                        <motion.div
                          key={field}
                          variants={itemVariants}
                          custom={index + 3}
                        >
                          <ListGroup.Item style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            color: '#fff',
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                            padding: '1.2rem',
                            transition: 'all 0.3s ease'
                          }}
                          whileHover={{ scale: 1.02, background: 'rgba(255, 255, 255, 0.08)' }}
                          >
                            <strong style={{ 
                              color: '#20c997',
                              minWidth: '90px',
                              display: 'inline-block'
                            }}>
                              {{
                                phone_number: 'Téléphone',
                                gender: 'Genre',
                                role: 'Rôle'
                              }[field]}
                            </strong>
                            <span style={{ marginLeft: '15px' }}>
                              {field === 'role' ? (
                                <Badge pill bg={
                                  user.role === 'admin' ? 'danger' : 
                                  user.role === 'fournisseur' ? 'warning' : 'primary'
                                }>
                                  {user.role === 'admin' ? 'Administrateur' : 
                                  user.role === 'fournisseur' ? 'Fournisseur' : 'Voyageur'}
                                </Badge>
                              ) : field === 'gender' ? (
                                user.gender === 'male' ? 'Homme' : 'Femme'
                              ) : user[field] || "Non fourni"}
                            </span>
                          </ListGroup.Item>
                        </motion.div>
                      ))}
                    </ListGroup>
                  </Col>
                </Row>
              </motion.div>

              <motion.div 
                className="mt-4 d-flex justify-content-end gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button 
                  variant="outline-danger" 
                  onClick={handleLogout}
                  style={{
                    borderColor: '#dc3545',
                    color: '#dc3545',
                    borderRadius: '8px',
                    padding: '8px 20px',
                    transition: 'all 0.3s ease'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Déconnexion
                </Button>
                {user.role === 'admin' && (
                  <Button 
                    variant="primary"
                    onClick={() => navigate("/AdminDashboard")}
                    style={{
                      backgroundColor: '#20c997',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px 20px',
                      transition: 'all 0.3s ease'
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Tableau de bord
                  </Button>
                )}
              </motion.div>

              <motion.h4 
                className="mt-5 mb-4" 
                style={{ 
                  color: '#f1faee',
                  fontWeight: '600',
                  paddingBottom: '10px',
                  borderBottom: '2px solid rgba(255, 255, 255, 0.1)'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Vos Réservations
              </motion.h4>
              
              <AnimatePresence>
                {reservationsLoading ? (
                  <motion.div 
                    className="text-center py-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Spinner animation="border" variant="light" />
                    <p className="mt-3 text-light">Chargement des données...</p>
                  </motion.div>
                ) : reservations.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <Alert variant="info" style={{
                      background: 'rgba(32, 201, 151, 0.15)',
                      borderColor: 'rgba(32, 201, 151, 0.3)',
                      color: '#20c997'
                    }}>
                      Vous n'avez aucune réservation pour le moment.
                    </Alert>
                  </motion.div>
                ) : (
                  <ListGroup variant="flush">
                    {reservations.map((reservation, index) => {
                      const circuitInfo = getCircuitInfo(reservation);
                      
                      return (
                        <motion.div
                          key={reservation._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          exit={{ opacity: 0, y: -20 }}
                        >
                          <ListGroup.Item style={{
                            background: 'rgba(255, 255, 255, 0.02)',
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                            color: '#fff',
                            padding: '1.5rem',
                            marginBottom: '10px',
                            borderRadius: '10px',
                            transition: 'all 0.3s ease'
                          }}
                          whileHover={{ 
                            scale: 1.02,
                            background: 'rgba(255, 255, 255, 0.05)'
                          }}
                          >
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <h5 style={{ color: '#20c997', marginBottom: '0.8rem' }}>
                                  {circuitInfo.name}
                                  {circuitInfo.isCustom}
                                </h5>
                                <div className="d-flex align-items-center gap-2 flex-wrap">
                                  <Badge bg="dark" className="d-flex align-items-center">
                                    <i className="bi bi-calendar me-1"></i>
                                    {formatDate(reservation.date)}
                                  </Badge>
                                  <Badge bg="secondary" className="d-flex align-items-center">
                                    <i className="bi bi-people me-1"></i>
                                    {reservation.numberOfPeople} pers.
                                  </Badge>
                                  <Badge bg={
                                    reservation.status === 'confirmed' ? 'success' : 
                                    reservation.status === 'cancelled' ? 'danger' : 'warning'
                                  }>
                                    {reservation.status === 'confirmed' ? 'Confirmée' :
                                    reservation.status === 'cancelled' ? 'Annulée' : 'En attente'}
                                  </Badge>
                                </div>
                              </div>
                              <div className="text-end">
                                <div className="d-flex flex-column align-items-end gap-2">
                                  <h5 className="text-primary mb-0">
                                    {reservation.totalPrice?.toFixed(2)} TND
                                  </h5>
                                  <div className="d-flex gap-2 align-items-center">
                                    <small className="text-white">Ref: {reservation._id.slice(-6)}</small>
                                    <Button 
                                      variant="outline-danger" 
                                      size="sm" 
                                      onClick={() => handleDeleteReservation(reservation._id)}
                                      disabled={deletingId === reservation._id}
                                      style={{
                                        minWidth: '100px',
                                        borderRadius: '20px'
                                      }}
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      {deletingId === reservation._id ? (
                                        <Spinner animation="border" size="sm" />
                                      ) : (
                                        <>
                                          <i className="bi bi-trash me-1"></i>
                                          Supprimer
                                        </>
                                      )}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </ListGroup.Item>
                        </motion.div>
                      );
                    })}
                  </ListGroup>
                )}
              </AnimatePresence>
            </Card.Body>
          </Card>
        </motion.div>
      </Container>
      <ScrollToTopButton />
    </motion.div>
  );
};

export default Profile;