import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
    const { id } = useParams(); // Get user ID from URL
    const navigate = useNavigate();
    const [user, setUser] = useState({ first_name: "", last_name: "", email: "", phone_number: "" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(""); // For error handling

    // Fetch the user details when the component mounts
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                if (!token) return console.error("❌ No token found in localStorage");

                // Get user data by ID
                const response = await axios.get(`http://localhost:5000/users/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                console.error("❌ Error fetching user:", error);
                setError("Failed to fetch user data. Please try again.");
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    // Handle input changes for the user form
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    // Handle form submission to update user details
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("accessToken");
            if (!token) return console.error("❌ No token found in localStorage");

            // Send the updated user data (without the role)
            await axios.put(`http://localhost:5000/users/${id}`, user, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
            });

            console.log("✅ User updated successfully");
            navigate("/AdminDashboard"); // Redirect to Admin Dashboard after update
        } catch (error) {
            console.error("❌ Error updating user:", error);
            setError("Failed to update user. Please try again.");
        }
    };

    // Show loading message while the user data is being fetched
    if (loading) return <p>Loading user details...</p>;

    return (
        <div className="edit-user p-6">
            <h2 className="text-2xl font-bold">Edit User</h2>
            {/* Show error message if any */}
            {error && <div className="text-red-500">{error}</div>}

            <form onSubmit={handleSubmit}>
                {/* First Name */}
                <label>First Name:</label>
                <input
                    type="text"
                    name="first_name"
                    value={user.first_name}
                    onChange={handleChange}
                    className="border p-2 mb-2 w-full"
                />

                {/* Last Name */}
                <label>Last Name:</label>
                <input
                    type="text"
                    name="last_name"
                    value={user.last_name}
                    onChange={handleChange}
                    className="border p-2 mb-2 w-full"
                />

              

                {/* Phone Number */}
                <label>Phone Number:</label>
                <input
                    type="text"
                    name="phone_number"
                    value={user.phone_number}
                    onChange={handleChange}
                    className="border p-2 mb-2 w-full"
                />




                {/* mail */}
                <label>Email.</label>
                <input
                    type="text"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    className="border p-2 mb-2 w-full"
                />


                {/* Update Button */}
                <button type="submit" className="bg-blue-500 text-white p-2 mt-4">
                    Update User
                </button>
            </form>
        </div>
    );
};

export default EditUser;
