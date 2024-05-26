import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import App from "./App.jsx";
import Play from "./pages/Play.jsx";
import "./index.css";
import Profile from "./pages/Profile.jsx";
import Leadbord from "./pages/Leadbord.jsx";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
        path: "/leadboard",
        element: <Leadbord />,
      },
      {
        path: "/play",
        element: <Play />,
      },
    ],
  },
]);

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
      <Provider store={store}>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerStyle={{ animationDirection: "alternate-reverse" }}
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
            },

            // Default options for specific types
            success: {
              duration: 3000,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />
        <RouterProvider router={route} />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
