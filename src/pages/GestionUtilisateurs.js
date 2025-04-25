import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Button, Table, Alert, Spinner, Modal, Form } from "react-bootstrap";
import jwtDecode from "jwt-decode";
import backgroundImage from "../assest/Accueil.jpg"; // Fix import path
import Navbar from "../Components/navbar";

const GestionUtilisateurs = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: ""
  });

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
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    if (!validateToken()) return;
    
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get("http://localhost:5000/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
      setError("");
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateToken()) return;
    
    setError("");
    setSuccess("");
    
    try {
      const token = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      };

      const updates = { ...formData };
      if (!updates.password) {
        delete updates.password;
      }

      if (selectedUser) {
        await axios.put(
          `http://localhost:5000/users/${selectedUser._id}`,
          updates,
          config
        );
        setSuccess("Utilisateur mis à jour avec succès");
      }

      setShowModal(false);
      await fetchUsers();
    } catch (err) {
      handleError(err);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur?")) return;
    
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`http://localhost:5000/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess("Utilisateur supprimé avec succès");
      setUsers(prev => prev.filter(user => user._id !== id));
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

  const openModal = (user = null) => {
    setSelectedUser(user);
    setFormData(user ? { 
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      email: user.email,
      password: ""
    } : {
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      password: ""
    });
    setShowModal(true);
  };

  return (
    <>
    <Navbar />

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
              <span className="text-primary">Gestion</span> des Utilisateurs
            </h1>
            <div className="text-center mt-2">
              <p className="text-white mb-0">
                Gérez les comptes utilisateurs, modifiez les informations et les rôles
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
            ) : users.length === 0 ? (
              <div className="text-center py-4 text-muted">Aucun utilisateur trouvé</div>
            ) : (
              <div className="table-responsive">
                <Table hover responsive className="align-middle text-white mb-0">
                  <thead style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                    <tr>
                      <th>Nom Complet</th>
                      <th>Téléphone</th>
                      <th>Email</th>
                      <th>Rôle</th>
                      <th>Genre</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user._id} style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                        <td>{user.first_name} {user.last_name}</td>
                        <td>{user.phone_number || '-'}</td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`badge rounded-pill ${
                            user.role === 'Admin' ? 'bg-danger' :
                            user.role === 'Manager' ? 'bg-warning text-dark' :
                            'bg-primary'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td>{user.gender || '-'}</td>
                        <td className="text-end">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="me-2"
                            onClick={() => openModal(user)}
                          >
                            <FaEdit className="me-1" /> Modifier
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => deleteUser(user._id)}
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

      {/* Edit User Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered 
        contentClassName="bg-dark text-white"
        backdrop="static">
        <Modal.Header closeButton closeVariant="white" className="border-secondary">
          <Modal.Title className="text-primary">Modifier Utilisateur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Prénom</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.first_name}
                    onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                    required
                    className="bg-dark text-white border-secondary"
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.last_name}
                    onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                    required
                    className="bg-dark text-white border-secondary"
                  />
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="bg-dark text-white border-secondary"
                  />
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Téléphone</Form.Label>
                  <Form.Control
                    type="tel"
                    value={formData.phone_number}
                    onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                    className="bg-dark text-white border-secondary"
                  />
                </Form.Group>
              </div>

              <div className="col-12">
                <Form.Group className="mb-4">
                  <Form.Label>Nouveau Mot de Passe</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Laisser vide pour ne pas modifier"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="bg-dark text-white border-secondary"
                    minLength="6"
                  />
                  <Form.Text className="text-muted">
                    Minimum 6 caractères. Laisser vide pour conserver le mot de passe actuel
                  </Form.Text>
                </Form.Group>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
                Annuler
              </Button>
              <Button variant="primary" type="submit">
                Enregistrer
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div></>
  );
};

export default GestionUtilisateurs;