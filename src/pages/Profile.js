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
  Col,
  Modal,
  Form
} from "react-bootstrap";
import Navbar from "../Components/navbar";
import { format } from 'date-fns';
import frLocale from 'date-fns/locale/fr';
import { toast } from 'react-toastify';
import backgroundImage from "../assest/Accueil.jpg";
import ScrollToTopButton from "../Components/ScrollToTopButton";
import { motion, AnimatePresence } from "framer-motion";

const Profile = () => {
  const { user, logout, loading: authLoading, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [reservationsLoading, setReservationsLoading] = useState(false);
  const [error, setError] = useState("");
  const [reservations, setReservations] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  
  const [editingReservation, setEditingReservation] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editDate, setEditDate] = useState("");
  const [editPeople, setEditPeople] = useState(1);
  const [updating, setUpdating] = useState(false);

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileForm, setProfileForm] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    gender: "male",
    password: "",
    confirmPassword: ""
  });
  const [profileError, setProfileError] = useState("");
  const [updatingProfile, setUpdatingProfile] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/Seconnecter");
    } else if (user) {
      fetchUserReservations();
      setProfileForm({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        phone_number: user.phone_number || "",
        gender: user.gender || "male",
        password: "",
        confirmPassword: ""
      });
    }
  }, [user, authLoading, navigate]);

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
      // Sort reservations by date (newest first) before setting state
      const sortedReservations = data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setReservations(sortedReservations);
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

  const handleEditReservation = (reservation) => {
    setEditingReservation(reservation);
    setEditDate(format(new Date(reservation.date), 'yyyy-MM-dd'));
    setEditPeople(reservation.numberOfPeople);
    setShowEditModal(true);
  };

  const handleUpdateReservation = async () => {
    if (!editingReservation) return;
    
    try {
      setUpdating(true);
      
      const response = await fetch(`http://localhost:5000/api/reservations/${editingReservation._id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          date: editDate,
          numberOfPeople: parseInt(editPeople)
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Échec de la mise à jour");
      }

      const updatedReservation = await response.json();
      
      setReservations(prev => prev.map(r => 
        r._id === updatedReservation._id ? updatedReservation : r
      ));
      
      toast.success("Réservation mise à jour avec succès");
      setShowEditModal(false);
    } catch (error) {
      console.error("Erreur de mise à jour:", error);
      toast.error(error.message || "Erreur lors de la mise à jour");
    } finally {
      setUpdating(false);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileUpdate = async () => {
    if (profileForm.password && profileForm.password !== profileForm.confirmPassword) {
      setProfileError("Les mots de passe ne correspondent pas");
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }
    if (profileForm.password && profileForm.password.length < 6) {
      setProfileError("Le mot de passe doit contenir au moins 6 caractères");
      toast.error("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }
    
    setProfileError("");
    setUpdatingProfile(true);
    
    try {
      const response = await fetch("http://localhost:5000/users/profile", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          first_name: profileForm.first_name,
          last_name: profileForm.last_name,
          phone_number: profileForm.phone_number,
          gender: profileForm.gender,
          password: profileForm.password || undefined
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Échec de la mise à jour du profil");
        throw new Error(errorData.message || "Échec de la mise à jour du profil");
      }
      
      const { user: updatedUser, shouldLogout } = await response.json();
      
      updateUser({
        ...user,
        ...updatedUser
      });
      
      toast.success("Profil mis à jour avec succès");
      setShowProfileModal(false);
      
      if (shouldLogout) {
        toast.info("Votre mot de passe a été modifié. Vous allez être déconnecté.");
        setTimeout(() => {
          logout();
          navigate("/Seconnecter");
        }, 2000);
      }
    } catch (error) {
      setProfileError(error.message || "Erreur lors de la mise à jour du profil");
      toast.error(error.message || "Erreur lors de la mise à jour du profil");
    } finally {
      setUpdatingProfile(false);
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  const isPastReservation = (dateString) => {
    return new Date(dateString) < new Date();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        paddingTop: '80px'
      }}
    >
      <Navbar />
      <Container className="py-5" style={{ maxWidth: '1200px' }}>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="shadow" style={{
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '15px'
          }}>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card.Header style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div className="d-flex justify-content-between align-items-center">
                  <h2 style={{ 
                    color: '#f1faee', 
                    margin: 0,
                    fontWeight: '600',
                    letterSpacing: '0.5px'
                  }}>
                    Profil Utilisateur
                  </h2>
                </div>
              </Card.Header>
            </motion.div>
            
            <Card.Body>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Alert variant="danger">{error}</Alert>
                </motion.div>
              )}

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <Row className="g-4">
                  <Col md={6}>
                    <ListGroup variant="flush">
                      {['first_name', 'last_name', 'email'].map((field, index) => (
                        <motion.div
                          key={field}
                          variants={itemVariants}
                          custom={index}
                        >
                          <ListGroup.Item style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            color: '#fff',
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                            padding: '1.2rem',
                            transition: 'all 0.3s ease'
                          }}
                          whileHover={{ scale: 1.02, background: 'rgba(255, 255, 255, 0.08)' }}
                          >
                            <strong style={{ 
                              color: '#20c997',
                              minWidth: '90px',
                              display: 'inline-block'
                            }}>
                              {{
                                first_name: 'Prénom',
                                last_name: 'Nom',
                                email: 'Email'
                              }[field]}
                            </strong>
                            <span style={{ marginLeft: '15px' }}>
                              {user[field] || "Non fourni"}
                            </span>
                          </ListGroup.Item>
                        </motion.div>
                      ))}
                    </ListGroup>
                  </Col>
                  <Col md={6}>
                    <ListGroup variant="flush">
                      {['phone_number', 'gender', 'role'].map((field, index) => (
                        <motion.div
                          key={field}
                          variants={itemVariants}
                          custom={index + 3}
                        >
                          <ListGroup.Item style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            color: '#fff',
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                            padding: '1.2rem',
                            transition: 'all 0.3s ease'
                          }}
                          whileHover={{ scale: 1.02, background: 'rgba(255, 255, 255, 0.08)' }}
                          >
                            <strong style={{ 
                              color: '#20c997',
                              minWidth: '90px',
                              display: 'inline-block'
                            }}>
                              {{
                                phone_number: 'Téléphone',
                                gender: 'Genre',
                                role: 'Rôle'
                              }[field]}
                            </strong>
                            <span style={{ marginLeft: '15px' }}>
                              {field === 'role' ? (
                                <Badge pill bg={
                                  user.role === 'admin' ? 'danger' : 
                                  user.role === 'fournisseur' ? 'warning' : 'primary'
                                }>
                                  {user.role === 'admin' ? 'Administrateur' : 
                                  user.role === 'fournisseur' ? 'Fournisseur' : 'Voyageur'}
                                </Badge>
                              ) : field === 'gender' ? (
                                user.gender === 'male' ? 'Homme' : 'Femme'
                              ) : user[field] || "Non fourni"}
                            </span>
                          </ListGroup.Item>
                        </motion.div>
                      ))}
                    </ListGroup>
                  </Col>
                </Row>
              </motion.div>

              <motion.div 
                className="mt-4 d-flex justify-content-end gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button 
                  variant="outline-info"
                  onClick={() => setShowProfileModal(true)}
                  style={{
                    borderColor: '#20c997',
                    color: '#20c997',
                    borderRadius: '8px',
                    padding: '8px 20px',
                    transition: 'all 0.3s ease'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="bi bi-pencil-square me-1"></i>
                  Modifier
                </Button>
                <Button 
                  variant="outline-danger" 
                  onClick={handleLogout}
                  style={{
                    borderColor: '#dc3545',
                    color: '#dc3545',
                    borderRadius: '8px',
                    padding: '8px 20px',
                    transition: 'all 0.3s ease'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Déconnexion
                </Button>
                {user.role === 'admin' && (
                  <Button 
                    variant="primary"
                    onClick={() => navigate("/AdminDashboard")}
                    style={{
                      backgroundColor: '#20c997',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px 20px',
                      transition: 'all 0.3s ease'
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Tableau de bord
                  </Button>
                )}
              </motion.div>

              <motion.h4 
                className="mt-5 mb-4" 
                style={{ 
                  color: '#f1faee',
                  fontWeight: '600',
                  paddingBottom: '10px',
                  borderBottom: '2px solid rgba(255, 255, 255, 0.1)'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Vos Réservations
              </motion.h4>
              
              <AnimatePresence>
                {reservationsLoading ? (
                  <motion.div 
                    className="text-center py-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Spinner animation="border" variant="light" />
                    <p className="mt-3 text-light">Chargement des données...</p>
                  </motion.div>
                ) : reservations.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <Alert variant="info" style={{
                      background: 'rgba(32, 201, 151, 0.15)',
                      borderColor: 'rgba(32, 201, 151, 0.3)',
                      color: '#20c997'
                    }}>
                      Vous n'avez aucune réservation pour le moment.
                    </Alert>
                  </motion.div>
                ) : (
                  <ListGroup variant="flush">
                    {reservations.map((reservation, index) => {
                      const circuitInfo = getCircuitInfo(reservation);
                      const isPast = isPastReservation(reservation.date);
                      
                      return (
                        <motion.div
                          key={reservation._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          exit={{ opacity: 0, y: -20 }}
                        >
                          <ListGroup.Item style={{
                            background: isPast 
                              ? 'rgba(100, 100, 100, 0.1)' 
                              : 'rgba(255, 255, 255, 0.02)',
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                            color: isPast ? '#aaa' : '#fff',
                            padding: '1.5rem',
                            marginBottom: '10px',
                            borderRadius: '10px',
                            transition: 'all 0.3s ease'
                          }}
                          whileHover={{ 
                            scale: isPast ? 1 : 1.02,
                            background: isPast 
                              ? 'rgba(100, 100, 100, 0.15)' 
                              : 'rgba(255, 255, 255, 0.05)'
                          }}
                          >
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <h5 style={{ 
                                  color: isPast ? '#777' : '#20c997', 
                                  marginBottom: '0.8rem'
                                }}>
                                  {circuitInfo.name}
                                  {circuitInfo.isCustom && (
                                    <Badge bg="info" className="ms-2">
                                      Personnalisé
                                    </Badge>
                                  )}
                                </h5>
                                <div className="d-flex align-items-center gap-2 flex-wrap">
                                  <Badge bg={isPast ? "secondary" : "dark"} className="d-flex align-items-center">
                                    <i className="bi bi-calendar me-1"></i>
                                    {formatDate(reservation.date)}
                                  </Badge>
                                  <Badge bg={isPast ? "secondary" : "secondary"} className="d-flex align-items-center">
                                    <i className="bi bi-people me-1"></i>
                                    {reservation.numberOfPeople} pers.
                                  </Badge>
                                  <Badge bg={
                                    reservation.status === 'confirmed' ? (isPast ? 'secondary' : 'success') : 
                                    reservation.status === 'cancelled' ? 'danger' : 'warning'
                                  }>
                                    {reservation.status === 'confirmed' ? 
                                      (isPast ? 'Terminée' : 'Confirmée') :
                                    reservation.status === 'cancelled' ? 'Annulée' : 'En attente'}
                                  </Badge>
                                </div>
                              </div>
                              <div className="text-end">
                                <div className="d-flex flex-column align-items-end gap-2">
                                  <h5 className={isPast ? "text-secondary" : "text-primary"} style={{ marginBottom: 0 }}>
                                    {reservation.totalPrice?.toFixed(2)} TND
                                  </h5>
                                  <div className="d-flex gap-2 align-items-center">
                                    <small className={isPast ? "text-secondary" : "text-white"}>
                                      Ref: {reservation._id.slice(-6)}
                                    </small>
                                    <Button 
                                      variant="outline-primary" 
                                      size="sm" 
                                      onClick={() => handleEditReservation(reservation)}
                                      disabled={isPast || deletingId === reservation._id || updating}
                                      style={{
                                        minWidth: '100px',
                                        borderRadius: '20px'
                                      }}
                                    >
                                      <i className="bi bi-pencil me-1"></i>
                                      Modifier
                                    </Button>
                                    <Button 
                                      variant="outline-danger" 
                                      size="sm" 
                                      onClick={() => handleDeleteReservation(reservation._id)}
                                      disabled={isPast || deletingId === reservation._id || updating}
                                      style={{
                                        minWidth: '100px',
                                        borderRadius: '20px'
                                      }}
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
                        </motion.div>
                      );
                    })}
                  </ListGroup>
                )}
              </AnimatePresence>
            </Card.Body>
          </Card>
        </motion.div>
      </Container>
      
      {/* Modal de modification des réservations */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton style={{ backgroundColor: '#f8f9fa' }}>
          <Modal.Title>Modifier la réservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingReservation && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Circuit</Form.Label>
                <Form.Control 
                  type="text" 
                  value={getCircuitInfo(editingReservation).name} 
                  disabled 
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control 
                  type="date" 
                  value={editDate} 
                  onChange={(e) => setEditDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Nombre de personnes</Form.Label>
                <Form.Control 
                  type="number" 
                  value={editPeople} 
                  onChange={(e) => setEditPeople(e.target.value)}
                  min="1"
                  max="20"
                />
              </Form.Group>
              
              <div className="d-flex justify-content-between">
                <Button 
                  variant="secondary" 
                  onClick={() => setShowEditModal(false)}
                  disabled={updating}
                >
                  Annuler
                </Button>
                <Button 
                  variant="primary" 
                  onClick={handleUpdateReservation}
                  disabled={updating}
                >
                  {updating ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Enregistrement...
                    </>
                  ) : (
                    "Enregistrer les modifications"
                  )}
                </Button>
              </div>
            </Form>
          )}
        </Modal.Body>
      </Modal>
      
      {/* Modal de modification du profil */}
      <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)} centered size="lg">
        <Modal.Header closeButton style={{ backgroundColor: '#f8f9fa' }}>
          <Modal.Title>Modifier votre profil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Prénom</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="first_name"
                    value={profileForm.first_name} 
                    onChange={handleProfileChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="last_name"
                    value={profileForm.last_name} 
                    onChange={handleProfileChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Téléphone</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="phone_number"
                    value={profileForm.phone_number} 
                    onChange={handleProfileChange}
                  />
                </Form.Group>
              </Col>
             <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Genre</Form.Label>
                  <Form.Select 
                    name="gender"
                    value={profileForm.gender} 
                    onChange={handleProfileChange}
                  >
                    <option value="male">Homme</option>
                    <option value="female">Femme</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row> 
            
            <h5 className="mt-4 mb-3">Changer de mot de passe (optionnel)</h5>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nouveau mot de passe</Form.Label>
                  <Form.Control 
                    type="password" 
                    name="password"
                    value={profileForm.password} 
                    onChange={handleProfileChange}
                    placeholder="Laisser vide pour ne pas changer"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Confirmer le mot de passe</Form.Label>
                  <Form.Control 
                    type="password" 
                    name="confirmPassword"
                    value={profileForm.confirmPassword} 
                    onChange={handleProfileChange}
                    placeholder="Confirmer le nouveau mot de passe"
                  />
                </Form.Group>
              </Col>
            </Row>
            
            {profileError && (
              <Alert variant="danger" className="mt-3">
                {profileError}
              </Alert>
            )}
            
            <div className="d-flex justify-content-end mt-4">
              <Button 
                variant="secondary" 
                onClick={() => setShowProfileModal(false)}
                disabled={updatingProfile}
                className="me-2"
              >
                Annuler
              </Button>
              <Button 
                variant="primary" 
                onClick={handleProfileUpdate}
                disabled={updatingProfile}
                style={{ minWidth: '120px' }}
              >
                {updatingProfile ? (
                  <Spinner animation="border" size="sm" />
                ) : "Enregistrer"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      
      <ScrollToTopButton />
    </motion.div>
  );
};

export default Profile;