// GestionFournisseurs.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import { Button, Table, Alert, Spinner, Modal, Badge } from "react-bootstrap";
import jwtDecode from "jwt-decode";
import backgroundImage from "../assest/Accueil.jpg";
import Navbar from "../Components/navbar";
import ScrollToTopButton from "../Components/ScrollToTopButton";

const GestionFournisseurs = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const validateToken = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      window.location.href = "/login";
      return false;
    }
    
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return false;
      }
      return true;
    } catch (error) {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
      return false;
    }
  };

  useEffect(() => { fetchServices(); }, []);

  const fetchServices = async () => {
    if (!validateToken()) return;
    
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get("http://localhost:5000/api/services", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(response.data);
      setError("");
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (service) => {
    setSelectedService(service);
    setShowDeleteModal(true);
  };

  const deleteService = async () => {
    setShowDeleteModal(false);
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`http://localhost:5000/api/services/${selectedService._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess("Service supprimé avec succès");
      setServices(prev => prev.filter(s => s._id !== selectedService._id));
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (err) => {
    console.error(err);
    if (err.response?.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }
    setError(err.response?.data?.message || "Erreur de communication");
  };

  return (
    <>
< Navbar/>
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
              <span className="text-primary">Gestion</span> des Fournisseurs
            </h1>
            <div className="text-center mt-2">
              <p className="text-muted mb-0">
                Gérez les services proposés par nos partenaires fournisseurs
              </p>
            </div>
          </div>

          <div className="card-body">
            {error && <Alert variant="danger" className="rounded-3">{error}</Alert>}
            {success && <Alert variant="success" className="rounded-3">{success}</Alert>}

            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : services.length === 0 ? (
              <div className="text-center py-4 text-muted">Aucun service enregistré</div>
            ) : (
              <div className="table-responsive">
                <Table hover responsive className="align-middle text-white mb-0">
                  <thead style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                    <tr>
                      <th>Type de service</th>
                      <th>Description</th>
                      <th>Fournisseur</th>
                      <th>Téléphone</th>
                      <th>Photo</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map(service => (
                      <tr key={service._id} style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                        <td className="fw-medium">{service.type}</td>
                        <td>{service.description}</td>
                        <td>
                          {service.fournisseur?.first_name} {service.fournisseur?.last_name}
                        </td>
                        <td>{service.phoneNumber}</td>
                        <td>
                          {service.photo && (
                            <img 
                              src={service.photo} 
                              alt="Service" 
                              className="img-thumbnail"
                              style={{ width: "60px", height: "60px", objectFit: "cover" }}
                            />
                          )}
                        </td>
                        <td className="text-end">
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => confirmDelete(service)}
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

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered 
        contentClassName="bg-dark text-white"
        backdrop="static">
        <Modal.Header closeButton closeVariant="white" className="border-secondary">
          <Modal.Title className="text-primary">Confirmation de suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir supprimer définitivement ce service ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowDeleteModal(false)}>
            Annuler
          </Button>
          <Button variant="danger" onClick={deleteService}>
            Confirmer la suppression
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    <ScrollToTopButton />

    </>
  );
};

export default GestionFournisseurs;