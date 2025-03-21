import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Navbar from "../Components/navbar"; // Import the Navbar component

const GestionUtilisateurs = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // Needed for navigation

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
    } catch (error) {
      console.error("❌ Error fetching users:", error);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`http://localhost:5000/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (error) {
      console.error("❌ Error deleting user:", error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/admin/edit/${id}`);
  };

  return (
    <>
    <Navbar /> {/* Include the Navbar component at the top */}
  <br/> <br/> <br/>    <br/>    <br/>    <br/>

    <div className="admin-dashboard p-6 bg-gray-50 rounded-lg shadow-lg">
    <center>
      <h2 className="text-2xl font-bold text-gray-700">Admin Dashboard</h2>
      <p className="text-gray-600 mt-2">Bienvenue, Admin! Gérez les utilisateurs et les paramètres ici.</p>
      <h3 className="mt-6 text-xl font-semibold">All Users</h3>

      </center>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full table-auto bg-white shadow-md rounded-md overflow-hidden mx-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2 text-gray-700">Name</th>
              <th className="border px-4 py-2 text-gray-700">Phone Number</th>
              <th className="border px-4 py-2 text-gray-700">Email</th>
              <th className="border px-4 py-2 text-gray-700">Role</th>
              <th className="border px-4 py-2 text-gray-700">Gender</th>

              <th className="border px-4 py-2 text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border px-4 py-2 text-gray-800">{user.first_name} {user.last_name}</td>
                <td className="border px-4 py-2 text-gray-800">{user.phone_number}</td>
                <td className="border px-4 py-2 text-gray-800">{user.email}</td>
                <td className="border px-4 py-2 text-gray-800">{user.role}</td>
                <td className="border px-4 py-2 text-gray-800">{user.gender}</td>

                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleUpdate(user._id)}
                    className="text-blue-500 hover:text-blue-700 p-2 rounded-full"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="text-red-500 hover:text-red-700 p-2 rounded-full ml-2"
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default GestionUtilisateurs;
