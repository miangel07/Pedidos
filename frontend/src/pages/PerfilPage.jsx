import React, { useContext, useEffect, useState } from 'react';
import { Layout } from '../components/layouts/Layout';
import { AuthContext } from '../context/AuthContext';
import { Avatar, Badge, EmailIcon, InfoCard, PhoneIcon, ShieldIcon, UserIcon } from '../components/utils/CardsPerfil';
import ButtonNext from '../components/Nextui/ButtonNext';
import Modals from '../components/subcomponents/Modal';
import CambiarPasswordForm from '../components/formularios/CambiarPassword';
import { axiosCliente } from '../service/axios';



const PerfilPage = () => {
    const { authData } = useContext(AuthContext);
    const [negocio, setNegocio] = useState("");
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    console.log(negocio)
    const Image = async () => {
        if (authData?.TipoUsuario === "negocio") {
            const responde = await axiosCliente.get(`negocios/${authData?.id}`)
            setNegocio(responde.data[0].banner)
        }
    }
    useEffect(() => {
        Image()
    }, [])
    return (
        <Layout>
            <div className="max-w-4xl mx-auto p-6">
                {showPasswordForm && (
                    <>
                        <Modals visible={showPasswordForm} title={""} closeModal={() => setShowPasswordForm(false)}>
                            <CambiarPasswordForm onClose={() => setShowPasswordForm(false)} />
                        </Modals>
                    </>
                )}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

                    <div className="text-center p-8 border-b border-gray-100">
                        <Avatar imageUrl={`http://127.0.0.1:8000${negocio}`} letter={authData?.nombre?.charAt(0)} />
                        <h1 className="mt-4 text-3xl font-bold text-gray-900">
                            {authData?.nombre}
                        </h1>
                        <div className="mt-2">
                            <Badge text={authData?.TipoUsuario} />
                        </div>
                        <div className="mt-4">
                            <ButtonNext
                                onClick={() => setShowPasswordForm(!showPasswordForm)}
                                className="inline-flex items-center px-4 py-2 text-sm"
                            >
                                <svg
                                    className="w-4 h-4 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                                    />
                                </svg>
                                Cambiar Contraseña
                            </ButtonNext>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InfoCard
                                icon={<UserIcon />}
                                title="Nombre Completo"
                                value={authData?.nombre}
                            />
                            <InfoCard
                                icon={<ShieldIcon />}
                                title="Tipo de Usuario"
                                value={authData?.TipoUsuario}
                            />
                            <InfoCard
                                icon={<EmailIcon />}
                                title="Correo Electrónico"
                                value={authData?.correo}
                            />
                            <InfoCard
                                icon={<PhoneIcon />}
                                title="Teléfono"
                                value={authData?.telefono}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PerfilPage;