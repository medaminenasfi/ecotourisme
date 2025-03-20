import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                if (!token) throw new Error("No token found");

                const response = await axios.get(`http://localhost:5000/users/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setUser(response.data);  // Set user data into state
            } catch (error) {
                setError("Failed to fetch user data.");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        setUser((prevUser) => ({ ...prevUser, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("accessToken");
            if (!token) throw new Error("No token found");

            await axios.put(`http://localhost:5000/users/${id}`, user, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            navigate("/AdminDashboard");
        } catch (error) {
            setError("Failed to update user.");
        }
    };

    return (
      <center>
      <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-xl">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Edit User</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                {loading ? (
                    <div className="text-center">Loading user details...</div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-gray-700 text-sm">First Name:</label>
                            <input
                                type="text"
                                name="first_name"
                                value={user.first_name}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter first name"
                            />
                        </div>
                   <br/> 
                        <div className="space-y-2">
                            <label className="block text-gray-700 text-sm">Last Name:</label>
                            <input
                                type="text"
                                name="last_name"
                                value={user.last_name}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter last name"
                            />
                        </div>
                        <br/>
                        <div className="space-y-2">
                            <label className="block text-gray-700 text-sm">Phone Number:</label>
                            <input
                                type="text"
                                name="phone_number"
                                value={user.phone_number}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter phone number"
                            />
                        </div>
                        <br/>
                        

                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
                        >
                            Update User
                        </button>
                    </form>
                )}

                {/* Return to Admin Dashboard Button */}
                <button
                    onClick={() => navigate("/AdminDashboard")}
                    className="w-full py-3 mt-4 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition"
                >
                    Return to Admin Dashboard
                </button>
            </div>
        </div>
        </center>
    );
};

export default EditUser;
