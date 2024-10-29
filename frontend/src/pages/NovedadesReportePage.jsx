import { Layout } from "../components/layouts/Layout";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import PDFNovedades from "../components/subcomponents/PDFNovedades";
import GraficaNovedades from "../components/subcomponents/GraficaNovedades";

export const NovedadesReportePage = () => {
  const { authData } = useContext(AuthContext);
  console.log(authData);
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Reporte de Novedades
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Vista general de reportes y novedades
          </p>
        </header>

        <div className="space-y-6">
          {/* Sección PDF */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4">
              <PDFNovedades />
            </div>
          </div>

          {/* Sección Gráfica */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Gráfica de Novedades
              </h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <GraficaNovedades />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};