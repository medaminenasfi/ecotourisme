import React, { useState, useEffect } from "react";
import Navbar from "../Components/navbar";
import "./accueil.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Components/footer";
import backgroundImage from "../assest/Accueil.jpg";
import Container from "react-bootstrap/Container";
import Cuir from "../assest/Cuir.webp";
import Potier from "../assest/potier.jpg";
import Tisserand from "../assest/tisserand.jpg";
import CircuitArtisan from "../Components/CircuitArtisan";
import WeatherMap from "../Components/weather";
import { WiCloud } from 'react-icons/wi';
import ScrollToTopButton from "../Components/ScrollToTopButton";
import { motion } from "framer-motion";

const Accueil = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Navbar />
      <main>
        <section
          className="d-flex align-items-center justify-content-center text-white position-relative"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "100vh",
            width: "100%",
          }}
        >
          <motion.div 
            className="content text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="display-1 mb-4 artisan-title">
              L'Artisanat Local
              <span className="title-line"></span>
            </h1>
            <p className="lead fs-3 subtitle">
              L'Âme de Notre Patrimoine
            </p>
          </motion.div>
        </section>

        <section className="bg-black text-white p-5 shadow-lg">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h1 className="text-center mb-4 display-4 fw-bold">Carte des Artisans</h1>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 col-md-10">
                  <div className="map-container rounded-4 shadow-lg overflow-hidden">
                    <CircuitArtisan />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="bg-black text-white p-5 shadow-lg">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h1 className="text-center mb-5 display-3 fw-bold">Artisans à Découvrir Absolument</h1>
              <p className="text-center lead mb-5 text-light">
                Ces gardiens du savoir-faire traditionnel perpétuent notre héritage culturel
              </p>
            </motion.div>

            {/* Artisan du cuir */}
            <motion.div 
              className="row align-items-center mb-5"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="col-md-6 mb-4 mb-md-0">
                <div className="image-container rounded-4 overflow-hidden shadow-lg">
                  <img 
                    src={Cuir} 
                    alt="Artisan du cuir" 
                    className="img-fluid hover-zoom"
                    style={{ height: "400px", objectFit: "cover", width: "100%" }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <h2 className="mb-4 fw-bold">Maître Artisan du Cuir</h2>
                <div className="bg-dark p-4 rounded-4 shadow-lg hover-card">
                  <h5 className="text-warning mb-3 fw-bold">Mohamed - Spécialités :</h5>
                  <ul className="list-unstyled">
                    <li className="mb-3 d-flex align-items-center">
                      <span className="me-2">🎒</span> Sacs en cuir traditionnels
                    </li>
                    <li className="mb-3 d-flex align-items-center">
                      <span className="me-2">💼</span> Portefeuilles artisanaux
                    </li>
                    <li className="d-flex align-items-center">
                      <span className="me-2">👝</span> Ceintures sur mesure
                    </li>
                  </ul>
                  <p className="text-light mb-0">
                    Créations inspirées des traditions tunisiennes avec une touche moderne, 
                    utilisant des cuirs locaux de première qualité.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Potière traditionnelle */}
            <motion.div 
              className="row align-items-center mb-5 flex-md-row-reverse"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="col-md-6 mb-4 mb-md-0">
                <div className="image-container rounded-4 overflow-hidden shadow-lg">
                  <img 
                    src={Potier} 
                    alt="Poterie traditionnelle" 
                    className="img-fluid hover-zoom"
                    style={{ height: "400px", objectFit: "cover", width: "100%" }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <h2 className="mb-4 fw-bold">Magicienne de l'Argile</h2>
                <div className="bg-dark p-4 rounded-4 shadow-lg hover-card">
                  <h5 className="text-warning mb-3 fw-bold">Rachida Zribi - Expertises :</h5>
                  <ul className="list-unstyled">
                    <li className="mb-3 d-flex align-items-center">
                      <span className="me-2">🏺</span> Poterie utilitaire
                    </li>
                    <li className="mb-3 d-flex align-items-center">
                      <span className="me-2">🎨</span> Céramique décorative
                    </li>
                    <li className="d-flex align-items-center">
                      <span className="me-2">🖌️</span> Peinture traditionnelle
                    </li>
                  </ul>
                  <p className="text-light mb-0">
                    Perpétue l'art ancestral du tour de potier avec des créations 
                    liant design contemporain et motifs traditionnels.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Tisserand berbère */}
            <motion.div 
              className="row align-items-center"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="col-md-6 mb-4 mb-md-0">
                <div className="image-container rounded-4 overflow-hidden shadow-lg">
                  <img 
                    src={Tisserand} 
                    alt="Tissage traditionnel" 
                    className="img-fluid hover-zoom"
                    style={{ height: "400px", objectFit: "cover", width: "100%" }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <h2 className="mb-4 fw-bold">Garde des Motifs Berbères</h2>
                <div className="bg-dark p-4 rounded-4 shadow-lg hover-card">
                  <h5 className="text-warning mb-3 fw-bold">Ahmed Ben Kacem - Réalisations :</h5>
                  <ul className="list-unstyled">
                    <li className="mb-3 d-flex align-items-center">
                      <span className="me-2">🧶</span> Tapis en laine naturelle
                    </li>
                    <li className="mb-3 d-flex align-items-center">
                      <span className="me-2">🧵</span> Textiles traditionnels
                    </li>
                    <li className="d-flex align-items-center">
                      <span className="me-2">🎗️</span> Motifs ancestraux
                    </li>
                  </ul>
                  <p className="text-light mb-0">
                    Tisse l'histoire berbère à travers des pièces uniques fabriquées 
                    selon des techniques transmises depuis des générations.
                  </p>
                </div>
              </div>
            </motion.div>
          </Container>
        </section>
      </main>
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default Accueil;
