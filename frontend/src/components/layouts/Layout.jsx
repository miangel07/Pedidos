import {Suspense} from "react";
import {Header} from "../subcomponents/Header";
import {Outlet} from "react-router-dom";
import Sidebar from "../subcomponents/SideBar";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {CambiarEstadoDomiciliario} from "../subcomponents/EstadoDomiciliario";
import {useNotificaciones} from "../../hooks/NotificacionesDomiciliarios.jsx";
import {Notificaciones} from "../subcomponents/Notificaciones";
import {Button} from "@nextui-org/react";
import {useMutationSolicitud} from "../../hooks/Solicitud.jsx";


// eslint-disable-next-line react/prop-types
export const Layout = ({children}) => {
    const {authData} = useContext(AuthContext);
    const {getNotificaciones, notificaciones} = useNotificaciones();

    const {cambiarEstadoSolicitud} = useMutationSolicitud();


    const formatNotifications = dataArray =>
        dataArray.map((data, index) => ({
            id_solicitud: data.solicitud_id,
            id: index,
            title: "Nuevo mensaje",
            description: `Licencia ${data.licencia} tiene el estado ${data.estado}`,
            time: calculateTimeSince(data.created_at),
            domiciliario: data.id
        }));

    const calculateTimeSince = dateString => {
        const createdDate = new Date(dateString);
        const now = new Date();
        const diffInMinutes = Math.floor((now - createdDate) / 60000);

        if (diffInMinutes < 60) return `hace ${diffInMinutes} min`;
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `hace ${diffInHours} h`;

        const diffInDays = Math.floor(diffInHours / 24);
        return `hace ${diffInDays} d`;
    };

    const notificacionesDomiciliarios = formatNotifications(notificaciones)


    return (
        <div className="min-h-screen bg-gray-100">
            <Header
                contenido={
                    <>
                        <Notificaciones
                            onClick={() => getNotificaciones(authData.id)}
                            notifications={notificacionesDomiciliarios.map((fila) => ({
                                ...fila,
                                accion: <>
                                    <Button color={"primary"}
                                            onClick={async () => await cambiarEstadoSolicitud(fila.id_solicitud, {
                                                estado: "en curso",
                                                domiciliario: fila.domiciliario
                                            })}>
                                        Aceptar
                                    </Button>
                                    <Button color={"danger"}
                                            onClick={async () => await cambiarEstadoSolicitud(fila.id_solicitud, {
                                                estado: "asignado",
                                                domiciliario: fila.domiciliario
                                            })}>
                                        Rechazar
                                    </Button>

                                </>
                            }))}
                        />
                        {authData && String(authData.TipoUsuario) === "domiciliario" && (
                            <CambiarEstadoDomiciliario/>
                        )}
                    </>
                }
            />
            <div className="flex ">
                <Sidebar/>
                <main className="flex-1 p-4 ">
                    <Suspense
                        fallback={
                            <div className="flex justify-center items-center h-full">
                                <div
                                    className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-gray-900"></div>
                            </div>
                        }
                    >
                        <div className="bg-white rounded-lg shadow-lg h-full p-4 sm:p-6">
                            {children}
                        </div>
                        <Outlet/>
                    </Suspense>
                </main>
            </div>
        </div>
    );
};
