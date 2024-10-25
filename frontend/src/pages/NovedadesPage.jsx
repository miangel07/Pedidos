import { Button, Chip } from "@nextui-org/react";
import { Layout } from "../components/layouts/Layout";
import { Table } from "../components/Nextui/Table";
import { Modal } from "../components/subcomponents/Modal";
/* import { CambiarEstadoDomiciliario } from "../components/subcomponents/EstadoDomiciliario"; */
import { toast } from "react-toastify";

// dependencias
import { useState } from "react";

// hooks
import { useNovedadesQuery } from "../hooks/Novedades";
import { useIncidenciasQuery } from "../hooks/Incidencias";
import { axiosCliente } from "../service/axios";

export const NovedadesPage = () => {
  const [cambiarTable, setcambiarTable] = useState(true);

  // novedades
  const { novedades } = useNovedadesQuery();

  // incidencias
  const { incidencias, refreshDataIncidencias } = useIncidenciasQuery();

  // novedades
  const columnas = [
    "descripcion",
    "estado",
    "fecha_reporte",
    "domiciliario_id",
    "solicitud_id",
    "acciones",
  ];

  // incidencias
  const columnasIncidencias = [
    "id",
    "nombre",
    "TipoUsuario",
    "tipo incidencia",
    "descripcion",
    "fecha incidencia",
    "estado",
    "acciones",
  ];

  const handleNovedades = () => {
    setcambiarTable(true);
  };

  const handleIncidentes = () => {
    setcambiarTable(false);
  };

  const newDataNovedades = novedades.map((fila) => ({
    ...fila,
    acciones: (
      <>
        <Modal
          buttonModal={"fasd"}
          componente={<>hola como estas</>}
          tittleModal={"Detalle de la novedada"}
        />
      </>
    ),
  }));

  const handleResolverIncidencias = async (id, data) => {
    const prepararInfo = {
      estado: "resuelto",
      descripcion: data.descripcion,
    };

    try {
      const response = await axiosCliente.put(
        `incidencias/${id}`,
        prepararInfo
      );

      if (response && response.data) {
        await refreshDataIncidencias();
        toast.success("Problema resuelto con exito");
      }
    } catch (error) {
      console.error(error.response);
    }
  };

  return (
    <>
      <Layout>
        {/* <CambiarEstadoDomiciliario /> */}

        <div className="h-full w-full">
          <div className="flex justify-end gap-2">
            <Button onClick={handleNovedades}>Novedades</Button>
            <Button onClick={handleIncidentes}>Incidencias</Button>
          </div>

          <Table
            columns={cambiarTable ? columnas : columnasIncidencias}
            data={
              cambiarTable
                ? newDataNovedades
                : incidencias.map((fila) => ({
                    ...fila,
                    estado: (
                      <>
                        <div>
                          <Chip
                            className="w-10"
                            color={`${
                              fila.estado === "pendiente" ? "danger" : "success"
                            }`}
                          >
                            {" "}
                            {fila.estado}
                          </Chip>
                        </div>
                      </>
                    ),

                    acciones: (
                      <>
                        <Button
                          onClick={() =>
                            handleResolverIncidencias(fila.id, fila)
                          }
                        >
                          resolver
                        </Button>
                      </>
                    ),
                  }))
            }
          />
        </div>
      </Layout>
    </>
  );
};
