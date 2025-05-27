import React, {  useEffect } from "react";
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
import { Card as JoyCard, CardCover, CardContent } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import bg1 from "../assest/ra.jpg";
import bg2 from "../assest/pexels-mahmoud-yahyaoui-28447102.jpg";
import bg3 from "../assest/pexels-mahmoud-yahyaoui-14765461.jpg";
import Carousel from "react-bootstrap/Carousel";
import jer from "../assest/djerba-3.jpg";
import ta from "../assest/tatouine.jpg";
import WeatherModal from "../Components/WeatherModal.jsx";
import { WiCloud } from "react-icons/wi";
import { Button } from "react-bootstrap";
import RecommendationModal from "../Components/RecommendationModal";
import { motion } from "framer-motion";

const Accueil = () => {
  const position1 = [36.806389, 10.181667]; // Coordinates for CircuitMap
  const [showModal, setShowModal] = React.useState(false);
// Add scroll restoration
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const handleOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };
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
                        Explorer <br /> Nos Circuits et Randonnées
                      </motion.h1>
                    </center>
                  </motion.div>
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
                <p className="lead">
                  Planifiez votre voyage avec nos outils intelligents
                </p>
              </div>
            </div>

            <div className="row justify-content-center g-4">
              {/* Section Météo */}
              <div className="col-md-6">
                <div className="bg-dark p-4 rounded-3 h-100 shadow-lg">
                  <h3 className="text-center mb-4">
                    <WiCloud className="me-2" style={{ fontSize: "2rem" }} />
                    Météo en Direct
                  </h3>
                  <p className="text-center mb-4">
                    Consultez les conditions météorologiques en temps réel pour
                    planifier votre randonnée
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
                    <span
                      role="img"
                      aria-label="AI"
                      className="me-2"
                      style={{ fontSize: "2rem" }}
                    >
                      🤖
                    </span>
                    Recommandation IA
                  </h3>
                  <p className="text-center mb-4">
                    Obtenez des suggestions personnalisées pour votre prochaine
                    aventure
                  </p>
                  <div className="d-flex justify-content-center">
                    <Button
                      variant="success"
                      size="lg"
                      onClick={handleOpen}
                      className="px-5 py-3 rounded-pill shadow"
                      style={{
                        fontSize: "1.2rem",
                        transition: "all 0.3s ease",
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
<motion.section 
          className="bg-black text-white p-5 shadow-lg"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Container>
            <motion.h2 
              className="text-center mb-5 display-4"
              variants={itemVariants}
            >
              Destination extraordinaire
            </motion.h2>
            
            <Row className="g-4 justify-content-center">
              {/* Circuit Cards */}
              {[
                { img: tozeur, title: "Tozeur (Sud-Ouest)" },
                { img: jer, title: "Djerba (Sud-Est)" },
                { img: ta, title: "Tataouine (Extrême Sud)" }
              ].map((circuit, index) => (
                <motion.div
                  key={index}
                  className="col"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <JoyCard sx={{ 
                    minHeight: 280,
                    width: '100%',
                    overflow: 'hidden',
                    position: 'relative',
                    transition: 'transform 0.3s ease'
                  }}>
                    <CardCover>
                      <img
                        src={circuit.img}
                        loading="lazy"
                        alt={circuit.title}
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
                        {circuit.title}
                      </Typography>
                    </CardContent>
                  </JoyCard>
                </motion.div>
              ))}
            </Row>
          </Container>
        </motion.section>

        {/* Circuits Section */}
      <motion.section 
          className="bg-black text-white p-5 shadow-lg"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="container">
            <motion.h1 
              className="text-center mb-5 display-3"
              variants={itemVariants}
            >
              Circuits Célèbres à Ne Pas Manquer
            </motion.h1>
            <motion.p 
              className="text-center lead mb-5"
              variants={itemVariants}
            >
              Découvrez les itinéraires les plus emblématiques de la région, entre désert et patrimoine historique.
            </motion.p>

            {/* Circuit Details */}
            {[
              {
                img: tozeur,
                title: "Circuit de l'Oasis de Tozeur",
                description: "Explorez les oasis de Tozeur, avec ses palmeraies, canyons et villages berbères.",
                points: [
                  "🏞️ Chebika, une oasis en montagne",
                  "💦 Tamerza, avec ses cascades naturelles",
                  "🏰 Ksar Ouled Soltane, un ksar typique"
                ]
              },
              {
                img: Sidi,
                title: "Circuit Médina de Tunis & Sidi Bou Saïd",
                description: "Découvrez les ruelles pittoresques de la médina et le charme de Sidi Bou Saïd.",
                points: [
                  "🏛️ Médina de Tunis (UNESCO)",
                  "🕌 Mosquée Zitouna",
                  "🌇 Sidi Bou Saïd et ses panoramas"
                ],
                reverse: true
              },
              {
                img: Oriental,
                title: "Circuit du Grand Erg Oriental",
                description: "Traversez le désert du Sahara et explorez les dunes dorées du Grand Erg Oriental.",
                points: [
                  "🏜️ Dunes de Douz",
                  "🧂 Chott el Jerid, un grand lac salé",
                  "🛖 Village traditionnel berbère"
                ]
              }
            ].map((circuit, index) => (
              <motion.div 
                key={index}
                className={`row align-items-center mb-5 ${circuit.reverse ? 'flex-md-row-reverse' : ''}`}
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="col-md-6 mb-4 mb-md-0">
                  <motion.img 
                    src={circuit.img} 
                    alt={circuit.title} 
                    className="img-fluid rounded-3 shadow-lg hover-card"
                    style={{ height: "400px", objectFit: "cover" }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                </div>
                <div className="col-md-6">
                  <h2 className="mb-4">{circuit.title}</h2>
                  <p className="lead mb-4">{circuit.description}</p>
                  <div className="bg-dark p-4 rounded-3 hover-card">
                    <h5 className="text-warning mb-3">Points d'intérêt :</h5>
                    <ul className="list-unstyled">
                      {circuit.points.map((point, i) => (
                        <li key={i} className="mb-3">{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Reservation Section */}
      </main>
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default Accueil;
