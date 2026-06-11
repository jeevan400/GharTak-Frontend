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

export const updateOrderStatus = async (orderId, status) => {
    const { data } = await axios.patch(`${API_ENDPONTS.UPDATE_ORDER_STATUS}/${orderId}`, {status});
    return data;
}

export const getAllOrders = async (debouncingSearch, currentPage, limit) => {
    const { data } = await axios.get(`${API_ENDPONTS.GET_ALL_ORDERS}?search=${debouncingSearch}&page=${currentPage}&limit=${limit}`);
    return data;
}

export const cancelOrder = async (id) => {
    const { data } = await axios.patch(`${API_ENDPONTS.CANCEL_ORDER}/${id}`);
    return data;
}

export const getRevenue = async () => {
    const {data} = await axios.get(API_ENDPONTS.TODAYS_REVENUE);
    return data;
}