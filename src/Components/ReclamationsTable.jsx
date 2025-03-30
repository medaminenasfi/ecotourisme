import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button, Modal, Form, Alert, Spinner } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus, FaInfoCircle } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const ReclamationsTable = () => {
  const { user } = useContext(AuthContext);
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
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchReclamations = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        
        const response = await axios.get(
          "http://localhost:5000/api/reclamations", 
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setReclamations(response.data.reclamations);
        setError("");
      } catch (err) {
        console.error("Data loading error:", err);
        setError(err.response?.data?.error || "Failed to load data. Please try again.");
        
        if (err.response?.status === 401) {
          localStorage.removeItem("accessToken");
          window.location.reload();
        }
      } finally {
        setLoading(false);
      }
    };
    fetchReclamations();
  }, [refreshKey]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const url = selectedReclamation
        ? `http://localhost:5000/api/reclamations/${selectedReclamation._id}`
        : "http://localhost:5000/api/reclamations";
      
      const method = selectedReclamation ? "put" : "post";
      
      let dataToSend;
      if (selectedReclamation) {
        if (user.role === "admin") {
          dataToSend = { status: formData.status };
        } else {
          dataToSend = { 
            type: formData.type, 
            message: formData.message 
          };
        }
      } else {
        dataToSend = { type: formData.type, message: formData.message };
      }

      await axios[method](url, dataToSend, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setShowModal(false);
      setFormData({ type: "", message: "", status: "en cours" });
      setRefreshKey(prev => prev + 1);
    } catch (err) {
      setError(err.response?.data?.error || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this reclamation?")) {
      try {
        const token = localStorage.getItem("accessToken");
        await axios.delete(`http://localhost:5000/api/reclamations/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRefreshKey(prev => prev + 1);
      } catch (err) {
        setError("Failed to delete reclamation");
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5 py-5">
        <Spinner animation="border" variant="primary" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3 text-muted">Loading reclamations...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary mb-0">
          <FaInfoCircle className="me-2" />
          Reclamations Management
        </h2>
        <Button 
          variant="success" 
          onClick={() => {
            setSelectedReclamation(null);
            setShowModal(true);
          }}
          className="d-flex align-items-center"
        >
          <FaPlus className="me-2" /> New Reclamation
        </Button>
      </div>

      {error && <Alert variant="danger" className="rounded-lg">{error}</Alert>}

      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <div className="table-responsive rounded-lg">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-primary">
                <tr>
                  <th className="ps-4">User</th>
                  <th>Type</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Date Created</th>
                  <th className="pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reclamations.map(recl => (
                  <tr key={recl._id} className="cursor-pointer">
                    <td className="ps-4">
                      <div className="d-flex flex-column">
                        <span className="fw-medium">
                          {recl.userId?.firstName} {recl.userId?.lastName}
                        </span>
                        <small className="text-muted">{recl.userId?.email}</small>
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-info text-dark">{recl.type}</span>
                    </td>
                    <td className="text-truncate" style={{ maxWidth: "300px" }}>
                      {recl.message}
                    </td>
                    <td>
                      <span className={`badge rounded-pill ${recl.status === "traité" ? "bg-success" : "bg-warning"}`}>
                        {recl.status}
                      </span>
                    </td>
                    <td>
                      {new Date(recl.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="pe-4">
                      {(user?.role === "admin" || recl.userId?._id === user?._id) && (
                        <div className="d-flex gap-2">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="rounded-circle p-2"
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
                            <FaEdit />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="rounded-circle p-2"
                            onClick={() => handleDelete(recl._id)}
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={() => {
        setShowModal(false);
        setFormData({ type: "", message: "", status: "en cours" });
      }} centered>
        <Modal.Header closeButton className="bg-light border-bottom">
          <Modal.Title className="h5">
            {selectedReclamation ? "Edit Reclamation" : "Create New Reclamation"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body className="py-4">
            {!selectedReclamation || user?.role !== "admin" ? (
              <>
                <Form.Group className="mb-4">
                  <Form.Label>Reclamation Type</Form.Label>
                  <Form.Select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="rounded-pill"
                    required
                  >
                    <option value="">Select a type</option>
                    <option value="fournisseur">Fournisseur</option>
                    <option value="artisan">Artisan</option>
                    <option value="circuit">Circuit</option>
                    <option value="sécurité">Sécurité</option>
                    <option value="problème de financement">Financement</option>
                    <option value="autre">Autre</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Detailed Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your reclamation in detail..."
                    className="rounded-lg"
                    required
                  />
                </Form.Group>
              </>
            ) : (
              <Form.Group className="mb-4">
                <Form.Label>Update Status</Form.Label>
                <Form.Select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="form-select-lg rounded-pill"
                >
                  <option value="en cours">In Progress</option>
                  <option value="traité">Resolved</option>
                </Form.Select>
              </Form.Group>
            )}
          </Modal.Body>
          <Modal.Footer className="border-top-0">
            <Button 
              variant="light" 
              onClick={() => setShowModal(false)}
              className="rounded-pill px-4"
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              type="submit"
              className="rounded-pill px-4"
            >
              {selectedReclamation ? "Save Changes" : "Submit Reclamation"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default ReclamationsTable;