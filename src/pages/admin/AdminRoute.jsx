import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from './AdminDashboard'
import DashBoard from './steps/DashBoard'
import SellerRequest from './steps/SellerRequest'
import Users from './steps/Users'
import Products from './steps/Products'
import Orders from './steps/Orders'
import Analytics from './steps/Analytics'

function AdminRoute() {
  return (
        <Routes>
            <Route path='/admin' element={<AdminDashboard/>}>
                <Route path="dashboard" element={<DashBoard/>}/>
                <Route path="seller-requests" element={<SellerRequest/>}/>
                <Route path="users" element={<Users/>}/>
                <Route path="products" element={<Products/>}/>
                <Route path="orders" element={<Orders/>}/>
                <Route path="analytics" element={<Analytics/>}/>
            </Route>
        </Routes>
  )
}

export default AdminRoute;
