import { API_ENDPONTS } from "../constants/apiEndpoints.js";
import axios from "../utils/axiosInstance.js";

export const createNotification = async (payload) => {
    const {data} = await axios.post(API_ENDPONTS.CREATE_NOTIFICATION, payload);
    return data;
}

export const getNotification = async () => {
    const {data} = await axios.get(API_ENDPONTS.GET_NOTIFICATIONS);
    return data;
}