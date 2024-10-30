import { axiosCliente } from "../service/axios.js";
import { useState } from "react";

export const useNotificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([]);

  const getNotificaciones = async (id) => {
    try {
      const response = await axiosCliente.get(`domiciliario/${id}`);
      setNotificaciones(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  const refresshNotificaciones = async (id) => {
    await getNotificaciones(id);
  };

  return {
    notificaciones,
    getNotificaciones,
    refresshNotificaciones,
  };
};
