import {useContext, useEffect, useState} from "react";
import {Layout} from "../components/layouts/Layout";
import {Table} from "../components/Nextui/Table";
import {useNotificaciones} from "../hooks/NotificacionesDomiciliarios";
import {AuthContext} from "../context/AuthContext";
import {useMutationSolicitud} from "../hooks/Solicitud";

// componentes de next ui
import {Select, SelectItem, Button} from "@nextui-org/react";

const SolicitudDomiciliarioPages = () => {
    const {getNotificaciones, notificaciones, refresshNotificaciones} =
        useNotificaciones();
    const {authData} = useContext(AuthContext);
    const [hasFetched, setHasFetched] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("");

    // cambiar de estado las solicitudes
    const {cambiarEstadoSolicitud} = useMutationSolicitud();

    useEffect(() => {
        if (authData?.id && !hasFetched) {
            getNotificaciones(authData.id);
            setHasFetched(true);
        }
    }, [authData?.id, hasFetched, getNotificaciones]); // Evitamos incluir getNotificaciones para evitar el bucle

    // preparamos las columnas para la tabla

    const columnasSolicitudes = [
        "id",
        "licencia",
        "id del usuario",
        "disponibilidad",
        "estado",
        "id solicitud",
        "Descripcion producto",
        "acciones",
    ];

    // Filtra las notificaciones en base al estado seleccionado
    const filteredData = notificaciones.filter(
        (notificacion) =>
            selectedStatus === "" || notificacion.estado === selectedStatus
    );

    const cambiarEstado = async (id, domiciliario, estado) => {
        console.log(id, domiciliario, estado);
        await cambiarEstadoSolicitud(id, {
            estado: estado,
            domiciliario: domiciliario,
        });


        await refresshNotificaciones(authData?.id);
    };

    return (
        <Layout>
            <div className="p-4">
                <label className="block mb-2 font-semibold">Filtrar por estado:</label>
                <Select
                    onChange={(value) => setSelectedStatus(value.target.value)}
                    value={selectedStatus}
                    className="border p-2 rounded mb-4 w-full"
                    aria-label="fdfda"
                >
                    <SelectItem key="">Todos</SelectItem>
                    <SelectItem key="pendiente" aria-label="fdfda">
                        Pendiente
                    </SelectItem>
                    <SelectItem key="asignado" aria-label="fdfda">
                        Asignado
                    </SelectItem>
                    <SelectItem key="programado" aria-label="fdfda">
                        Programado
                    </SelectItem>
                </Select>

                {/* Tabla con datos filtrados */}
                <Table
                    columns={columnasSolicitudes}
                    data={filteredData.map((fila) => ({
                        ...fila,
                        acciones: (
                            <>

                                {fila.estado !== "en curso" ? <>
                                    {fila.estado === "completado"? "Solicitud completada" : <>  <Button
                                        color={"primary"}
                                        onClick={async () =>
                                            await cambiarEstado(fila.solicitud_id, fila.id, "en curso")
                                        }
                                    >
                                        Aceptar
                                    </Button>
                                    <Button
                                        color={"danger"}
                                        onClick={async () =>
                                            await cambiarEstado(fila.solicitud_id, fila.id, "asignado")
                                        }
                                    >
                                        Rechazar
                                    </Button></> }

                                </> : <Button
                                    color={"success"}
                                    onClick={async () =>
                                        await cambiarEstado(fila.solicitud_id, fila.id, "completado")
                                    }
                                >
                                    Completado
                                </Button>}


                            </>
                        ),
                    }))}
                />
            </div>
        </Layout>
    );
};

export default SolicitudDomiciliarioPages;
