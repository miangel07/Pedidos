import { axiosCliente } from "../service/axios";
import { useState, useEffect } from "react";

export const useIncidenciasQuery = () => {
  const [incidencias, setIncidencias] = useState([]);

  const obtenerIncidencias = async () => {
    try {
      const response = await axiosCliente.get("incidencia");

      setIncidencias(response.data);
    } catch (error) {
      console.error(error.response);
    }
  };

  const refreshDataIncidencias = async () => {
    await obtenerIncidencias();
  };

  useEffect(() => {
    obtenerIncidencias();
  }, []);

  return { incidencias, refreshDataIncidencias };
};
