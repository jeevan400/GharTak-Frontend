import { API_ENDPONTS } from "../constants/apiEndpoints";
import axios from "../utils/axiosInstance.js";

export const createOrder = async (payload)=>{
    const {data} = await axios.post(API_ENDPONTS.CREATE_ORDER, payload);
    return data;
}

export const getMyOrder = async ()=>{
    const {data} = await axios.get(API_ENDPONTS.MY_ORDERS);
    return data;
}

export const getSellerOrder = async () => {
    const { data } = await axios.get(API_ENDPONTS.SELLER_ORDERS);
    return data;
}