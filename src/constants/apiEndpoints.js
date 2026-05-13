export const API_ENDPONTS = {
    // auth end points 
    LOGIN:"/users/login",
    REGISTER:"/users/register",
    SEND_OTP:"/users/send-otp",
    VERIFY_OTP:"/users/verify-otp",
    FORGOT_OTP:"/users/forgot-password",
    VERIFY_FORGOT_OTP:"/users/verify-forgototp",
    RESET_PASSWORD:"/users/reset-password",
    GOOGLE_LOGIN:"/users/google-login",
    PROFILE:"/users/profile",
    REQUEST_SELLER:"/users/request-seller",
    SELLER_REQUESTS:"/users/seller-requests",
    APPROVE_REQUEST:"/users/approve-request",
    REJECT_REQUEST:"/users/reject-request",

    //products end points
    ADD_PRODUCT: "/products/add-product",
    MY_PRODUCT: "/products/my-product",
    UPDATE_PRODUCT: "/products/edit-product",
    DELETE_PRODUCT:"/products/delete-product",
    ALL_PRODUCTS:"/products/all-products",
    SINGLE_PRODUCT:"/products/single-product",

    // cart end points
    ADD_TO_CART:"/carts/add-to-cart",
    GET_CART_ITEMS:"/carts/get-cart",
    UPDATE_CART_QUANTITY:"/carts/update-quantity"
}