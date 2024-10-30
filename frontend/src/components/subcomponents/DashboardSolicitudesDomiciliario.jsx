import React, { useState, useEffect } from 'react';
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import { axiosCliente } from '../../service/axios.js';

const DashboardSolicitudesDomiciliario = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosCliente.get('/solicitudes-domiciliario');
        // Transformar los datos para el Treemap
        const transformedData = {
          name: 'Solicitudes',
          children: response.data.data.map(domiciliario => ({
            name: domiciliario.nombre_domiciliario,
            children: [
              {
                name: 'Completadas',
                size: domiciliario.solicitudes_completadas,
                color: '#4CAF50'
              },
              {
                name: 'Pendientes',
                size: domiciliario.total_solicitudes - domiciliario.solicitudes_completadas,
                color: '#FFA726'
              }
            ]
          }))
        };
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
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border rounded shadow">
          <p className="font-semibold">{data.root.name}</p>
          <p>{data.name}: {data.size}</p>
        </div>
      );
    }
    return null;
  };

  const CustomContent = ({ root, depth, x, y, width, height, index, name, color }) => {
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={color}
          stroke="#fff"
          strokeWidth={2}
        />
        {width > 50 && height > 30 && (
          <text
            x={x + width / 2}
            y={y + height / 2}
            textAnchor="middle"
            fill="#fff"
            fontSize={14}
          >
            {name}
            {root && `: ${root.size}`}
          </text>
        )}
      </g>
    );
  };

  if (loading) return <div className="text-center p-4">Cargando...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;
  if (!data || data.children.length === 0) return <div className="text-center p-4">No hay datos disponibles</div>;

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4 text-center">Solicitudes por Domiciliario</h3>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={data}
            dataKey="size"
            aspectRatio={4/3}
            stroke="#fff"
            fill="#8884d8"
            content={CustomContent}
          >
            <Tooltip content={CustomTooltip} />
          </Treemap>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex justify-center space-x-4">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 mr-2"></div>
          <span>Completadas</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-orange-400 mr-2"></div>
          <span>Pendientes</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardSolicitudesDomiciliario;