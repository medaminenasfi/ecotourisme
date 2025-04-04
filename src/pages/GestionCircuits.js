import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import { FaEdit, FaTrashAlt,FaPlus } from 'react-icons/fa';
import Navbar from '../Components/navbar';
import jwtDecode from 'jwt-decode';

const GestionCircuits = () => {
  const [circuits, setCircuits] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCircuit, setSelectedCircuit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    duration: '',
    price: '',
    difficulty: 'Facile'
  });

  // Check token validity
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

  // Fetch circuits from API
  const fetchCircuits = async () => {
    if (!validateToken()) return;
    
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:5000/api/circuits', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setCircuits(response.data);
      setError('');
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCircuits();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateToken()) return;
    
    setError('');
    setSuccess('');
    
    try {
      const token = localStorage.getItem('accessToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      if (selectedCircuit) {
        await axios.put(`http://localhost:5000/api/circuits/${selectedCircuit._id}`, formData, config);
        setSuccess('Circuit updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/circuits', formData, config);
        setSuccess('Circuit created successfully');
      }

      setShowModal(false);
      await fetchCircuits();
    } catch (err) {
      handleError(err);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!validateToken()) return;
    
    if (window.confirm('Are you sure you want to delete this circuit?')) {
      try {
        const token = localStorage.getItem('accessToken');
        await axios.delete(`http://localhost:5000/api/circuits/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSuccess('Circuit deleted successfully');
        await fetchCircuits();
      } catch (err) {
        handleError(err);
      }
    }
  };

  // Error handling
  const handleError = (err) => {
    console.error(err);
    if (err.response?.status === 401 || err.response?.status === 403) {
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }
    setError(err.response?.data?.message || 'An error occurred');
  };

  // Open modal for edit/add
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
      <Navbar />
      <br/><br/><br/><br/>
      
      <div className="container">
        <h1 className="mb-3 display-5 fw-bold text-primary">Gestion des Circuits</h1>
        
        <center>
        <p className="text-muted mb-4">
          Gérez l'ensemble des circuits de randonnée disponibles
        </p>
        </center>
        <div className="dashboard-card bg-white p-4 rounded-3 shadow-sm">
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

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
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Chargement...</span>
              </Spinner>
            </div>
          ) : circuits.length === 0 ? (
            <div className="text-center py-4 text-muted">Aucun circuit trouvé</div>
          ) : (
            <Table hover responsive className="align-middle">
              <thead className="bg-light">
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
                  <tr key={circuit._id}>
                    <td className="fw-medium">{circuit.name}</td>
                    <td>{circuit.location}</td>
                    <td>{circuit.duration}h</td>
                    <td>{circuit.price} TND</td>
                    <td>
                      <span className={`badge rounded-pill ${
                        circuit.difficulty === 'Facile' ? 'bg-success' :
                        circuit.difficulty === 'Moyen' ? 'bg-warning text-dark' :
                        'bg-danger'
                      }`}>
                        {circuit.difficulty}
                      </span>
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
          )}
        </div>
      </div>

      {/* Modal Add/Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="bg-light">
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
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Localisation</Form.Label>
              <Form.Control
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                required
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
                  />
                </Form.Group>
              </div>
            </div>

            <Form.Group className="mb-4">
              <Form.Label>Difficulté</Form.Label>
              <Form.Select
                value={formData.difficulty}
                onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
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
    </>
  );
};

export default GestionCircuits;