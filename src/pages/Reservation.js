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
import { Box } from "@mui/material";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
        <section className="bg-black   text-white p-5 shadow-lg">
          <h1 classname="hell">Les meilleures destinations</h1>
          <center>
            <p>
              Partez à la découverte de paysages incroyables, des déserts aux
              plages superbes.
            </p>{" "}
          </center>
          <Container>
      <Row>
        <Col>1 of 2</Col>
        <Col>
        <center>
        <Box display="flex" justifyContent="center" mt={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDatePicker orientation="landscape" />
            </LocalizationProvider>
          </Box>
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
              </div>{" "}
            </section>
          </center>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Accueil;
