import React, { useState } from "react";
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
import RecommendationModal from '../Components/RecommendationModal';
import {  Container } from 'react-bootstrap';

const Accueil = () => {

  console.log("Rendering Accueil page");
  const [showModal, setShowModal] = useState(false); // <-- dans la fonction

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
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
                  <div className="content text-white text-center">
                    <center>
                      <h1>
                        Explorer <br /> la nature autrement
                      </h1>
                      <Link to="/Randonée">
                        <Button variant="light">
                          Commencer votre aventure
                        </Button>
                      </Link>
                      <p className="lead mt-3">
                        Explorez des paysages enchanteurs, des déserts aux
                        plages superbes.
                      </p>
                    </center>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </section>

        <section className="bg-black text-white py-5 px-3 px-md-5">
          <div className="container">
            <h1 className="text-center mb-5 display-4">
              🌿 Pourquoi choisir EcoTourisme TN ?
            </h1>

            <div className="row g-4">
              {/* First Row */}
              <div className="col-12 col-md-6 col-lg-4">
                <Card className="h-100 bg-dark text-light border-light hover-shadow">
                  <Card.Img
                    variant="top"
                    src={card2}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fs-5 mb-3">
                      🗺️ Carte interactive
                    </Card.Title>
                    <Card.Text className="flex-grow-1">
                      Visualisez rapidement les circuits disponibles partout en
                      Tunisie grâce à une carte interactive intuitive.
                    </Card.Text>
                    <Link to="/Randonée" className="mt-2">
                      <Button variant="outline-light" className="w-100">
                        Explorer la carte
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <Card className="h-100 bg-dark text-light border-light hover-shadow">
                  <Card.Img
                    variant="top"
                    src={card6}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fs-5 mb-3">
                      👥 Profils personnalisés
                    </Card.Title>
                    <Card.Text className="flex-grow-1">
                      Voyageurs, fournisseurs ou administrateurs : chacun
                      dispose d'un espace adapté à ses besoins.
                    </Card.Text>
                    <Link to="./profile" className="mt-2">
                      <Button variant="outline-light" className="w-100">
                        Voir mon espace
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <Card className="h-100 bg-dark text-light border-light hover-shadow">
                  <Card.Img
                    variant="top"
                    src={card1}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fs-5 mb-3">
                      🕒 Réservation rapide
                    </Card.Title>
                    <Card.Text className="flex-grow-1">
                      Réservez votre randonnée ou votre activité en quelques
                      clics, en toute sécurité.
                    </Card.Text>
                    <Link to="./Reservation" className="mt-2">
                      <Button variant="outline-light" className="w-100">
                        Réserver un circuit
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>

              {/* Second Row */}
              <div className="col-12 col-md-6 col-lg-4">
                <Card className="h-100 bg-dark text-light border-light hover-shadow">
                  <Card.Img
                    variant="top"
                    src={card3}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fs-5 mb-3">
                      🛍️ Artisans locaux
                    </Card.Title>
                    <Card.Text className="flex-grow-1">
                      Explorez les produits du terroir et soutenez l'économie
                      locale.
                    </Card.Text>
                    <Link to="./Artisan" className="mt-2">
                      <Button variant="outline-light" className="w-100">
                        Découvrir les artisans
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <Card className="h-100 bg-dark text-light border-light hover-shadow">
                  <Card.Img
                    variant="top"
                    src={card4}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fs-5 mb-3">💬 Avis</Card.Title>
                    <Card.Text className="flex-grow-1">
                      Laissez un commentaire sur votre expérience.
                    </Card.Text>
                    <Link to="../gestion/avis" className="mt-2">
                      <Button variant="outline-light" className="w-100">
                        Donner un avis
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <Card className="h-100 bg-dark text-light border-light hover-shadow">
                  <Card.Img
                    variant="top"
                    src={card5}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fs-5 mb-3">
                      💬 Réclamations
                    </Card.Title>
                    <Card.Text className="flex-grow-1">
                      Rencontrez un souci ? Notre équipe vous répond rapidement.
                    </Card.Text>
                    <Link to="../gestion/reclamations" className="mt-2">
                      <Button variant="outline-light" className="w-100">
                        Faire une réclamation
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
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
