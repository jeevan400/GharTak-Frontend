import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/user/Home";
import RoleRoute from "./RoleRoute";
import SellerDashboard from "../pages/seller/SellerDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ForgotPassword from "../pages/auth/ForgotPassword";
import LandingPage from "../pages/user/LandingPage";
import Profile from "../pages/user/Profile";
import useAuth from "../hooks/useAuth";
import AddProduct from "../pages/seller/AddProduct";
import MyProduct from "../pages/seller/MyProduct";

const AppRoutes = () => {
  const { user } = useAuth();
  // console.log("this is app route user ", user);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      <Route
        path="/seller"
        element={
          <PrivateRoute>
            <RoleRoute role="seller">
              <SellerDashboard />
            </RoleRoute>
          </PrivateRoute>
        }
      />

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
          user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/" />
        }
      />
      <Route
        path="/seller"
        element={
            user?.role === "seller" ? <SellerDashboard /> : <Navigate to="/"/>
        }
        />
        <Route path="/add-product" element={<AddProduct/>}/>
        <Route path="/my-product" element={<MyProduct/>}/>
    </Routes>
  );
};

export default AppRoutes;
