import { API_ENDPONTS } from "../constants/apiEndpoints";
import axios from "../utils/axiosInstance.js";


export const createMessage = async (conversationId, payload) => {
    const {data} = await axios.post(`${API_ENDPONTS.CREATE_MESSAGE}/${conversationId}`, payload);
    return data;
}

export const getAllConversationMessages = async (conversationId) => {
    const {data} = await axios.get(`${API_ENDPONTS.GET_ALL_MESSAGES}/${conversationId}`);
    return data;
}

export const messageDelete = async (messageId) =>{
    const {data} = await axios.delete(`${API_ENDPONTS.DELETE_MESSAGE}/${messageId}`);
    return data;
}