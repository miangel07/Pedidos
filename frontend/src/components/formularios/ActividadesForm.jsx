import { useForm } from 'react-hook-form';
import { Button, Textarea } from '@nextui-org/react';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { axiosCliente } from '../../service/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQueryActividades } from '../../hooks/Actividades';

export const ActivityForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const { authData } = useContext(AuthContext);
  const navigate = useNavigate();
  const { refreshActividades } = useQueryActividades();

  const handleOnSubmitActivity = async (data) => {
    try {
      const prepararData = {
        user_id: authData.id,
        descripcion: data.descripcion,
        fecha: new Date().toISOString().split('T')[0]
      };

      const response = await axiosCliente.post('actividades', prepararData);

      if (response) {
        toast.success('Actividad creada con éxito');
        reset();
        await refreshActividades();
        navigate('/home');
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        Object.values(error.response.data.errors).forEach(error => {
          toast.error(error[0]);
        });
      } else {
        toast.error('Error al crear la actividad');
      }
      console.error(error.response);
    }
  };

  return (
    <div className="flex gap-16 flex-col px-8">
      <div className="text-xl font-bold">Registrar Nueva Actividad</div>

      <form
        onSubmit={handleSubmit(handleOnSubmitActivity)}
        className="flex flex-col gap-4 border p-10"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="descripcion" className="text-sm font-medium">
            Descripción de la Actividad
          </label>
          <Textarea
            {...register('descripcion')}
            placeholder="Ingrese la descripción de la actividad"
            className="min-h-[100px]"
          />
        </div>

        <Button type="submit" color="primary" variant="solid">
          Registrar Actividad
        </Button>
      </form>
    </div>
  );
};