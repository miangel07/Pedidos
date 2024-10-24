import { Button } from "@nextui-org/react";
import { Layout } from "../components/layouts/Layout";
import { Table } from "../components/Nextui/Table";
/* import { CambiarEstadoDomiciliario } from "../components/subcomponents/EstadoDomiciliario"; */

// dependencias
import { useState } from "react";

// hooks
import { useNovedadesQuery } from "../hooks/Novedades";
import { useIncidenciasQuery } from "../hooks/Incidencias";

export const NovedadesPage = () => {
  const [cambiarTable, setcambiarTable] = useState(true);

  // novedades
  const { novedades } = useNovedadesQuery();

  // incidencias
  const { incidencias } = useIncidenciasQuery();

  // novedades
  const columnas = [
    "descripcion",
    "estado",
    "fecha_reporte",
    "domiciliario_id",
    "solicitud_id",
  ];

  // incidencias
  const columnasIncidencias = [
    "nombre",
    "TipoUsuario",
    "tipo incidencia",
    "descripcion",
    "fecha incidencia",
  ];

  const handleNovedades = () => {
    setcambiarTable(true);
  };

  const handleIncidentes = () => {
    setcambiarTable(false);
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
            data={cambiarTable ? novedades : incidencias}
          />
        </div>
      </Layout>
    </>
  );
};
