import React from "react";
import Navbar from "../Components/navbar";
import "./Randonée.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Components/footer";
import Randonne from "../assest/Randonne.jpg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sidi from "../assest/sidi.jpg";
import tozeur from "../assest/Tozeur.jpg";
import Oriental from "../assest/oriental.jpg";
import CircuitMap from "../Components/CircuitMap";

const Accueil = () => {
  const position1 = [36.806389, 10.181667]; // Coordinates for CircuitMap

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section
          className="d-flex align-items-center justify-content-center text-white"
          style={{
            backgroundImage: `url(${Randonne})`,
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
              Explorer <br /> Nos Circuits et Randonnées
            </h1>
          </div>
        </section>

        {/* Map Section */}
        <section className="bg-black text-white p-5 shadow-lg">
          <h1 className="text-center">Explorer Nos Circuits en Carte</h1>
          <Container>
            <Row>
              <Col xs={12} md={6} className="text-center">
                <CircuitMap center={position1} />
              </Col>
              <Col xs={12} md={6} className="text-center">
                <p>Découvrez nos circuits et planifiez votre prochaine aventure.</p>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Circuits Section */}
        <section className="bg-black text-white p-5 shadow-lg">
          <h1 className="text-center">Circuits Célèbres à Ne Pas Manquer</h1>
          <p className="text-center">
            Découvrez les itinéraires les plus emblématiques de la région, entre désert et patrimoine historique.
          </p>

          {/* Circuit 1: Oasis de Tozeur */}
          <Container className="mt-5">
            <Row>
              <Col md={6}>
                <img
                  src={tozeur}
                  alt="Oasis de Tozeur"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "50px",
                    objectFit: "cover",
                  }}
                />
              </Col>
              <Col md={6}>
                <h2>Circuit de l’Oasis de Tozeur</h2>
                <p>
                  Explorez les oasis de Tozeur, avec ses palmeraies, canyons et villages berbères.
                  <br />
                  <strong>Points d’intérêt :</strong>
                  <ul>
                    <li>Chebika, une oasis en montagne</li>
                    <li>Tamerza, avec ses cascades naturelles</li>
                    <li>Ksar Ouled Soltane, un ksar typique</li>
                  </ul>
                </p>
              </Col>
            </Row>
          </Container>

          {/* Circuit 2: Médina de Tunis et Sidi Bou Saïd */}
          <Container className="mt-5">
            <Row>
              <Col md={6}>
                <h2>Circuit de la Médina de Tunis et Sidi Bou Saïd</h2>
                <p>
                  Découvrez les ruelles pittoresques de la médina et le charme de Sidi Bou Saïd.
                  <br />
                  <strong>Points d’intérêt :</strong>
                  <ul>
                    <li>Médina de Tunis (UNESCO)</li>
                    <li>Mosquée Zitouna</li>
                    <li>Sidi Bou Saïd et ses panoramas</li>
                  </ul>
                </p>
              </Col>
              <Col md={6}>
                <img
                  src={Sidi}
                  alt="Médina de Tunis et Sidi Bou Saïd"
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

          {/* Circuit 3: Grand Erg Oriental */}
          <Container className="mt-5">
            <Row>
              <Col md={6}>
                <img
                  src={Oriental}
                  alt="Grand Erg Oriental"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "50px",
                    objectFit: "cover",
                  }}
                />
              </Col>
              <Col md={6}>
                <h2>Circuit du Grand Erg Oriental</h2>
                <p>
                  Traversez le désert du Sahara et explorez les dunes dorées du Grand Erg Oriental.
                  <br />
                  <strong>Points d’intérêt :</strong>
                  <ul>
                    <li>Dunes de Douz</li>
                    <li>Chott el Jerid, un grand lac salé</li>
                    <li>Village traditionnel berbère</li>
                  </ul>
                </p>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Reservation Section */}
  
      </main>
      <Footer />
    </>
  );
};

export default Accueil;
