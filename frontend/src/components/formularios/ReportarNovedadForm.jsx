import { useForm } from "react-hook-form";
import { Select } from "../subcomponents/Select";
import { Button, Textarea } from "@nextui-org/react";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect } from "react";
import { axiosCliente } from "../../service/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuerySolicitudes } from "../../hooks/Solicitud.jsx";


export const ReportarNovedadForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const { solicitudData } = useQuerySolicitudes()


  // datos del usuario logueado
  const { authData } = useContext(AuthContext);

  // navigate
  const navigate = useNavigate();

  const handleOnSumbitNovedad = async (data) => {
    try {
      const prepararData = {
        descripcion: data.descripcion,
        estado: "pendiente",
        domiciliario_id: authData.id,
        solicitud_id: data.solicitud_id,
      };

      const response = await axiosCliente.post("novedades", prepararData);

      if (response) {
        console.log(response.data)
        toast.success("novedad creada con exito");
        reset();
        //navigate("/home");
      }
    } catch (error) {
      console.error(error.response);
    }
  };

  return (
    <>
      <div className="flex gap-16 flex-col px-8">

        <div> hola como estas</div>

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

          <Textarea {...register("descripcion", {required: true} )} />

          <Button type="submit" color="primary" variant="solid">
            Reportar Novedad
          </Button>
        </form>
      </div>
    </>
  );
};
