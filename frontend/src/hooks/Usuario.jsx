import { useState } from "react";
import { axiosCliente } from "../service/axios";

export const useUserMutation = () => {
    const [error, setError] = useState(null);
    const [succes, setSucces] = useState(false);
    const [isError, setisError] = useState(false);

    const login = async (data) => {
        try {
            const response = await axiosCliente.post("auth", data);
            localStorage.setItem("token", response.data.token);
            setSucces(true);
        } catch (error) {

            setError(error.response?.data?.error || "Error en el login");
            setisError(true);
        }
    };

    return {
        login,
        error,
        succes,
        isError
    };
};
