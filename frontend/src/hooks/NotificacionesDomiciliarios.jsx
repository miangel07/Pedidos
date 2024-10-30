import {axiosCliente} from "../service/axios.js";
import {useState} from "react";

export const useNotificaciones = () => {
    const [notificaciones, setNotificaciones] = useState([]);
    const getNotificaciones = async (id) => {
        try {
            const response = await axiosCliente.get(`domiciliario/${id}`)
            setNotificaciones(response.data)
            console.log(response.data)

        } catch (e) {
            console.error(e)
        }
    }
    return {
        notificaciones,
        getNotificaciones
    }
}