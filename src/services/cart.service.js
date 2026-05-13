import { API_ENDPONTS } from "../constants/apiEndpoints";
import axios from "../utils/axiosInstance.js";

export const addToCart = async (payload) => {
    const {data} = await axios.post(API_ENDPONTS.ADD_TO_CART, payload);
    return data;
}

export const getCartItems = async () => {
    const {data} = await axios.get(API_ENDPONTS.GET_CART_ITEMS);
    return data;
}

export const updateCartQuantity = async (productId, quantity)=>{
    const {data} = await axios.patch(`${API_ENDPONTS.UPDATE_CART_QUANTITY}/${productId}`, { quantity });
    return data;
}