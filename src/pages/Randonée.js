import React from "react";
import Navbar from "../Components/navbar";
import "./Randonée.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Components/footer";
import backgroundImage from "../assest/Accueil.jpg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sidi from "../assest/sidi.jpg";
import tozeur from "../assest/Tozeur.jpg";
import Oriental from "../assest/oriental.jpg";
import { Link } from "react-router-dom";


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
            <center>
              <h1>
                Explorer <br /> Nos Circuits et Randonnées
              </h1>
            </center>
          </div>
        </section>
        <section className="bg-black text-white p-5 shadow-lg">
          <h1 classname="hell">Explorer Nos Circuits en Carte</h1>
          <h1>jyyfufuyk
</h1>
<h1>kugmighm</h1>
<h2>oihiomimgh</h2>
<h3>Carte </h3>

        </section>

        <section className="bg-black text-white p-5 shadow-lg">
          <h1 classname="hell">Circuits Célèbres à Ne Pas Manquer</h1> <br/>
          <center>
            {" "}
            <p>
              Découvrez les itinéraires les plus emblématiques de la région,
              entre désert et patrimoine historique.
            </p>{" "}<br/>
          </center>

          <center>
            <Container>
              <Row>
                <Col>
                  <img
                    src={tozeur}
                    alt="Description of the image"
                    style={{ width: "100%", height: "auto" ,borderRadius: "50px",
                      objectFit: "cover",}}
                  />
                </Col>
                <Col><br/><br/>
                  <h1>Circuit de l’Oasis de Tozeur</h1><br/>  
                  <p>
                    e circuit traverse les oasis de Tozeur, l’une des régions
                    les plus vertes du sud tunisien, où les visiteurs découvrent
                    une mosaïque de palmeraies, de canyons et de villages
                    traditionnels berbères. La visite inclut la découverte de
                    l'architecture des ksours et des montagnes environnantes.{" "}
                    <br />
                    Points d’intérêt :<br />
                    Chebika, une oasis en montagne
                    <br />
                    Tamerza, avec ses cascades naturelles
                    <br />
                    Ksar Ouled Soltane, un ksar typique
                    <br />
                  </p>
                </Col>
              </Row>
            </Container>
          </center><br/><br/><br/>
          <center>
            <Container>
              <Row>
                <Col><br/>
                  <h1>Circuit de la Médina de Tunis et Sidi Bou Saïd</h1><br/>
                  <p>
                    Ce circuit culturel explore les rues pittoresques de la
                    médina de Tunis et les charmantes ruelles de Sidi Bou Saïd,
                    un village côtier célèbre pour ses maisons blanches et
                    bleues. C’est une expérience immersive dans la culture,
                    l'histoire et l'artisanat tunisien. Points d’intérêt :
                    Médina de Tunis, classée au patrimoine mondial de l’UNESCO
                    Mosquée Zitouna Sidi Bou Saïd, avec ses vues panoramiques
                    sur la mer Méditerranée
                  </p>
                </Col>
                <Col>
                  <img
                    src={Sidi}
                    alt="Description of the image"
                    style={{ width: "100%", height: "auto"  ,borderRadius: "50px",
                      objectFit: "cover",}}
                  />
                </Col>
              </Row>
            </Container>
          </center><br/><br/><br/>
          <center>
            <Container>
              <Row>
                <Col>
                  <img
                    src={Oriental}
                    alt="Description of the image"
                    style={{ width: "100%", height: "auto" , borderRadius: "50px",
                      objectFit: "cover", }}
                  />
                </Col>
                <Col>
                  <h1>Circuit du Grand Erg Oriental</h1><br/>
                  <p>
                    Ce circuit emmène les visiteurs à travers le désert du
                    Sahara, dans les dunes dorées du Grand Erg Oriental, à la
                    découverte de l'immensité du désert tunisien. Les
                    randonneurs peuvent explorer les paysages à couper le
                    souffle et vivre une expérience authentique à dos de
                    dromadaire ou en 4x4. Points d’intérêt : Dunes de Douz Chott
                    el Jerid, un grand lac salé Village traditionnel berbère
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
    <div className="mask-group"></div>
    <span className="explore-tunisia">
      Explorez
      <br />
      Réservation
    </span>
    <Link to="/Reservation" className="frame-1"></Link>
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
