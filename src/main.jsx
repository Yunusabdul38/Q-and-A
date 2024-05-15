import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx"
import App from "./App.jsx";
import Play from "./pages/Play.jsx";
import "./index.css";
import Profile from "./pages/Profile.jsx";
import Leadbord from "./pages/Leadbord.jsx";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
// const Authentication = import('./componenet/Authentication.jsx')

//app routing setup with react router 
const route = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
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
    <Provider store={store}>
    <RouterProvider router={route} />
    </Provider>
  </React.StrictMode>
);
