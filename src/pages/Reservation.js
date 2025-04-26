import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Components/footer";
import backgroundImage from "../assest/Accueil.jpg";
import Container from "react-bootstrap/Container";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Button } from "@mui/material";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import dayjs from "dayjs";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { DatePicker } from "@mui/x-date-pickers/DatePicker"; // Remplacer l'import


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
  const [tempCircuit, setTempCircuit] = useState(null);
const [combinedCircuits, setCombinedCircuits] = useState([]);

useEffect(() => {
  if (passedCircuit?.isTemp) {
    setCircuits(prev => [...prev, passedCircuit]);
    setSelectedCircuit(passedCircuit._id);
  }
}, [passedCircuit]);

useEffect(() => {
  setCombinedCircuits([
    ...circuits,
    ...(tempCircuit ? [tempCircuit] : [])
  ]);
}, [circuits, tempCircuit]);
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
        name: circuit.name, // Add circuit name directly to reservation

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

      const { data } = await axios.post(
        "http://localhost:5000/api/reservations",
        reservationData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      alert(`Reservation confirmed!\n
        Date: ${dayjs(reservationData.date).format("DD/MM/YYYY")}\n
        Total: ${reservationData.totalPrice} TND`);

      // Reset form
      setSelectedCircuit(passedCircuit?._id || "");
      setParticipants(1);
      setSelectedDate(dayjs());

    } catch (err) {
      console.error("Reservation error:", err);
      setError(err.response?.data?.message || err.message || "Reservation failed. Please try again.");
    } finally {
      setIsReserving(false);
    }
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
        <section
          className="d-flex align-items-center justify-content-center text-white"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            height: "100vh",
          }}
        >
          <div className="text-center">
            <h1>Votre aventure commence ici</h1>
            <p className="lead">
            Découvrez des paysages à couper le souffle et des expériences inoubliables.            </p>
          </div>
        </section>

        <section className="bg-dark text-white p-5">
          <Container>
            <h2 className="text-center mb-4">Faire une réservation</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            
            <Row className="g-4">
              <Col md={6}>
                <div className="bg-light p-4 rounded text-dark">
                <div className="mb-3">
  <label className="form-label">Circuit sélectionné</label>
  <input
    type="text"
    className="form-control"
    value={combinedCircuits.find(circuit => circuit._id === selectedCircuit)?.name || ''}
    readOnly
    placeholder="Aucun circuit sélectionné"
  />
</div>

                  <div className="mb-3">
                    <label className="form-label">Nombre de participants</label>
                    <input
                      type="number"
                      className="form-control"
                      min="1"
                      value={participants}
                      onChange={(e) => setParticipants(Math.max(1, e.target.valueAsNumber || 1))}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Prix ​​total</label>
                    <div className="h4">
                      {circuits.find(c => c._id === selectedCircuit)?.price
                        ? `${totalPrice} TND`
                        : "Sélectionnez un circuit"}
                    </div>
                  </div>
                </div>
              </Col>

              <Col md={6}>
  <div className="bg-light p-4 rounded">
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
            borderRadius: '8px',
            backgroundColor: 'white'
          }
        }}
      />
    </LocalizationProvider>
    <div className="text-center mt-3 text-dark">
      Date sélectionnée: {selectedDate.format("DD/MM/YYYY")}
    </div>
  </div>
</Col>
            </Row>

            <div className="text-center mt-4">
              <Button
                variant="contained"
                size="large"
                onClick={handleReservation}
                disabled={!selectedCircuit || isReserving}
                sx={{ px: 6, py: 2, fontSize: '1.2rem' }}
              >
                {isReserving ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                    Traitement.....
                  </>
                ) : (
                  "Confirmer la réservation"
                )}
              </Button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Accueil;