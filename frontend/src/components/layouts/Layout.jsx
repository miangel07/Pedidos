import { Suspense } from "react";
import { Header } from "../subcomponents/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "../subcomponents/SideBar";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CambiarEstadoDomiciliario } from "../subcomponents/EstadoDomiciliario";
import { useNotificaciones } from "../../hooks/NotificacionesDomiciliarios.jsx";
import { Notificaciones } from "../subcomponents/Notificaciones";
import { Button, Chip } from "@nextui-org/react";
import { useMutationSolicitud } from "../../hooks/Solicitud.jsx";

import { useSolicitudQueryIDUser } from "../../hooks/Solicitud.jsx";

// eslint-disable-next-line react/prop-types
export const Layout = ({ children }) => {
  const { authData } = useContext(AuthContext);
  const { getNotificaciones, notificaciones } = useNotificaciones();

  // poder cambiar el estado de las solicitudes
  const { cambiarEstadoSolicitud } = useMutationSolicitud();

  //
  const { obtenerSolicitudesDeUsuario, solicitudByUser } =
    useSolicitudQueryIDUser();

  const formatNotifications = (dataArray) =>
    dataArray.map((data, index) => ({
      id_solicitud: data.solicitud_id,
      id: index,
      title: "Nuevo mensaje",
      description: `Licencia ${data.descripcion_Producto} tiene el estado ${data.estado}`,

      domiciliario: data.id,
    }));

  const notificacionesDomiciliarios = formatNotifications(notificaciones);

  // notificacines para usuario domiciliarios

  const notificacionesDomiciliariosMap = notificacionesDomiciliarios.map(
    (fila) => ({
      ...fila,
      accion: (
        <>
          <Button
            color={"primary"}
            onClick={async () =>
              await cambiarEstadoSolicitud(fila.id_solicitud, {
                estado: "en curso",
                domiciliario: fila.domiciliario,
              })
            }
          >
            Aceptar
          </Button>
          <Button
            color={"danger"}
            onClick={async () =>
              await cambiarEstadoSolicitud(fila.id_solicitud, {
                estado: "asignado",
                domiciliario: fila.domiciliario,
              })
            }
          >
            Rechazar
          </Button>
        </>
      ),
    })
  );

  // notificaciones para usuarios normales
  const formatNotificationsUser = (dataArray) =>
    dataArray.map((data, index) => ({
      id_solicitud: data.id,
      id: index,
      title: "Nuevo mensaje",
      description: (
        <>
          <p className={"font-bold"}>{data.descripcion_Producto}</p> Tú
          solicitud tiene el estado{" "}
          {
            <Chip color={data.estado === "asignado" ? "primary" : "success"}>
              {data.estado}
            </Chip>
          }
        </>
      ),
      domiciliario: data.id,
    }));

  const NotificacionesUser = formatNotificationsUser(solicitudByUser);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        contenido={
          <>
            <Notificaciones
              onClick={
                authData?.TipoUsuario === "domiciliario"
                  ? () => getNotificaciones(authData.id)
                  : () => obtenerSolicitudesDeUsuario(authData.id)
              }
              notifications={
                authData?.TipoUsuario === "domiciliario"
                  ? notificacionesDomiciliariosMap
                  : NotificacionesUser
              }
            />
            {authData && String(authData.TipoUsuario) === "domiciliario" && (
              <CambiarEstadoDomiciliario />
            )}
          </>
        }
      />
      <div className="flex ">
        <Sidebar />
        <main className="flex-1 p-4 ">
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-gray-900"></div>
              </div>
            }
          >
            <div className="bg-white rounded-lg shadow-lg h-full p-4 sm:p-6">
              {children}
            </div>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};
