import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, RadialBarChart, RadialBar, AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { axiosCliente } from '../../service/axios.js';

const DashboardStats = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosCliente.get('/stats');
        setData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los datos');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-center p-4">Cargando...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;
  if (!data) return null;

  // Formatear datos para el gráfico de rendimiento de domiciliarios
  const domiciliarioData = data.solicitudes_por_domiciliario.map(dom => ({
    name: dom.nombre_domiciliario,
    completadas: dom.solicitudes_completadas,
    pendientes: dom.total_solicitudes - dom.solicitudes_completadas,
    total: dom.total_solicitudes,
  }));

  // Formatear datos para el gráfico de incidencias
  const incidenciasData = data.incidencias_por_tipo.map(inc => ({
    name: inc.tipo_incidencia,
    value: inc.total,
    resueltas: inc.resueltas,
  }));

  // Datos para el gráfico radial
  const resumenData = [
    {
      name: 'Solicitudes',
      value: data.resumen.total_solicitudes,
      fill: '#0088FE',
    },
    {
      name: 'Domiciliarios',
      value: data.resumen.total_domiciliarios,
      fill: '#00C49F',
    },
    {
      name: 'Incidencias',
      value: data.resumen.total_incidencias,
      fill: '#FFBB28',
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Gráfico Radial de Resumen */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Resumen General</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadialBarChart 
              cx="50%" 
              cy="50%" 
              innerRadius="10%" 
              outerRadius="80%" 
              data={resumenData}
              startAngle={180} 
              endAngle={0}
            >
              <RadialBar
                minAngle={15}
                background
                clockWise={true}
                dataKey="value"
                label={{ fill: '#666', position: 'insideStart' }}
              />
              <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
              <Tooltip />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Área para Tendencias */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Tendencia de Solicitudes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={data.tendencia_solicitudes}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorSolicitudes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="fecha" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="total_solicitudes" 
                stroke="#8884d8" 
                fillOpacity={1} 
                fill="url(#colorSolicitudes)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Barras para Domiciliarios */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Rendimiento de Domiciliarios</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={domiciliarioData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completadas" stackId="a" fill="#00C49F" />
              <Bar dataKey="pendientes" stackId="a" fill="#FFBB28" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico Circular para Incidencias */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Distribución de Incidencias</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={incidenciasData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {incidenciasData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;