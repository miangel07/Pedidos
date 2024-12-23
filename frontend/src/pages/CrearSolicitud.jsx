import React, { useContext } from 'react';
import { Layout } from '../components/layouts/Layout';
import InputNext from '../components/Nextui/InputNext';
import { useForm } from 'react-hook-form';
import ButtonNext from '../components/Nextui/ButtonNext';
import { axiosCliente } from '../service/axios';
import { toast } from "react-toastify";
import { AuthContext } from '../context/AuthContext';
import { useQuerySolicitudesId } from '../hooks/Solicitud';
const CrearSolicitud = ({closeModal}) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { authData } = useContext(AuthContext);
  const onSubmit = async (data) => {
try {
  const response = await axiosCliente.post('solicitud', { ...data, user_id: authData.id })
  console.log(response)
  if (response.status == 201) {
    toast.success(`${response.data.mensaje}`);
    reset()
    closeModal()
  }
  
} catch (error) {
  if(error.status==400){
    toast.error(`${error.response.data.mensaje}`);
  }

  
}
   

  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center mt-8">Crear una Nueva Solicitud</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md mt-8 space-y-4">
        <InputNext
          name="direccion_recogida"
          placeholder="Dirección de recogida"
          type="text"
          id="direccion_recogida"
          register={register}
          errors={errors}
        />

        <InputNext
          name="direccion_entrega"
          placeholder="Dirección de entrega"
          type="text"
          id="direccion_entrega"
          register={register}
          errors={errors}
        />

        <InputNext
          name="descripcion_Producto"
          placeholder="Descripción del producto"
          type="text"
          id="descripcion_Producto"
          register={register}
          errors={errors}
        />

        <div>
          <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-1">Fecha y tiempo de entrega</label>
          <InputNext
            name="fecha"
            placeholder=""
            type="datetime-local"
            id="fecha"
            register={register}
            errors={errors}
          />
        </div>

        <ButtonNext type="submit" >
          Enviar solicitud
        </ButtonNext>
      </form>
    </>
  );
};

export default CrearSolicitud;
