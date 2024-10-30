
import InputNext from "../Nextui/InputNext";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { axiosCliente } from "../../service/axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Modals from "../subcomponents/Modal";
import UsuarioFormulario from "./UsuarioFormulario";
export const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { setToken } = useContext(AuthContext);
  const [ErrorMessage, setErrorMessage] = useState(null)
  const [modal, setModal] = useState(false)
  const navigate = useNavigate();

  const submit = async (data) => {

    try {
      const response = await axiosCliente.post("auth", data);


      if (response.status == 200) {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token)
        navigate("/home");
      }


    } catch (error) {
      if (error.response.status == 401) {
        toast.error(`${error.response.data.error}`);
        setErrorMessage(error.response.data.error);

      }
    }
  };
  return (
    <>
      {
        modal && <Modals
          title="Crear una Cuenta"
          visible={modal}
          closeModal={() => setModal(false)}
        >
          <UsuarioFormulario closeModal={() => setModal(false)} />
        </Modals>
      }
      <form className="flex gap-5 flex-col" onSubmit={handleSubmit(submit)}>

        {ErrorMessage && <p className="text-red-600">{ErrorMessage}</p>}
        <div className="flex flex-col gap-5">
          <InputNext id={"correo"} errors={errors} name={"correo"} placeholder={"Ingrese el correo"} variants={"underlined"} register={register} type={"email"} />
          <InputNext id={"pasword"} errors={errors} name={"password"} placeholder={"Ingrese la contraseña"} variants={"underlined"} register={register} type={"password"} />

        </div>


        <div className="mb-12 pb-1 pt-1 text-center">

          <button
            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
            type="submit"
            style={{
              background:
                "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
            }}
          >
            Log in
          </button>




        </div>


        <div className="flex items-center justify-between pb-6">
          <p className="mb-0 mr-2">¿Olvidaste la contraseña?</p>

          <button
            type="button"
            onClick={() => setModal(true)}
            className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
          >
            Register
          </button>

        </div>
      </form>
    </>

  );
};
