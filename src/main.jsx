import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx"
import App from "./App.jsx";
import Play from "./pages/Play.jsx";
import "./index.css";
import { getLocalstorage } from "./services/locatStorage.js";
import Profile from "./pages/Profile.jsx";
import Leadbord from "./pages/Leadbord.jsx";

// const Authentication = import('./componenet/Authentication.jsx')

//app routing setup with react router 
const route = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
