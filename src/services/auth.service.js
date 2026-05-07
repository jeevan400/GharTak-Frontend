import axios from "../utils/axiosInstance";
import { API_ENDPONTS } from "../constants/apiEndpoints";

export const loginUser = async (payload) => {
    const {data} = await axios.post(API_ENDPONTS.LOGIN, payload);
    return data;
}

export const registerUser = async (payload) => {
    const {data} = await axios.post(API_ENDPONTS.REGISTER, payload);
    return data;
}

export const sendOTP = async (payload) => {
    const {data} = await axios.post(API_ENDPONTS.SEND_OTP, payload);
    return data;
}

export const verifyOTP = async (payload) => {
    const {data} = await axios.post(API_ENDPONTS.VERIFY_OTP, payload);
    return data;
}

export const sendforgotOTP = async (payload) => {
    const {data} = await axios.post(API_ENDPONTS.FORGOT_OTP, payload);
    return data;
}

export const verifyForgotOTP = async (payload) => {
    const {data} = await axios.post(API_ENDPONTS.VERIFY_FORGOT_OTP, payload);
    return data;
}

export const resetPassword = async (payload) => {
    const {data} = await axios.post(API_ENDPONTS.RESET_PASSWORD, payload);
    return data;
}

export const googleLogin = async (payload)=>{
    const { data } = await axios.post(API_ENDPONTS.GOOGLE_LOGIN, payload);
    return data;
}

export const getProfile = async ()=>{
    const {data}  = await axios.get("/users/profile");
    return data;
}

export const updateProfile = async (updatedData)=>{
    const {data} = await axios.patch("/users/profile", updatedData);
    return data;
}