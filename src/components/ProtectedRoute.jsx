import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const email = localStorage.getItem("email");

  // Check if user is authenticated
  const isAuthenticated = token && isLoggedIn && email;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
