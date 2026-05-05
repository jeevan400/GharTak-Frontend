import { useEffect, useState, createContext } from "react";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [user, setUser] = useState(null); //decoded

    useEffect(()=>{
        if(token){
            try{
                const decoded = jwtDecode(token);
                setUser(decoded);
            } catch{
                setUser(null);
            }
        } else{
            setUser(null);
        }
    },[token]);

    const login = (token)=>{
        localStorage.setItem("token", token);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{token, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

