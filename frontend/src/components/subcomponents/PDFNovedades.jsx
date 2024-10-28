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
      
      // Obtener datos del endpoint
      const response = await axiosCliente.get('reportes/novedades');
      const data = response.data.data;

      // Crear nueva instancia de jsPDF
      const doc = new jsPDF();

      // Configurar el título
      doc.setFontSize(20);
      doc.text('Reporte de Novedades', 14, 22);
      
      // Configurar las columnas y filas para la tabla
      const tableColumn = [
        'Fecha', 
        'Usuario', 
        'Descripción', 
        'Estado', 
        'Dir. Recogida', 
        'Dir. Entrega'
      ];
      const tableRows = [];

      // Procesar los datos para la tabla
      data.forEach(item => {
        const formattedDate = new Date(item.fecha_reporte).toLocaleString();
        const ticketData = [
          formattedDate,
          item.nombre,
          item.descripcion,
          item.estado,
          item.direccion_recogida,
          item.direccion_entrega
        ];
        tableRows.push(ticketData);
      });

      // Generar la tabla
      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 30,
        styles: {
          fontSize: 9,
          cellPadding: 2,
          overflow: 'linebreak',
          halign: 'left'
        },
        columnStyles: {
          0: { cellWidth: 35 }, // Fecha
          1: { cellWidth: 30 }, // Usuario
          2: { cellWidth: 35 }, // Descripción
          3: { cellWidth: 25 }, // Estado
          4: { cellWidth: 35 }, // Dir. Recogida
          5: { cellWidth: 35 }  // Dir. Entrega
        }
      });

      // Guardar el PDF
      doc.save('reporte-novedades.pdf');
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

export default PDFNovedades;