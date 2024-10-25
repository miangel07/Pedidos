import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import InputNext from '../Nextui/InputNext';
import { Select } from '../subcomponents/Select';
import { axiosCliente } from '../../service/axios';
import { toast } from "react-toastify";
const UsuarioFormulario = ({ data, closeModal }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    
    const onsubmit = async (data) => {
        const response = await axiosCliente.post("usuario", data)
        if (response.status === 201) {
            toast.success(`${response.data.data}`)
            reset()
            closeModal()
        }

    }
    const handleEditar = (data) => {
        console.log("onsubmit", data)
    }

    useEffect(() => {
        reset({
            nombre: data?.nombre,
            TipoUsuario: data?.TipoUsuario,
            correo: data?.correo,
            telefono: data?.telefono,
        })


    }, [data])
    const opciones = [
        { value: 'administrador', text: 'Administrador' },
        { value: 'negocio', text: 'Negocio' },
        { value: 'particular', text: 'Particular' },
        { value: 'domiciliario', text: 'Domiciliario' }
    ];
    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <form onSubmit={handleSubmit(data ? handleEditar : onsubmit)} className="space-y-4">

                <InputNext
                    errors={errors}
                    name={"nombre"}
                    register={register}
                    id={"name"}
                    placeholder={"Ingrese el nombre"}
                    type={"text"}
                    className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-400"
                />
                <Select
                    label={"Tipo de Usuario"}
                    name={"TipoUsuario"}
                    placeholder={"Seleccione el tipo de usuario"}
                    register={register}
                    options={opciones}
                    valueKey="value"
                    textKey="text"
                />

                <InputNext
                    errors={errors}
                    name={"correo"}
                    register={register}
                    id={"correo"}
                    placeholder={"Ingrese el correo"}
                    type={"email"}
                    className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-400"
                />

                <InputNext
                    errors={errors}
                    name={"telefono"}
                    register={register}
                    id={"telefono"}
                    placeholder={"Ingrese el teléfono"}
                    type={"tel"}
                    className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-400"
                />
                {
                    !data && (
                        <>
                            <InputNext
                                errors={errors}
                                name={"password"}
                                register={register}
                                id={"password"}
                                placeholder={"Ingrese la contraseña"}
                                type={"password"}
                                className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-400"
                            />
                        </>
                    )
                }


                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition duration-200"
                >
                    {data ? "Editar" : "Guardar"}
                </button>
            </form>
        </div>
    );

}

export default UsuarioFormulario