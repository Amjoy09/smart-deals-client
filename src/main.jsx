import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter } from "react-router";
import RootLayout from "./pages/RootLayout.jsx";
import Home from "./pages/Home.jsx";
import AllProducts from "./pages/AllProducts.jsx";
import { RouterProvider } from "react-router/dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/Profile.jsx";
import PrivateRoute from "./PrivateRoute/PrivateRoute.jsx";
import MyProducts from "./pages/MyProducts.jsx";
import MyBids from "./pages/MyBids.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/all-products",
        Component: AllProducts,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/my-profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-products",
        element: <MyProducts />,
      },
      {
        path: "/my-bids",
        element: <MyBids />,
      },
      {
        path: "/product-details/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/products/${params.id}`),
        Component: ProductDetails,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    <ToastContainer />
  </StrictMode>,
);
