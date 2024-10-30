import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, FunnelChart, Funnel, LabelList, Tooltip } from 'recharts';
import { axiosCliente } from '../../service/axios.js';

const DashboardIncidenciasTipo = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosCliente.get('/incidencias');
        // Transformar los datos para el FunnelChart
        const transformedData = response.data.data.map(incidencia => {
          const porcentajeResueltas = (incidencia.resueltas / incidencia.total) * 100;
          return [
            {
              name: `${incidencia.tipo_incidencia} (Total)`,
              value: incidencia.total,
              fill: '#FF9800',
              tipo: incidencia.tipo_incidencia
            },
            {
              name: `${incidencia.tipo_incidencia} (Resueltas)`,
              value: incidencia.resueltas,
              fill: '#4CAF50',
              percentage: porcentajeResueltas.toFixed(1),
              tipo: incidencia.tipo_incidencia
            }
          ];
        }).flat();

        setData(transformedData);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los datos');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload[0]) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border rounded shadow">
          <p className="font-semibold">{data.tipo}</p>
          <p>{data.name}: {data.value}</p>
          {data.percentage && (
            <p>Porcentaje resuelto: {data.percentage}%</p>
          )}
        </div>
      );
    }
    return null;
  };

  if (loading) return <div className="text-center p-4">Cargando...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4 text-center">Incidencias por Tipo</h3>
      <ResponsiveContainer width="100%" height={400}>
        <FunnelChart>
          <Tooltip content={CustomTooltip} />
          <Funnel
            dataKey="value"
            data={data}
            isAnimationActive
            labelLine={true}
          >
            <LabelList
              position="right"
              fill="#000"
              stroke="none"
              dataKey="name"
            />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
      <div className="mt-4 flex justify-center space-x-4">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-orange-500 mr-2"></div>
          <span>Total Incidencias</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 mr-2"></div>
          <span>Incidencias Resueltas</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardIncidenciasTipo;