import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Modal, Form, Alert, Spinner, Badge } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Navbar from '../Components/navbar';
import jwtDecode from 'jwt-decode';

const GestionReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [circuits, setCircuits] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    user: '',
    circuit: '',
    date: '',
    numberOfPeople: '',
    totalPrice: '',
    status: 'pending'
  });

  // Check token validity
  const validateToken = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      window.location.href = '/Seconnecter';
      return false;
    }
    
    try {
      const decoded = jwtDecode(token);
      setIsAdmin(decoded.UserInfo?.role === 'admin');
      
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem('accessToken');
        window.location.href = '/Seconnecter';
        return false;
      }
      return true;
    } catch (error) {
      localStorage.removeItem('accessToken');
      window.location.href = '/Seconnecter';
      return false;
    }
  };

  // Fetch initial data
  const fetchInitialData = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const [usersRes, circuitsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${token}` }
        }).catch(err => {
          console.error('Failed to fetch users:', err);
          return { data: [] };
        }),
        axios.get('http://localhost:5000/api/circuits', {
          headers: { Authorization: `Bearer ${token}` }
        }).catch(err => {
          console.error('Failed to fetch circuits:', err);
          return { data: [] };
        })
      ]);
      
      setUsers(usersRes.data);
      setCircuits(circuitsRes.data);
      
      if (usersRes.data.length === 0) {
        setError('Failed to load users list');
      }
      if (circuitsRes.data.length === 0) {
        setError('Failed to load circuits list');
      }
    } catch (err) {
      handleError(err);
    }
  };

  // Fetch reservations from API
  const fetchReservations = async () => {
    if (!validateToken()) return;
    
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:5000/api/reservations', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReservations(response.data);
      setError('');
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchInitialData();
      await fetchReservations();
    };
    loadData();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateToken()) return;
    
    setError('');
    setSuccess('');
    
    try {
      const token = localStorage.getItem('accessToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      const payload = {
        ...formData,
        numberOfPeople: Number(formData.numberOfPeople),
        totalPrice: Number(formData.totalPrice),
        date: new Date(formData.date).toISOString()
      };

      const method = selectedReservation ? 'put' : 'post';
      const url = selectedReservation 
        ? `http://localhost:5000/api/reservations/${selectedReservation._id}`
        : 'http://localhost:5000/api/reservations';

      const response = await axios[method](url, payload, config);
      
      if ([200, 201].includes(response.status)) {
        setSuccess(selectedReservation 
          ? 'Reservation updated successfully' 
          : 'Reservation created successfully');
        setShowModal(false);
        await fetchReservations();
      }
    } catch (err) {
      handleError(err);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!validateToken()) return;
    
    if (window.confirm('Are you sure you want to delete this reservation?')) {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.delete(
          `http://localhost:5000/api/reservations/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        if (response.status === 200) {
          setSuccess('Reservation deleted successfully');
          await fetchReservations();
        }
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
      window.location.href = '/Seconnecter';
    }
    setError(err.response?.data?.message || 'An error occurred');
  };

  // Open modal for edit/add
  const openModal = (reservation = null) => {
    setSelectedReservation(reservation);
    if (reservation) {
      setFormData({
        user: reservation.user?._id || '', // Ensure user ID is set correctly
        circuit: reservation.circuit?._id || '',
        date: reservation.date?.split('T')[0] || '',
        numberOfPeople: reservation.numberOfPeople || '',
        totalPrice: reservation.totalPrice || '',
        status: reservation.status || 'pending'
      });
    } else {
      setFormData({
        user: '',
        circuit: '',
        date: '',
        numberOfPeople: '',
        totalPrice: '',
        status: 'pending'
      });
    }
    setShowModal(true);
  };

  
  return (
    <>
      <Navbar />
      <br/><br/><br/><br/>
      
      <div className="container">
        <h1 className="mb-3 display-5 fw-bold text-primary">Gestion des Réservations</h1>
        <center>
        <p className="text-muted mb-4">
          Gérez toutes les réservations de randonnée en cours
        </p>
        </center>
        <div className="dashboard-card bg-white p-4 rounded-3 shadow-sm">
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

        

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Chargement...</span>
              </Spinner>
            </div>
          ) : reservations.length === 0 ? (
            <div className="text-center py-4 text-muted">Aucune réservation trouvée</div>
          ) : (
            <Table hover responsive className="align-middle">
              <thead className="bg-light">
                <tr>
                  <th>Utilisateur</th>
                  <th>Circuit</th>
                  <th>Date</th>
                  <th>Personnes</th>
                  <th>Prix</th>
                  <th>Statut</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map(reservation => (
                  <tr key={reservation._id}>
                    <td>
                      {reservation.user 
                        ? `${reservation.user.first_name} ${reservation.user.last_name}`
                        : 'Utilisateur supprimé'}
                    </td>
                    <td>{reservation.circuit?.name || 'Circuit supprimé'}</td>
                    <td>{new Date(reservation.date).toLocaleDateString('fr-FR')}</td>
                    <td>{reservation.numberOfPeople}</td>
                    <td>{reservation.totalPrice?.toFixed(2)} TND</td>
                    <td>
                      <Badge 
                        pill
                        bg={
                          reservation.status === 'confirmed' ? 'success' :
                          reservation.status === 'cancelled' ? 'danger' : 'warning'
                        }
                      >
                        {reservation.status === 'confirmed' ? 'Confirmée' :
                         reservation.status === 'cancelled' ? 'Annulée' : 'En attente'}
                      </Badge>
                    </td>
                    <td className="text-end">
                      {isAdmin && (
                        <>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="me-2"
                            onClick={() => openModal(reservation)}
                          >
                            <FaEdit className="me-1" /> Modifier
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDelete(reservation._id)}
                          >
                            <FaTrashAlt className="me-1" /> Supprimer
                          </Button>
                        </>
                      )}
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
            {selectedReservation ? 'Modifier Réservation' : 'Nouvelle Réservation'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            
            <Form.Group className="mb-3">
              <Form.Label>Circuit</Form.Label>
              <Form.Select
                value={formData.circuit}
                onChange={(e) => setFormData({ ...formData, circuit: e.target.value })}
                required
              >
                <option value="">Sélectionner un circuit</option>
                {circuits.map(circuit => (
                  <option key={circuit._id} value={circuit._id}>
                    {circuit.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nombre de personnes</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={formData.numberOfPeople}
                onChange={(e) => setFormData({ ...formData, numberOfPeople: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Prix total</Form.Label>
              <Form.Control
                type="number"
                min="0"
                step="0.01"
                value={formData.totalPrice}
                onChange={(e) => setFormData({ ...formData, totalPrice: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Statut</Form.Label>
              <Form.Select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                required
              >
                <option value="pending">En attente</option>
                <option value="confirmed">Confirmée</option>
                <option value="cancelled">Annulée</option>
              </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
                Annuler
              </Button>
              <Button variant="primary" type="submit">
                {selectedReservation ? 'Enregistrer' : 'Créer'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default GestionReservations;