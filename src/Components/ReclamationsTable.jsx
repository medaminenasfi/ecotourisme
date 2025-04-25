import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button, Modal, Form, Alert, Spinner, Card, Row, Col, Badge } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus, FaInfoCircle } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const ReclamationsTable = () => {
  const { user = null } = useContext(AuthContext) || {};
  const [reclamations, setReclamations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReclamation, setSelectedReclamation] = useState(null);
  const [formData, setFormData] = useState({ 
    type: "", 
    message: "", 
    status: "en cours" 
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReclamations = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          "http://localhost:5000/api/reclamations", 
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setReclamations(response.data?.reclamations || response.data || []);
        setError("");
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load data");
        if (err.response?.status === 401) {
          localStorage.removeItem("accessToken");
          window.location.reload();
        }
      } finally {
        setLoading(false);
      }
    };
    fetchReclamations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const url = selectedReclamation
        ? `http://localhost:5000/api/reclamations/${selectedReclamation._id}`
        : "http://localhost:5000/api/reclamations";
      
      const method = selectedReclamation ? "put" : "post";
      const dataToSend = selectedReclamation && user?.role === "admin"
        ? { status: formData.status }
        : { type: formData.type, message: formData.message };

      await axios[method](url, dataToSend, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setShowModal(false);
      setFormData({ type: "", message: "", status: "en cours" });
      const newData = await axios.get("http://localhost:5000/api/reclamations", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReclamations(newData.data?.reclamations || newData.data || []);
    } catch (err) {
      setError(err.response?.data?.error || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette réclamation ?")) {
      try {
        const token = localStorage.getItem("accessToken");
        await axios.delete(`http://localhost:5000/api/reclamations/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setReclamations(prev => prev.filter(r => r._id !== id));
      } catch (err) {
        setError("Failed to delete reclamation");
      }
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-white mb-0">
          <FaInfoCircle className="me-2" />
          Gestion des Réclamations
        </h2>
        <Button 
          variant="success" 
          onClick={() => {
            setSelectedReclamation(null);
            setShowModal(true);
          }}
          className="rounded-pill px-4 py-2 d-flex align-items-center"
        >
          <FaPlus className="me-2" /> Nouvelle Réclamation
        </Button>
      </div>

      {error && <Alert variant="danger" className="rounded">{error}</Alert>}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="light" />
        </div>
      ) : reclamations.length === 0 ? (
        <Alert variant="info" style={{
          background: 'rgba(32, 201, 151, 0.15)',
          borderColor: 'rgba(32, 201, 151, 0.3)',
          color: '#20c997'
        }}>
          Aucune réclamation trouvée
        </Alert>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {reclamations.map(recl => {
            const isOwner = user && (
              user.role === "admin" || 
              (recl.userId && 
                (typeof recl.userId === 'object' 
                  ? recl.userId._id === user.id
                  : recl.userId === user.id))
            );

            return (
              <Col key={recl._id}>
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
                      <div>
                        <span className="fw-medium">
                          {typeof recl.userId === 'object' 
                            ? `${recl.userId?.first_name || ''} ${recl.userId?.last_name || ''}`.trim() 
                            : "Anonymous User"}
                        </span>
                        <small className="text-white d-block">
                          {new Date(recl.createdAt).toLocaleDateString()}
                        </small>
                      </div>
                      <Badge bg={recl.status === "traité" ? "success" : "warning"}>
                        {recl.status}
                      </Badge>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Badge bg="info" className="mb-2">{recl.type}</Badge>
                    <p className="text-white-50">{recl.message}</p>
                  </Card.Body>
                  {isOwner && (
                    <Card.Footer style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                    }} className="d-flex justify-content-end gap-2">
                      <Button
                        variant="outline-warning"
                        size="sm"
                        onClick={() => {
                          setSelectedReclamation(recl);
                          setFormData({
                            type: recl.type,
                            message: recl.message,
                            status: recl.status
                          });
                          setShowModal(true);
                        }}
                      >
                        <FaEdit /> Modifier
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(recl._id)}
                      >
                        <FaTrash /> Supprimer
                      </Button>
                    </Card.Footer>
                  )}
                </Card>
              </Col>
            );
          })}
        </Row>
      )}

      <Modal show={showModal} onHide={() => {
        setShowModal(false);
        setFormData({ type: "", message: "", status: "en cours" });
      }} centered>
        <Modal.Header closeButton style={{
          background: 'rgba(0, 0, 0, 0.7)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          color: 'white'
        }}>
          <Modal.Title>
            {selectedReclamation ? "Modifier Réclamation" : "Nouvelle Réclamation"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{
          background: 'rgba(0, 0, 0, 0.7)',
          color: 'white'
        }}>
          <Form onSubmit={handleSubmit}>
            {!selectedReclamation || user?.role !== "admin" ? (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Type</Form.Label>
                  <Form.Select
                    className="bg-dark text-white border-secondary"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    required
                  >
                    <option value="">Sélectionnez un type</option>
                    <option value="fournisseur">Fournisseur</option>
                    <option value="artisan">Artisan</option>
                    <option value="circuit">Circuit</option>
                    <option value="sécurité">Sécurité</option>
                    <option value="problème de financement">Financement</option>
                    <option value="autre">Autre</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    className="bg-dark text-white border-secondary"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </Form.Group>
              </>
            ) : (
              <Form.Group className="mb-3">
                <Form.Label>Statut</Form.Label>
                <Form.Select
                  className="bg-dark text-white border-secondary"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="en cours">En cours</option>
                  <option value="traité">Résolue</option>
                </Form.Select>
              </Form.Group>
            )}

            <div className="d-flex justify-content-end gap-2">
              <Button 
                variant="secondary" 
                onClick={() => setShowModal(false)}
                className="rounded-pill"
              >
                Annuler
              </Button>
              <Button 
                variant="primary" 
                type="submit"
                className="rounded-pill"
              >
                {selectedReclamation ? "Enregistrer" : "Soumettre"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ReclamationsTable;