import React from "react";
import Navbar from "../Components/navbar";
import "./Reservation.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Components/footer";
import backgroundImage from "../assest/Accueil.jpg";
import Container from "react-bootstrap/Container";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const theme = createTheme({
  components: {
    MuiPickersDay: {
      styleOverrides: {
        root: {
          color: "black !important",
        },
        today: {
          border: "1px solid #1976d2 !important",
        },
        selected: {
          backgroundColor: "#1976d2 !important",
          color: "white !important",
        },
      },
    },
  },
});

const Accueil = () => {
  console.log("Rendering Accueil page");
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
                  <input type="text" placeholder="Full Name" required />
                  <br />
                  <label>Email</label>
                  <br />
                  <input
                    type="email"
                    placeholder="johnsondoe@nomail.com"
                    required
                  />
                  <br />
                  <label>Phone Number</label>
                  <br />
                  <input type="tel" placeholder="+216 22 222 222" required />
                  <br />
                  <label>Number of Participants</label>
                  <br />
                  <input
                    type="number"
                    placeholder="0"
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
                    required
                  ></textarea>
                  <br />
                  <button type="submit">Soumettre</button>
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
                    <ThemeProvider theme={theme}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDatePicker orientation="landscape" />
                      </LocalizationProvider>
                    </ThemeProvider>
                  </section>
                </center>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="bg-black text-white p-5 shadow-lg">
          <center>
            <section className="image-section d-flex justify-content-center align-items-center">
              <div className="main-container">
                <div className="mask-group" />
                <span className="explore-tunisia">
                  Explorez
                  <br />
                  la Tunisie autrement
                </span>
                <div className="frame-1" />
              </div>
            </section>
          </center>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Accueil;
