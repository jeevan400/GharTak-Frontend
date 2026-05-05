import { useContext } from "react";
import { AuthContext } from "../store/context/AuthContext";

const useAuth = ()=> useContext(AuthContext);
export default useAuth;