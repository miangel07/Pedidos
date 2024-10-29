import { createContext, useState, useEffect } from 'react';
import { axiosCliente } from "../service/axios";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(null);
    const [token, setToken] = useState(null)
    const TokenLocalStores = localStorage.getItem('token')

    const InfoUser = async () => {

        try {
            const response = await axiosCliente.get("info", {
                headers: {
                    'Authorization': `Bearer ${token ? `${token}` : TokenLocalStores}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log("Datos de usuario:", response.data);
            setAuthData(response.data);
            
        } catch (error) {
            console.error("Error al obtener la información del usuario:", error);
        }
    };


    useEffect(() => {
        if (token || TokenLocalStores) {
            InfoUser();
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ authData, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};
