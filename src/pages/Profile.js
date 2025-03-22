import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card, ListGroup, Button, Spinner, Alert } from "react-bootstrap";
import Navbar from "../Components/navbar";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/Seconnecter");
    } else {
      setTimeout(() => setLoading(false), 1000);
    }
  }, [user, navigate]);

  const handleLogout = () => {
    try {
      logout();
      navigate("/Seconnecter");
    } catch (err) {
      setError("Erreur lors de la déconnexion");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Redirection en cours...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <Navbar />
<br/><br/>
      <div className="container mt-5">
        <div className="card shadow-sm">
          <div className="card-header bg-white">
            <h2 className="mb-0">Profil Utilisateur</h2>
            <p className="text-muted mb-0">Vos informations personnelles</p>
          </div>

          <div className="card-body">
            {error && <Alert variant="danger">{error}</Alert>}

            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Prénom:</strong> {user.first_name || "Non renseigné"}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Nom:</strong> {user.last_name || "Non renseigné"}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Email:</strong> {user.email || "Non renseigné"}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Téléphone:</strong> {user.phone_number || "Non renseigné"}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Genre:</strong> {user.gender || "Non renseigné"}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Rôle:</strong>{" "}
                <span className={`badge ${
                  user.role === 'admin' ? 'bg-danger' :
                  user.role === 'manager' ? 'bg-warning text-dark' :
                  'bg-primary'
                }`}>
                  {user.role}
                </span>
              </ListGroup.Item>
            </ListGroup>

            <div className="mt-4 d-flex gap-2 justify-content-end">
              {user.role === "admin" && (
                <Button 
                  variant="primary"
                  onClick={() => navigate("/AdminDashboard")}
                >
                  Tableau de bord Admin
                </Button>
              )}
              <Button 
                variant="outline-danger"
                onClick={handleLogout}
              >
                Se Déconnecter
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;