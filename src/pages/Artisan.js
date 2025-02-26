import React from "react";
import Navbar from "../Components/navbar";
import "./accueil.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Components/footer";
import backgroundImage from "../assest/Accueil.jpg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Cuir from "../assest/Cuir.webp";
import Potier  from "../assest/potier.jpg";
import Tisserand from "../assest/tisserand.jpg";




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
L'Artisanat Local            </h1>
            <p className="lead">
            L'âme de notre Patrimoine
            </p>
          </div>
          
        </section>

   <section className="bg-black text-white p-5 shadow-lg">
   <h1 classname="hell">Carte des Artisans</h1>
   /* Section pour carte */
   </section>







        <section className="bg-black text-white p-5 shadow-lg">
          <h1 classname="hell">Artisans Populaires</h1> <br/>
          <center>
            {" "}
            <p>
            L'artisan n'est pas simplement un créateur, il est un passeur de traditions et de savoir-faire.
            </p>{" "}<br/><br/>
          </center>

          <center>
            <Container>
              <Row>
                <Col>
                  <img
                    src={Cuir}
                    alt="Description of the image"
                    style={{ width: "100%", height: "auto" ,
                      borderRadius: "50px",
                      objectFit: "cover",}}
                  />
                </Col>
                <Col>
                  <h1> L'artisan du cuir</h1><br/><br/> 
                  <p>
                  Spécialité : Fabrication de sacs, ceintures et portefeuilles en cuir artisanal.
                  Description : Mohamed est un maître artisan du cuir, dont les créations sont inspirées des traditions tunisiennes, mais avec une touche moderne. Chaque pièce est fabriquée à la main avec des cuirs de haute qualité provenant de producteurs locaux.
                  </p>
                </Col>
              </Row>
            </Container>
          </center><br/><br/>
          <center>
            <Container>
              <Row>
                <Col><br/><br/>
                  <h1>Le potier traditionnel :</h1><br/><br/>
                  <p>
                  Nom : Rachida Zribi
Spécialité : Pottery and ceramic art (pots, vases, plateaux décoratifs).
Description : Rachida est une potière qui perpétue la tradition du potier tunisien en fabriquant des pièces décoratives et utilitaires en argile. Ses créations sont très populaires grâce à leur design original et leur connexion avec les racines culturelles de la région.
Pourquoi elle est populaire : Sa maîtrise du tour de potier et de la peinture sur céramique lui a permis de s'imposer comme l'une des figures emblématiques de l'artisanat de la région.
                  </p>
                </Col>
                <Col>
                  <img
                    src={Potier }
                    alt="Description of the image"
                    style={{ width: "100%", height: "auto" ,
                      borderRadius: "50px",
                      objectFit: "cover", }}
                  />
                </Col>
              </Row>
            </Container>
          </center><br/><br/>
          <center>
            <Container>
              <Row>
                <Col>
                  <img
                    src={Tisserand }
                    alt="Description of the image"
                    style={{ width: "100%", height: "auto",
                      borderRadius: "50px",
                      objectFit: "cover", }}
                  />
                </Col>
                <Col><br/><br/><br/>
                  <h1>Le tisserand berbère</h1><br/><br/>
                  <p>
                  Nom : Ahmed Ben Kacem
Spécialité : Tissage de tapis et textiles traditionnels berbères.
Description : Ahmed est un tisserand berbère spécialisé dans la création de tapis et textiles traditionnels à partir de laine naturelle. Il travaille selon des techniques ancestrales transmises par ses ancêtres.
Pourquoi il est populaire : Ses tapis et couvertures sont connus pour leurs motifs uniques et leur qualité exceptionnelle, représentant fièrement la culture berbère dans chaque fil.
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
