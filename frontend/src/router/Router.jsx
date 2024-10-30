import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import ProtectedRoute from "../components/utils/ProtectedRoute";
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
import ReportarIncidenciasPage from "../pages/ReportarIncidenciasPage";
import { AuthContext } from "../context/AuthContext";
import DomiciliariosPage from "../pages/DomiciliariosPage";
import SolicitudDomiciliarioPages from "../pages/SolicitudDomiciliarioPages";
import PerfilPage from "../pages/PerfilPage";

export const AppRouter = () => {
  const { authData } = useContext(AuthContext);

  return (
    <Routes>
      {/* Ruta pública */}
      <Route path="/" element={<LoginPage />} />


      <Route path="/home" element={<ProtectedRoute allowedRoles={["administrador", "negocio", "domiciliario", "particular"]} element={<HomePage />} />} />
      
      <Route path="/perfil" element={<ProtectedRoute allowedRoles={["administrador", "negocio", "domiciliario", "particular"]} element={<PerfilPage />} />} />

      <Route path="/disponibilidad-domiciliarios" element={<ProtectedRoute allowedRoles={["administrador"]} element={<DomiciliariosPage/>} />} />

      <Route path="/solicitudes-domiciliario" element={<ProtectedRoute allowedRoles={["domiciliario"]} element={<SolicitudDomiciliarioPages/>} />} />

      <Route path="/novedades" element={<ProtectedRoute allowedRoles={["administrador","domiciliario"]} element={<NovedadesPage />} />} />

      <Route path="/usuario" element={<ProtectedRoute allowedRoles={["administrador"]} element={<UsuarioPages />} />} />

      <Route path="/reportarnovedad" element={<ProtectedRoute allowedRoles={["administrador", "domiciliario"]} element={<ReportarNovedadPage />} />} />

      <Route path="/solicitudes" element={<ProtectedRoute allowedRoles={["administrador", "negocio", "domiciliario", "particular"]} element={<SolicitudPage />} />} />

      <Route path="/solicitudesId" element={<ProtectedRoute allowedRoles={["administrador", "negocio", "domiciliario", "particular"]} element={<ListarSolicitudIDPages />} />} />

      <Route path="/IncidenciasReporte" element={<ProtectedRoute allowedRoles={["administrador"]} element={<IncidenciasReportePage />} />} />

      <Route path="/NovedadesReporte" element={<ProtectedRoute allowedRoles={["administrador"]} element={<NovedadesReportePage />} />} />
      
      <Route path="/reportarIncidencia" element={<ProtectedRoute allowedRoles={["negocio", "administrador","domiciliario","particular"]} element={<ReportarIncidenciasPage />} />} />

      <Route path="/creacion-solicitudes" element={<ProtectedRoute allowedRoles={["negocio", "administrador", "domiciliario"]} element={<CrearSolicitud />} />} />
    </Routes>
  );
};
