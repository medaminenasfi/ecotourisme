import React, { useState, useEffect } from "react";
import Navbar from "../Components/navbar";
import "./Reservation.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Components/footer";
import backgroundImage from "../assest/Accueil.jpg";
import Container from "react-bootstrap/Container";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Button } from "@mui/material";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import dayjs from "dayjs";

// Temporary dummy data for circuits
const circuits = [
  { _id: "1", name: "Mountain Adventure", price: 100 },
  { _id: "2", name: "Forest Expedition", price: 150 },
  { _id: "3", name: "Desert Safari", price: 200 },
];

const Accueil = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [participants, setParticipants] = useState(1);
  const [selectedCircuit, setSelectedCircuit] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (selectedCircuit && participants > 0) {
      const circuit = circuits.find(c => c._id === selectedCircuit);
      setTotalPrice(circuit.price * participants);
    }
  }, [selectedCircuit, participants]);

  const handleReservation = () => {
    if (!selectedCircuit || participants < 1) {
      alert("Veuillez sélectionner un circuit et le nombre de participants !");
      return;
    }

    const circuit = circuits.find(c => c._id === selectedCircuit);
    
    const reservationData = {
      circuit: selectedCircuit,
      date: selectedDate.toDate(),
      numberOfPeople: participants,
      totalPrice: totalPrice,
      // In a real app, user ID would come from authentication context
    };

    alert(
      `Réservation confirmée ! 🎉\n\nCircuit: ${circuit.name}\nDate: ${selectedDate.format(
        "DD/MM/YYYY"
      )}\nParticipants: ${participants}\nPrix total: $${totalPrice}`
    );

    // Here you would typically send reservationData to your backend API
    // fetch('/api/reservations', { method: 'POST', body: JSON.stringify(reservationData) })
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
            <h1>Votre Aventure Commence Ici</h1>
            <p className="lead">
              La nature ne fait rien en vain, et chaque paysage est une
              invitation à l'aventure
            </p>
          </div>
        </section>
        <section className="bg-black text-white p-5 shadow-lg">
          <h1 className="hell">Effectuer une réservation</h1>
          <center>
            <p>
              Réservez votre place et partez pour un voyage inoubliable. Que
              vous cherchiez une retraite paisible ou une randonnée aventureuse,
              nous avons l'expérience parfaite pour vous !
            </p>
            <br />
            <br />
          </center>
          <Container>
            <Row>
              <Col>
                <center>
                  <label>Circuit</label>
                  <br />
                  <select
                    value={selectedCircuit}
                    onChange={(e) => setSelectedCircuit(e.target.value)}
                    required
                    className="form-select"
                  >
                    <option value="">Sélectionnez un circuit</option>
                    {circuits.map((circuit) => (
                      <option key={circuit._id} value={circuit._id}>
                        {circuit.name} (${circuit.price})
                      </option>
                    ))}
                  </select>
                  <br />
                  <label>Nombre de participants</label>
                  <br />
                  <input
                    type="number"
                    value={participants}
                    onChange={(e) => setParticipants(Number(e.target.value))}
                    required
                    min="1"
                    className="form-control"
                  />
                  <br />
                  <label>Prix total</label>
                  <br />
                  <div className="total-price">${totalPrice}</div>
                </center>
              </Col>
              <Col>
                <center>
                  <section
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "24px",
                      backgroundColor: "white",
                      padding: "16px",
                      borderRadius: "8px",
                    }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateCalendar
                        value={selectedDate}
                        onChange={(newValue) => setSelectedDate(newValue)}
                      />
                    </LocalizationProvider>
                  </section>
                  <p className="text-white mt-3">
                    Date sélectionnée : {selectedDate.format("DD/MM/YYYY")}
                  </p>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleReservation}
                    sx={{ mt: 2 }}
                  >
                    Réserver
                  </Button>
                </center>
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