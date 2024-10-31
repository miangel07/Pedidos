import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Spinner } from "@nextui-org/react";
const ProtectedRoute = ({ allowedRoles, element }) => {
  const { authData } = useContext(AuthContext);
  const token = localStorage.getItem("token");


  const [loading, setLoading] = useState(true);
  const [timeoutReached, setTimeoutReached] = useState(false);

  useEffect(() => {

    if (authData !== null) {
      setLoading(false);
    }


    const timer = setTimeout(() => {
      setTimeoutReached(true);
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [authData]);


  if (loading) {
    return <Spinner size="md" />
  }


  const hasAccess = token && allowedRoles.includes(authData?.TipoUsuario);

  if (hasAccess) {
    return element;
  }


  return timeoutReached ? <Navigate to="/" replace /> : null;
};

export default ProtectedRoute;
