import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Components/footer";
import bg from "../assest/Accueil.jpg";
import Container from "react-bootstrap/Container";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Button } from "@mui/material";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import dayjs from "dayjs";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ScrollToTopButton from "../Components/ScrollToTopButton";
import { motion, AnimatePresence } from "framer-motion";
import { Badge, ListGroup, Spinner, Alert } from "react-bootstrap";
import { FaCalendarAlt, FaUsers, FaMoneyBillWave, FaMapMarkedAlt } from 'react-icons/fa';

const Accueil = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const passedCircuit = location.state?.circuit;

  const [circuits, setCircuits] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [participants, setParticipants] = useState(1);
  const [selectedCircuit, setSelectedCircuit] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isReserving, setIsReserving] = useState(false);
  
  const [reservations, setReservations] = useState([]);
  const [reservationsLoading, setReservationsLoading] = useState(false);
  const [reservationError, setReservationError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [allCircuits, setAllCircuits] = useState([]); 

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchUserReservations();
    fetchAllCircuits(); 
  }, []);

  const validateToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      if (!decoded) throw new Error("Invalid token");
      if (decoded.exp && Date.now() >= decoded.exp * 1000) {
        throw new Error("Token expired");
      }
      if (!decoded.UserInfo?.id) {
        throw new Error("Invalid token structure");
      }
      return decoded;
    } catch (err) {
      console.error("Token validation error:", err);
      localStorage.removeItem("accessToken");
      navigate("/Seconnecter");
      return null;
    }
  };
  
  const fetchAllCircuits = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        navigate("/Seconnecter");
        return;
      }

      const { data } = await axios.get("http://localhost:5000/api/circuits", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setAllCircuits(data);
    } catch (err) {
      console.error("Erreur de chargement des circuits:", err);
    }
  };

  useEffect(() => {
    const fetchCircuits = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          navigate("/Seconnecter");
          return;
        }

        const { data } = await axios.get("http://localhost:5000/api/circuits", {
          headers: { Authorization: `Bearer ${token}` }
        });

        const validCircuits = Array.isArray(data) ? data : [];
        if (passedCircuit?.price && !validCircuits.some(c => c._id === passedCircuit._id)) {
          validCircuits.push(passedCircuit);
        }

        setCircuits(validCircuits);
        setError("");

        if (passedCircuit?.price) {
          setSelectedCircuit(passedCircuit._id);
          setTotalPrice(passedCircuit.price * 1);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.response?.data?.message || "Failed to load circuits");
      } finally {
        setLoading(false);
      }
    };

    fetchCircuits();
  }, [passedCircuit, navigate]);

  useEffect(() => {
    if (selectedCircuit && participants > 0) {
      const circuit = circuits.find(c => c._id === selectedCircuit);
      if (circuit?.price) setTotalPrice(circuit.price * participants);
    }
  }, [selectedCircuit, participants, circuits]);

  const fetchUserReservations = async () => {
    try {
      setReservationsLoading(true);
      setReservationError("");
      
      const token = localStorage.getItem("accessToken");
      if (!token) {
        navigate("/Seconnecter");
        return;
      }
      
      const response = await axios.get(
        "http://localhost:5000/api/reservations/my-reservations", 
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const sortedReservations = response.data.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });

      setReservations(sortedReservations);
    } catch (err) {
      console.error("Erreur de récupération des réservations:", err);
      setReservationError(err.response?.data?.message || "Échec du chargement des réservations");
    } finally {
      setReservationsLoading(false);
    }
  };

  const handleDeleteReservation = async (reservationId) => {
    if (!window.confirm("Êtes-vous sûr de vouloir annuler cette réservation ?")) return;
    
    try {
      setDeletingId(reservationId);
      setReservationError("");

      const token = localStorage.getItem("accessToken");
      if (!token) {
        navigate("/Seconnecter");
        return;
      }

      await axios.delete(`http://localhost:5000/api/reservations/${reservationId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setReservations(prev => prev.filter(r => r._id !== reservationId));
      alert("Réservation annulée avec succès!");
    } catch (err) {
      console.error("Erreur de suppression:", err);
      setReservationError(err.response?.data?.message || "Échec de l'annulation");
    } finally {
      setDeletingId(null);
    }
  };

  const getCircuitName = (reservation) => {
    if (reservation.circuitDetails) {
      return reservation.circuitDetails.name;
    }
    
    if (reservation.circuit && typeof reservation.circuit === 'object') {
      return reservation.circuit.name;
    }
    
    if (typeof reservation.circuit === 'string') {
      const circuit = allCircuits.find(c => c._id === reservation.circuit);
      return circuit ? circuit.name : "Circuit non trouvé";
    }
    
    return "Circuit non spécifié";
  };

  const handleReservation = async () => {
    setError("");
    setIsReserving(true);

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        navigate("/Seconnecter");
        return;
      }
      const decoded = validateToken(token);
      if (!decoded) return;

      const userId = decoded.UserInfo?.id;
      if (!userId) throw new Error("User information not found in token");

      const selectedDay = dayjs(selectedDate);
      if (!selectedDay.isValid() || selectedDay.isBefore(dayjs(), "day")) {
        throw new Error("Invalid date selection");
      }

      const circuit = circuits.find(c => c._id === selectedCircuit);
  
      const reservationData = {
        user: userId,
        date: selectedDay.format("YYYY-MM-DD"),
        numberOfPeople: participants,
        totalPrice: circuit.price * participants,
        isTempCircuit: circuit.isTemp || false,
        name: circuit.name,
      };
    
      if (circuit.isTemp) {
        reservationData.circuitDetails = {
          name: circuit.name,
          price: circuit.price,
          duration: circuit.duration,
          difficulty: circuit.difficulty,
          location: circuit.location
        };
      } else {
        reservationData.circuit = selectedCircuit;
      }

      await axios.post(
        "http://localhost:5000/api/reservations",
        reservationData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      alert(`Réservation confirmée!\n
        Date: ${dayjs(reservationData.date).format("DD/MM/YYYY")}\n
        Total: ${reservationData.totalPrice} TND`);
      
      navigate("/");

    } catch (err) {
      console.error("Reservation error:", err);
      setError(err.response?.data?.message || err.message || "Reservation failed. Please try again.");
    } finally {
      setIsReserving(false);
    }
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

  const formatDate = (dateString) => {
    return dayjs(dateString).format("DD/MM/YYYY");
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <motion.section
          className="d-flex align-items-center justify-content-center text-white"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="text-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <motion.h1
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="display-3 fw-bold text-shadow"
            >
              Réservez votre aventure
            </motion.h1>
            <motion.p 
              className="lead fs-4 text-shadow"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Découvrez des paysages à couper le souffle et des expériences inoubliables.
            </motion.p>
          </motion.div>
        </motion.section>

        <motion.section 
          className="reservation-section py-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Container>
            <motion.h2 
              className="section-title text-center mb-5 text-white"
              variants={itemVariants}
            >
              Faire une réservation
            </motion.h2>
            {error && (
              <motion.div 
                className="alert alert-danger"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.div>
            )}
            
            <Row className="g-4">
              <Col md={6}>
                <motion.div 
                  className="reservation-card"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="card-icon">
                    <FaMapMarkedAlt />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Circuit sélectionné</label>
                    <input
                      type="text"
                      className="form-control custom-input"
                      value={circuits.find(c => c._id === selectedCircuit)?.name || ''}
                      readOnly
                      placeholder="Aucun circuit sélectionné"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label">
                      <FaUsers className="me-2" />
                      Nombre de participants
                    </label>
                    <input
                      type="number"
                      className="form-control custom-input"
                      min="1"
                      value={participants}
                      onChange={(e) => setParticipants(Math.max(1, e.target.valueAsNumber || 1))}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label">
                      <FaMoneyBillWave className="me-2" />
                      Prix total
                    </label>
                    <motion.div 
                      className="price-display"
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {circuits.find(c => c._id === selectedCircuit)?.price
                        ? `${totalPrice} TND`
                        : "Sélectionnez un circuit"}
                    </motion.div>
                  </div>
                </motion.div>
              </Col>

              <Col md={6}>
                <motion.div 
                  className="reservation-card"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="card-icon">
                    <FaCalendarAlt />
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Choisir une date"
                      value={selectedDate}
                      onChange={setSelectedDate}
                      minDate={dayjs().add(1, 'day')}
                      disablePast
                      format="DD/MM/YYYY"
                      sx={{
                        width: '100%',
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          '&:hover': {
                            '& > fieldset': {
                              borderColor: '#4CAF50',
                            },
                          },
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgba(255, 255, 255, 0.7)',
                        },
                        '& .MuiInputBase-input': {
                          color: 'white',
                        },
                        '& .MuiSvgIcon-root': {
                          color: 'rgba(255, 255, 255, 0.7)',
                        },
                      }}
                    />
                  </LocalizationProvider>
                  <motion.div 
                    className="selected-date mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Date sélectionnée: {selectedDate.format("DD/MM/YYYY")}
                  </motion.div>
                </motion.div>
              </Col>
            </Row>

            <motion.div 
              className="text-center mt-5"
              variants={itemVariants}
            >
              <Button
                variant="contained"
                size="large"
                onClick={handleReservation}
                disabled={!selectedCircuit || isReserving}
                className="reservation-button"
                sx={{ 
                  px: 6, 
                  py: 2, 
                  fontSize: '1.2rem',
                  borderRadius: '30px',
                  background: 'linear-gradient(45deg, #2E7D32 30%, #4CAF50 90%)',
                  boxShadow: '0 3px 5px 2px rgba(76, 175, 80, .3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 6px 20px rgba(76, 175, 80, .4)',
                    background: 'linear-gradient(45deg, #1B5E20 30%, #2E7D32 90%)',
                  },
                  '&:disabled': {
                    background: 'rgba(76, 175, 80, 0.5)',
                    boxShadow: 'none',
                  }
                }}
              >
                {isReserving ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                    Traitement...
                  </>
                ) : (
                  "Confirmer la réservation"
                )}
              </Button>
            </motion.div>
          </Container>
        </motion.section>

        <motion.section 
          className="history-section py-5"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Container>
            <motion.h2 
              className="section-title text-center mb-5 text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Historique de vos Réservations
            </motion.h2>

            {reservationError && (
              <motion.div 
                className="alert alert-danger"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {reservationError}
              </motion.div>
            )}

            <AnimatePresence>
              {reservationsLoading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="primary" />
                  <p className="mt-3">Chargement de vos réservations...</p>
                </div>
              ) : reservations.length === 0 ? (
                <motion.div
                  className="text-center py-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="lead">Vous n'avez aucune réservation pour le moment.</p>
                  <Button 
                    variant="outlined" 
                    color="primary"
                    onClick={fetchUserReservations}
                    sx={{ mt: 2 }}
                  >
                    Rafraîchir
                  </Button>
                </motion.div>
              ) : (
                <ListGroup variant="flush">
                  {reservations.map((reservation) => (
                    <motion.div
                      key={reservation._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ListGroup.Item className="reservation-item mb-3">
                        <Row className="align-items-center">
                          <Col md={5}>
                            <h5 className="circuit-name">
                              {getCircuitName(reservation)}
                            </h5>
                            <div className="d-flex gap-2 mt-2">
                              <Badge bg="info" className="reservation-badge">
                                <FaCalendarAlt className="me-1" />
                                {formatDate(reservation.date)}
                              </Badge>
                              <Badge bg="secondary" className="reservation-badge">
                                <FaUsers className="me-1" />
                                {reservation.numberOfPeople} pers.
                              </Badge>
                            </div>
                          </Col>
                          <Col md={2} className="text-center">
                            <span className="price-tag">
                              {reservation.totalPrice} TND
                            </span>
                          </Col>
                          <Col md={3} className="text-center">
                            <Badge 
                              bg={
                                reservation.status === 'confirmed' ? 'success' : 
                                reservation.status === 'cancelled' ? 'danger' : 'warning'
                              }
                              className="status-badge"
                            >
                              {reservation.status === 'confirmed' ? 'Confirmée' :
                               reservation.status === 'cancelled' ? 'Annulée' : 'En attente'}
                            </Badge>
                          </Col>
                          <Col md={2} className="text-end">
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              onClick={() => handleDeleteReservation(reservation._id)}
                              disabled={deletingId === reservation._id}
                              className="cancel-button"
                              sx={{ 
                                minWidth: '100px',
                                borderRadius: '20px',
                                borderColor: '#dc3545',
                                color: '#dc3545',
                                '&:hover': {
                                  backgroundColor: '#dc3545',
                                  color: 'white',
                                  borderColor: '#dc3545',
                                }
                              }}
                            >
                              {deletingId === reservation._id ? (
                                <Spinner size="sm" />
                              ) : (
                                "Annuler"
                              )}
                            </Button>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    </motion.div>
                  ))}
                </ListGroup>
              )}
            </AnimatePresence>
          </Container>
        </motion.section>
      </main>
      <Footer />
      <ScrollToTopButton />
      
      <style jsx>{`
        .text-shadow {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
        }

        .hero-section {
          position: relative;
          overflow: hidden;
        }

        .hero-content {
          position: relative;
          z-index: 2;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
          margin-bottom: 1.5rem;
        }

        .hero-subtitle {
          font-size: 1.5rem;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 2rem;
          position: relative;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 3px;
          background: linear-gradient(45deg, #2196F3, #21CBF3);
          border-radius: 3px;
        }

        .reservation-section {
          background: linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%);
          padding: 80px 0;
        }

        .reservation-card {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .card-icon {
          position: absolute;
          top: 20px;
          right: 20px;
          font-size: 2rem;
          color: #2196F3;
          opacity: 0.2;
        }

        .custom-input {
          border-radius: 12px;
          border: 2px solid rgba(255, 255, 255, 0.1);
          padding: 12px;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.05);
          color: white;
        }

        .custom-input:focus {
          border-color: #2196F3;
          box-shadow: 0 0 0 0.2rem rgba(33, 150, 243, 0.25);
        }

        .custom-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .price-display {
          font-size: 1.8rem;
          font-weight: 700;
          color: #4CAF50;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          text-align: center;
        }

        .selected-date {
          font-size: 1.2rem;
          color: white;
          font-weight: 500;
          text-align: center;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
        }

        .history-section {
          background: linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%);
          padding: 80px 0;
        }

        .reservation-item {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          padding: 1.5rem;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }

        .reservation-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
          background: rgba(255, 255, 255, 0.15);
        }

        .circuit-name {
          color: white;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .reservation-badge {
          padding: 0.5rem 1rem;
          font-size: 0.9rem;
          border-radius: 20px;
        }

        .price-tag {
          font-size: 1.5rem;
          font-weight: 700;
          color: #4CAF50;
        }

        .status-badge {
          padding: 0.5rem 1.5rem;
          font-size: 1rem;
          border-radius: 20px;
        }

        .cancel-button {
          transition: all 0.3s ease;
        }

        .cancel-button:hover {
          transform: scale(1.05);
        }

        .form-label {
          color: white;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.2rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .reservation-card {
            margin-bottom: 2rem;
          }
        }
      `}</style>
    </>
  );
};

export default Accueil;