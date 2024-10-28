import React, { useState } from 'react';
import Button  from "../Nextui/ButtonNext.jsx"
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
      const data = response.data.data; // Accedemos a data porque así viene estructurada la respuesta

      // Crear nueva instancia de jsPDF
      const doc = new jsPDF();

      // Configurar el título
      doc.setFontSize(20);
      doc.text('Reporte de Incidencias', 14, 22);
      
      // Configurar las columnas y filas para la tabla
      const tableColumn = ['Fecha', 'Tipo', 'Descripción', 'Usuario', 'Estado'];
      const tableRows = [];

      // Procesar los datos para la tabla
      data.forEach(item => {
        const formattedDate = new Date(item.fecha_incidencia).toLocaleString();
        const ticketData = [
          formattedDate,
          item.tipo_incidencia,
          item.descripcion,
          item.nombre,
          item.estado
        ];
        tableRows.push(ticketData);
      });

      // Generar la tabla
      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 30,
        styles: {
          fontSize: 10,
          cellPadding: 2,
          overflow: 'linebreak',
          halign: 'left'
        },
        columnStyles: {
          0: { cellWidth: 40 },
          1: { cellWidth: 30 },
          2: { cellWidth: 50 },
          3: { cellWidth: 35 },
          4: { cellWidth: 25 }
        }
      });

      // Guardar el PDF
      doc.save('reporte-incidencias.pdf');
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      // Aquí podrías agregar alguna notificación de error al usuario
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