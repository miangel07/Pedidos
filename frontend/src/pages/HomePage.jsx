import { Layout } from "../components/layouts/Layout";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import DashboardStats from "../components/subcomponents/DashboardStats";
import DashboardIncidenciasTipo from "../components/subcomponents/DashboardIncidenciasTipo";
import DashboardSolicitudesDomiciliario from "../components/subcomponents/DashboardSolicitudesDomiciliario";
import DashboardTendenciaSolicitudes from "../components/subcomponents/DashboardTendenciasSolicitudes";

export const HomePage = () => {
  const { authData } = useContext(AuthContext);

  const getSaludo = () => {
    const hora = new Date().getHours();
    if (hora < 12) return "Buenos días";
    if (hora < 18) return "Buenas tardes";
    return "Buenas noches";
  };

  return (
    <Layout>
      <div className="p-6">
        {/* Header Section con saludo personalizado */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {getSaludo()}, {authData?.nombre || "Usuario"}
          </h1>
          <p className="text-gray-600">
            Aquí tienes un resumen de las actividades y métricas más importantes del día.
          </p>
        </div>

        {/* Stats Cards Row */}
        <div className="mb-8">
          
          <div className="bg-white rounded-lg shadow-sm p-4">
            <DashboardStats />
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Estado de Solicitudes */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Estado de Solicitudes</h3>
            <DashboardIncidenciasTipo />
          </div>

          {/* Solicitudes por Domiciliario */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Rendimiento del Equipo</h3>
            <DashboardSolicitudesDomiciliario />
          </div>
        </div>

        {/* Tendencia de Solicitudes */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Tendencia de Solicitudes</h3>
          <DashboardTendenciaSolicitudes />
        </div>

        {/* Botón de Refresh */}
        <button 
          onClick={() => window.location.reload()}
          className="fixed bottom-6 right-6 bg-white rounded-full w-12 h-12 shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
          aria-label="Actualizar dashboard"
        >
          <svg 
            className="w-5 h-5 text-gray-600" 
            fill="none" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
    </Layout>
  );
};

export default HomePage;