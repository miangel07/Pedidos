import React, { useState } from 'react';
import Button from "../Nextui/ButtonNext.jsx"
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { axiosCliente } from '../../service/axios.js'

const PDFNovedades = () => {
  const [loading, setLoading] = useState(false);

  const generatePDF = async () => {
    try {
      setLoading(true);
      
      // Obtener datos de eficiencia de domiciliarios
      const response = await axiosCliente.get('reportes/novedades');
      const eficienciaData = response.data.data;

      // Crear nueva instancia de jsPDF
      const doc = new jsPDF();

      // Título principal
      doc.setFontSize(20);
      doc.text('Reporte de Eficiencia de Domiciliarios', 14, 15);

      // Configurar columnas para la tabla de eficiencia
      const eficienciaColumns = [
        'Domiciliario',
        'Total Solicitudes',
        'Exitosas',
        'Novedades',
        'Tiempo Prom.(h)',
        '% Éxito',
        '% Disp.',
        'Puntuación'
      ];

      // Procesar datos de eficiencia
      const eficienciaRows = eficienciaData.map(item => [
        item.nombre_domiciliario,
        item.total_solicitudes,
        item.entregas_exitosas,
        item.total_novedades,
        item.tiempo_promedio_horas,
        `${item.porcentaje_exito}%`,
        `${item.porcentaje_disponibilidad}%`,
        item.score_eficiencia
      ]);

      // Generar tabla de eficiencia
      doc.autoTable({
        head: [eficienciaColumns],
        body: eficienciaRows,
        startY: 30,
        styles: {
          fontSize: 8,
          cellPadding: 2
        },
        columnStyles: {
          0: { cellWidth: 40 },
          1: { cellWidth: 20 },
          2: { cellWidth: 20 },
          3: { cellWidth: 20 },
          4: { cellWidth: 25 },
          5: { cellWidth: 20 },
          6: { cellWidth: 20 },
          7: { cellWidth: 20 }
        }
      });

      // Agregar pie de página con fecha de generación
      const pageCount = doc.internal.getNumberOfPages();
      for(let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.text(
          `Generado el ${new Date().toLocaleString()} - Página ${i} de ${pageCount}`,
          doc.internal.pageSize.width / 2,
          doc.internal.pageSize.height - 10,
          { align: 'center' }
        );
      }

      // Guardar el PDF
      doc.save('reporte-eficiencia-domiciliarios.pdf');
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      onClick={generatePDF}
      className="bg-blue-600 text-white"
      disabled={loading}
    >
      {loading ? 'Generando PDF...' : 'Generar Reporte de Eficiencia'}
    </Button>
  );
};

export default PDFNovedades;
