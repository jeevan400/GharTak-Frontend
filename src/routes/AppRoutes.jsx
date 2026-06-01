import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";
import Home from "../pages/user/Home";
import AdminDashboard from "../pages/admin/AdminDashboard";
import DashBoard from "../pages/admin/steps/DashBoard";
import SellerRequest from "../pages/admin/steps/SellerRequest";
import Users from "../pages/admin/steps/Users";
import Products from "../pages/admin/steps/Products";
import Orders from "../pages/admin/steps/Orders";
import Analytics from "../pages/admin/steps/Analytics";
import SellerDashboard from "../pages/seller/SellerDashboard";
import Dashboard from "../pages/seller/sellerSteps/Dashboard";
import SellerAnalytics from "../pages/seller/sellerSteps/Analytics";
import Customers from "../pages/seller/sellerSteps/Customers";
import Earnings from "../pages/seller/sellerSteps/Earnings";
import AddProduct from "../pages/seller/sellerSteps/AddProduct";
import MyProduct from "../pages/seller/sellerSteps/MyProduct";
import SellerOrders from "../pages/seller/sellerSteps/SellerOrders";
import SellerOrdersStep from "../pages/seller/sellerSteps/Orders";
import ForgotPassword from "../pages/auth/ForgotPassword";
import LandingPage from "../pages/user/LandingPage";
import Profile from "../pages/user/Profile";
import useAuth from "../hooks/useAuth";
import ProductDetail from "../pages/user/ProductDetail";
import Cart from "../pages/user/Cart";
import Checkout from "../pages/user/Checkout";
import MyOrder from "../pages/user/MyOrder";
import WishlistProduct from "../pages/user/WishlistProduct";
import Layout from "../pages/Layout";

const AppRoutes = () => {
  const { user } = useAuth();
  // console.log("this is app route user ", user);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />{" "}
          </PrivateRoute>
        }
      >
        <Route index path="home" element={<Home />} />
        <Route path="get-cart" element={<Cart />} />
        <Route path="order" element={<Checkout />} />
        <Route path="my-order" element={<MyOrder />} />
        <Route path="single-product/:id" element={<ProductDetail />} />
        <Route path="profile" element={<Profile />} />
        <Route path="wishlist" element={<WishlistProduct />} />
      </Route>

      {/* <Route
        path="/seller"
        element={
          <PrivateRoute>
            <RoleRoute role="seller">
              <SellerDashboard />
            </RoleRoute>
          </PrivateRoute>
        }
      /> */}

      {/* <Route
        path="/admin"
        element={
          <PrivateRoute>
            <RoleRoute role="admin">
              <AdminDashboard />
            </RoleRoute>
          </PrivateRoute>
        }
      /> */}

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/profile" element={<Profile />} />
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <RoleRoute role="admin">
              <AdminDashboard />
            </RoleRoute>
          </PrivateRoute>
        }
      >
        <Route index element={<DashBoard />} />
        <Route path="dashboard" element={<DashBoard />} />
        <Route path="seller-requests" element={<SellerRequest />} />
        <Route path="users" element={<Users />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>

      <Route
        path="/seller"
        element={
          <PrivateRoute>
            <RoleRoute role="seller">
              <SellerDashboard />
            </RoleRoute>
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="seller-dashboard" element={<Dashboard />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="seller-analytics" element={<SellerAnalytics />} />
        <Route path="customers" element={<Customers />} />
        <Route path="earnings" element={<Earnings />} />
        <Route path="my-products" element={<MyProduct />} />
        <Route path="orders" element={<SellerOrdersStep />} />
        <Route path="seller-orders" element={<SellerOrders />} />
      </Route>
      {/* <Route path="/single-product/:id" element={<ProductDetail/>}/> */}
      {/* <Route path="/get-cart" element={<Cart/>}/> */}
      {/* <Route path="/order" element={<Checkout/>}/> */}
      {/* <Route path="/my-order" element={<MyOrder/>}/> */}
      {/* <Route path="/wishlist" element={<WishlistProduct/>}/> */}
    </Routes>
  );
};

export default AppRoutes;
