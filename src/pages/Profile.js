import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  ListGroup, 
  Button, 
  Spinner, 
  Alert, 
  Card, 
  Badge,
  Container,
  Row,
  Col
} from "react-bootstrap";
import Navbar from "../Components/navbar";
import { format } from 'date-fns';
import frLocale from 'date-fns/locale/fr';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user, logout, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [reservationsLoading, setReservationsLoading] = useState(false);
  const [error, setError] = useState("");
  const [reservations, setReservations] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/Seconnecter");
    } else if (user) {
      fetchUserReservations();
    }
  }, [user, authLoading]);

  const fetchUserReservations = async () => {
    try {
      setReservationsLoading(true);
      setError("");
      
      const response = await fetch("http://localhost:5000/api/reservations/my-reservations", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          logout();
          return;
        }
        throw new Error("Échec du chargement des réservations");
      }

      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error("Erreur de récupération des réservations:", error);
      setError(error.message);
    } finally {
      setReservationsLoading(false);
    }
  };

  const handleDeleteReservation = async (reservationId) => {
    if (!window.confirm("Êtes-vous sûr de vouloir annuler cette réservation ?")) return;
    
    try {
      setDeletingId(reservationId);
      setError("");

      const response = await fetch(`http://localhost:5000/api/reservations/${reservationId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        }
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("Vous n'êtes pas autorisé à supprimer cette réservation");
        }
        throw new Error("Échec de la suppression de la réservation");
      }

      setReservations(prev => prev.filter(r => r._id !== reservationId));
      toast.success("Réservation annulée avec succès");
    } catch (error) {
      console.error("Erreur de suppression:", error);
      toast.error(error.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/Seconnecter");
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'dd MMMM yyyy', { locale: frLocale });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Date inconnue";
    }
  };

  const getCircuitInfo = (reservation) => {
    if (reservation.circuitDetails) {
      return {
        name: reservation.circuitDetails.name || "Circuit personnalisé",
        isCustom: true
      };
    }
    
    if (reservation.circuit) {
      return {
        name: reservation.circuit.name || "Circuit indisponible",
        isCustom: false
      };
    }

    return { name: "Circuit indisponible", isCustom: false };
  };

  if (authLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Navbar />
      <br/><br/><br/><br/>
      <Container className="py-5">
        <Card className="shadow">
          <Card.Header className="bg-white">
            <h2>Profil Utilisateur</h2>
          </Card.Header>
          
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}

            <Row>
              <Col md={6}>
                <ListGroup variant="flush" className="mb-4">
                  <ListGroup.Item>
                    <strong>Prénom:</strong> {user.first_name || "Non fourni"}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Nom:</strong> {user.last_name || "Non fourni"}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Email:</strong> {user.email}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={6}>
                <ListGroup variant="flush" className="mb-4">
                  <ListGroup.Item>
                    <strong>Téléphone:</strong> {user.phone_number || "Non fourni"}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Genre:</strong> {user.gender === 'male' ? 'Homme' : 
                                          user.gender === 'female' ? 'Femme' : 
                                          "Non spécifié"}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Rôle:</strong>{" "}
                    <Badge bg={
                      user.role === 'admin' ? 'danger' : 
                      user.role === 'fournisseur' ? 'warning' : 
                      'primary'
                    }>
                      {user.role === 'admin' ? 'Administrateur' : 
                       user.role === 'fournisseur' ? 'Fournisseur' : 
                       'Voyageur'}
                    </Badge>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
            <div className="mt-4 d-flex justify-content-end">
              <Button 
                variant="outline-danger" 
                onClick={handleLogout}
                className="me-2"
              >
                <i className="bi bi-box-arrow-right me-1"></i>
                Déconnexion
              </Button>
              {user.role === 'admin' && (
                <Button 
                  variant="primary"
                  onClick={() => navigate("/AdminDashboard")}
                >
                  <i className="bi bi-speedometer2 me-1"></i>
                  Tableau de bord
                </Button>
              )}
            </div>
            <h4 className="mb-3">Vos Réservations</h4>
            
            {reservationsLoading ? (
              <div className="text-center py-4">
                <Spinner animation="border" />
                <p className="mt-2">Chargement des données...</p>
              </div>
            ) : reservations.length === 0 ? (
              <Alert variant="info">
                Vous n'avez aucune réservation pour le moment.
              </Alert>
            ) : (
              <ListGroup variant="flush">
                {reservations.map((reservation) => {
                  const circuitInfo = getCircuitInfo(reservation);
                  
                  return (
                    <ListGroup.Item key={reservation._id}>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h5>
                            {circuitInfo.name}
                            {circuitInfo.isCustom && (
                              <Badge bg="info" className="ms-2">
                              </Badge>
                            )}
                          </h5>
                          <div className="d-flex align-items-center mt-2">
                            <Badge bg="light" text="dark" className="me-2">
                              <i className="bi bi-calendar me-1"></i>
                              {formatDate(reservation.date)}
                            </Badge>
                            <Badge bg="secondary" className="me-2">
                              <i className="bi bi-people me-1"></i>
                              {reservation.numberOfPeople} pers.
                            </Badge>
                            <Badge bg={reservation.status === 'confirmed' ? 'success' : 
                                     reservation.status === 'cancelled' ? 'danger' : 'warning'}>
                              {reservation.status === 'confirmed' ? 'Confirmée' :
                               reservation.status === 'cancelled' ? 'Annulée' : 'En attente'}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-end">
                          <div className="d-flex flex-column align-items-end">
                            <h5 className="text-primary mb-2">{reservation.totalPrice?.toFixed(2)} TND</h5>
                            <div className="d-flex gap-2 align-items-center">
                              <small className="text-muted">Ref: {reservation._id.slice(-6)}</small>
                              <Button 
                                variant="outline-danger" 
                                size="sm" 
                                onClick={() => handleDeleteReservation(reservation._id)}
                                disabled={deletingId === reservation._id}
                                className="ms-2"
                              >
                                {deletingId === reservation._id ? (
                                  <Spinner animation="border" size="sm" />
                                ) : (
                                  <>
                                    <i className="bi bi-trash me-1"></i>
                                    Supprimer
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Profile;