
import InputNext from "../Nextui/InputNext";
import { useForm } from 'react-hook-form';
import { useUserMutation } from "../../hooks/Usuario";
import { useNavigate } from "react-router-dom";
export const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const {  error, login, isError } = useUserMutation();
  const navigate = useNavigate();
  const submit = async (data) => {
    console.log("data", data);
    try {

      const success = await login(data); 

      if (success) {
        console.log("Login exitoso");
        navigate("/home");
      }

    } catch (error) {
      console.log(error);
    }

  };
  console.log(error);
  return (
    <form className="flex gap-5 flex-col" onSubmit={handleSubmit(submit)}>

      {isError && <p className="text-red-600">{error}</p>}
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
          type="submit"
          className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
        >
          Register
        </button>

      </div>
    </form>
  );
};
