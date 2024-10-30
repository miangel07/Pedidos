import {AuthContext} from "../context/AuthContext";
import {axiosCliente} from "../service/axios";
import {useState, useEffect, useContext} from "react";

export const useQuerySolicitudes = () => {
    const [solicitudData, setSolicituData] = useState([]);

    const obtenerSolicitudes = async () => {
        try {
            const response = await axiosCliente.get("solicitud");

            setSolicituData(response.data);
        } catch (error) {
            console.error(error.response);
        }
    };
    const refressDataSolicitudes = async () => {
        await obtenerSolicitudes();
    }

    useEffect(() => {
        /*  console.log(solicitudData); */
        obtenerSolicitudes();
    }, []);

    return {
        solicitudData,
        refressDataSolicitudes
    };
};

export const useQuerySolicitudesId = () => {
    const [solicitudID, setSolicitudID] = useState([]);
    const [solicitudUser, setsolicitudUser] = useState([]);
    const {authData} = useContext(AuthContext);
    const obtenerSolicitudID = async (id) => {
        try {
            const response = await axiosCliente.get(`solicitud/${id}`);
            setSolicitudID(response.data);
        } catch (error) {
            console.error(error.response);
        }
    };

    const SolicitudUserId = async () => {
        try {
            const response = await axiosCliente.get(`solicitudUser/${authData?.id}`);
            setsolicitudUser(response.data);
        } catch (error) {
            console.error(error.response);
        }

    }
    const RefreshSolicitudUser = async () => {
        await SolicitudUserId();
    }
    useEffect(
        () => {
            SolicitudUserId();
        }, [ authData?.id]
    )

    return {
        obtenerSolicitudID,
        solicitudID,
        RefreshSolicitudUser,
        solicitudUser
    };
};


export const useMutationSolicitud = () => {
    const cambiarEstadoSolicitud = async (id, cambiarEstadoSolicitud) => {
        try {
            const response = await axiosCliente.put(`solicitud/${id}`, cambiarEstadoSolicitud);
            console.log(response.data);

        } catch (error) {
            console.error(error);
        }
    }

    return {
        cambiarEstadoSolicitud
    }
}



export  const useSolicitudQueryIDUser = () => {
    const [solicitudByUser, setSolicitudByUser] = useState([])
    const obtenerSolicitudesDeUsuario = async (id) =>{
        try {

            const response = await axiosCliente.get(`solicitudUser/${id}`);
            setSolicitudByUser(response.data);

        }catch(error){
            console.error(error)
        }
    }

    return {
        obtenerSolicitudesDeUsuario,
        solicitudByUser
    }

}