import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Button, Table, Alert, Spinner, Modal, Form } from "react-bootstrap";
import Navbar from "../Components/navbar";
import jwtDecode from "jwt-decode";

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
    role: "User",
    gender: "Male"
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

      if (selectedUser) {
        await axios.put(`http://localhost:5000/users/${selectedUser._id}`, formData, config);
        setSuccess("User updated successfully");
      }

      setShowModal(false);
      await fetchUsers();
    } catch (err) {
      handleError(err);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`http://localhost:5000/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess("User deleted successfully");
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
    setError(err.response?.data?.message || "An error occurred");
  };

  const openModal = (user = null) => {
    setSelectedUser(user);
    setFormData(user || {
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      role: "User",
      gender: "Male"
    });
    setShowModal(true);
  };

  return (
    <>
      <Navbar />
      <br/><br/><br/><br/>
      
      <div className="container">
        <h1 className="mb-3 display-5 fw-bold text-primary">Gestion Utilisateurs</h1>
        <p className="text-muted mb-4">
          Gérez les comptes utilisateurs, modifiez les informations et les rôles
        </p>

        <div className="dashboard-card bg-white p-4 rounded-3 shadow-sm">
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-4 text-muted">Aucun utilisateur trouvé</div>
          ) : (
            <Table hover responsive className="align-middle">
              <thead className="bg-light">
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
                  <tr key={user._id}>
                    <td>{user.first_name} {user.last_name}</td>
                    <td>{user.phone_number}</td>
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
                    <td>{user.gender}</td>
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
          )}
        </div>
      </div>

      {/* Edit User Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="bg-light">
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
                  />
                </Form.Group>
              </div>
            </div>

            <Form.Group className="mb-4">
              <Form.Label>Numéro de téléphone</Form.Label>
              <Form.Control
                type="text"
                value={formData.phone_number}
                onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                required
              />
            </Form.Group>

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
    </>
  );
};

export default GestionUtilisateurs;
