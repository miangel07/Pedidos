import {axiosCliente} from "../service/axios.js";

import {useState, useEffect} from "react";


export const useDomiciliariosQuery = () => {

    const [domiciliariosData, setDomiciliariosData] = useState([])

    const obtenerDomiciliarios = async () => {

        try {
            const response = await axiosCliente.get("domiciliario")

            setDomiciliariosData(response.data)
        } catch (e) {
            console.error(e)
        }
    }


    useEffect(() => {
        obtenerDomiciliarios()
    }, []);

    return {
        domiciliariosData
    }
}
