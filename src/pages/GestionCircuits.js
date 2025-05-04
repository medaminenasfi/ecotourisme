// GestionCircuits.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Modal, Form, Alert, Spinner, Badge } from 'react-bootstrap';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import jwtDecode from 'jwt-decode';
import backgroundImage from '../assest/Accueil.jpg';
import  Navbar from "../Components/navbar";
import ScrollToTopButton from "../Components/ScrollToTopButton";

const GestionCircuits = () => {
  const [circuits, setCircuits] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCircuit, setSelectedCircuit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    duration: '',
    price: '',
    difficulty: 'Facile'
  });

  const validateToken = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      window.location.href = '/login';
      return false;
    }
    
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
        return false;
      }
      return true;
    } catch (error) {
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
      return false;
    }
  };

  const fetchCircuits = async () => {
    if (!validateToken()) return;
    
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:5000/api/circuits', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCircuits(response.data);
      setError('');
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCircuits(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateToken()) return;
    
    setError('');
    setSuccess('');
    
    try {
      const token = localStorage.getItem('accessToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const method = selectedCircuit ? 'put' : 'post';
      const url = selectedCircuit 
        ? `http://localhost:5000/api/circuits/${selectedCircuit._id}`
        : 'http://localhost:5000/api/circuits';

      await axios[method](url, formData, config);
      setSuccess(selectedCircuit ? 'Circuit mis à jour' : 'Nouveau circuit créé');
      setShowModal(false);
      await fetchCircuits();
    } catch (err) {
      handleError(err);
    }
  };

  const handleDelete = async (id) => {
    if (!validateToken()) return;
    
    if (window.confirm('Confirmer la suppression du circuit ?')) {
      try {
        const token = localStorage.getItem('accessToken');
        await axios.delete(`http://localhost:5000/api/circuits/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSuccess('Circuit supprimé');
        await fetchCircuits();
      } catch (err) {
        handleError(err);
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    if (err.response?.status === 401) {
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }
    setError(err.response?.data?.message || 'Erreur de communication');
  };

  const openModal = (circuit = null) => {
    setSelectedCircuit(circuit);
    setFormData(circuit || {
      name: '',
      description: '',
      location: '',
      duration: '',
      price: '',
      difficulty: 'Facile'
    });
    setShowModal(true);
  };

  return (
    <>
   <Navbar/>
    <div style={{
      background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      paddingTop: '80px'
    }}>
      <div className="container py-5" style={{ maxWidth: '1400px' }}>
        <div className="card shadow" style={{
          background: 'rgba(0, 0, 0, 0.7)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '15px'
        }}>
          <div className="card-header" style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h1 className="text-white mb-0 text-center">
              <span className="text-primary">Gestion</span> des Circuits
            </h1>
            <div className="text-center mt-2">
              <p className="text-white mb-0">
                Gérez l'ensemble des circuits de randonnée disponibles
              </p>
            </div>
          </div>

          <div className="card-body">
            {error && <Alert variant="danger" className="rounded-3">{error}</Alert>}
            {success && <Alert variant="success" className="rounded-3">{success}</Alert>}

            <div className="d-flex justify-content-end mb-4">
              <Button 
                variant="outline-primary" 
                onClick={() => openModal()}
                className="d-flex align-items-center"
              >
                <FaPlus className="me-2" /> Nouveau Circuit
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : circuits.length === 0 ? (
              <div className="text-center py-4 text-muted">Aucun circuit trouvé</div>
            ) : (
              <div className="table-responsive">
                <Table hover responsive className="align-middle text-white mb-0">
                  <thead style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                    <tr>
                      <th>Nom</th>
                      <th>Localisation</th>
                      <th>Durée</th>
                      <th>Prix</th>
                      <th>Difficulté</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {circuits.map(circuit => (
                      <tr key={circuit._id} style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                        <td className="fw-medium">{circuit.name}</td>
                        <td>{circuit.location}</td>
                        <td>{circuit.duration}h</td>
                        <td>{circuit.price} TND</td>
                        <td>
                          <Badge pill className="text-uppercase" 
                            bg={
                              circuit.difficulty === 'Facile' ? 'success' :
                              circuit.difficulty === 'Moyen' ? 'warning text-dark' : 'danger'
                            }>
                            {circuit.difficulty}
                          </Badge>
                        </td>
                        <td className="text-end">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="me-2"
                            onClick={() => openModal(circuit)}
                          >
                            <FaEdit className="me-1" /> Modifier
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDelete(circuit._id)}
                          >
                            <FaTrashAlt className="me-1" /> Supprimer
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered 
        contentClassName="bg-dark text-white"
        backdrop="static">
        <Modal.Header closeButton closeVariant="white" className="border-secondary">
          <Modal.Title className="text-primary">
            {selectedCircuit ? 'Modifier Circuit' : 'Nouveau Circuit'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nom du circuit</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                className="bg-dark text-white border-secondary"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
                className="bg-dark text-white border-secondary"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Localisation</Form.Label>
              <Form.Control
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                required
                className="bg-dark text-white border-secondary"
              />
            </Form.Group>

            <div className="row g-3">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Durée (heures)</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    required
                    className="bg-dark text-white border-secondary"
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Prix (TND)</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required
                    className="bg-dark text-white border-secondary"
                  />
                </Form.Group>
              </div>
            </div>

            <Form.Group className="mb-4">
              <Form.Label>Difficulté</Form.Label>
              <Form.Select
                value={formData.difficulty}
                onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                className="bg-dark text-white border-secondary"
              >
                <option value="Facile">Facile</option>
                <option value="Moyen">Moyen</option>
                <option value="Difficile">Difficile</option>
              </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
                Annuler
              </Button>
              <Button variant="primary" type="submit">
                {selectedCircuit ? 'Enregistrer' : 'Créer'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
    <ScrollToTopButton />

  </>
  );
};

export default GestionCircuits;