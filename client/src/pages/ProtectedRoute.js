import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { Navigate } from "react-router-dom";
import Loading from "../components/Loading";

const ProtectedRoute = ({ children }) => {
  const { user, userLoading, getCurrentUser } = useAppContext();
  useEffect(() => {
    if (user) return;
    getCurrentUser();
  }, []);

  if (userLoading) return <Loading center />;
  if (!user) return <Navigate to="/landing" />;

  return children;
};

export default ProtectedRoute;
