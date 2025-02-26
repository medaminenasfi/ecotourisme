import React from "react";
import Navbar from "../Components/navbar";
import "./accueil.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Components/footer";
import backgroundImage from "../assest/Accueil.jpg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import myImage from "../assest/matmata.webp";
import tozeur from "../assest/Tozeur.jpg";
import tata from "../assest/tatouine.jpg";
import { Link } from "react-router-dom";
import Randonée from "../pages/Randonée";

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
            <h1>
              Explorer <br /> la nature autrement
            </h1>
            <p className="lead">
              Explorez des paysages enchanteurs, des déserts aux plages
              superbes.
            </p>
          </div>
          {/* Citations en bas */}
          <div className="quotes">
            <p className="quote left">
              "Regardez profondément dans la nature, et vous comprendrez mieux
              tout."
              <br />
              <strong>— Albert Einstein</strong>
            </p>
            <p className="quote right">
              "Quand un homme s’éloigne de la nature, son cœur devient dur."
              <br />
              <strong>— Proverbe Lakota</strong>
            </p>
          </div>{" "}
        </section>
        <section className="bg-black text-white p-5 shadow-lg">
          <h1 classname="hell">Les meilleures destinations</h1>
          <br />
          <center>
            {" "}
            <p>
              Partez à la découverte de paysages incroyables, des déserts aux
              plages superbes.
            </p>{" "}
            <br />
          </center>
          <center>
            <Container>
              <Row>
                <Col>
                  <img
                    src={myImage}
                    alt="Description of the image"
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "50px",
                      objectFit: "cover",
                    }}
                  />
                </Col>
                <Col>
                  <br /> <br /> <br />
                  <h1>Matmata, gabes.</h1>
                  <br /> <br />
                  <p>
                    Située au sud de la Tunisie, Matmata est une destination
                    unique connue pour ses habitations troglodytiques creusées
                    dans la roche, offrant une immersion authentique dans la
                    culture berbère. Ce village pittoresque, célèbre pour avoir
                    servi de décor à des films comme Star Wars, attire les
                    visiteurs en quête de paysages atypiques et d’expériences
                    écotouristiques enrichissantes.
                  </p>
                </Col>
              </Row>
            </Container>
          </center>
          <br /> <br />
          <center>
            <Container>
              <Row>
                <Col>
                  <br /> <br /> <br />
                  <h1>Tozeur, Tunisia</h1>
                  <br /> <br />
                  <p>
                    Située à l’ouest de la Tunisie, aux portes du désert du
                    Sahara, Tozeur est une ville emblématique pour les amateurs
                    d’écotourisme et d’aventures. Connue pour son immense
                    palmeraie, son architecture traditionnelle en briques ocre
                    et ses paysages désertiques époustouflants, Tozeur offre une
                    immersion authentique dans la nature et la culture locale,
                    tout en favorisant un tourisme durable.
                  </p>
                </Col>
                <Col>
                  <img
                    src={tozeur}
                    alt="Description of the image"
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "50px",
                      objectFit: "cover",
                    }}
                  />
                </Col>
              </Row>
            </Container>
          </center>
          <br /> <br /> <br />
          <center>
            <Container>
              <Row>
                <Col>
                  <img
                    src={tata}
                    alt="Description of the image"
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "50px",
                      objectFit: "cover",
                    }}
                  />
                </Col>
                <Col>
                  <br /> <br />
                  <h1>tataouin</h1>
                  <br /> <br />
                  <p>
                    Nichée au sud-est de la Tunisie, Tataouine est une terre de
                    contrastes où le désert rencontre des paysages montagneux
                    spectaculaires et un patrimoine culturel riche. Réputée pour
                    ses ksours (greniers fortifiés) et ses villages berbères
                    perchés, Tataouine est une destination idéale pour les
                    amateurs d’écotourisme et d’aventure, offrant une immersion
                    authentique dans la nature et les traditions locales.
                  </p>
                </Col>
              </Row>
            </Container>
          </center>
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
                <Link to="/Randonée" className="frame-1"></Link>
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
