import { API_ENDPONTS } from "../constants/apiEndpoints";
import axios from "../utils/axiosInstance.js";

export const addWishList = async (productId) => {
    const { data } = await axios.post(`${API_ENDPONTS.ADD_WISHLIST}/${productId}`);
    return data;
}