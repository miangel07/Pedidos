import { Layout } from "../components/layouts/Layout";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import PDFIncidencias from "../components/subcomponents/PDFIncidencias";
import GraficaIncidencias from "../components/subcomponents/GraficaIncidencias";
import Modals from "../components/subcomponents/Modal";
import { ActivityForm } from "../components/formularios/ActividadesForm";
import { Button } from "@nextui-org/react";

export const IncidenciasReportePage = () => {
  const { authData } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };
  
  return (
    <Layout>
      {isOpen && (
        <Modals 
          visible={isOpen} 
          title="Registrar Nueva Actividad" 
          closeModal={closeModal}
        >
          <ActivityForm />
        </Modals>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Reporte de Incidencias
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Vista general de reportes e incidencias
            </p>
          </div>
          
          <Button 
            color="primary" 
            className="px-4 py-2"
            onClick={() => setIsOpen(true)}
          >
            Registrar Actividad
          </Button>
        </header>

        <div className="space-y-6">
          {/* Sección PDF */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4">
              <PDFIncidencias />
            </div>
          </div>

          {/* Sección Gráfica */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Gráfica de Incidencias
              </h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <GraficaIncidencias />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};