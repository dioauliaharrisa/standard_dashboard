import React, { useEffect } from "react";
import { useAuth } from "../auth";
import { useNavigate, Outlet } from "react-router";

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return <Outlet />;
};

export default ProtectedRoute;
