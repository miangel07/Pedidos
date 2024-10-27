import { useEffect, useState } from "react";
import { axiosCliente } from "../service/axios";

export const useUserMutation = () => {
    const [usuario, setUsuario] = useState([]);

    const optenerUsuarios = async () => {
        try {
            const response = await axiosCliente.get("usuario");
            setUsuario(response.data);
        } catch (error) {
            console.error(error.response);
        }
    };

    const refress = async () => {
        await optenerUsuarios();
      };
    useEffect(() => {
        optenerUsuarios();
    }, [])

    return {
        refress,
        usuario
    };
};
