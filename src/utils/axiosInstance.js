import axios from "axios";
import server from "../environment";

const axiosInstance = axios.create({
    baseURL:`${server}/api/v1`,
    withCredentials:true,
    timeout: 30000
});

//attach token on every request
axiosInstance.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// handle UNAUTHORIZED token
axiosInstance.interceptors.response.use((res)=> res, (err)=>{
    // Handle 302 redirect (often caused by auth redirects)
    if(err?.response?.status === 302){
        console.error("302 Redirect detected - check token validity");
        localStorage.removeItem("token");
    }
    // Handle 401 Unauthorized
    if(err?.response?.status === 401){
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirect to login
    }

    return Promise.reject(err);
});

export default axiosInstance;