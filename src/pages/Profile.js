import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/Seconnecter"); // Redirect to login if no user
    } else {
      setTimeout(() => setLoading(false), 1000); // Simulate loading state
    }
  }, [user, navigate]);

  // Display loading or redirection message
  if (loading) {
    return <p className="text-center text-gray-500">Chargement des informations...</p>;
  }

  if (!user) {
    return <p className="text-center text-gray-500">Redirection en cours...</p>;
  }

  return (

    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-2xl">
        <h2 className="text-2xl font-semibold text-center mb-4">Profil Utilisateur</h2>
        <div className="space-y-3">
          <p><strong>Prénom :</strong> {user.first_name || "Non renseigné"}</p>
<p><strong>Nom :</strong> {user.last_name || "Non renseigné"}</p>
<p><strong>Email :</strong> {user.email || "Non renseigné"}</p>
<p><strong>Téléphone :</strong> {user.phone_number || "Non renseigné"}</p>
<p><strong>Genre :</strong> {user.gender }</p>
<p><strong>Rôle :</strong> {user.role }</p>

        </div>
        <div className="mt-6 text-center">
          {user.role === "admin" && (
            <button
              onClick={() => navigate("/AdminDashboard")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mb-4"
            >
              Accéder au tableau de bord Admin
            </button>
          )}
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            onClick={() => {
              logout(); // Logout the user
              navigate("/Seconnecter"); // Redirect to login after logout
            }}
          >
            Se Déconnecter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
