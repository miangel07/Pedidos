import React, { useState } from 'react';
import Button from "../Nextui/ButtonNext.jsx"
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { axiosCliente } from '../../service/axios.js'

const PDFIncidencias = () => {
  const [loading, setLoading] = useState(false);

  const generatePDF = async () => {
    try {
      setLoading(true);
      
      // Obtener datos del endpoint
      const response = await axiosCliente.get('reportes/incidencias');
      const data = response.data.data;

      // Crear nueva instancia de jsPDF
      const doc = new jsPDF();

      // Configurar el título
      doc.setFontSize(20);
      doc.text('Reporte de Incidencias', 14, 22);
      
      // Configurar las columnas y filas para la tabla
      const tableColumn = [
        'Fecha Inicio Incidencia', 
        'Fecha Fin Inicidencia',  
        'Tipo de Incidencia', 
        'Descripción', 
        'Usuario', 
        'Estado', 
        'Tiempo de Resolución'
      ];
      const tableRows = [];

      // Procesar los datos para la tabla
      data.forEach(item => {
        const ticketData = [
          item.fecha_incidencia,
          item.fecha_actualizacion,
          item.tipo_incidencia,
          item.descripcion,
          item.nombre,
          item.estado,
          item.tiempo_entrega
        ];
        tableRows.push(ticketData);
      });

      // Generar la tabla con columnas ajustadas
      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 30,
        styles: {
          fontSize: 8,  // Reducido para acomodar más columnas
          cellPadding: 2,
          overflow: 'linebreak',
          halign: 'left'
        },
        columnStyles: {
          0: { cellWidth: 25 },  // Fecha Incidencia
          1: { cellWidth: 25 },  // Fecha Actualización
          2: { cellWidth: 25 },  // Tipo
          3: { cellWidth: 35 },  // Descripción
          4: { cellWidth: 25 },  // Usuario
          5: { cellWidth: 20 },  // Estado
          6: { cellWidth: 25 }   // Tiempo de Resolución
        }
      });

      // Guardar el PDF
      doc.save('reporte-incidencias.pdf');
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
      {loading ? 'Generando PDF...' : 'Generar PDF'}
    </Button>
  );
};

export default PDFIncidencias;