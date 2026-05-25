import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SellerDashboard from './SellerDashboard'
import Dashboard from './sellerSteps/Dashboard'
import AddProduct from './sellerSteps/AddProduct'
import Analytics from './sellerSteps/Analytics'
import Customers from './sellerSteps/Customers'
import Earnings from './sellerSteps/Earnings'
import MyProduct from './sellerSteps/MyProduct'
import Orders from './sellerSteps/Orders'
import SellerOrders from './sellerSteps/SellerOrders'
import Profile from '../user/Profile'

function SellerRoutes() {
  return (
    <Routes>
        <Route path='/seller' element={<SellerDashboard/>}>
            <Route path='seller-dashboard' element={<Dashboard/>}/>
            <Route path='add-product' element={<AddProduct/>}/>
            <Route path='seller-analytics' element={<Analytics/>}/>
            <Route path='customers' element={<Customers/>}/>
            <Route path='earnings' element={<Earnings/>}/>
            <Route path='my-products' element={<MyProduct/>}/>
            <Route path='orders' element={<Orders/>}/>
            <Route path='seller-orders' element={<SellerOrders/>}/>
            {/* <Route path='/profile' element={<Profile/>}/> */}
        </Route>
    </Routes>
  )
}

export default SellerRoutes
