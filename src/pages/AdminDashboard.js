import React from "react";
import { NavLink } from "react-router-dom";
import { 
  FaUsers, 
  FaBox, 
  FaClipboardList, 
  FaMapMarkedAlt, 
  FaChartLine 
} from "react-icons/fa";
import Navbar from "../Components/navbar";
import backgroundImage from "../assest/Accueil.jpg";

const AdminDashboard = () => {
  return (
    <div style={{
      background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      paddingTop: '80px'
    }}>
      <Navbar />
      
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
              <span className="text-primary">Tableau de Bord</span> Administrateur
            </h1>
          </div>
          <br></br>
          <div className="card-body">
            <div className="row g-4">
              {[
                { to: "utilisateurs", icon: <FaUsers />, title: "Utilisateurs", subtitle: "Gestion des comptes" },
                { to: "circuits", icon: <FaMapMarkedAlt />, title: "Circuits", subtitle: "Gestion des parcours" },
                { to: "reservations", icon: <FaClipboardList />, title: "Réservations", subtitle: "Suivi des bookings" },
                { to: "fournisseurs", icon: <FaBox />, title: "Fournisseurs", subtitle: "Partenaires services" },
                // Ajoutez ce nouvel élément pour les statistiques
                { to: "StatisticsPage", icon: <FaChartLine />, title: "Statistiques", subtitle: "Analyses et rapports" }
              ].map((item, index) => (
                <div key={index} className="col-12 col-md-6 col-xl-3">
                  <NavLink
                    to={`/admin/${item.to}`}
                    className={({ isActive }) => 
                      `btn btn-lg h-100 text-start p-4 d-flex align-items-center ${
                        isActive ? "btn-primary" : "btn-outline-primary"
                      } rounded-4 border-2`
                    }
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <span className="fs-2 me-3">{item.icon}</span>
                    <div>
                      <h5 className="mb-1">{item.title}</h5>
                      <small className="opacity-75">{item.subtitle}</small>
                    </div>
                  </NavLink>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;  