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
      <br/><br/><br/>
      <div className="container mt-5">
        <div className="card shadow-sm">
          <div className="card-header bg-white d-flex justify-content-between align-items-center">
            <div>
              <h2 className="mb-0">User Management</h2>
              <p className="text-muted mb-0">Manage system users and permissions</p>
            </div>
          </div>

          <div className="card-body">
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : users.length === 0 ? (
              <div className="text-center py-4 text-muted">No users found</div>
            ) : (
              <Table hover responsive className="mb-0">
                <thead className="thead-light">
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Gender</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user._id}>
                      <td>{user.first_name} {user.last_name}</td>
                      <td>{user.phone_number}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`badge ${
                          user.role === 'Admin' ? 'bg-danger' :
                          user.role === 'Manager' ? 'bg-warning text-dark' :
                          'bg-primary'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td>{user.gender}</td>
                      <td className="text-center">
                        <Button
                          variant="link"
                          className="text-primary me-2"
                          onClick={() => openModal(user)}
                        >
                          <FaEdit size={20} />
                        </Button>
                        <Button
                          variant="link"
                          className="text-danger"
                          onClick={() => deleteUser(user._id)}
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

      {/* Edit User Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
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
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.last_name}
                    onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                    required
                  />
                </Form.Group>
              </div>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                value={formData.phone_number}
                onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                required
              />
            </Form.Group>

    

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default GestionUtilisateurs;