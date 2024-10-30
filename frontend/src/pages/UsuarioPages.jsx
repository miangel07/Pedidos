import React, { useContext, useState, useEffect } from 'react';
import { Layout } from '../components/layouts/Layout';
import { useUserMutation } from '../hooks/Usuario';
import { Table } from "../components/Nextui/Table";
import Modals from "../components/subcomponents/Modal";
import { Chip } from "@nextui-org/react";
import UsuarioFormulario from '../components/formularios/UsuarioFormulario';
import ButtonNext from '../components/Nextui/ButtonNext';
import { toast } from 'react-toastify';
import { axiosCliente } from '../service/axios';


const UsuarioPages = () => {
    const { usuario, refress } = useUserMutation();
    const [isOpen, setIsOpen] = useState(false);
    const [dataUsuario, setDataUsuario] = useState(null);
    const [tipoUsuarioSeleccionado, setTipoUsuarioSeleccionado] = useState(""); 
    const [usuariosFiltrados, setUsuariosFiltrados] = useState([]); 
console.log(usuario)
    const columnas = [
        "id",
        "nombre",
        "TipoUsuario",
        "correo",
        "telefono",
        "estado",
        "acciones"
    ];

    const tiposDeUsuario = ["administrador", "negocio", "particular", "domiciliario"]; 

    const handleEdit = async (data) => {
        setIsOpen(true);
        setDataUsuario(data);
    };

    const handleEstado = async (data) => {
        try {
            const estadoUser = data.estado === "activo" ? "inactivo" : "activo";
            const response = await axiosCliente.put(`usuarioEstado/${data.id}`, { estado: estadoUser });
            if (response.status === 200) {
                await refress();
                toast.success(`${response.data.mensaje}`);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const closeModal = () => {
        setDataUsuario(null);
        setIsOpen(false);
    };


    useEffect(() => {
        if (tipoUsuarioSeleccionado) {
            setUsuariosFiltrados(usuario.filter(fila => fila.TipoUsuario === tipoUsuarioSeleccionado));
        } else {
            setUsuariosFiltrados(usuario);
        }
    }, [tipoUsuarioSeleccionado, usuario]);

    return (
        <Layout>
            {isOpen && (
                <Modals visible={isOpen} title={dataUsuario ? "Editar Usuario" : "Registrar Usuario"} closeModal={closeModal}>
                    <UsuarioFormulario
                    
                        data={dataUsuario}
                        closeModal={closeModal}
                    />
                </Modals>
            )}
            <div className='mb-5 w-full justify-around flex'>
                <ButtonNext className="mb-5" onClick={() => setIsOpen(true)}>
                    Agregar Usuario
                </ButtonNext>
                <select
                    className="bg-white border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none p-2 mb-5"
                    value={tipoUsuarioSeleccionado}
                    onChange={(e) => setTipoUsuarioSeleccionado(e.target.value)}
                >
                    <option value="">Todos</option>
                    {tiposDeUsuario.map(tipo => (
                        <option key={tipo} value={tipo}>
                            {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                        </option>
                    ))}
                </select>
            </div>


            <Table
                columns={columnas}
                data={
                    usuariosFiltrados?.map((filas) => ({
                        id: filas.id,
                        nombre: filas.nombre,
                        TipoUsuario: filas.TipoUsuario,
                        correo: filas.correo,
                        telefono: filas.telefono,
                        estado: (
                            <Chip
                                className="w-10"
                                color={filas.estado === "inactivo" ? "danger" : "success"}
                            >
                                {filas.estado}
                            </Chip>
                        ),
                        acciones: (
                            <div className='flex flex-row gap-3'>
                                <Chip
                                    size="small"
                                    variant="outline-primary"
                                    className="bg-primary text-white cursor-pointer"
                                    onClick={() => handleEdit(filas)}
                                >
                                    Editar
                                </Chip>
                                <Chip
                                    size="small"
                                    variant="outline-danger"
                                    className={`${filas.estado === "inactivo" ? "bg-danger" : "bg-warning"} text-white cursor-pointer`}
                                    onClick={() => handleEstado(filas)}
                                >
                                    {filas.estado === "activo" ? "Desactivar" : "Activar"}
                                </Chip>
                            </div>
                        ),
                    }))
                }
            />
        </Layout>
    );
};

export default UsuarioPages;
