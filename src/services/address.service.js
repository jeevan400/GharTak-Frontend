import { API_ENDPONTS } from "../constants/apiEndpoints";
import axios from "../utils/axiosInstance";

export const addUserAddress = async (payload) =>{
    const {data} = await axios.post(API_ENDPONTS.ADD_USER_ADDRESS, payload);
    return data;
}

export const getUserAddress = async () => {
    const {data} = await axios.get(API_ENDPONTS.GET_ADDRESSES);
    return data;
}

export const deleteAddress = async (id) =>{
    const { data } = await axios.delete(`${API_ENDPONTS.DELETE_ADDRESS}/${id}`);
    return data;
}

export const updateAddress = async (id, updateData) =>{
    const { data } = await axios.patch(`${API_ENDPONTS.UPDATE_ADDRESS}/${id}`, updateData);
    return data;
}