import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Accueil from "./pages/Accueil";
import Artisan from "./pages/Artisan";
import Randonée from "./pages/Randonée";
import Contact from "./pages/Contact";
import Reservation from "./pages/Reservation";
import Seconnecter from "./pages/Seconnecter";
import Inscrire from "./pages/inscrire"; // Capitalized the component name
import Forgot from "../src/pages/forgot";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Accueil />,
    errorElement: <h1>Sorry</h1>,
  },
  {
    path: "/Randonée",
    element: <Randonée />,
  },
  {
    path: "/Artisan",
    element: <Artisan />,
  },
  {
    path: "/Reservation",
    element: <Reservation />,
  },
  {
    path: "/Contact",
    element: <Contact />,
  },
  {
    path: "/Seconnecter",
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
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
