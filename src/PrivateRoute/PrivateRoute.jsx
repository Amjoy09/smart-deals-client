import React, { use } from "react";
import { AuthContext } from "../context/AuthContext";
import { RingLoader } from "react-spinners";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { customer, loading } = use(AuthContext);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <RingLoader color="blue" />
      </div>
    );
  }

  if (!customer) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
