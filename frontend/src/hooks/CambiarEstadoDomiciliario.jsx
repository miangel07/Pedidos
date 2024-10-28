import { axiosCliente } from "../service/axios";

export const useCambiarEstado = () => {
  const cambiarEstado = async (id, data) => {
    try {
      const res = await axiosCliente.put(`domiciliario/${id}`, data);
      alert("se cambio de estado");
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    cambiarEstado,
  };
};
