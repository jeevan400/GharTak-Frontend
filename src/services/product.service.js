import { API_ENDPONTS } from "../constants/apiEndpoints.js"
import axiosInstance from "../utils/axiosInstance.js"

export const addProduct = async (payload) => {
    const {data} = await axiosInstance.post(API_ENDPONTS.ADD_PRODUCT, payload);
    return data;
}

export const getMyProduct = async () => {
    const {data} = await axiosInstance.get(API_ENDPONTS.MY_PRODUCT);
    return data;
}

export const updateProduct = async (id, payload) => {
    const { data } = await axiosInstance.patch(`${API_ENDPONTS.UPDATE_PRODUCT}/${id}`, payload);
    return data;
}

export const deleteProduct = async (id) => {
    const {data} = await axiosInstance.delete(`${API_ENDPONTS.DELETE_PRODUCT}/${id}`);
    return data;
}

export const getAllProducts = async () => {
    const {data} = await axiosInstance.get(API_ENDPONTS.ALL_PRODUCTS);
    return data;
}

export const getSingleProduct = async (id) => {
    const { data } = await axiosInstance.get(`${API_ENDPONTS.SINGLE_PRODUCT}/${id}`);
    return data;
}

export const addReviewForProfuct = async (id, payload) => {
    const {data} = await axiosInstance.post(`/products/${id}/review`, payload );
    return data;
}

export const getAllReviews = async (id) => {
    const {data} = await axiosInstance.get(`/products/${id}/all-reviews`);
    return data;
}

export const deleteReview = async (productId, reviewId) => {
    const {data} = await axiosInstance.delete(`/products/${productId}/review/${reviewId}`);
    return data;
}

export const updateReview = async (productId, reviewId, payload) => {
    const {data} = await axiosInstance.patch(`/products/${productId}/review/${reviewId}`, payload);
    return data;
}