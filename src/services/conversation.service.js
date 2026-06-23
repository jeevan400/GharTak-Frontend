import { API_ENDPONTS } from "../constants/apiEndpoints";
import axios from "../utils/axiosInstance.js";


export const getConverSation = async () => {
    const {data} = await axios.get(API_ENDPONTS.GET_CONVERSATION);
    return data;
}