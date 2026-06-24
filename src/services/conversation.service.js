import { API_ENDPONTS } from "../constants/apiEndpoints";
import axios from "../utils/axiosInstance.js";


export const createConversation = async (sellerId) => {
    const {data} = await axios.post(`${API_ENDPONTS.CREATE_CONVERSATION}/${sellerId}`);
    return data;
}

export const getConverSation = async () => {
    const {data} = await axios.get(API_ENDPONTS.GET_CONVERSATION);
    return data;
}