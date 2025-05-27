import React, { useState, useEffect } from "react";
import Navbar from "../Components/navbar";
import "./accueil.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Components/footer";
import myImage from "../assest/matmata.webp";
import tozeur from "../assest/Tozeur.jpg";
import tata from "../assest/tatouine.jpg";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import bg1 from "../assest/Accueil.jpg";
import bg2 from "../assest/bizert.jpg";
import bg3 from "../assest/pexels-mahmoud-yahyaoui-14765461.jpg";
import card1 from "../assest/groupe-gens-affaires-ayant-reunion_53876-14819.jpg"
import card2 from "../assest/pexels-photo-7321954.jpg"
import card3 from "../assest/potier.jpg"
import card4 from "../assest/jeunes-taille-moyenne-critiques_23-2149394417.jpg"
import card5 from "../assest/643960ac1999ef0f2b66b178_62dfb171bd353b3faaedffff_recalamation-client-blog-cover.png"
import card6 from "../assest/pexels-photo-8284731.webp"

import ScrollToTopButton from "../Components/ScrollToTopButton";
import { motion } from "framer-motion";

const Accueil = () => {

  console.log("Rendering Accueil page");
  const [showModal, setShowModal] = useState(false);

useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
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

  return (
    <>
      <Navbar />
      <main>
        <section>
          <Carousel fade controls={true} indicators={true} interval={5000}>
            {[bg1, bg2, bg3].map((bg, index) => (
              <Carousel.Item key={index}>
                <div
                  style={{
                    backgroundImage: `url(${bg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "100vh",
                    width: "100%",
                    position: "relative",
                  }}
                >
                  <div className="overlay"></div>
                  <motion.div 
                    className="content text-white text-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <center>
                      <motion.h1
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        Explorer <br /> la nature autrement
                      </motion.h1>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      >
                        <Link to="/Randonée">
                          <Button variant="light" className="hover-scale">
                            Commencer votre aventure
                          </Button>
                        </Link>
                      </motion.div>
                      <motion.p 
                        className="lead mt-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                      >
                        Explorez des paysages enchanteurs, des déserts aux
                        plages superbes.
                      </motion.p>
                    </center>
                  </motion.div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </section>

        <section className="bg-black text-white py-5 px-3 px-md-5">
          <motion.div 
            className="container"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h1 
              className="text-center mb-5 display-4"
              variants={itemVariants}
            >
              🌿 Pourquoi choisir EcoTourisme TN ?
            </motion.h1>

            <motion.div 
              className="row g-4"
              variants={containerVariants}
            >
              {/* Cards with hover animation */}
              {[
                { img: card2, title: "🗺️ Carte interactive", text: "Visualisez rapidement les circuits disponibles partout en Tunisie grâce à une carte interactive intuitive.", link: "/Randonée", btnText: "Explorer la carte" },
                { img: card6, title: "👥 Profils personnalisés", text: "Voyageurs, fournisseurs ou administrateurs : chacun dispose d'un espace adapté à ses besoins.", link: "./profile", btnText: "Voir mon espace" },
                { img: card1, title: "🕒 Réservation rapide", text: "Réservez votre randonnée ou votre activité en quelques clics, en toute sécurité.", link: "./Reservation", btnText: "Réserver un circuit" },
                { img: card3, title: "🛍️ Artisans locaux", text: "Explorez les produits du terroir et soutenez l'économie locale.", link: "./Artisan", btnText: "Découvrir les artisans" },
                { img: card4, title: "💬 Avis", text: "Laissez un commentaire sur votre expérience.", link: "../gestion/avis", btnText: "Donner un avis" },
                { img: card5, title: "💬 Réclamations", text: "Rencontrez un souci ? Notre équipe vous répond rapidement.", link: "../gestion/reclamations", btnText: "Faire une réclamation" }
              ].map((card, index) => (
                <motion.div 
                  key={index}
                  className="col-12 col-md-6 col-lg-4"
                  variants={itemVariants}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="h-100 bg-dark text-light border-light hover-shadow">
                      <Card.Img
                        variant="top"
                        src={card.img}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <Card.Body className="d-flex flex-column">
                        <Card.Title className="fs-5 mb-3">{card.title}</Card.Title>
                        <Card.Text className="flex-grow-1">{card.text}</Card.Text>
                        <Link to={card.link} className="mt-2">
                          <Button variant="outline-light" className="w-100 hover-scale">
                            {card.btnText}
                          </Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        <section className="bg-black text-white py-5 px-3 px-md-5">
          <div className="container">
            <h1 className="text-center mb-4 display-4">
              Les meilleures destinations
            </h1>

            <div className="row justify-content-center mb-4">
              <div className="col-md-8 text-center">
                <p className="lead">
                  Partez à la découverte de paysages incroyables, des déserts
                  aux plages superbes.
                </p>
              </div>
            </div>
            <div className="row g-4">
              {/* Matmata Card */}
              <div className="col-12 col-md-6 col-lg-4">
                <Card className="h-100 bg-dark text-light border-light hover-card">
                  <Card.Img
                    variant="top"
                    src={myImage}
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="text-center fs-5 mb-3">
                      Matmata, Gabes
                    </Card.Title>
                    <Card.Text className="flex-grow-1">
                      Matmata, au sud de la Tunisie, est réputée pour ses
                      habitations troglodytiques et sa culture berbère
                      authentique. Ce village, décor de films comme "Star Wars",
                      offre des paysages uniques et des expériences
                      écotouristiques enrichissantes.
                    </Card.Text>
                    <Link to="./Randonée">
                      <Button variant="outline-light" className="mt-auto w-100">
                        Découvrir
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <Card className="h-100 bg-dark text-light border-light hover-card">
                  <Card.Img
                    variant="top"
                    src={tata}
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="text-center fs-5 mb-3">
                      Tataouine, Tunisia
                    </Card.Title>
                    <Card.Text className="flex-grow-1">
                      Tataouine, au sud-est de la Tunisie, charme par ses
                      ksours, villages berbères perchés et paysages désertiques.
                      Idéale pour l'écotourisme, elle offre une immersion dans
                      la nature et les traditions locales.
                    </Card.Text>
                    <Link to="./Randonée">
                      <Button variant="outline-light" className="mt-auto w-100">
                        Explorer
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <Card className="h-100 bg-dark text-light border-light hover-card">
                  <Card.Img
                    variant="top"
                    src={tozeur}
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="text-center fs-5 mb-3">
                      Tozeur, Tunisia
                    </Card.Title>
                    <Card.Text className="flex-grow-1">
                      Tozeur, à l'ouest de la Tunisie, séduit par sa palmeraie,
                      son architecture en briques ocre et ses paysages
                      désertiques. Cette ville emblématique allie nature,
                      culture locale et écotourisme durable.
                    </Card.Text>
                    <Link to="./Randonée">
                      <Button variant="outline-light" className="mt-auto w-100">
                        Visiter
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTopButton />

    </>
  );
};

export default Accueil;
