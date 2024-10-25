import { createContext, useState, useEffect } from 'react';
import { axiosCliente } from "../service/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(null);
    const [token, setToken] = useState(
        localStorage.getItem('token') || null
    );


    const InfoUser = async () => {

        if (!token) {
            setAuthData(null);
            return;
        }

        const response = await axiosCliente.get("info", {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        setAuthData(response.data);
    };
    useEffect(() => {

        InfoUser();
    }, [token])

    return (
        <AuthContext.Provider value={{ authData }}>
            {children}
        </AuthContext.Provider>
    );
};
