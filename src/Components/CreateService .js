import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Form, Button, Alert, Spinner, Card, Row, Col, Badge, Modal } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/navbar";

const CreateService = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    description: "",
    photo: "",
    phoneNumber: user?.phone_number || ""
  });
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
        
        console.log("Tous les services de la DB:", response.data); // Pour voir les données brutes
        setServices(response.data); // Affiche tous les services sans filtre
        
      } catch (err) {
        setError(err.response?.data?.message || "Erreur de chargement des services");
      }
    };
  
    if (user?.role === "fournisseur") {
      fetchAllServices();
    }
  }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const url = editMode 
        ? `http://localhost:5000/api/services/${currentServiceId}`
        : "http://localhost:5000/api/services";

      const method = editMode ? "put" : "post";

      const response = await axios[method](url, formData, {
        headers: { Authorization: `Bearer ${token}` }
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
      photo: service.photo,
      phoneNumber: service.phoneNumber
    });
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
      photo: "",
      phoneNumber: user?.phone_number || ""
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditMode(false);
    setFormData({
      type: "",
      description: "",
      photo: "",
      phoneNumber: user?.phone_number || ""
    });
  };

  if (!user || user.role !== "fournisseur") {
    return (
      <div className="container mt-5">
        <Alert variant="danger">Accès réservé aux fournisseurs</Alert>
      </div>
    );
  }

  return (
    <div className="container mt-5">
            <Navbar />
<br/><br/><br/>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Mes Services</h2>
        <Button variant="primary" onClick={handleShowModal}>
          <FaPlus className="me-2" /> Ajouter un service
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {services.length === 0 ? (
        <Alert variant="info">Aucun service créé pour le moment</Alert>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {services.map(service => (
            <Col key={service._id}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={service.photo || '/placeholder.jpg'}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{service.type}</Card.Title>
                  <Card.Text>{service.description}</Card.Text>
                  <Badge bg="info">{service.phoneNumber}</Badge>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-end gap-2">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleEdit(service)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => {
                      setSelectedService(service);
                      setShowDeleteModal(true);
                    }}
                  >
                    <FaTrash />
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Formulaire Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editMode ? "Modifier le service" : "Nouveau service"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Type de service</Form.Label>
              <Form.Select 
                name="type"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                required
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
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>URL de la photo</Form.Label>
              <Form.Control
                type="url"
                name="photo"
                value={formData.photo}
                onChange={(e) => setFormData({...formData, photo: e.target.value})}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Numéro de téléphone</Form.Label>
              <Form.Control
  type="tel"
  name="phoneNumber"
  value={formData.phoneNumber}
  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
/>

            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={handleCloseModal}>
                Annuler
              </Button>
              <Button variant="primary" type="submit" disabled={loading}>
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

      {/* Modal de confirmation de suppression */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation de suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir supprimer ce service ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Annuler
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateService; 