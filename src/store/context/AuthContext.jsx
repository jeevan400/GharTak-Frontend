import { useEffect, useState, createContext } from "react";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [user, setUser] = useState(null); //decoded
    const [loading, setLoading] = useState(true);

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
        setLoading(false);
    },[token]);

    const login = (token)=>{
        localStorage.setItem("token", token);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{token, user, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

