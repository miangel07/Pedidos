import { useForm } from "react-hook-form";
import { Select } from "../subcomponents/Select";
import { Button, Textarea } from "@nextui-org/react";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { axiosCliente } from "../../service/axios";
import { toast } from "react-toastify";
import { useQuerySolicitudes } from "../../hooks/Solicitud.jsx";
import { useNovedadesQuery } from "../../hooks/Novedades.jsx";


export const ReportarNovedadForm = ({ close }) => {
  const { register, handleSubmit, reset } = useForm();
  const { refresshNovedades } = useNovedadesQuery()

  const { solicitudData } = useQuerySolicitudes();




  // datos del usuario logueado
  const { authData } = useContext(AuthContext);



  const handleOnSumbitNovedad = async (data) => {
    try {
      const prepararData = {
        descripcion: data.descripcion,
        estado: "pendiente",
        domiciliario_id: authData.id,
        solicitud_id: data.solicitud_id,
      };

      console.log(prepararData)
      const response = await axiosCliente.post("novedades", prepararData);
      console.log(response)
      await refresshNovedades()

      if (response) {
        console.log(response.data)
        toast.success("novedad creada con exito");
      /*   reset(); */
        
        close();
      }
    } catch (error) {
      console.error(error.response);
    }
  };

  return (
    <>
      <div className="flex gap-16 flex-col px-8">
        <form
          action=""
          onSubmit={handleSubmit(handleOnSumbitNovedad)}
          className="flex flex-col gap-4 border p-10"
        >
          <div className="flex flex-col">
            <Select
              options={solicitudData}
              name="solicitud_id"
              placeholder={"Seleccione una solicitud"}
              valueKey="Id_solicitud"
              textKey="descripcion_Producto"
              register={register}
              label={"Solicitud"}
            />
          </div>

          <Textarea {...register("descripcion", { required: true })} />

          <Button type="submit" color="primary" variant="solid">
            Reportar Novedad
          </Button>
        </form>
      </div>
    </>
  );
};
