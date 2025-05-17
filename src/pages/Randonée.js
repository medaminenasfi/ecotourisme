import React from "react";
import Navbar from "../Components/navbar";
import "./Randonée.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Components/footer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sidi from "../assest/sidi.jpg";
import tozeur from "../assest/Tozeur.jpg";
import Oriental from "../assest/oriental.jpg";
import CircuitMap from "../Components/CircuitMap";
import ScrollToTopButton from "../Components/ScrollToTopButton";

import { 
  Card as JoyCard, 
  CardCover, 
  CardContent 
} from '@mui/joy';
import Typography from '@mui/joy/Typography';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import bg1 from "../assest/ra.jpg";
import bg2 from "../assest/pexels-mahmoud-yahyaoui-28447102.jpg";
import bg3 from "../assest/pexels-mahmoud-yahyaoui-14765461.jpg";
import Carousel from "react-bootstrap/Carousel";
import jer from "../assest/djerba-3.jpg"
import ta from "../assest/tatouine.jpg"
import WeatherModal from "../Components/WeatherModal.jsx";
import { WiCloud } from 'react-icons/wi';
import { Button } from "react-bootstrap";
import RecommendationModal from "../Components/RecommendationModal";

const Accueil = () => {
  const position1 = [36.806389, 10.181667]; // Coordinates for CircuitMap
  const [showModal, setShowModal] = React.useState(false);

  const handleOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
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
              Explorer <br /> Nos Circuits et Randonnées
            </h1>
                    </center>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </section>
        {/* Map Section */}
        <section className="bg-black text-white p-5 shadow-lg">
          <Container>
          <CircuitMap center={position1} />

          </Container>
        </section>



        <section className="bg-black text-white py-5">
          <Container>
            <div className="row justify-content-center">
              <div className="col-md-8 text-center mb-5">
                <h2 className="display-4 mb-4">Services Intelligents</h2>
                <p className="lead">Planifiez votre voyage avec nos outils intelligents</p>
              </div>
            </div>
            
            <div className="row justify-content-center g-4">
              {/* Section Météo */}
              <div className="col-md-6">
                <div className="bg-dark p-4 rounded-3 h-100 shadow-lg">
                  <h3 className="text-center mb-4">
                    <WiCloud className="me-2" style={{ fontSize: '2rem' }} />
                    Météo en Direct
                  </h3>
                  <p className="text-center mb-4">
                    Consultez les conditions météorologiques en temps réel pour planifier votre randonnée
                  </p>
                  <div className="d-flex justify-content-center">
                    <WeatherModal />
                  </div>
                </div>
              </div>

              {/* Section Recommandation IA */}
              <div className="col-md-6">
                <div className="bg-dark p-4 rounded-3 h-100 shadow-lg">
                  <h3 className="text-center mb-4">
                    <span role="img" aria-label="AI" className="me-2" style={{ fontSize: '2rem' }}>🤖</span>
                    Recommandation IA
                  </h3>
                  <p className="text-center mb-4">
                    Obtenez des suggestions personnalisées pour votre prochaine aventure
                  </p>
                  <div className="d-flex justify-content-center">
                    <Button 
                      variant="success" 
                      size="lg"
                      onClick={handleOpen}
                      className="px-5 py-3 rounded-pill shadow"
                      style={{
                        fontSize: '1.2rem',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Demander une recommandation
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* POPUP MODALE */}
        <RecommendationModal show={showModal} handleClose={handleClose} />

        {/* Featured Circuits Section */}
        <section className="bg-black text-white p-5 shadow-lg">
          <Container>
            <h2 className="text-center mb-5 display-4">Destination  extraordinaire
        </h2>
            
            <Row className="g-4 justify-content-center">
              {/* Circuit 1 - Tozeur */}
              <Col xs={12} md={6} lg={4}>
                <JoyCard sx={{ 
                  minHeight: 280, 
                  width: '100%',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <CardCover>
                    <img
                      src={tozeur}
                      loading="lazy"
                      alt="Oasis de Tozeur"
                      style={{ filter: 'brightness(0.7)' }}
                    />
                  </CardCover>
                  <CardContent sx={{ 
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 30%, transparent)'
                  }}>
                    
                    <Typography
                      startDecorator={<LocationOnRoundedIcon sx={{ color: 'white' }} />}
                      textColor="neutral.300"
                      fontSize="lg"
                    >
Tozeur (Sud-Ouest)            </Typography>
                  </CardContent>
                </JoyCard>
              </Col>

              {/* Circuit 2 - Médina de Tunis */}
              <Col xs={12} md={6} lg={4} order={{ lg: 5 }}>
                <JoyCard sx={{ 
                  minHeight: 280,
                  width: '100%',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <CardCover>
                    <img
                      src={jer}
                      loading="lazy"
                      alt="Médina de Tunis"
                      style={{ filter: 'brightness(0.7)' }}
                    />
                  </CardCover>
                  <CardContent sx={{ 
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 30%, transparent)'
                  }}>
            
                    <Typography
                      startDecorator={<LocationOnRoundedIcon sx={{ color: 'white' }} />}
                      textColor="neutral.300"
                      fontSize="lg"
                    >
Djerba (Sud-Est)            </Typography>
                  </CardContent>
                </JoyCard>
              </Col>

              {/* Circuit 3 - Grand Erg Oriental */}
              <Col xs={12} md={6} lg={4} order={{ lg: 0 }}>
                <JoyCard sx={{ 
                  minHeight: 280,
                  width: '100%',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <CardCover>
                    <img
                      src={ta}
                      loading="lazy"
                      alt="Grand Erg Oriental"
                      style={{ filter: 'brightness(0.7)' }}
                    />
                  </CardCover>
                  <CardContent sx={{ 
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 30%, transparent)'
                  }}>
                
                    <Typography
                      startDecorator={<LocationOnRoundedIcon sx={{ color: 'white' }} />}
                      textColor="neutral.300"
                      fontSize="lg"
                    >
Tataouine (Extrême Sud)            </Typography>
                  </CardContent>
                </JoyCard>
              </Col>
            </Row>
          </Container>
        </section>




        {/* Circuits Section */}
        <section className="bg-black text-white p-5 shadow-lg">
          <div className="container">
            <h1 className="text-center mb-5 display-3">Circuits Célèbres à Ne Pas Manquer</h1>
            <p className="text-center lead mb-5">
              Découvrez les itinéraires les plus emblématiques de la région, entre désert et patrimoine historique.
            </p>

            {/* Circuit 1: Oasis de Tozeur */}
            <div className="row align-items-center mb-5">
              <div className="col-md-6 mb-4 mb-md-0">
                <img 
                  src={tozeur} 
                  alt="Oasis de Tozeur" 
                  className="img-fluid rounded-3 shadow-lg"
                  style={{ height: "400px", objectFit: "cover" }}
                />
              </div>
              <div className="col-md-6">
                <h2 className="mb-4">Circuit de l'Oasis de Tozeur</h2>
                <p className="lead mb-4">
                  Explorez les oasis de Tozeur, avec ses palmeraies, canyons et villages berbères.
                </p>
                <div className="bg-dark p-4 rounded-3">
                  <h5 className="text-warning mb-3">Points d'intérêt :</h5>
                  <ul className="list-unstyled">
                    <li className="mb-3">🏞️ Chebika, une oasis en montagne</li>
                    <li className="mb-3">💦 Tamerza, avec ses cascades naturelles</li>
                    <li>🏰 Ksar Ouled Soltane, un ksar typique</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Circuit 2: Médina de Tunis et Sidi Bou Saïd */}
            <div className="row align-items-center mb-5 flex-md-row-reverse">
              <div className="col-md-6 mb-4 mb-md-0">
                <img 
                  src={Sidi} 
                  alt="Médina de Tunis" 
                  className="img-fluid rounded-3 shadow-lg"
                  style={{ height: "400px", objectFit: "cover" }}
                />
              </div>
              <div className="col-md-6">
                <h2 className="mb-4">Circuit Médina de Tunis & Sidi Bou Saïd</h2>
                <p className="lead mb-4">
                  Découvrez les ruelles pittoresques de la médina et le charme de Sidi Bou Saïd.
                </p>
                <div className="bg-dark p-4 rounded-3">
                  <h5 className="text-warning mb-3">Points d'intérêt :</h5>
                  <ul className="list-unstyled">
                    <li className="mb-3">🏛️ Médina de Tunis (UNESCO)</li>
                    <li className="mb-3">🕌 Mosquée Zitouna</li>
                    <li>🌇 Sidi Bou Saïd et ses panoramas</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Circuit 3: Grand Erg Oriental */}
            <div className="row align-items-center">
              <div className="col-md-6 mb-4 mb-md-0">
                <img 
                  src={Oriental} 
                  alt="Grand Erg Oriental" 
                  className="img-fluid rounded-3 shadow-lg"
                  style={{ height: "400px", objectFit: "cover" }}
                />
              </div>
              <div className="col-md-6">
                <h2 className="mb-4">Circuit du Grand Erg Oriental</h2>
                <p className="lead mb-4">
                  Traversez le désert du Sahara et explorez les dunes dorées du Grand Erg Oriental.
                </p>
                <div className="bg-dark p-4 rounded-3">
                  <h5 className="text-warning mb-3">Points d'intérêt :</h5>
                  <ul className="list-unstyled">
                    <li className="mb-3">🏜️ Dunes de Douz</li>
                    <li className="mb-3">🧂 Chott el Jerid, un grand lac salé</li>
                    <li>🛖 Village traditionnel berbère</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>


            

        {/* Reservation Section */}
  
      </main>
      <Footer />
      <ScrollToTopButton />

    </>
  );
};

export default Accueil;
