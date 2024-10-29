import React, { useState, useEffect } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { axiosCliente } from '../../service/axios.js';

const GraficaNovedades = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axiosCliente.get('grafica/novedades');
      setData(response.data.data);
      setError(null);
    } catch (error) {
      console.error('Error al obtener datos:', error);
      setError('Error al cargar las estadísticas');
    } finally {
      setLoading(false);
    }
  };

  const formatMes = (mes) => {
    const [year, month] = mes.split('-');
    const fecha = new Date(year, month - 1);
    return fecha.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' });
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
      <h2 className="text-xl font-bold text-gray-800 mb-4">Estadísticas de Entregas Mensuales</h2>
      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="mes" 
              tickFormatter={formatMes}
            />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip
              formatter={(value, name) => {
                switch(name) {
                  case 'tasa_exito':
                    return [`${value}%`, 'Tasa de Éxito'];
                  case 'tiempo_promedio_horas':
                    return [`${value} horas`, 'Tiempo Promedio'];
                  default:
                    return [value, name];
                }
              }}
              labelFormatter={formatMes}
            />
            <Legend />
            <Bar 
              dataKey="entregas_completadas" 
              fill="#4CAF50" 
              name="Entregas Completadas" 
              yAxisId="left"
            />
            <Bar 
              dataKey="entregas_pendientes" 
              fill="#FFA726" 
              name="Entregas Pendientes" 
              yAxisId="left"
            />
            <Bar 
              dataKey="total_novedades" 
              fill="#EF5350" 
              name="Novedades" 
              yAxisId="left"
            />
            <Line 
              type="monotone" 
              dataKey="tasa_exito" 
              stroke="#2196F3" 
              name="Tasa de Éxito (%)"
              yAxisId="right"
              dot={true}
            />
            <Line 
              type="monotone" 
              dataKey="tiempo_promedio_horas" 
              stroke="#9C27B0" 
              name="Tiempo Promedio (horas)"
              yAxisId="right"
              dot={true}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GraficaNovedades;