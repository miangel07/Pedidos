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

  const refresshNovedades = async () =>{
    await obtenerNovedades();
  }

  useEffect(() => {
    obtenerNovedades();
  }, []);

  return {
    novedades,
    refresshNovedades,
    obtenerNovedades
  };
};

export const useNovedadesIDQuery = () => {
  const [novedadesID, setNovedades] = useState([]);
  const obtenerNovedades = async (id) => {
    try {
      const response = await axiosCliente.get(`novedades/${id}`);

      setNovedades(response.data);
    } catch (error) {
      console.error(error.response);
    }
  };

  return {
    obtenerNovedades,
    novedadesID,
  };
};
