import React from 'react'
import { Layout } from '../components/layouts/Layout'
import { Table } from '../components/Nextui/Table'
import { useUserMutation } from '../hooks/Usuario'
import { Eye } from 'lucide-react'
import { Chip } from '@nextui-org/react'
const DomiciliariosPage = () => {
    const { domiciliario } = useUserMutation();
    const columns = [
        "id",
        "nombre",
        "correo",
        "telefono",
        "estado",
        "licencia",
        "disponibilidad",
        "Aciones",
    ]
    /* <Chip
          className="w-10"
          color={colorEstado[items.estado]}
        >
          {items.estado}
        </Chip> */
    return (
        <Layout>
            <Table columns={columns} data={
                domiciliario.map((items) => ({
                    id: items.id,
                    nombre: items.nombre,
                    correo: items.correo,
                    telefono: items.telefono,
                    estado: (
                        <Chip
                            className='w-10'
                            color={items.estado === "activo" ? "success" : "danger"}>
                            {items.estado}
                        </Chip>

                    ),
                    licencia: items.licencia,
                    disponibilidad: (<Chip
                        className='w-10 '
                        color={items.disponibilidad === "disponible" ? "success" : "danger"}>
                        {items.disponibilidad}
                    </Chip>),
                    acciones: (
                        <div>
                            <Eye size={35} className='cursor-pointer' />
                        </div>
                    ),
                }))
            } />
        </Layout>
    )
}

export default DomiciliariosPage