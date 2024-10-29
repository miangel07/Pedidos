import { useEffect, useState } from "react";
import { axiosCliente } from "../service/axios";

export const useUserMutation = () => {
    const [usuario, setUsuario] = useState([]);
    const [domiciliario, setdomiciliario] = useState([]);

    const optenerUsuarios = async () => {
        try {
            const response = await axiosCliente.get("usuario");
            setUsuario(response.data);
        } catch (error) {
            console.error(error.response);
        }
    };
    const optenerDomiciliario = async () => {
        try {
            const response = await axiosCliente.get("usuarioDomiciliario");
            setdomiciliario(response.data);
        } catch (error) {
            console.error(error.response);
        }
    };

    const refress = async () => {
        await optenerUsuarios();
    };
    useEffect(() => {
        optenerUsuarios();
        optenerDomiciliario()
    }, [])

    return {
        refress,
        optenerDomiciliario,
        optenerUsuarios,
        domiciliario,
        usuario
    };
};
