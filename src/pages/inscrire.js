import React from "react";
import Navbar from "../Components/navbar";
import "../pages/inscrire.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Components/footer";
import backgroundImage from "../assest/Accueil.jpg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from '@mui/joy/Stack';

const Accueil = () => {
  console.log("Rendering Accueil page");

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
  };

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
          <Container>
            <center>
              <Row>
                <Col>
                  {/* Empty section if you need to add content */}
                  section 1 empty ///////////
                </Col>
                <Col>
                  <div className="main-container">
                    <div className="header">
                      <span className="lets-get-started">LET'S GET YOU STARTED</span>
                      <h2 className="create-account">Create an Account</h2>
                    </div>
                    <form className="form" onSubmit={handleSubmit}>
                      <label>Your Name</label> <br />
                      <input type="text" placeholder="Johnson Doe" required /><br />

                      <label>Tel</label><br />
                      <input type="tel" placeholder="264589449" required /><br />

                      <Stack spacing={1.5} sx={{ minWidth: 300 }}>
                        <label htmlFor="birthday">Birthday</label>
                        <input
                          id="birthday"
                          type="text"
                          placeholder="dd/mm/yy"
                          style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc'
                          }}
                          required
                        />
                      </Stack>

                      <label>Gender</label><br />
                      <input type="text" placeholder="Male/Female" required /><br />

                      <label>Email</label><br />
                      <input type="email" placeholder="johnsondoe@nomail.com" required /><br />

                      <label>Password</label><br />
                      <input type="password" placeholder="***************" required /><br />

                      <label>Type</label><br />
                      <input type="text" placeholder="Fourniseur/client" required /><br />

                      <button type="submit" className="btn-pry">GET STARTED</button><br />
                    </form>

                    <div className="divider-label">
                      <span className="or">Or</span>
                    </div>

                    <button className="btn-outline">
                      <span className="sign-up-google">Sign up with Google</span>
                    </button>

                    <div className="account-login">
                      <span>Already have an account? </span>
                      <a href="/login" className="login-here">LOGIN HERE</a>
                    </div>
                  </div>
                </Col>
              </Row>
            </center>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Accueil;
