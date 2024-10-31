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

export const Layout = ({ children }) => {
  const { authData } = useContext(AuthContext);
  const { getNotificaciones, notificaciones } = useNotificaciones();
  const { cambiarEstadoSolicitud } = useMutationSolicitud();
  const { obtenerSolicitudesDeUsuario, solicitudByUser } = useSolicitudQueryIDUser();

  const formatNotifications = (dataArray) =>
    dataArray.map((data, index) => ({
      id_solicitud: data.solicitud_id,
      id: index,
      title: "Nuevo mensaje",
      description: `Licencia ${data.descripcion_Producto} tiene el estado ${data.estado}`,
      domiciliario: data.id,
    }));

  const notificacionesDomiciliarios = formatNotifications(notificaciones);

  const notificacionesDomiciliariosMap = notificacionesDomiciliarios.map(
    (fila) => ({
      ...fila,
      accion: (
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            color="primary"
            size="sm"
            className="w-full sm:w-auto"
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
            color="danger"
            size="sm"
            className="w-full sm:w-auto"
            onClick={async () =>
              await cambiarEstadoSolicitud(fila.id_solicitud, {
                estado: "asignado",
                domiciliario: fila.domiciliario,
              })
            }
          >
            Rechazar
          </Button>
        </div>
      ),
    })
  );

  const formatNotificationsUser = (dataArray) =>
    dataArray.map((data, index) => ({
      id_solicitud: data.id,
      id: index,
      title: "Nuevo mensaje",
      description: (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <p className="font-bold">{data.descripcion_Producto}</p>
          <span className="text-sm">Tu solicitud tiene el estado</span>
          <Chip 
            color={data.estado === "asignado" ? "primary" : "success"}
            className="max-w-fit"
          >
            {data.estado}
          </Chip>
        </div>
      ),
      domiciliario: data.id,
    }));

  const NotificacionesUser = formatNotificationsUser(solicitudByUser);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        contenido={
          <div className="flex items-center gap-4">
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
          </div>
        }
      />
      
      <div className="flex flex-col sm:flex-row min-h-[calc(100vh-64px)]">
        <div className="w-full sm:w-auto">
          <Sidebar />
        </div>
        
        <main className="flex-1 p-2 sm:p-4 md:p-6">
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 md:h-24 md:w-24 border-t-2 border-b-2 border-gray-900"></div>
              </div>
            }
          >
            <div className="bg-white rounded-lg shadow-lg h-full p-3 sm:p-4 md:p-6 overflow-hidden">
              <div className="w-full overflow-x-auto">
                {children}
              </div>
            </div>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default Layout;