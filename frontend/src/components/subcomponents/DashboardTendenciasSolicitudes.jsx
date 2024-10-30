import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Legend } from 'recharts';
import { axiosCliente } from '../../service/axios.js';

const DashboardTendenciaSolicitudes = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosCliente.get('/tendencia');
        // Transformar los datos para el ScatterChart
        const transformedData = response.data.data.map(item => ({
          fecha: new Date(item.fecha).getTime(),
          solicitudes: item.total_solicitudes,
          // El tamaño de la burbuja será proporcional al número de solicitudes
          z: item.total_solicitudes * 1000
        }));
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
          <p className="font-semibold">
            {new Date(data.fecha).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          <p>Total Solicitudes: {data.solicitudes}</p>
        </div>
      );
    }
    return null;
  };

  const formatXAxis = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('es-ES', {
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) return <div className="text-center p-4">Cargando...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4 text-center">Tendencia de Solicitudes</h3>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <XAxis 
            dataKey="fecha" 
            name="Fecha" 
            tickFormatter={formatXAxis}
            type="number"
            domain={['auto', 'auto']}
          />
          <YAxis 
            dataKey="solicitudes" 
            name="Solicitudes"
            allowDecimals={false}
          />
          <ZAxis 
            dataKey="z" 
            range={[400, 2000]} 
            name="Tamaño"
          />
          <Tooltip content={CustomTooltip} />
          <Scatter 
            name="Solicitudes" 
            data={data} 
            fill="#8884d8"
            fillOpacity={0.6}
          >
          </Scatter>
          <Legend />
        </ScatterChart>
      </ResponsiveContainer>
      <div className="mt-4 text-center text-sm text-gray-600">
        El tamaño de cada burbuja representa el volumen de solicitudes
      </div>
    </div>
  );
};

export default DashboardTendenciaSolicitudes;