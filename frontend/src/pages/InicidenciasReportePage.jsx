import { Layout } from "../components/layouts/Layout";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import PDFIncidencias from "../components/subcomponents/PDFIncidencias";


export const IncidenciasReportePage = () => {
  const { authData } = useContext(AuthContext);
  console.log(authData)
  return (
    <>
      <Layout>
        hola desde Incidencias reporte page <br />
        <PDFIncidencias />
      </Layout>
    </>
  );
};
