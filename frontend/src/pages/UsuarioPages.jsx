import React, { useState } from 'react';
import { Layout } from '../components/layouts/Layout';
import { useUserMutation } from '../hooks/Usuario';
import { Table } from "../components/Nextui/Table";
import Modals from "../components/subcomponents/Modal";
import { Chip } from "@nextui-org/react";
import UsuarioFormulario from '../components/formularios/UsuarioFormulario';
import ButtonNext from '../components/Nextui/ButtonNext';

const UsuarioPages = () => {
    const { usuario } = useUserMutation();
    const [isOpen, setIsOpen] = useState(false);
    const [dataUsuario, setDataUsuario] = useState(null);

    const columnas = [
        "id",
        "nombre",
        "TipoUsuario",
        "correo",
        "telefono",
        "estado",
        "acciones"
    ];

    const handleEdit = (data) => {
        setIsOpen(true);
        setDataUsuario(data);
    };
    const closeModal = () => {
        setDataUsuario(null);
        setIsOpen(false);
    };

    return (
        <Layout>
            {
                isOpen && (
                    <Modals visible={isOpen} title={dataUsuario ? "Editar Usuario" : "Registrar Usuario"} closeModal={closeModal} >
                        <UsuarioFormulario
                            data={dataUsuario}
                            closeModal={setIsOpen}
                        />
                    </Modals>
                )
            }
            <div className='mb-5'>
                <ButtonNext className="mb-5" onClick={() => setIsOpen(true)}>
                    Agregar Usuario
                </ButtonNext>
            </div>

            <Table
                columns={columnas}
                data={
                    usuario?.map((filas) => ({
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
                                    className="bg-danger text-white"
                                >
                                    Eliminar
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
