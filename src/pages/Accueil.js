  import React from "react";
  import Navbar from "../Components/navbar";
  import "./accueil.css";
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
            <h1>Explorer <br/>  la nature autrement</h1>
            <p className="lead">
              Explorez des paysages enchanteurs, des déserts aux plages superbes.
            </p>
          </div>

          {/* Citations en bas */}
          <div className="quotes">
            <p className="quote left">
              "Regardez profondément dans la nature, et vous comprendrez mieux tout."
              <br />
              <strong>— Albert Einstein</strong>
            </p>
            <p className="quote right">
              "Quand un homme s’éloigne de la nature, son cœur devient dur."
              <br />
              <strong>— Proverbe Lakota</strong>
            </p>
          </div>          </section>
          <section>
            <h1 classname="hell">Les meilleures destinations</h1>
          <center> <p>Partez à la découverte de paysages incroyables, des déserts 
            aux plages superbes.</p>  </center> 



            
          </section>
        </main>
        <Footer />
      </>
    );
  };

  export default Accueil;
