import { useForm } from "react-hook-form";
import { Select } from "../subcomponents/Select";
import { Button, Textarea } from "@nextui-org/react";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { axiosCliente } from "../../service/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ReportarNovedadForm = () => {
  const { register, handleSubmit, reset } = useForm();

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
        toast.success("novedad creada con exito");
        reset();
        navigate("/home");
      }
    } catch (error) {
      console.error(error.response);
    }
  };

  return (
    <>
      <div className="">
        <form
          action=""
          onSubmit={handleSubmit(handleOnSumbitNovedad)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col">
            <Select
              options={[{ name: "1" }, { name: "2" }, { name: "3" }]}
              name="solicitud_id"
              placeholder={"Seleccione una solicitud"}
              valueKey="name"
              textKey="name"
              register={register}
              label={"Solicitud"}
            />
          </div>

          <Textarea {...register("descripcion")} />

          <Button type="submit" color="primary" variant="solid">
            Reportar Novedad
          </Button>
        </form>
      </div>
    </>
  );
};
