import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import { axiosCliente } from '../../service/axios';
import * as XLSX from 'xlsx';

const EXCELActividades = () => {
  const [loading, setLoading] = useState(false);

  const generateExcel = async () => {
    try {
      setLoading(true);

      // Obtener los datos de las actividades
      const response = await axiosCliente.get('actividades');
      const actividades = response.data.data;

      // Crear el libro de Excel
      const workbook = XLSX.utils.book_new();

      // Crear una hoja de cálculo con los datos de las actividades
      const worksheetData = [
        ["ACTIVIDADES"], // Título de la tabla
        ["id", "descripcion", "fecha", "usuario"], // Cabecera de columnas
        ...actividades.map(a => [a.id, a.descripcion, a.fecha, a.usuario]) // Filas de datos
      ];
      const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

      // Aplicar estilos personalizados
      worksheet["!cols"] = [{ wch: 10 }, { wch: 40 }, { wch: 15 }, { wch: 20 }];

      // Estilo de la primera fila (título)
      worksheet["A1"].s = {
        font: { bold: true, color: { rgb: "FFFFFF" }, sz: 14 },
        fill: { fgColor: { rgb: "0F4C81" } },
        alignment: { horizontal: "center" }
      };
      worksheet["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }];

      // Estilo de la segunda fila (cabecera)
      ["A2", "B2", "C2", "D2"].forEach(cell => {
        worksheet[cell].s = {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "4F81BD" } },
          alignment: { horizontal: "center" }
        };
      });

      // Estilo de las filas de datos
      for (let i = 3; i <= actividades.length + 2; i++) {
        ["A", "B", "C", "D"].forEach(col => {
          worksheet[`${col}${i}`].s = {
            font: { color: { rgb: "000000" } },
            alignment: { horizontal: "center" }
          };
        });
      }

      XLSX.utils.book_append_sheet(workbook, worksheet, 'Actividades');

      // Generar el archivo Excel
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      // Descargar el archivo
      const downloadLink = document.createElement('a');
      downloadLink.setAttribute('href', URL.createObjectURL(excelBlob));
      downloadLink.setAttribute('download', 'actividades.xlsx');
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error('Error al generar el archivo Excel:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      onClick={generateExcel}
      className="bg-blue-600 text-white"
      disabled={loading}
    >
      {loading ? 'Generando Excel...' : 'Generar Reporte de Actividades'}
    </Button>
  );
};

export default EXCELActividades;
