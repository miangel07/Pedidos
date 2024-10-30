import ButtonNext from "../Nextui/ButtonNext";
import InputNext from "../Nextui/InputNext";
import { useForm } from "react-hook-form";
import { axiosCliente } from "../../service/axios";
import { toast } from "react-toastify";
const CambiarPasswordForm = ({ onClose }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axiosCliente.put("/cambiar-password",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            )
            if (response.status === 200) {
                toast.success(`${response.data.message}`)
                onClose();
            }

        } catch (error) {
            console.log(error)
            if (error.response.status === 401) {
                toast.error(`${error.response.data.error}`)

            }
        }
        console.log(data);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Cambiar Contraseña</h3>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Contraseña Actual
                    </label>
                    <InputNext
                        type="password"
                        errors={errors}
                        placeholder="Ingrese una contraseña Actual"
                        register={register}
                        name="password_actual"
                        id="password_actual"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nueva Contraseña
                    </label>
                    <InputNext
                        type="password"
                        errors={errors}
                        placeholder="Ingrese una contraseña nueva"
                        register={register}
                        name="password_nuevo"
                        id="password_nuevo"
                    />

                </div>
                <div className="flex space-x-3">
                    <ButtonNext type="submit" className="w-full">
                        Guardar Cambios
                    </ButtonNext>
                </div>
            </form>
        </div>
    );
};

export default CambiarPasswordForm;
