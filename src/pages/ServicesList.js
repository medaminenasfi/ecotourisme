import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Button, Card, Alert, Spinner, Row, Col, Badge, Modal, Form, Container } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from "../Components/navbar";
import backgroundImage from "../assest/Accueil.jpg";
import ScrollToTopButton from "../Components/ScrollToTopButton";

const stringToStableHash = (str) => {
  let hash = 0;
  if (str.length === 0) return hash;
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; 
  }
  
  return Math.abs(hash);
};

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
    photo: null, 
    phoneNumber: ''
  });
  const [imagePreview, setImagePreview] = useState(null); 

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

        const servicesWithDiscount = response.data.map(service => ({
          ...service,
          discount: (stringToStableHash(service._id) % 20 + 1) 
        }));

        setServices(servicesWithDiscount);
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
      photo: null, 
      phoneNumber: service.phoneNumber
    });
    setImagePreview(service.photo ? `http://localhost:5000${service.photo}` : null); // Set existing image as preview
    setShowModal(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        setError("Seuls les fichiers JPEG, PNG et JPG sont autorisés");
        return;
      }
      setFormData({ ...formData, photo: file });
      setImagePreview(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('accessToken');
      const data = new FormData();
      data.append('type', formData.type);
      data.append('description', formData.description);
      data.append('phoneNumber', formData.phoneNumber);
      if (formData.photo) {
        data.append('photo', formData.photo);
      }

      const response = await axios.put(
        `http://localhost:5000/api/services/${selectedService._id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setServices(services.map(s =>
        s._id === selectedService._id ? { ...response.data, discount: s.discount } : s
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
    <div style={{
      background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      paddingTop: '80px'
    }}>
      <Navbar />
      
      <Container className="py-5" style={{ maxWidth: '1200px' }}>
        <Card className="shadow" style={{
          background: 'rgba(0, 0, 0, 0.7)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '15px'
        }}>
          <Card.Header style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div className="d-flex justify-content-between align-items-center">
              <center>
                <h2 style={{ 
                  color: '#FFFFFF', 
                  margin: 0,
                  fontWeight: '600',
                  letterSpacing: '0.5px'
                }}>
                  Liste des Services
                </h2>
              </center>
            </div>
          </Card.Header>

          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}

            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="light" />
              </div>
            ) : services.length === 0 ? (
              <Alert variant="info" style={{
                background: 'rgba(32, 201, 151, 0.15)',
                borderColor: 'rgba(32, 201, 151, 0.3)',
                color: '#20c997'
              }}>
                Aucun service trouvé
              </Alert>
            ) : (
              <Row xs={1} md={2} lg={3} className="g-4">
                {services.map(service => {
                  return (
                    <Col key={service._id}>
                      <Card className="h-100" style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: 'white',
                        transition: 'transform 0.3s ease'
                      }}>
                        <div className="position-relative">
                          <Card.Img
                            variant="top"
                            src={service.photo ? `http://localhost:5000${service.photo}` : '/placeholder.jpg'}
                            style={{ 
                              height: '200px', 
                              objectFit: 'cover',
                              borderTopLeftRadius: 'calc(0.25rem - 1px)',
                              borderTopRightRadius: 'calc(0.25rem - 1px)'
                            }}
                            onError={(e) => e.target.src = '/placeholder.jpg'}
                          />
                          <Badge 
                            bg={service.discount > 15 ? 'danger' : service.discount > 10 ? 'warning' : 'success'}
                            style={{ 
                              position: 'absolute',
                              top: '10px',
                              right: '10px',
                              fontSize: '0.9rem',
                              padding: '5px 10px',
                              borderRadius: '20px',
                              boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                              transition: 'all 0.3s ease'
                            }}
                          >
                            -{service.discount}%
                          </Badge>
                        </div>
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-start">
                            <Card.Title style={{ color: '#20c997' }}>{service.type}</Card.Title>
                            <Badge bg="secondary">{service.phoneNumber}</Badge>
                          </div>
                          <Card.Text>{service.description}</Card.Text>
                          <small className="text-white">
                            Fournisseur: {service.fournisseur?.first_name} {service.fournisseur?.last_name}
                          </small>
                        </Card.Body>

                        <Card.Footer style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                        }} className="d-flex justify-content-end gap-2">
                          {user?.role === 'fournisseur' && user?._id === service.fournisseur?._id && (
                            <>
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => openEditModal(service)}
                                style={{ borderRadius: '20px' }}
                              >
                                <FaEdit />
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDelete(service._id)}
                                style={{ borderRadius: '20px' }}
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
                              style={{ borderRadius: '20px' }}
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
            )}
          </Card.Body>
        </Card>

        {/* Edit Service Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton style={{
            background: 'rgba(0, 0, 0, 0.7)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'white'
          }}>
            <Modal.Title>Modifier le service</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white'
          }}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Type de service</Form.Label>
                <Form.Select
                  name="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  required
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white'
                  }}
                >
                  <option value="">Sélectionner un type</option>
                  {serviceTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white'
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Photo (JPEG, PNG, JPG)</Form.Label>
                <Form.Control
                  type="file"
                  name="photo"
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={handleFileChange}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white'
                  }}
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }}
                    />
                  </div>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Numéro de téléphone</Form.Label>
                <Form.Control
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white'
                  }}
                />
              </Form.Group>

              <div className="d-flex justify-content-end gap-2">
                <Button
                  variant="secondary"
                  onClick={() => setShowModal(false)}
                  style={{ borderRadius: '20px' }}
                >
                  Annuler
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  style={{ borderRadius: '20px' }}
                >
                  Enregistrer
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

        <ScrollToTopButton />
      </Container>
    </div>
  );
};

export default ServicesList;