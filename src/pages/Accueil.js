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
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';


const Accueil = () => {
  console.log("Rendering Accueil page");
  return (
    <>
      <Navbar />
      <main>
        {/* Main Content Section */}
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
            <Button variant="secondary">Commencer votre aventure</Button>

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
          </div>
        </section>








        <br></br>
<h1 className="hell">Les meilleures destinations</h1>
          <div style={{ textAlign: "center" }}>
            <p>
              Partez à la découverte de paysages incroyables, des déserts aux
              plages superbes.
            </p>
            <br />
          </div>
<CardGroup>
      <Card>
        <Card.Img variant="top" src={tozeur} />
        <Card.Body>
          <Card.Title>Matmata, Gabes</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Img variant="top" src={tozeur}/>
        <Card.Body>
          <Card.Title>Tataouine</Card.Title>
          <Card.Text>
            This card has supporting text below as a natural lead-in to
            additional content.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Img variant="top" src={tata} />
        <Card.Body>
          <Card.Title>Tozeur, Tunisia</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This card has even longer content than the
            first to show that equal height action.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
    </CardGroup>






















<br></br>
<section>
<Container>
      <Row>
        <Col sm>
        <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={tozeur} />
      <Card.Body>
        <Card.Title>Carte interactive </Card.Title>
        <Card.Text>
        Parcourez des circuits écologiques selon la région, le niveau de difficulté ou vos intérêts.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
        </Col>
        <Col sm>
        
        <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={tozeur} />
      <Card.Body>
        <Card.Title>Espaces personnalisés</Card.Title>
        <Card.Text>
        Voyageur : consulter, réserver, laisser des avis.

Fournisseur : publier des services, suivre les réservations.

Administrateur : gérer les utilisateurs, circuits et services.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card></Col>
        <Col sm>  <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={tozeur} />
      <Card.Body>
        <Card.Title>Réservation en ligne</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card></Col>
      </Row>
    </Container><br></br>
    <Container>
      <Row>
        <Col sm>  <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={tozeur} />
      <Card.Body>
        <Card.Title>Artisans locaux</Card.Title>
        <Card.Text>
        Explorez les produits du terroir et soutenez l’économie locale.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card></Col>
        <Col sm>  <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={tozeur} />
      <Card.Body>
        <Card.Title> Tableau de bord</Card.Title>
        <Card.Text>
        Suivi des performances, statistiques en temps réel.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card></Col>
        <Col sm>  <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={tozeur} />
      <Card.Body>
        <Card.Title>Avis et réclamations</Card.Title>
        <Card.Text>
        Exprimez votre expérience, aidez-nous à améliorer.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card></Col>
      </Row>
    </Container>
</section>







        {/* Destinations Section */}
        <section className="bg-black text-white p-5 shadow-lg">
          <h1 className="hell">Les meilleures destinations</h1>
          <div style={{ textAlign: "center" }}>
            <p>
              Partez à la découverte de paysages incroyables, des déserts aux
              plages superbes.
            </p>
            <br />
          </div>
          <div style={{ textAlign: "center" }}>
            <Container>
              <Row>
                <Col>
                  <img
                    src={myImage}
                    alt="Habitations troglodytiques de Matmata, Tunisie"
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "50px",
                      objectFit: "cover",
                    }}
                  />
                </Col>
                <Col>
                  <h1>Matmata, Gabes</h1>
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
          </div>
          <br />
          <div style={{ textAlign: "center" }}>
            <Container>
              <Row>
                <Col>
                  <h1>Tozeur, Tunisia</h1>
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
                    alt="Palmeraie et architecture traditionnelle de Tozeur, Tunisie"
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
          </div>
          <br />
          <div style={{ textAlign: "center" }}>
            <Container>
              <Row>
                <Col>
                  <img
                    src={tata}
                    alt="Ksar et paysage désertique de Tataouine, Tunisie"
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "50px",
                      objectFit: "cover",
                    }}
                  />
                </Col>
                <Col>
                  <h1>Tataouine</h1>
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
          </div>
        </section>

  
      </main>
      <Footer />
    </>
  );
};

export default Accueil;
