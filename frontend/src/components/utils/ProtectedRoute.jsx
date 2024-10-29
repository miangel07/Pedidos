import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { authData } = useContext(AuthContext);


  const token = localStorage.getItem("token");

  if (token ) {
    return element;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
