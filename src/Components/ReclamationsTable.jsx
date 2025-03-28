import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const ReclamationsTable = () => {
  const [reclamations, setReclamations] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReclamation, setSelectedReclamation] = useState(null);
  const [formData, setFormData] = useState({ type: "", message: "", status: "en cours" });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
// Dans toutes vos requêtes axios, ajoutez ceci :
const token = localStorage.getItem("token");
if (!token) {
  // Redirigez vers la page de login
  return;
}        
        // Fetch reclamations
        const reclResponse = await axios.get("http://localhost:5000/api/reclamations", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setReclamations(reclResponse.data.reclamations);

        // Fetch users
        const usersResponse = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(usersResponse.data);
      } catch (err) {
        setError("Erreur de chargement des données");
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const url = selectedReclamation
        ? `http://localhost:5000/api/reclamations/${selectedReclamation._id}`
        : "http://localhost:5000/api/reclamations";
      
      const response = selectedReclamation
        ? await axios.put(url, formData, { headers: { Authorization: `Bearer ${token}` } })
        : await axios.post(url, formData, { headers: { Authorization: `Bearer ${token}` } });

      if (response.data) {
        setReclamations(prev => selectedReclamation 
          ? prev.map(r => r._id === response.data._id ? response.data : r) 
          : [...prev, response.data]);
        setShowModal(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'opération");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Confirmer la suppression ?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/reclamations/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setReclamations(prev => prev.filter(r => r._id !== id));
      } catch (err) {
        setError("Échec de la suppression");
      }
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-4">
        <h2 className="text-danger">Gestion des Réclamations</h2>
        <Button variant="success" onClick={() => { setSelectedReclamation(null); setShowModal(true); }}>
          <FaPlus className="me-2" /> Nouvelle Réclamation
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Utilisateur</th>
              <th>Type</th>
              <th>Message</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reclamations.map(recl => {
              const user = users.find(u => u._id === recl.userId);
              return (
                <tr key={recl._id}>
                  <td>{user?.username || "Utilisateur inconnu"}</td>
                  <td>{recl.type}</td>
                  <td>{recl.message}</td>
                  <td>
                    <span className={`badge ${recl.status === "traité" ? "bg-success" : "bg-warning"}`}>
                      {recl.status}
                    </span>
                  </td>
                  <td>
                    <Button variant="outline-warning" size="sm" onClick={() => {
                      setSelectedReclamation(recl);
                      setFormData(recl);
                      setShowModal(true);
                    }}>
                      <FaEdit />
                    </Button>
                    <Button variant="outline-danger" size="sm" className="ms-2" onClick={() => handleDelete(recl._id)}>
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedReclamation ? "Modifier Réclamation" : "Nouvelle Réclamation"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                required
              >
                <option value="">Choisir un type</option>
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
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </Form.Group>

            {selectedReclamation && (
              <Form.Group className="mb-3">
                <Form.Label>Statut</Form.Label>
                <Form.Select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="en cours">En cours</option>
                  <option value="traité">Traité</option>
                </Form.Select>
              </Form.Group>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Annuler</Button>
            <Button variant="primary" type="submit">
              {selectedReclamation ? "Enregistrer" : "Ajouter"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default ReclamationsTable;