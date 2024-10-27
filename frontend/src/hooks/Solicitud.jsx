import { axiosCliente } from "../service/axios";
import { useState, useEffect } from "react";

export const useQuerySolicitudes = () => {
  const [solicitudData, setSolicituData] = useState([]);

  const obtenerSolicitudes = async () => {
    try {
      const response = await axiosCliente.get("solicitud");

      setSolicituData(response.data);
    } catch (error) {
      console.error(error.response);
    }
  };

  useEffect(() => {
    /*  console.log(solicitudData); */
    obtenerSolicitudes();
  }, []);

  return {
    solicitudData,
  };
};

export const useQuerySolicitudesId = () => {
  const [solicitudID, setSolicitudID] = useState([]);
  const obtenerSolicitudID = async (id) => {
    try {
      const response = await axiosCliente.get(`solicitud/${id}`);
      console.log(response.data);

      setSolicitudID(response.data);
    } catch (error) {
      console.error(error.response);
    }
  };

  return {
    obtenerSolicitudID,
    solicitudID,
  };
};
