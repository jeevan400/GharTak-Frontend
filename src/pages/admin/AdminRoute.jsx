import React from 'react'
import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
const AdminDashboard = lazy(()=> import('./AdminDashboard') );
const DashBoard = lazy(()=> import('./steps/DashBoard') );
const SellerRequest = lazy(()=> import('./steps/SellerRequest') );
const Users = lazy(()=> import('./steps/Users') );
const Products = lazy(()=> import('./steps/Products') );
const Orders = lazy(()=> import('./steps/Orders') );
const Analytics = lazy(()=> import('./steps/Analytics') );

function AdminRoute() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
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
        </Suspense>
  )
}

export default AdminRoute;
