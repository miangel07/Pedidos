import { axiosCliente } from "../service/axios";
import { useState, useEffect } from "react";

export const useIncidenciasQuery = () => {
  const [incidencias, setIncidencias] = useState([]);

  const obtenerIncidencias = async () => {
    try {
      const response = await axiosCliente.get("incidencias");

      setIncidencias(response.data);
    } catch (error) {
      console.error(error.response);
    }
  };

  useEffect(() => {
    obtenerIncidencias();
  }, []);

  return { incidencias };
};
