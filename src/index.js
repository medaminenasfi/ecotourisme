import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Accueil from "./pages/Accueil";
import Artisan from "./pages/Artisan";
import Circuits from "./pages/Circuits";
import Contact from "./pages/Contact";
import Reservation from "./pages/Reservation";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Accueil />,
    errorElement: <h1>Sorry</h1>,
  },
  {
    path: "/Artisan",
    element: <Artisan />,
  },
  {
    path: "/Circuits",
    element: <Circuits />,
  },
  {
    path: "/Reservation",
    element: <Reservation />,
  },
  {
    path: "/Contact",
    element: <Contact />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
