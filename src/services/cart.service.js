import { API_ENDPONTS } from "../constants/apiEndpoints";
import axios from "../utils/axiosInstance.js";

export const addToCart = async (payload) => {
    const {data} = await axios.post(API_ENDPONTS.ADD_TO_CART, payload);
    return data;
}