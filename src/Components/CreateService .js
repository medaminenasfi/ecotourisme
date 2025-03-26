// pages/CreateService.js
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateService = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: "",
    description: "",
    photo: "",
    phoneNumber: user?.phone_number || ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const serviceTypes = [
    "Guides locaux",
    "Artisans",
    "Hébergeurs",
    "Transporteurs",
    "Loueurs de matériel"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/services", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Erreur de création de service");
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!user || user.role !== "fournisseur") {
    return (
      <div className="container mt-5">
        <Alert variant="danger">Accès non autorisé</Alert>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-white">
          <h2>Créer un nouveau service</h2>
        </div>
        <div className="card-body">
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Type de service</Form.Label>
              <Form.Select 
                name="type" 
                value={formData.type} 
                onChange={handleChange}
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
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>URL de la photo</Form.Label>
              <Form.Control
                type="url"
                name="photo"
                value={formData.photo}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Numéro de téléphone</Form.Label>
              <Form.Control
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Créer le service"
              )}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateService;