import { Button } from "@nextui-org/react";
import { Select } from "./Select";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useUserMutation } from "../../hooks/Usuario";
import { axiosCliente } from "../../service/axios";
import { useNavigate } from "react-router-dom";

export const ContenidoNovedad = ({ novedadesID, solicitud }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("es-ES");
  };
  return (
    <div className="p-6 space-y-6">
      {/* Información de la Novedad */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-lg mb-3">Información General</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">ID</p>
            <p className="font-medium">{novedadesID.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Estado</p>
            <span className="inline-block px-2 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
              {novedadesID.estado}
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-500">Fecha de Reporte</p>
            <p className="font-medium">
              {formatDate(novedadesID.fecha_reporte)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Descripción</p>
            <p className="font-medium">{novedadesID.descripcion}</p>
          </div>
        </div>
      </div>
      {/* Información de la Solicitud */}

      <FormEditSolicitud novedadesID={novedadesID.solicitud} />
    </div>
  );
};

export const FormEditSolicitud = ({ novedadesID }) => {
  const { usuario } = useUserMutation();
  const { register, handleSubmit, reset } = useForm();

  // navegacion
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("es-ES");
  };

  const handleSubmitDataSolicitud = async (data) => {
    const preparaData = {
      estado: data.estado,
      domiciliario: data.user_id,
    };

    try {
      const response = await axiosCliente.put(
        `solicitud/${novedadesID.id}`,
        preparaData
      );

      if (response.data) {
        alert(response.data.mensaje);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (novedadesID) {
      reset({
        estado: novedadesID.estado,
        user_id: novedadesID.user_id,
      });
    }
  }, [reset, novedadesID]);

  return (
    <>
      <form action="" onSubmit={handleSubmit(handleSubmitDataSolicitud)}>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-3">
            Detalles de la Solicitud
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">ID Solicitud</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Estado Solicitud</p>

              <Select
                options={[
                  { name: "pendiente" },
                  { name: "asignado" },
                  { name: "completado" },
                  { name: "reprogramado" },
                  { name: "cancelado" },
                ]}
                name="estado"
                placeholder={"Seleccione una solicitud"}
                valueKey="name"
                textKey="name"
                register={register}
                label={"Solicitud"}
              />
            </div>
            <div>
              <p className="text-sm text-gray-500">Dirección de Recogida</p>
              <p className="font-medium">
                {novedadesID?.direccion_recogida || "Dirección no disponible"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Dirección de Entrega</p>
              <p className="font-medium">
                {novedadesID?.direccion_entrega || "Dirección no disponible"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">ID Usuario</p>
              <p className="font-medium">
                {novedadesID && novedadesID.nombre_usuario}
              </p>
            </div>
            <div>
              <Select
                options={usuario.filter(
                  (user) =>
                    user.TipoUsuario.trim().toLowerCase() === "domiciliario" &&
                    user.estado === "activo"
                )}
                name="user_id"
                placeholder={"Seleccione una nuevo domiciliario"}
                valueKey="id"
                textKey="nombre"
                register={register}
                label={"Domiciliario"}
              />
            </div>
            <div>
              <p className="text-sm text-gray-500">Fecha Creación</p>
              <p className="font-medium">
                {novedadesID?.created_at
                  ? formatDate(novedadesID.created_at)
                  : "Fecha no disponible"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Última Actualización</p>
              <p className="font-medium">
                {novedadesID?.created_at
                  ? formatDate(novedadesID.updated_at)
                  : "Fecha no disponible"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button color="danger" type="submit" variant="flat"></Button>
        </div>
      </form>
    </>
  );
};
