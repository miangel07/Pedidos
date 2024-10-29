import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { axiosCliente } from '../../service/axios.js';

const GraficaIncidencias = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axiosCliente.get('grafica/incidencias');
      setData(response.data.data);
      setError(null);
    } catch (error) {
      console.error('Error al obtener datos:', error);
      setError('Error al cargar los datos de incidencias');
    } finally {
      setLoading(false);
    }
  };

  // Función para formatear el texto del tipo de incidencia
  const formatTipoIncidencia = (text) => {
    return text.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (loading) {
    return (
      <div className="w-full p-4 bg-white rounded-lg shadow">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-500">Cargando datos...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 bg-white rounded-lg shadow">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">Reporte de Incidencias</h2>
      </div>
      <div className="w-full overflow-x-auto">
        <BarChart
          width={600}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="tipo_incidencia" 
            tickFormatter={formatTipoIncidencia}
          />
          <YAxis />
          <Tooltip
            formatter={(value, name) => {
              if (name === 'total') return [value, 'Total'];
              return [value, name];
            }}
            labelFormatter={formatTipoIncidencia}
          />
          <Legend />
          <Bar 
            dataKey="total" 
            fill="#3b82f6" 
            name="Total de Incidencias"
          />
        </BarChart>
      </div>
    </div>
  );
};

export default GraficaIncidencias;