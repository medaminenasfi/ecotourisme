import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Button, Modal, Form, Alert, Spinner, Card, Row, Col, Badge } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus, FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import ScrollToTopButton from "../Components/ScrollToTopButton";
import { motion } from "framer-motion";

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;
  
  return (
    <div className="d-flex align-items-center">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} className="text-warning" />
      ))}
      {halfStar ? <FaStarHalfAlt className="text-warning" /> : null}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} className="text-secondary" />
      ))}
    </div>
  );
};

const AvisPage = () => {
  const { user = null, logout = () => {}, loading: authLoading = false } = useContext(AuthContext) || {};
  const [avis, setAvis] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingAvis, setEditingAvis] = useState(null);
  const [formData, setFormData] = useState({
    circuitId: '',
    rating: '',
    comment: ''
  });
  const [loading, setLoading] = useState(true);
  const [circuits, setCircuits] = useState([]);
  const [error, setError] = useState(null);

  const getAuthHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
  });

  useEffect(() => {
    if (authLoading) return;

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        
        const [avisRes, circuitsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/avis', { 
            headers: { Authorization: `Bearer ${token}` } 
          }),
          axios.get('http://localhost:5000/api/circuits', { 
            headers: { Authorization: `Bearer ${token}` } 
          })
        ]);

        setAvis(avisRes.data?.avis || avisRes.data || []);
        setCircuits(circuitsRes.data?.circuits || circuitsRes.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Data loading failed:', error);
        setError(error.message);
        setLoading(false);
        if (error.response?.status === 401) logout();
      }
    };

    fetchData();
  }, [authLoading, logout]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: getAuthHeader() };
      const url = editingAvis 
        ? `http://localhost:5000/api/avis/${editingAvis._id}`
        : 'http://localhost:5000/api/avis';

      const method = editingAvis ? 'put' : 'post';
      await axios[method](url, formData, config);

      const avisRes = await axios.get('http://localhost:5000/api/avis', config);
      setAvis(avisRes.data?.avis || avisRes.data || []);
      closeModal();
    } catch (error) {
      console.error('Submission error:', error);
      if (error.response?.status === 401) logout();
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/avis/${id}`, {
        headers: getAuthHeader()
      });
      setAvis(prev => prev.filter(a => a._id !== id));
    } catch (error) {
      console.error('Deletion error:', error);
      if (error.response?.status === 401) logout();
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingAvis(null);
    setFormData({ circuitId: '', rating: '', comment: '' });
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

  if (authLoading || loading) return (
    <div className="text-center py-5">
      <Spinner animation="border" variant="light" />
    </div>
  );

  if (error) return (
    <motion.div 
      className="container mt-4 alert alert-danger"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      Error loading data: {error}
      <button className="btn btn-link text-light" onClick={() => window.location.reload()}>
        Try Again
      </button>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="d-flex justify-content-between align-items-center mb-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-white mb-0">
          <FaStar className="me-2" />
          Avis des Utilisateurs
        </h2>
        {user && (
          <Button 
            variant="primary" 
            onClick={() => setShowModal(true)}
            className="rounded-pill px-4 py-2 d-flex align-items-center"
          >
            <FaPlus className="me-2" /> Ajouter un avis
          </Button>
        )}
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Alert variant="danger" className="rounded">{error}</Alert>
        </motion.div>
      )}

      {avis.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Alert variant="info" style={{
            background: 'rgba(32, 201, 151, 0.15)',
            borderColor: 'rgba(32, 201, 151, 0.3)',
            color: '#20c997'
          }}>
            Aucun avis trouvé
          </Alert>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Row xs={1} md={2} lg={3} className="g-4">
            {avis.map(review => {
              const circuit = circuits.find(c => c._id === review.circuitId) || {};
              
              return (
                <Col key={review._id}>
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="h-100" style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: 'white'
                    }}>
                      <Card.Header style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                      }}>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <span className="fw-medium">
                              {review.userId?.first_name || 'Anonymous'} {review.userId?.last_name}
                            </span>
                          </div>
                          <div className="d-flex align-items-center">
                            {renderStars(review.rating)}
                            <Badge bg="warning" text="dark" className="ms-2">
                              {review.rating}/5
                            </Badge>
                          </div>
                        </div>
                      </Card.Header>
                      <Card.Body>
                        <h5 className="text-primary mb-3">
                          {circuit.name || 'Unknown Circuit'}
                        </h5>
                        <p className="text-white-50">{review.comment}</p>
                      </Card.Body>
                      {user?.id === review.userId?._id && (
                        <Card.Footer style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                        }} className="d-flex justify-content-end gap-2">
                          <Button
                            variant="outline-warning"
                            size="sm"
                            onClick={() => {
                              setEditingAvis(review);
                              setFormData({
                                circuitId: review.circuitId,
                                rating: review.rating,
                                comment: review.comment
                              });
                              setShowModal(true);
                            }}
                          >
                            <FaEdit /> Modifier
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDelete(review._id)}
                          >
                            <FaTrash /> Supprimer
                          </Button>
                        </Card.Footer>
                      )}
                    </Card>
                  </motion.div>
                </Col>
              )
            })}
          </Row>
        </motion.div>
      )}

      <Modal show={showModal} onHide={closeModal} centered>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Modal.Header closeButton style={{
            background: 'rgba(0, 0, 0, 0.7)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'white'
          }}>
            <Modal.Title>
              {editingAvis ? 'Modifier Avis' : 'Nouvel Avis'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white'
          }}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Circuit</Form.Label>
                <Form.Select
                  className="bg-dark text-white border-secondary"
                  value={formData.circuitId}
                  onChange={e => setFormData({...formData, circuitId: e.target.value})}
                  required
                >
                  <option value="">Choisissez un circuit...</option>
                  {circuits.map(circuit => (
                    <option key={circuit._id} value={circuit._id}>
                      {circuit.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Notation</Form.Label>
                <Form.Select
                  className="bg-dark text-white border-secondary"
                  value={formData.rating}
                  onChange={e => setFormData({...formData, rating: e.target.value})}
                  required
                >
                  <option value="">Sélectionnez votre note...</option>
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>
                      {num} étoiles
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Commentaire</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  className="bg-dark text-white border-secondary"
                  value={formData.comment}
                  onChange={e => setFormData({...formData, comment: e.target.value})}
                  required
                />
              </Form.Group>

              <div className="d-flex justify-content-end gap-2">
                <Button 
                  variant="secondary" 
                  onClick={closeModal}
                  className="rounded-pill"
                >
                  Annuler
                </Button>
                <Button 
                  variant="primary" 
                  type="submit"
                  className="rounded-pill"
                >
                  {editingAvis ? 'Enregistrer' : 'Publier'}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </motion.div>
      </Modal>
      <ScrollToTopButton />
    </motion.div>
  );
};

export default AvisPage;