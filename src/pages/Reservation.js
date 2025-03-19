import React, { useState } from "react";
import Navbar from "../Components/navbar";
import "./Reservation.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Components/footer";
import backgroundImage from "../assest/Accueil.jpg";
import Container from "react-bootstrap/Container";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import {  Button } from "@mui/material";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import dayjs from "dayjs";

const Accueil = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs()); // Manage selected date state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [participants, setParticipants] = useState(1);
  const [specialRequests, setSpecialRequests] = useState("");

  const handleReservation = () => {
    if (!fullName || !email || !phone || participants < 1) {
      alert("Veuillez remplir tous les champs obligatoires !");
      return;
    }

    alert(
      `Réservation confirmée ! 🎉\n\nNom: ${fullName}\nEmail: ${email}\nTéléphone: ${phone}\nParticipants: ${participants}\nDate: ${selectedDate.format(
        "DD/MM/YYYY"
      )}\nDemandes spéciales: ${specialRequests || "Aucune"}`
    );

    // Here, you can send the reservation data to a server using fetch() or axios
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
                  <label>Full Name</label>
                  <br />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                  <br />
                  <label>Email</label>
                  <br />
                  <input
                    type="email"
                    placeholder="johnsondoe@nomail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <br />
                  <label>Phone Number</label>
                  <br />
                  <input
                    type="tel"
                    placeholder="+216 22 222 222"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <br />
                  <label>Number of Participants</label>
                  <br />
                  <input
                    type="number"
                    placeholder="0"
                    value={participants}
                    onChange={(e) => setParticipants(e.target.value)}
                    required
                    min="1"
                    step="1"
                  />
                  <br />
                  <label htmlFor="specialRequests">Demandes spéciales</label>
                  <br />
                  <textarea
                    id="specialRequests"
                    placeholder="Enter your special requests or description"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    required
                  ></textarea>
                  <br />
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

                  {/* ✅ Reservation Button */}
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
