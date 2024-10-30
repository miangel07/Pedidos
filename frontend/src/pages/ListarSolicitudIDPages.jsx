import React, { useContext, useEffect, useState } from 'react';
import { Layout } from '../components/layouts/Layout';
import { useQuerySolicitudesId } from '../hooks/Solicitud';
import { Table } from '../components/Nextui/Table';
import { Eye } from 'lucide-react';
import { Chip } from '@nextui-org/react';
import { toast } from 'react-toastify';

const ListarSolicitudIDPages = () => {
  const { solicitudUser } = useQuerySolicitudesId();
  const [estado, setEstado] = useState("");
  const [solicitudesFiltradas, setSolicitudesFiltradas] = useState(solicitudUser);



  const colorEstado = {
    pendiente: "warning",
    asignado: "info",
    en_curso: "primary",
    completado: "success",
    reprogramado: "warning",
    cancelado: "danger",
  };

  const Estados = ["pendiente", "asignado", "en_curso", "completado", "reprogramado", "cancelado"];
  const column = ["id", "descripcion del Producto", "direccion de entrega", "direccion de recogida", "domiciliario", "estado", "fecha", "acciones"];

  const handleVer = (items) => {
    console.log(items);
  };

  useEffect(() => {
    if (estado) {
      
      const solicitudesFiltradas = solicitudUser.filter(item => item.estado === estado);
      setSolicitudesFiltradas(solicitudesFiltradas);
    } else {
     
      setSolicitudesFiltradas(solicitudUser);
    }
  }, [estado, solicitudUser]); 

  return (
    <Layout>
     
        <select
          className="bg-white border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none p-2 mb-5"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
        >
          <option value="">Todos</option>
          {Estados.map(tipo => (
            <option key={tipo} value={tipo}>
              {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
            </option>
          ))}
        </select>
     
      <Table columns={column} data={solicitudesFiltradas?.map((items) => ({
        id: items.id,
        descripcion_Producto: items.descripcion_Producto,
        direccion_entrega: items.direccion_entrega,
        direccion_recogida: items.direccion_recogida,
        domiciliario_nombre: items.domiciliario_nombre,
        estado: (
          <Chip
            className="w-10"
            color={colorEstado[items.estado]}
          >
            {items.estado}
          </Chip>
        ),
        fecha: items.fecha,
        acciones: (
          <>
            <Eye size={35} className='cursor-pointer' onClick={() => handleVer(items)} />
          </>
        ),
      }))} itemsPerPage={5} />
    </Layout>
  );
};

export default ListarSolicitudIDPages;
