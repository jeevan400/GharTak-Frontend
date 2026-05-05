import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"http://localhost:9000/api/v1",
    withCredentials:false
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
    if(err?.response?.status === 401){
        localStorage.removeItem("token");
        // go to login page
    }

    return Promise.reject(err);
});

export default axiosInstance;