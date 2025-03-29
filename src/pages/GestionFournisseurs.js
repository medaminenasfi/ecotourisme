import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import { Button, Table, Alert, Spinner, Modal } from "react-bootstrap";
import Navbar from "../Components/navbar";
import jwtDecode from "jwt-decode";

const GestionFournisseurs = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate();

  const validateToken = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return false;
    }
    
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("accessToken");
        navigate("/login");
        return false;
      }
      return true;
    } catch (error) {
      localStorage.removeItem("accessToken");
      navigate("/login");
      return false;
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

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
      setServices(prev => prev.filter(service => service._id !== selectedService._id));
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (err) => {
    console.error(err);
    if (err.response?.status === 401 || err.response?.status === 403) {
      localStorage.removeItem("accessToken");
      navigate("/login");
    }
    setError(err.response?.data?.message || "Une erreur est survenue");
  };

  return (
    <>
      <Navbar />
      <br/><br/><br/><br/>
      
      <div className="container">
        <h1 className="mb-3 display-5 fw-bold text-primary">Gestion des Fournisseurs</h1>
        <p className="text-muted mb-4">
          Gérez les services proposés par nos partenaires fournisseurs
        </p>

        <div className="dashboard-card bg-white p-4 rounded-3 shadow-sm">
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Chargement...</span>
              </Spinner>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-4 text-muted">Aucun service enregistré</div>
          ) : (
            <Table hover responsive className="align-middle">
              <thead className="bg-light">
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
                  <tr key={service._id}>
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
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton className="bg-light">
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
    </>
  );
};

export default GestionFournisseurs;