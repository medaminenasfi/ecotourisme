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
      <br/><br/><br/>
      <div className="container mt-5">
        <div className="card shadow-sm">
          <div className="card-header bg-white d-flex justify-content-between align-items-center">
            <div>
              <h2 className="mb-0">Gestion des Services</h2>
              <p className="text-muted mb-0">Gestion des services fournis par les partenaires</p>
            </div>
          </div>

          <div className="card-body">
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Chargement...</span>
                </Spinner>
              </div>
            ) : services.length === 0 ? (
              <div className="text-center py-4 text-muted">Aucun service trouvé</div>
            ) : (
              <Table hover responsive className="mb-0">
                <thead className="thead-light">
                  <tr>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Fournisseur</th>
                    <th>Téléphone</th>
                    <th>Photo</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map(service => (
                    <tr key={service._id}>
                      <td>{service.type}</td>
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
                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                          />
                        )}
                      </td>
                      <td className="text-center">
                        <Button
                          variant="link"
                          className="text-danger"
                          onClick={() => confirmDelete(service)}
                        >
                          <FaTrashAlt size={20} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
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
          <Button variant="danger" onClick={deleteService}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GestionFournisseurs;