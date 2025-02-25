import React from "react";
import Navbar from "../Components/navbar";
import "./Artisan.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Components/footer";
import backgroundImage from "../assest/Accueil.jpg";





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
            Votre Aventure Commence Ici
            </h1>
            <p className="lead">
            La nature ne fait rien en vain, et chaque paysage est une invitation à l'aventure
            </p>
          </div>
        
        </section>
        <section className="bg-black text-white p-5 shadow-lg">
          <h1 classname="hell">Les meilleures destinations</h1>
          <center>
            {" "}
            <p>
              Partez à la découverte de paysages incroyables, des déserts aux
              plages superbes.
            </p>{" "}
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
