import { Route, Routes } from "react-router-dom"
import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import PrivateRoute from "./PrivateRoute"
import Home from "../pages/user/Home"
import RoleRoute from "./RoleRoute"
import SellerDashboard from "../pages/seller/SellerDashboard"
import AdminDashboard from "../pages/admin/AdminDashboard"
import ForgotPassword from "../pages/auth/ForgotPassword"
import LandingPage from "../pages/user/LandingPage"



const AppRoutes = ()=>{
    return(
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<LandingPage/>}/>
            <Route 
            path="/home" 
            element={
            <PrivateRoute>
                <Home />
            </PrivateRoute>
            } />

            <Route 
            path="/seller" 
            element={
            <PrivateRoute>
                <RoleRoute role="seller">
                    <SellerDashboard/>
                </RoleRoute>
            </PrivateRoute>
            } />

            <Route 
            path="/admin" 
            element={
            <PrivateRoute>
                <RoleRoute role="admin">
                    <AdminDashboard/>
                </RoleRoute>
            </PrivateRoute>
            } />

            <Route path="/forgot-password" element={<ForgotPassword/>}/>

        </Routes>
    )
}

export default AppRoutes;