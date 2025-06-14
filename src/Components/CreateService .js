import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Form, Button, Alert, Spinner, Card, Row, Col, Badge, Modal, Container } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus, FaPhone } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/navbar";
import backgroundImage from "../assest/Accueil.jpg";

const CreateService = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    description: "",
    photo: null, 
    phoneNumber: user?.phone_number || ""
  });
  const [imagePreview, setImagePreview] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentServiceId, setCurrentServiceId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const serviceTypes = [
    "Guides locaux",
    "Artisans",
    "Hébergeurs",
    "Transporteurs",
    "Loueurs de matériel"
  ];

  useEffect(() => {
    const fetchAllServices = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get("http://localhost:5000/api/services", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const userServices = response.data.filter(service => service.fournisseur?._id === user.id);
        setServices(userServices);
      } catch (err) {
        setError(err.response?.data?.message || "Erreur de chargement des services");
      }
    };

    if (user?.role === "fournisseur") {
      fetchAllServices();
    }
  }, [user]);

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
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("accessToken");
      const url = editMode 
        ? `http://localhost:5000/api/services/${currentServiceId}`
        : "http://localhost:5000/api/services";

      const method = editMode ? "put" : "post";

      const data = new FormData();
      data.append("type", formData.type);
      data.append("description", formData.description);
      data.append("phoneNumber", formData.phoneNumber);
      if (formData.photo) {
        data.append("photo", formData.photo);
      }

      const response = await axios({
        method,
        url,
        data,
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      if (editMode) {
        setServices(services.map(s => 
          s._id === currentServiceId ? response.data.service : s
        ));
      } else {
        setServices([...services, response.data.service]);
      }

      handleCloseModal();
    } catch (err) {
      setError(err.response?.data?.message || "Erreur de traitement");
    }
    setLoading(false);
  };

  const handleEdit = (service) => {
    setEditMode(true);
    setCurrentServiceId(service._id);
    setFormData({
      type: service.type,
      description: service.description,
      photo: null, // Reset file input
      phoneNumber: service.phoneNumber
    });
    setImagePreview(service.photo ? `http://localhost:5000${service.photo}` : null);
    setShowModal(true);
  };

  const handleDelete = async () => {
    setShowDeleteModal(false);
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`http://localhost:5000/api/services/${selectedService._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setServices(services.filter(s => s._id !== selectedService._id));
    } catch (err) {
      setError(err.response?.data?.message || "Erreur de suppression");
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
    setEditMode(false);
    setFormData({
      type: "",
      description: "",
      photo: null,
      phoneNumber: user?.phone_number || ""
    });
    setImagePreview(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditMode(false);
    setFormData({
      type: "",
      description: "",
      photo: null,
      phoneNumber: user?.phone_number || ""
    });
    setImagePreview(null);
  };

  if (!user || user.role !== "fournisseur") {
    return (
      <div style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        paddingTop: '80px'
      }}>
        <Navbar />
        <Container className="py-5">
          <Alert variant="danger" className="text-center">Accès réservé aux fournisseurs</Alert>
        </Container>
      </div>
    );
  }

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
              <h2 style={{ 
                color: '#FFFFFF', 
                margin: 0,
                fontWeight: '600',
                letterSpacing: '0.5px'
              }}>
                Mes Services
              </h2>
              <Button 
                variant="primary" 
                onClick={handleShowModal}
                className="rounded-pill px-4 py-2 d-flex align-items-center"
              >
                <FaPlus className="me-2" /> Ajouter un service
              </Button>
            </div>
          </Card.Header>

          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}

            {services.length === 0 ? (
              <div className="text-center py-5">
                <img 
                  src="/empty-state.svg" 
                  alt="No services" 
                  style={{ width: '200px', opacity: 0.7 }} 
                  className="mb-4"
                />
                <h4 className="text-white mb-3">Aucun service créé pour le moment</h4>
                <Button 
                  variant="outline-primary" 
                  onClick={handleShowModal}
                  className="rounded-pill px-4"
                >
                  Créer votre premier service
                </Button>
              </div>
            ) : (
              <Row xs={1} md={2} lg={3} className="g-4">
                {services.map(service => (
                  <Col key={service._id}>
                    <Card className="h-100" style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: 'white'
                    }}>
                      <Card.Img
                        variant="top"
                        src={service.photo ? `http://localhost:5000${service.photo}` : '/placeholder.jpg'}
                        style={{ height: '200px', objectFit: 'cover' }}
                        className="border-bottom"
                      />
                      <Card.Body>
                        <Badge bg="light" className="text-primary mb-2 fw-normal">
                          {service.type}
                        </Badge>
                        <Card.Text className="text-white mb-3">
                          {service.description}
                        </Card.Text>
                        <div className="d-flex align-items-center text-white">
                          <FaPhone className="me-2" size={14} />
                          <small>{service.phoneNumber}</small>
                        </div>
                      </Card.Body>
                      <Card.Footer style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                      }} className="d-flex justify-content-end gap-2">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="rounded-circle p-2 d-flex align-items-center justify-content-center"
                          onClick={() => handleEdit(service)}
                        >
                          <FaEdit size={14} />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="rounded-circle p-2 d-flex align-items-center justify-content-center"
                          onClick={() => {
                            setSelectedService(service);
                            setShowDeleteModal(true);
                          }}
                        >
                          <FaTrash size={14} />
                        </Button>
                      </Card.Footer>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Card.Body>
        </Card>

        {/* Add/Edit Service Modal */}
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton style={{
            background: 'rgba(0, 0, 0, 0.7)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'white'
          }}>
            <Modal.Title>
              {editMode ? "Modifier le service" : "Nouveau service"}
            </Modal.Title>
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
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
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
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
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
                  onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
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
                  onClick={handleCloseModal}
                  style={{ borderRadius: '20px' }}
                >
                  Annuler
                </Button>
                <Button 
                  variant="primary" 
                  type="submit" 
                  disabled={loading}
                  style={{ borderRadius: '20px' }}
                >
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : editMode ? (
                    "Enregistrer"
                  ) : (
                    "Créer"
                  )}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
          <Modal.Header closeButton style={{
            background: 'rgba(0, 0, 0, 0.7)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'white'
          }}>
            <Modal.Title>Confirmation de suppression</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white'
          }}>
            Êtes-vous sûr de vouloir supprimer ce service ?
          </Modal.Body>
          <Modal.Footer style={{
            background: 'rgba(0, 0, 0, 0.7)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <Button 
              variant="secondary" 
              onClick={() => setShowDeleteModal(false)}
              style={{ borderRadius: '20px' }}
            >
              Annuler
            </Button>
            <Button 
              variant="danger" 
              onClick={handleDelete}
              style={{ borderRadius: '20px' }}
            >
              Supprimer
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default CreateService;