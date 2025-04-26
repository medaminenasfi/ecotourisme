import React from "react";
import Navbar from "../Components/navbar";
import "./accueil.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Components/footer";
import backgroundImage from "../assest/Accueil.jpg";
import Container from "react-bootstrap/Container";
import Cuir from "../assest/Cuir.webp";
import Potier  from "../assest/potier.jpg";
import Tisserand from "../assest/tisserand.jpg";
import CircuitArtisan from "../Components/CircuitArtisan"



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
        <div className="content text-center" data-aos="fade-up">
    <h1 className="display-1 mb-4 artisan-title">
      L'Artisanat Local
      <span className="title-line"></span>
    </h1>
    <p className="lead fs-3 subtitle">
      L'Âme de Notre Patrimoine
    </p>
          </div>
        </section>

        <section className="bg-black text-white p-5 shadow-lg rounded-3">
  <h1 className="text-center mb-4">Carte des Artisans</h1>
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-12 col-md-8">
        <div className="map-container rounded-3">
          <CircuitArtisan />
        </div>
      </div>
    </div>
  </div>
</section>







<section className="bg-black text-white p-5 shadow-lg">
  <Container>
    <h1 className="text-center mb-5 display-3">Artisans à Découvrir Absolument</h1>
    <p className="text-center lead mb-5">
      Ces gardiens du savoir-faire traditionnel perpétuent notre héritage culturel
    </p>

    {/* Artisan du cuir */}
    <div className="row align-items-center mb-5">
      <div className="col-md-6 mb-4 mb-md-0">
        <img 
          src={Cuir} 
          alt="Artisan du cuir" 
          className="img-fluid rounded-3 shadow-lg"
          style={{ height: "400px", objectFit: "cover" }}
        />
      </div>
      <div className="col-md-6">
        <h2 className="mb-4">Maître Artisan du Cuir</h2>
        <div className="bg-dark p-4 rounded-3">
          <h5 className="text-warning mb-3">Mohamed - Spécialités :</h5>
          <ul className="list-unstyled">
            <li className="mb-3">🎒 Sacs en cuir traditionnels</li>
            <li className="mb-3">💼 Portefeuilles artisanaux</li>
            <li>👝 Ceintures sur mesure</li>
          </ul>
          <p className="text-light mb-0">
            Créations inspirées des traditions tunisiennes avec une touche moderne, 
            utilisant des cuirs locaux de première qualité.
          </p>
        </div>
      </div>
    </div>

    {/* Potière traditionnelle */}
    <div className="row align-items-center mb-5 flex-md-row-reverse">
      <div className="col-md-6 mb-4 mb-md-0">
        <img 
          src={Potier} 
          alt="Poterie traditionnelle" 
          className="img-fluid rounded-3 shadow-lg"
          style={{ height: "400px", objectFit: "cover" }}
        />
      </div>
      <div className="col-md-6">
        <h2 className="mb-4">Magicienne de l'Argile</h2>
        <div className="bg-dark p-4 rounded-3">
          <h5 className="text-warning mb-3">Rachida Zribi - Expertises :</h5>
          <ul className="list-unstyled">
            <li className="mb-3">🏺 Poterie utilitaire</li>
            <li className="mb-3">🎨 Céramique décorative</li>
            <li>🖌️ Peinture traditionnelle</li>
          </ul>
          <p className="text-light mb-0">
            Perpétue l'art ancestral du tour de potier avec des créations 
            liant design contemporain et motifs traditionnels.
          </p>
        </div>
      </div>
    </div>

    {/* Tisserand berbère */}
    <div className="row align-items-center">
      <div className="col-md-6 mb-4 mb-md-0">
        <img 
          src={Tisserand} 
          alt="Tissage traditionnel" 
          className="img-fluid rounded-3 shadow-lg"
          style={{ height: "400px", objectFit: "cover" }}
        />
      </div>
      <div className="col-md-6">
        <h2 className="mb-4">Garde des Motifs Berbères</h2>
        <div className="bg-dark p-4 rounded-3">
          <h5 className="text-warning mb-3">Ahmed Ben Kacem - Réalisations :</h5>
          <ul className="list-unstyled">
            <li className="mb-3">🧶 Tapis en laine naturelle</li>
            <li className="mb-3">🧵 Textiles traditionnels</li>
            <li>🎗️ Motifs ancestraux</li>
          </ul>
          <p className="text-light mb-0">
            Tisse l'histoire berbère à travers des pièces uniques fabriquées 
            selon des techniques transmises depuis des générations.
          </p>
        </div>
      </div>
    </div>
  </Container>
</section>


      </main>
      <Footer />
    </>
  );
};

export default Accueil;
