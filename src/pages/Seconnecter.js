import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../Components/navbar";
import backgroundImage from "../assest/Accueil.jpg";

const Seconnecter = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/auth/login', credentials);
      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        navigate('/');
      }
    } catch (error) {
      setError('Email ou mot de passe incorrect. Veuillez réessayer.');
    }
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
          <div className="main-container">
            <div className="main-div">
              <div className="header">
                <a href="/" className="back-to-login">
                  &lt; Retour à l'accueil
                </a>
                <h2 className="forgot-password-title">Connexion à votre compte</h2>
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              
              <form className="password-recovery-form" onSubmit={handleSubmit}>
                <label className="email-label">Adresse e-mail</label>
                <input
                  type="email"
                  className="email-input"
                  name="email"
                  placeholder="exemple@email.com"
                  required
                  onChange={handleChange}
                />

                <label className="email-label">Mot de passe</label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="email-input"
                    name="password"
                    placeholder="********"
                    required
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="show-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Masquer" : "Afficher"}
                  </button>
                </div>

                <button type="submit" className="btn-continue">
                  SE CONNECTER
                </button>
              </form>

              <div className="additional-links">
                <a href="/forgot" className="forgot-password">
                  Mot de passe oublié ?
                </a>
                <span className="signup-link">
                  Vous n'avez pas de compte ? <a href="/inscrire">S'inscrire</a>
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Seconnecter;