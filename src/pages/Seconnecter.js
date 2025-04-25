import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../Components/navbar";
import backgroundImage from "../assest/Accueil.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Seconnecter = () => {
  const { login } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://localhost:5000/auth/login", credentials);
      if (response.data.accessToken) {
        login(response.data.accessToken, response.data.user);
        navigate("/");
      }
    } catch (error) {
      setError("Email ou mot de passe incorrect. ");
    }
  };

  return (
    <div className="auth-page">
      <Navbar />
      <div 
        className="auth-container d-flex align-items-center justify-content-center"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
          backgroundSize: "cover",
          minHeight: "100vh",
          paddingTop: "80px"
        }}
      >
      <div className="auth-card bg-dark rounded-4 p-5 shadow-lg">
  <div className="text-center mb-5">
    <h2 className="text-white mb-3 fw-bold">Connexion</h2>
  </div>

  <form onSubmit={handleSubmit}>
    {/* Champ Email */}
    <div className="mb-4">
      <label className="form-label text-white">Adresse e-mail</label>
      <input
        type="email"
        className="form-control bg-transparent text-white border-secondary"
        placeholder="exemple@email.com"
        name="email"
        required
        onChange={handleChange}
      />
    </div>

    {/* Champ Mot de passe */}
    <div className="mb-4">
      <label className="form-label text-white">Mot de passe</label>
      <div className="input-group">
        <input
          type={showPassword ? "text" : "password"}
          className="form-control bg-transparent text-white border-secondary"
          placeholder="Entrez votre mot de passe"
          name="password"
          required
          onChange={handleChange}
        />
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>
 {/* ✅ Error Message Block */}
 {error && (
    <div className="alert alert-danger text-center py-2" role="alert">
      {error}
    </div>
  )}

    {/* Bouton de connexion */}
    <button 
      type="submit" 
      className="btn btn-success w-100 py-2 fw-bold rounded-pill mb-3"
    >
      Se connecter
    </button>

    {/* Liens supplémentaires */}
    <div className="d-flex flex-column align-items-center gap-2 mt-4">
      <a 
        href="/forgot" 
        className="text-decoration-none text-success small"
      >
        Mot de passe oublié ?
      </a>
      <span className="text-white small">
        Pas de compte ?{" "}
        <a 
          href="/inscrire" 
          className="text-success text-decoration-none fw-medium"
        >
          S'inscrire
        </a>
      </span>
    </div>
  </form>
</div>
      </div>
    </div>
  );
};

export default Seconnecter;