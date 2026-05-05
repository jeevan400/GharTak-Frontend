import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RoleRoute = ({children, role})=>{
    const {user} = useAuth();
    if(!user){
        return <Navigate to="/login" replace/>;
    }

    return user.role === role? children : <Navigate to="/" replace />;
};

export default RoleRoute;