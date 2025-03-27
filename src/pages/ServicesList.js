import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Button, Card, Alert, Spinner, Row, Col, Badge, Modal, Form } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import "./service.css";
import { useNavigate } from 'react-router-dom';
import Navbar from "../Components/navbar";

const ServicesList = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    photo: '',
    phoneNumber: ''
  });

  const serviceTypes = [
    "Guides locaux",
    "Artisans",
    "Hébergeurs",
    "Transporteurs",
    "Loueurs de matériel"
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:5000/api/services', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setServices(response.data);
      } catch (err) {
        if (err.response?.status === 401) {
          navigate('/login');
        }
        setError(err.response?.data?.message || 'Erreur de chargement des services');
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [navigate]);

  const openEditModal = (service) => {
    setSelectedService(service);
    setFormData({
      type: service.type,
      description: service.description,
      photo: service.photo,
      phoneNumber: service.phoneNumber
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.put(
        `http://localhost:5000/api/services/${selectedService._id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setServices(services.map(s => 
        s._id === selectedService._id ? response.data : s
      ));
      setShowModal(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur de mise à jour');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Confirmer la suppression de ce service ?')) {
      try {
        const token = localStorage.getItem('accessToken');
        await axios.delete(`http://localhost:5000/api/services/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setServices(services.filter(s => s._id !== id));
      } catch (err) {
        setError(err.response?.data?.message || 'Erreur de suppression');
      }
    }
  };

  return (
    <div className="container mt-5">
      <Navbar />
      <br/><br/><br/><br/>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestion des Services</h2><br/><br/>
        {user?.role === 'fournisseur' && (
          <Button variant="primary" href="/create-service">
            + Nouveau Service
          </Button>
        )}
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : services.length === 0 ? (
        <Alert variant="info">Aucun service trouvé</Alert>
      ) : (
        <>
          <Row xs={1} md={2} lg={3} className="g-4">
            {services.map(service => {
              const discount = Math.floor(Math.random() * 20) + 1;
              return (
                <Col key={service._id}>
                  <Card className="h-100 shadow-sm">
                    <div className="position-relative">
                      <Card.Img
                        variant="top"
                        src={service.photo || '/placeholder.jpg'}
                        style={{ height: '200px', objectFit: 'cover' }}
                        onError={(e) => e.target.src = '/placeholder.jpg'}
                      />
                      <div className="discount-badge">
                        -{discount}%
                      </div>
                    </div>
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start">
                        <Card.Title>{service.type}</Card.Title>
                        <Badge bg="info">{service.phoneNumber}</Badge>
                      </div>
                      <Card.Text>{service.description}</Card.Text>
                      <small className="text-muted">
                        Fournisseur: {service.fournisseur?.first_name} {service.fournisseur?.last_name}
                      </small>
                    </Card.Body>

                    <Card.Footer className="d-flex justify-content-end gap-2">
                      {user?.role === 'fournisseur' && user?._id === service.fournisseur?._id && (
                        <>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => openEditModal(service)}
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDelete(service._id)}
                          >
                            <FaTrash />
                          </Button>
                        </>
                      )}
                      {user?.role === 'admin' && (
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(service._id)}
                        >
                          <FaTrash />
                        </Button>
                      )}
                    </Card.Footer>
                  </Card>
                </Col>
              );
            })}
          </Row>

          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            {/* Le contenu de la modal reste inchangé */}
          </Modal>
        </>
      )}
    </div>
  );
};

export default ServicesList;