import React, { useContext, useEffect, useState } from 'react'
import { Layout } from '../components/layouts/Layout'
import InputNext from '../components/Nextui/InputNext'
import { useForm } from 'react-hook-form';
import { Select } from '../components/subcomponents/Select';
import { useQuerySolicitudesId } from '../hooks/Solicitud';
import ButtonNext from '../components/Nextui/ButtonNext';
import { axiosCliente } from '../service/axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
const ReportarIncidenciasPage = ({close}) => {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
  const { authData } = useContext(AuthContext);
  const [tipoIncidencia, setTipoIncidencia] = useState("")

  const { solicitudUser } = useQuerySolicitudesId()


  const onSubmit = async (data) => {
    try {
      const response = await axiosCliente.post("incidencias", { ...data, user_id: authData.id })
      console.log(response)
      if (response.status === 201) {
        toast.success(`${response.data.mensaje}`);
        reset()
        close()
      }
    } catch (error) {
      console.error(error)
      if (error.status === 500) {
        toast.error('Hubo un error en el servidor')
      }
    }
  }

  const opciones = [
    { value: 'entrega_fallida', text: 'entrega fallida' },
    { value: 'producto_dañado', text: 'producto dañado' },
    { value: 'accidente', text: 'accidente' },
    { value: 'otros', text: 'otros' },
  ];

  return (
   
      <section className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Select
            options={opciones}
            register={register}
            name="tipo_incidencia"
            id="tipo_incidencia"
            placeholder="Tipo de Incidencia"
            value={tipoIncidencia}
            onChange={(e) => setTipoIncidencia(e.target.value)}
            valueKey="value"
            textKey="text"
          />

          <InputNext
            errors={errors}
            register={register}
            name="descripcion"
            type="text"
            id="descripcion"
            placeholder="Descripción"

          />
          <Select
            options={solicitudUser}
            register={register}
            name="solicitud_id"
            id="solicitud_id"
            placeholder="Seleccione la solicitud"
            valueKey="id"
            textKey="descripcion_Producto"
          />

          <ButtonNext type="submit" color="primary">
            Enviar
          </ButtonNext>
        </form>
      </section>

  )
}

export default ReportarIncidenciasPage