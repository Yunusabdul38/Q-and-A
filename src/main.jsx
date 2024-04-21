import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Authentication from "./componenet/Authentication.jsx";
import App from "./App.jsx";
import Play from "./componenet/Dashbord/QandA/Play.jsx";
import "./index.css";
import { getLocalstorage } from "./services/locatStorage.js";
import Profile from "./componenet/Dashbord/Profile.jsx";
import Leadbord from "./componenet/Dashbord/Leadbord.jsx";

// const Authentication = import('./componenet/Authentication.jsx')

const route = createBrowserRouter([
  {
    path: "/",
    element: <Authentication />,
    loader: () => {
      return getLocalstorage();
    },
  },
  {
    element: <App />,
    children: [
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/leadbord",
        element: <Leadbord />,
      },
      {
        path: "/play",
        element: <Play />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={route} />
  </React.StrictMode>
);
