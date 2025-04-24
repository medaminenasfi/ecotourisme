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
import Carousel from 'react-bootstrap/Carousel';


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
            <Link to="/Randonée">
  <Button variant="secondary">Commencer votre aventure</Button>
</Link>
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




<section  className="bg-black text-white p-5 shadow-lg">
  <h1>🌿 Pourquoi choisir EcoTourisme TN ?</h1>
<br></br>
<center>

          <Container>
      <Row>
        <Col sm>
        <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={tozeur} />
      <Card.Body>
        <Card.Title>🗺️ Carte interactive </Card.Title>
        <Card.Text>
        Visualisez rapidement les circuits disponibles partout en Tunisie grâce à une carte interactive intuitive.        </Card.Text>
        <center>
        <Link to="/Randonée">
        <Button variant="primary">Explorer la carte</Button>
        </Link>
        </center>
      </Card.Body>
    </Card>
        </Col>
        <Col sm>
        
        <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={tozeur} />
      <Card.Body>
        <Card.Title>👥 Profils personnalisés</Card.Title>
        <Card.Text>
        Voyageurs, fournisseurs ou administrateurs : chacun dispose d’un espace adapté à ses besoins.
        </Card.Text>
        <center>      
        <Link to="./profile">
            <Button variant="primary">Voir mon espace</Button>
            </Link>
        </center>
      </Card.Body>
    </Card></Col>
        <Col sm>  <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={tozeur} />
      <Card.Body>
        <Card.Title>🕒 Réservation rapide</Card.Title>
        <Card.Text>
        Réservez votre randonnée ou votre activité en quelques clics, en toute sécurité.

</Card.Text>
<center>
<Link to="./Reservation">
<Button variant="primary">Réserver un circuit</Button>
</Link>
</center>
      </Card.Body>
    </Card></Col>
      </Row>
    </Container><br></br>
    <Container>
      <Row>
        <Col sm>  <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={tozeur} />
      <Card.Body>
        <Card.Title>🛍️ Artisans locaux</Card.Title>
        <Card.Text>
        Explorez les produits du terroir et soutenez l’économie locale.
        </Card.Text>
        <center>    
        <Link to="./Artisan">
              <Button variant="primary">Découvrir les artisans</Button>
              </Link>
        </center>
      </Card.Body>
    </Card></Col>
        <Col sm>  <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={tozeur} />
      <Card.Body>
        <Card.Title>💬  Avis</Card.Title>
        <Card.Text>
        Laissez un commentaire sur votre expérience. </Card.Text>
        <center>   
        <Link to="../gestion/avis">  
            <Button variant="primary">Donner un avis</Button>
            </Link> 
        </center>
        
      </Card.Body>
    </Card></Col>
        <Col sm>  <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={tozeur} />
      <Card.Body>
        <Card.Title>💬   Réclamations</Card.Title>
        <Card.Text>
        Rencontrez un souci ?Notre équipe vous répond rapidement.
</Card.Text>
<center>      
<Link to="../gestion/reclamations">  

            <Button variant="primary">Faire une réclamation</Button>
            </Link>
        </center>      </Card.Body>
    </Card></Col>
      </Row>
    </Container>
    </center>

    </section>






<section  className="bg-black text-white p-5 shadow-lg">

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
        <Card.Img variant="top" src={myImage} />
        <Card.Body>
          <Card.Title>
            <center>  Matmata, Gabes</center>
          </Card.Title>
          <Card.Text>
          Matmata, au sud de la Tunisie, est réputée pour ses habitations troglodytiques et sa culture berbère authentique. Ce village, décor de films comme "Star Wars", offre des paysages uniques et des expériences écotouristiques enrichissantes.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Img variant="top" src={tata}/>
        <Card.Body>
          <Card.Title>
            <center>Tataouine,Tunisia</center>
            </Card.Title>
          <Card.Text>
          Tataouine, au sud-est de la Tunisie, charme par ses ksours, villages berbères perchés et paysages désertiques. Idéale pour l’écotourisme, elle offre une immersion dans la nature et les traditions locales.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Img variant="top" src={tozeur} />
        <Card.Body>
          <Card.Title>
            <center>
            Tozeur, Tunisia
            </center></Card.Title>
          <Card.Text>
          Tozeur, à l’ouest de la Tunisie, séduit par sa palmeraie, son architecture en briques ocre et ses paysages désertiques. Cette ville emblématique allie nature, culture locale et écotourisme durable.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
    </CardGroup>


</section>



      </main>
      <Footer />
    </>
  );
};

export default Accueil;
