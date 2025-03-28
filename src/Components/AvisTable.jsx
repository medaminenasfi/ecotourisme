import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus, FaStar } from "react-icons/fa";

const AvisTable = () => {
  const [avis, setAvis] = useState([]);
  const [circuits, setCircuits] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAvis, setSelectedAvis] = useState(null);
  const [formData, setFormData] = useState({ circuitId: "", rating: 0, comment: "" });
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
        // Fetch avis with user and circuit details
        const avisResponse = await axios.get("http://localhost:5000/api/avis", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAvis(avisResponse.data.avis);

        // Fetch circuits
        const circuitsResponse = await axios.get("http://localhost:5000/api/circuits", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCircuits(circuitsResponse.data);

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
      const url = selectedAvis 
        ? `http://localhost:5000/api/avis/${selectedAvis._id}`
        : "http://localhost:5000/api/avis";
      
      const response = selectedAvis
        ? await axios.put(url, formData, { headers: { Authorization: `Bearer ${token}` } })
        : await axios.post(url, formData, { headers: { Authorization: `Bearer ${token}` } });

      if (response.data) {
        setAvis(prev => selectedAvis 
          ? prev.map(a => a._id === response.data._id ? response.data : a) 
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
        await axios.delete(`http://localhost:5000/api/avis/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAvis(prev => prev.filter(a => a._id !== id));
      } catch (err) {
        setError("Échec de la suppression");
      }
    }
  };

  const StarRating = ({ rating }) => (
    <div className="d-flex">
      {[...Array(5)].map((_, i) => (
        <FaStar key={i} color={i < rating ? "#ffc107" : "#e4e5e9"} />
      ))}
    </div>
  );

  return (
    <div>
      <div className="d-flex justify-content-between mb-4">
        <h2 className="text-primary">Gestion des Avis</h2>
        <Button variant="success" onClick={() => { setSelectedAvis(null); setShowModal(true); }}>
          <FaPlus className="me-2" /> Nouvel Avis
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Utilisateur</th>
              <th>Circuit</th>
              <th>Note</th>
              <th>Commentaire</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {avis.map(avi => {
              const user = users.find(u => u._id === avi.userId);
              const circuit = circuits.find(c => c._id === avi.circuitId);
              return (
                <tr key={avi._id}>
                  <td>{user?.username || "Utilisateur inconnu"}</td>
                  <td>{circuit?.name || "Circuit inconnu"}</td>
                  <td><StarRating rating={avi.rating} /></td>
                  <td>{avi.comment}</td>
                  <td>
                    <Button variant="outline-warning" size="sm" onClick={() => {
                      setSelectedAvis(avi);
                      setFormData(avi);
                      setShowModal(true);
                    }}>
                      <FaEdit />
                    </Button>
                    <Button variant="outline-danger" size="sm" className="ms-2" onClick={() => handleDelete(avi._id)}>
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
          <Modal.Title>{selectedAvis ? "Modifier Avis" : "Nouvel Avis"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Circuit</Form.Label>
              <Form.Select
                value={formData.circuitId}
                onChange={(e) => setFormData({ ...formData, circuitId: e.target.value })}
                required
              >
                <option value="">Sélectionner un circuit</option>
                {circuits.map(circuit => (
                  <option key={circuit._id} value={circuit._id}>
                    {circuit.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Note</Form.Label>
              <div className="d-flex">
                {[1, 2, 3, 4, 5].map((n) => (
                  <FaStar
                    key={n}
                    className="me-2"
                    style={{ cursor: "pointer" }}
                    color={n <= formData.rating ? "#ffc107" : "#e4e5e9"}
                    onClick={() => setFormData({ ...formData, rating: n })}
                  />
                ))}
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Commentaire</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Annuler</Button>
            <Button variant="primary" type="submit">
              {selectedAvis ? "Enregistrer" : "Ajouter"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default AvisTable;