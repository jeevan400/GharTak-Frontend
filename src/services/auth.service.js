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
    const {data}  = await axios.get(API_ENDPONTS.PROFILE);
    return data;
}

export const updateProfile = async (updatedData)=>{
    const {data} = await axios.patch(API_ENDPONTS.PROFILE, updatedData);
    return data;
}

export const requestSellerRole = async () => {
    const { data } = await axios.patch(API_ENDPONTS.REQUEST_SELLER);

    return data;
}

export const getSellerRequest = async () => {
    const {data} = await axios.get(API_ENDPONTS.SELLER_REQUESTS);
    return data;
}

export const getAllStatusUser = async () => {
    const {data} = await axios.get(API_ENDPONTS.ALL_STATUS_USERS);
    return data;
}

export const approveSellerRequest = async (id)=>{
    const {data} = await axios.patch(`${API_ENDPONTS.APPROVE_REQUEST}/${id}`);
    return data;
}

export const rejectSellerRequest = async (id) => {
    const {data} = await axios.patch(`${API_ENDPONTS.REJECT_REQUEST}/${id}`);
    return data;
}

export const getAllUser = async () => {
     const { data } = await axios.get(API_ENDPONTS.ALL_USERS);
     return data;
}

export const ToggleBlockUser = async (id) => {
    const {data} = await axios.patch(`${API_ENDPONTS.BLOCK_USER}/${id}`);
    return data;
}