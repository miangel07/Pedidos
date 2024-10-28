import { Routes, Route } from "react-router-dom";

// importaciones de las paginas
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { NovedadesPage } from "../pages/NovedadesPage";
import UsuarioPages from "../pages/UsuarioPages";
import { ReportarNovedadPage } from "../pages/ReportarNovedades";
import { SolicitudPage } from "../pages/SolicitudesPage";
import { IncidenciasReportePage } from "../pages/InicidenciasReportePage";
import { NovedadesReportePage } from "../pages/NovedadesReportePage";
import CrearSolicitud from "../pages/CrearSolicitud";
import ListarSolicitudIDPages from "../pages/ListarSolicitudIDPages";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/novedades" element={<NovedadesPage />} />
        <Route path="/usuario" element={<UsuarioPages />} />
        <Route path="/reportarnovedad" element={<ReportarNovedadPage />} />
        <Route path="/solicitudes" element={<SolicitudPage />} />
        <Route path="/solicitudesId" element={<ListarSolicitudIDPages />} />
        <Route path="//creacion-solicitudes" element={<CrearSolicitud />} />
        <Route path="/IncidenciasReporte" element={<IncidenciasReportePage />} />
        <Route path="/NovedadesReporte" element={<NovedadesReportePage />} />


      </Routes>
    </>
  );
};
