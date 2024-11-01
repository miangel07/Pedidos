import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputNext from "../Nextui/InputNext";
import { Select } from "../subcomponents/Select";
import { axiosCliente } from "../../service/axios";
import { toast } from "react-toastify";
import { useUserMutation } from "../../hooks/Usuario";

const UsuarioFormulario = ({ data, closeModal, login }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const [isNegocio, setIsNegocio] = useState(false);
  const { optenerUsuarios } = useUserMutation();
  const [isDomiciliario, setDomiciliario] = useState(false);

  const onsubmit = async (data) => {
    const formData = new FormData();

    // Agregar datos al FormData
    formData.append("nombre", data.nombre);
    formData.append("TipoUsuario", data.TipoUsuario);
    formData.append("correo", data.correo);
    formData.append("telefono", data.telefono);
    formData.append("password", data.password);
    formData.append("direccion", data.direccion);
    formData.append("licencia", data.licencia);

    // Verifica si 'banner' existe y tiene elementos
    if (data.banner && data.banner.length > 0) {
      formData.append("banner", data.banner[0]);
    }

    try {
      const response = await axiosCliente.post("usuario", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        toast.success(`${response.data.data}`);
        reset();
        closeModal();
      }
    } catch (error) {
      console.error("Error al insertar el usuario:", error);
      toast.error("Error al insertar el usuario.");
    }
  };
  const handleEditar = async (dataform) => {
    const response = await axiosCliente.put(`usuario/${data.id}`, dataform);
    if (response && response.status == 200) {
      toast.success(`${response.data.mensaje}`);
      reset();
      closeModal();
    }
  };

  const tipousuario = watch("TipoUsuario");
  useEffect(() => {
    reset({
      nombre: data?.nombre,
      TipoUsuario: data?.TipoUsuario,
      correo: data?.correo,
      telefono: data?.telefono,
      licencia: data?.domiciliario?.licencia,
      banner: data?.negocio?.banner,
      direccion: data?.negocio?.direccion,
    });

    if (tipousuario === "negocio") {
      setIsNegocio(true);
      setDomiciliario(false);
    }
    if (tipousuario === "domiciliario") {
      setDomiciliario(true);
      setIsNegocio(false);
    }
    if (tipousuario === "administrador" || tipousuario === "particular") {
      setDomiciliario(false);
      setIsNegocio(false);
    }
  }, [data, tipousuario]);
  const opciones = [
    { value: "administrador", text: "Administrador" },
    { value: "negocio", text: "Negocio" },
    { value: "particular", text: "Particular" },
    { value: "domiciliario", text: "Domiciliario" },
  ];
  const OpcionesLoin = [
    
      { value: "particular", text: "Particular" },
    { value: "negocio", text: "Negocio" },
    { value: "domiciliario", text: "Domiciliario" },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <form
        onSubmit={handleSubmit(data ? handleEditar : onsubmit)}
        className="space-y-4"
      >
        <InputNext
          errors={errors}
          name={"nombre"}
          register={register}
          id={"name"}
          placeholder={"Ingrese el nombre"}
          type={"text"}
          className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-400"
        />
        {!data && (
          <Select
            label={"Tipo de Usuario"}
            name={"TipoUsuario"}
            placeholder={"Seleccione el tipo de usuario"}
            register={register}
            options={login ? OpcionesLoin : opciones}
            valueKey="value"
            textKey="text"
          />
        )}

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
          type={"text"}
          className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-400"
        />
        {!data && (
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
        )}
        {isNegocio && (
          <>
            <h1 className="text-2xl font-medium text-center text-black mb-4">
              Información Para Ingresar un Negocio
            </h1>
            <InputNext
              errors={errors}
              name={"banner"}
              register={register}
              id={"banner"}
              placeholder={"Ingrese el banner"}
              type={"file"}
              className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-400"
            />
            <InputNext
              errors={errors}
              name={"direccion"}
              register={register}
              id={"direccion"}
              placeholder={"Ingrese la dirección"}
              type={"text"}
              className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-400"
            />
          </>
        )}
        {isDomiciliario && (
          <>
            <h1 className="text-2xl font-medium text-center text-black mb-4">
              Información Para Ingresar un Domiciliario
            </h1>
            <InputNext
              errors={errors}
              name={"licencia"}
              register={register}
              id={"licencia"}
              placeholder={"Ingrese el numero de la licencia"}
              type={"number"}
              className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-400"
            />
          </>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          {data ? "Editar" : "Guardar"}
        </button>
      </form>
    </div>
  );
};

export default UsuarioFormulario;
