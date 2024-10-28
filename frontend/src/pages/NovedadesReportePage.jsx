import { Layout } from "../components/layouts/Layout";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import PDFNovedades from "../components/subcomponents/PDFNovedades";

export const NovedadesReportePage = () => {
  const { authData } = useContext(AuthContext);
  console.log(authData)
  return (
    <>
      <Layout>
        hola desde Novedades reporte page <br />
        <PDFNovedades />
      </Layout>
    </>
  );
};
