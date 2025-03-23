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
      setIsAdmin(decoded.role === 'admin'); // Corrected role check
      return true;
    } catch (error) {
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
      return false;
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
    fetchReservations();
  }, );

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateToken()) return;
    
    setError('');
    setSuccess('');
    
    try {
      const token = localStorage.getItem('accessToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const method = selectedReservation ? 'put' : 'post';
      const url = selectedReservation 
        ? `http://localhost:5000/api/reservations/${selectedReservation._id}`
        : 'http://localhost:5000/api/reservations';

      const response = await axios[method](url, formData, config);
      
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
      window.location.href = '/login';
    }
    setError(err.response?.data?.message || 'An error occurred');
  };

  // Open modal for edit/add
  const openModal = (reservation = null) => {
    setSelectedReservation(reservation);
    setFormData(reservation ? {
      user: reservation.user?._id || '',
      circuit: reservation.circuit?._id || '',
      date: reservation.date?.split('T')[0] || '',
      numberOfPeople: reservation.numberOfPeople || '',
      totalPrice: reservation.totalPrice || '',
      status: reservation.status || 'pending'
    } : {
      user: '',
      circuit: '',
      date: '',
      numberOfPeople: '',
      totalPrice: '',
      status: 'pending'
    });
    setShowModal(true);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5" style={{ paddingTop: '70px' }}>
        <div className="card shadow-sm">
          <div className="card-header bg-white d-flex justify-content-between align-items-center">
            <div>
              <h2 className="mb-0">Reservation Management</h2>
              <p className="text-muted mb-0">Manage all hiking reservations</p>
            </div>
            {isAdmin && (
              <Button variant="primary" onClick={() => openModal()}>
                New Reservation
              </Button>
            )}
          </div>

          <div className="card-body">
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : reservations.length === 0 ? (
              <div className="text-center py-4 text-muted">No reservations found</div>
            ) : (
              <Table hover responsive className="mb-0">
                <thead className="thead-light">
                  <tr>
                    <th>User</th>
                    <th>Circuit</th>
                    <th>Date</th>
                    <th>People</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map(reservation => (
                    <tr key={reservation._id}>
                      <td>
                        {reservation.user 
                          ? `${reservation.user.first_name} ${reservation.user.last_name}`
                          : 'Deleted User'}
                      </td>
                      <td>{reservation.circuit?.name || 'Deleted Circuit'}</td>
                      <td>{new Date(reservation.date).toLocaleDateString()}</td>
                      <td>{reservation.numberOfPeople}</td>
                      <td>€{reservation.totalPrice.toFixed(2)}</td>
                      <td>
                        <Badge 
                          bg={
                            reservation.status === 'confirmed' ? 'success' :
                            reservation.status === 'cancelled' ? 'danger' : 'warning'
                          }
                        >
                          {reservation.status}
                        </Badge>
                      </td>
                      <td className="text-center">
                        {isAdmin && (
                          <>
                            <Button
                              variant="link"
                              className="text-primary me-2"
                              onClick={() => openModal(reservation)}
                            >
                              <FaEdit size={20} />
                            </Button>
                            <Button
                              variant="link"
                              className="text-danger"
                              onClick={() => handleDelete(reservation._id)}
                            >
                              <FaTrashAlt size={20} />
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
      </div>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedReservation ? 'Edit Reservation' : 'New Reservation'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* Keep existing modal form fields */}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default GestionReservations;