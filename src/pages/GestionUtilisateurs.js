import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Button, Table, Alert, Spinner } from "react-bootstrap";
import Navbar from "../Components/navbar";

const GestionUtilisateurs = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get("http://localhost:5000/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
      setError("");
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load users");
      if(error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        navigate("/login");
      }
    } finally {
      setLoading(false);
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
      // Update the UI by removing the deleted user
      setUsers(prev => prev.filter(user => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      setError(error.response?.data?.message || "Failed to delete user");
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit/${id}`);
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
                          onClick={() => handleEdit(user._id)}
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
    </>
  );
};

export default GestionUtilisateurs;