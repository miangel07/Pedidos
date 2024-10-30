import React, { useState, useEffect } from 'react';
import { Layout } from '../components/layouts/Layout';
import { Table } from '../components/Nextui/Table';
import { useUserMutation } from '../hooks/Usuario';
import { Eye } from 'lucide-react';
import { Chip } from '@nextui-org/react';

const DomiciliariosPage = () => {
    const { domiciliario } = useUserMutation();
    const [estado, setEstado] = useState("");
    const [domiciliariosFiltrados, setDomiciliariosFiltrados] = useState(domiciliario);

    const columns = [
        "id",
        "nombre",
        "correo",
        "telefono",
        "estado",
        "licencia",
        "disponibilidad",
        "acciones",
    ];

    const Estados = ['disponible', 'no disponible'];

    useEffect(() => {
        if (estado) {
            // Filtrar domiciliarios según el estado seleccionado
            const domiciliariosFiltrados = domiciliario.filter(item => item.disponibilidad === estado);
            setDomiciliariosFiltrados(domiciliariosFiltrados);
        } else {
            // Si no hay estado seleccionado, mostrar todos los domiciliarios
            setDomiciliariosFiltrados(domiciliario);
        }
    }, [estado, domiciliario]); // Se vuelve a ejecutar cuando `estado` o `domiciliario` cambian

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
            <Table columns={columns} data={
                domiciliariosFiltrados.map((items) => ({
                    id: items.id,
                    nombre: items.nombre,
                    correo: items.correo,
                    telefono: items.telefono,
                    estado: (
                        <Chip
                            className='w-10'
                            color={items.estado === "activo" ? "success" : "danger"}
                        >
                            {items.estado}
                        </Chip>
                    ),
                    licencia: items.licencia,
                    disponibilidad: (
                        <Chip
                            className='w-10'
                            color={items.disponibilidad === "disponible" ? "success" : "danger"}
                        >
                            {items.disponibilidad}
                        </Chip>
                    ),
                    acciones: (
                        <div>
                            <Eye size={35} className='cursor-pointer' />
                        </div>
                    ),
                }))
            } />
        </Layout>
    );
}

export default DomiciliariosPage;
