import { useForm } from "react-hook-form";
import { Select } from "../subcomponents/Select";
import { Button, Textarea } from "@nextui-org/react";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect } from "react";
import { axiosCliente } from "../../service/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuerySolicitudes } from "../../hooks/Solicitud.jsx";
import { useNovedadesQuery } from "../../hooks/Novedades.jsx";

export const ReportarNovedadForm = ({ close }) => {
  const { register, handleSubmit, reset } = useForm();
  const { obtenerNovedades } = useNovedadesQuery()

  const { solicitudData } = useQuerySolicitudes()


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

      const response = await axiosCliente.post("novedades", prepararData);
      console.log(response)

      if (response) {
        console.log(response.data)
        toast.success("novedad creada con exito");
        reset();
        await obtenerNovedades()
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
              options={solicitudData.filter((solicitud) => solicitud.estado === "pendiente")}
              name="solicitud_id"
              placeholder={"Seleccione una solicitud"}
              valueKey="Id_solicitud"
              textKey="Id_solicitud"
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
