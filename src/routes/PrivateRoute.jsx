import useAuth from "../hooks/useAuth"
import { Navigate } from "react-router-dom"


const PrivateRoute = ({children})=>{
    const { token } = useAuth();
     console.log("Token from AuthContext:", token);
  console.log("Token from localStorage:", localStorage.getItem("token"));
    return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;