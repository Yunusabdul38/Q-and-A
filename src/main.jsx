import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Authentication from "./componenet/Authentication.jsx";
import App from "./App.jsx";
import QandA from "./componenet/Dashbord/QandA/QandA.jsx";
import "./index.css";
import { getLocalstorage } from "./services/locatStorage.js";
import Home from "./componenet/Dashbord/Home.jsx";
import Profile from "./componenet/Dashbord/Profile.jsx";
import Leadbord from "./componenet/Dashbord/Leadbord.jsx";
import { fetchQuestions } from "./services/fetchQuestions.js";

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
        path: "dashbord/home",
        element: <Home />,
      },
      {
        path: "/dashbord/profile",
        element: <Profile />,
      },
      {
        path: "/dashbord/leadbord",
        element: <Leadbord />,
      },
      {
        path: "/dashbord/play",
        element: <QandA />,
        loader: () => fetchQuestions(),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={route} />
  </React.StrictMode>
);
