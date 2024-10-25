import { createContext, useState, useEffect } from 'react';
import { axiosCliente } from "../service/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState([])
    const InfoUser = async () => {
        const response = await axiosCliente.get("info",
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                }
            }
        )
        setAuthData(response.data);
    }
    useEffect(() => {
        InfoUser()
    }, []);
    return (
        <AuthContext.Provider value={{ authData }}>
            {children}
        </AuthContext.Provider>
    );
};