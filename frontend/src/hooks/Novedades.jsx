import { useState, useEffect } from "react";
import { axiosCliente } from "../service/axios";

export const useNovedadesQuery = () => {
  const [novedades, setNovedades] = useState([]);
  const obtenerNovedades = async () => {
    try {
      const response = await axiosCliente.get("novedades");

      setNovedades(response.data);
    } catch (error) {
      console.error(error.response);
    }
  };

  useEffect(() => {
    obtenerNovedades();
  }, []);

  return {
    novedades,
  };
};
