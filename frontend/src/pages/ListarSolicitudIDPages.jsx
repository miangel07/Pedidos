import React, { useContext, useEffect } from 'react'
import { Layout } from '../components/layouts/Layout'
import { useQuerySolicitudesId } from '../hooks/Solicitud'
import { Table } from '../components/Nextui/Table'
import { Eye } from 'lucide-react';
import { Chip } from '@nextui-org/react';
const ListarSolicitudIDPages = () => {
  const { solicitudUser } = useQuerySolicitudesId();
  console.log(solicitudUser)
  const colorEstado = {
      pendiente: "warning",
      asignado: "info",     
      en_curso: "primary",  
      completado: "success", 
      reprogramado: "warning", 
      cancelado: "danger",  

  }
  const column = ["id", "descripcion del Producto", "direccion de entrega", "direccion de recogida", "domiciliario", "estado", "fecha", "acciones"]
  const handleVer = (items) => {
    console.log(items)
  }
  return (
    <Layout>
      <Table columns={column} data={solicitudUser?.map((items) => ({
        id: items.id,
        descripcion_Producto: items.descripcion_Producto,
        direccion_entrega: items.direccion_entrega,
        direccion_recogida: items.direccion_recogida,
        domiciliario_id: items.domiciliario_id,
        estado: (<Chip
          className="w-10"
          color={colorEstado[items.estado]}
        >
          {items.estado}
        </Chip>),
        fecha: items.fecha,
        acciones: (
          <>
            <Eye size={35} className='cursor-pointer' onClick={() => handleVer(items)} />
          </>
        ),
      })
      )} itemsPerPage={5} />
    </Layout>
  )
}

export default ListarSolicitudIDPages