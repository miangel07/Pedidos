import { useState, useEffect } from "react";
import { Layout } from "../components/layouts/Layout";
import { Table } from "../components/Nextui/Table";
import { Button } from "@nextui-org/react";
import Modals from "../components/subcomponents/Modal";
import { FormEditSolicitud } from "../components/subcomponents/DetalleNovedad";

import { useQuerySolicitudes, useQuerySolicitudesId } from "../hooks/Solicitud";

export const SolicitudPage = () => {
  const { solicitudData } = useQuerySolicitudes();
  const { solicitudID, obtenerSolicitudID } = useQuerySolicitudesId();

  //modal
  const [isOpen, setIsOpen] = useState(false);

  const ColumnasSolicitud = [
    "id",
    "direccion_recogida",
    "direccion_entrega",
      "id",
    "nombre usuario",
    "nombre_domiciliario",
    "estado",
    "fecha",
    "acciones",
  ];

  const handleShowSolicitud = async (id) => {
    obtenerSolicitudID(id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };



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
              {/*  <ContenidoNovedad novedadesID={novedadesID} /> */}
               <FormEditSolicitud novedadesID={solicitudID} />
            </Modals>
          </>
        )}
        <div className="bg-red-500">
          <Table
            columns={ColumnasSolicitud}
            data={solicitudData.map((fila) => ({
              ...fila,
              acciones: (
                <>
                  <Button onClick={() => handleShowSolicitud(fila.Id_solicitud)}>
                    Ver
                  </Button>
                </>
              ),
            }))}
          />
        </div>
      </Layout>
    </>
  );
};
