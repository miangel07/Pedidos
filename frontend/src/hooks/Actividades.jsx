import { useState, useEffect } from 'react';
import { axiosCliente } from '../service/axios';

export const useQueryActividades = () => {
  const [actividades, setActividades] = useState([]);
  
  const obtenerActividades = async () => {
    try {
      const response = await axiosCliente.get('actividades');
      setActividades(response.data.data);
    } catch (error) {
      console.error(error.response);
    }
  };

  useEffect(() => {
    obtenerActividades();
  }, []);

  const refreshActividades = async () => {
    await obtenerActividades();
  };

  return {
    actividades,
    refreshActividades
  };
};