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
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
