import { API_ENDPONTS } from "../constants/apiEndpoints";
import axios from "../utils/axiosInstance.js";

export const updateProfile = async (formData) => {
    const { data } = await axios.patch(`/uploads/upload-image`, formData, {
        headers:{
            "Content-Type": "multipart/form-data"
        }
    });

    return data;
}
