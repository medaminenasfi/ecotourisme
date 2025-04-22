import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import AdminDashboard from "./pages/AdminDashboard";
import Accueil from "./pages/Accueil";
import Artisan from "./pages/Artisan";
import Randonée from "./pages/Randonée";
import Contact from "./pages/Contact";
import Reservation from "./pages/Reservation";
import Seconnecter from "./pages/Seconnecter";
import Inscrire from "./pages/inscrire";
import Forgot from "./pages/forgot";
import Profile from "./pages/Profile";
import ProtectedRoute from "./pages/ProtectedRoute";
import EditUser from "./pages/EditUser";  // Import EditUser
import GestionUtilisateurs from "./pages/GestionUtilisateurs";
import GestionFournisseurs from "./pages/GestionFournisseurs";
import GestionReservations from "./pages/GestionReservations";
import GestionCircuits from "./pages/GestionCircuits";
import AdminRoute from "./pages/AdminRoute"; 
import CreateService from "./Components/CreateService ";
import ServicesList  from  "./pages/ServicesList"
 import { NavLink } from "react-router-dom";
import AvisTable from "./Components/AvisTable.jsx";
import Gestion  from "./Components/gestion.jsx";
import { Navigate } from "react-router-dom";
import ReclamationsTable from "./Components/ReclamationsTable.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Accueil />,
    errorElement: <h1>Page non trouvée</h1>,
  },
  {
    path: "/Randonée",
    element: <Randonée />,
  },
  {
    path: "/artisan",
    element: <Artisan />,
  },
  {
    path: "/reservation",
    element: (
      <ProtectedRoute>
        <Reservation />
      </ProtectedRoute>
    ),
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/seconnecter",
    element: <Seconnecter />,
  },
  {
    path: "/inscrire",
    element: <Inscrire />,
  },
  {
    path: "/forgot",
    element: <Forgot />,
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/AdminDashboard",
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/edit/:id", // Add this route for editing users
    element: (
      <ProtectedRoute>
        <EditUser />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/fournisseurs",
    element: (
      <AdminRoute>
        <GestionFournisseurs />
      </AdminRoute>
    ),
  },
  {
    path: "/admin/reservations",
    element: (
      <AdminRoute>
        <GestionReservations />
      </AdminRoute>
    ),
  },
  {
    path: "/admin/utilisateurs",
    element: (
      <AdminRoute>
        <GestionUtilisateurs />
      </AdminRoute>
    ),
  },
  {
    path: "/admin/circuits",
    element: (
      <AdminRoute>
        <GestionCircuits />
      </AdminRoute>
    ),
  },
  {
    path: "/create-service",
    element: (
      <ProtectedRoute>
        <CreateService />
      </ProtectedRoute>
    ),
  },
  {
    path: "/ServicesList",
  element :( 
    <ProtectedRoute allowedRoles={['admin', 'fournisseur', 'voyageur']}>
      <ServicesList />
    </ProtectedRoute>
)
  },
  {
    path: "gestion",
    element: (
      <ProtectedRoute allowedRoles={['admin', 'fournisseur', 'voyageur']}>
        <Gestion /> {/* Utilisez le composant Gestion au lieu de Sidebar */}
      </ProtectedRoute>
    ),
    children: [
      {
        index: true, // Redirection par défaut
        element: <Navigate to="avis" replace />
      },
      {
        path: "avis",
        element: <AvisTable />
      },
      {
        path: "reclamations",
        element: <ReclamationsTable />
      }
    ]
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
