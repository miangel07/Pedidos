import { Button, Chip } from "@nextui-org/react";
import { Layout } from "../components/layouts/Layout";
import { Table } from "../components/Nextui/Table";
import Modals from "../components/subcomponents/Modal";
import { ContenidoNovedad } from "../components/subcomponents/DetalleNovedad";

import { useEffect } from "react";

/* import { CambiarEstadoDomiciliario } from "../components/subcomponents/EstadoDomiciliario"; */
import { toast } from "react-toastify";

// dependencias
import { useState } from "react";

// hooks
import { useNovedadesQuery, useNovedadesIDQuery } from "../hooks/Novedades";
import { useIncidenciasQuery } from "../hooks/Incidencias";
import { axiosCliente } from "../service/axios";

import ReportarIncidenciasPage from "./ReportarIncidenciasPage";
import { ReportarNovedadForm } from "../components/formularios/ReportarNovedadForm";

export const NovedadesPage = () => {
  const [cambiarTable, setcambiarTable] = useState(true);
  const [Modal, setModal] = useState(false);
  const [Novedad, setNovedad] = useState(true);

  //modal
  const [isOpen, setIsOpen] = useState(false);

  // novedades
  const { novedades } = useNovedadesQuery();

  // incidencias
  const { incidencias, refreshDataIncidencias } = useIncidenciasQuery();
  const { novedadesID, obtenerNovedades } = useNovedadesIDQuery();
  console.log(incidencias)
  // novedades
  const columnas = [
    "id",
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
    "tipo_incidencia",
    "descripcion",
    "fecha_incidencia",
    "estado",
    "acciones"
];

  const handleNovedades = () => {
    setcambiarTable(true);
  };

  const handleIncidentes = () => {
    setcambiarTable(false);
  };

  const handleEdit = (id) => {
    obtenerNovedades(id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const newDataNovedades = novedades.map((fila) => ({
    ...fila,
    acciones: (
      <>
        <Button onClick={() => handleEdit(fila.id)}></Button>
      </>
    ),
  }));
  const hadleNovedad = (estado) => {
    try {
      if (estado) {
        setModal(true);
        setNovedad(false)
      }
      else {
        setModal(true);
        setNovedad(true)
      }

    } catch (error) {

    }

  }
  const handleIncidencias = async () => {
    setModal(false)
    await refreshDataIncidencias()
  }

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


  useEffect (() => {
    console.log(incidencias)
  },[incidencias])

  return (
    <>
      <Layout>
        {isOpen && (
          <>
            <Modals
              visible={isOpen}
              title={"Detalle de la novedad"}
              closeModal={closeModal}
            >
              <ContenidoNovedad novedadesID={novedadesID} />
            </Modals>
          </>
        )}
        {Modal && (
          <>
            <Modals
              visible={Modal}
              title={`${!Novedad ? "Crear Novedad" : "Crear Incidencias"}`}
              closeModal={() => setModal(false)}
            >
              {!Novedad ? <ReportarNovedadForm close={() => setModal(false)} /> : <ReportarIncidenciasPage close={handleIncidencias} />}
            </Modals>
          </>
        )}

        <div className="h-full w-full">
          <div className="flex justify-between gap-2">


            <div className="flex gap-4">
              <Button onClick={() => hadleNovedad(true)}>Crear Novedas</Button>
              <Button onClick={() => hadleNovedad(false)}>Crear Incidencias</Button>
            </div>
            <div className="flex gap-4">
              <Button onClick={handleNovedades}>Novedades</Button>
              <Button onClick={handleIncidentes}>Incidencias</Button>
            </div>


          </div>

          <Table
            columns={cambiarTable ? columnas : columnasIncidencias}
            data={
              cambiarTable
                ? newDataNovedades
                : incidencias?.map((fila) => ({
                  id: fila.id,
                  nombre: fila.nombre,
                  TipoUsuario: fila.TipoUsuario,
                  tipo_incidencia: fila.tipo_incidencia, 
                  descripcion: fila.descripcion,
                  fecha_incidencia: fila.fecha_incidencia,
                  estado: (
                    <>
                      <div>
                        <Chip
                          className="w-10"
                          color={`${fila.estado === "pendiente" ? "danger" : "success"
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
