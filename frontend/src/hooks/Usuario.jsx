import { useState } from "react";
import { axiosCliente } from "../service/axios";

export const useUserMutation = () => {
    const [error, setError] = useState(null);

    const [isError, setisError] = useState(false);

    const login = async (data) => {
        try {
            const response = await axiosCliente.post("auth", data);

            localStorage.setItem("token", response.data.token);
            return true
        } catch (error) {
            setError(error.response?.data?.error || "Error en el login");
            setisError(true);
            return false;
        }
    };

    return {
        login,
        error,
        isError
    };
};
