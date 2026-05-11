import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';

function SellerDashboard() {
  const navigate = useNavigate();
  const {user} = useAuth();

  const sellerDashboardSidebar = [
    {
      id:1,
      text:"Dashboard",
      icon:"",
      href:"/dashboard"
    },
    {
      id:2,
      text:"Add Product",
      icon:"",
      href:"/add-product"
    },
    {
      id:3,
      text:"My Products",
      icon:"",
      href:"/my-product"
    },
    {
      id:4,
      text:"Orders",
      icon:"",
      href:"/orders"
    },
    {
      id:5,
      text:"Customers",
      icon:"",
      href:"/customers"
    },
    {
      id:6,
      text:"Earnings",
      icon:"",
      href:"/earnings",
    },
    {
      id:7,
      text:"Analytics",
      icon:"",
      href:"/analytics",
    },
    {
      id:8,
      text:"Profile",
      icon:"",
      href:"/profile"
    },
  ]
  return (
    <div className=' h-screen w-[100%] flex'>
      <div className='h-full w-[270px] bg-gray-800 text-white'>
        <div className='mb-6 p-4'>
          <h1 className='text-3xl font-bold text-red-100'>GharTak</h1>
        <p className='text-md font-semibold'>SELLER PROFILE</p>
        </div>
        <div>
          {
            sellerDashboardSidebar?.map((tab)=>(
              <Link key={tab.id} to={tab.href}>
              <div className='p-4 mb-2 cursor-pointer text-lg font-semibold text-red-50 hover:bg-orange-600/10 border-l-4 border-gray-900 hover:border-orange-600 transition-all duration-100 ease-in'>
                {tab.text}
              </div>
              </Link>
            ))
          }
        </div>

      </div>
      <div className='flex-1 '>
        <nav className='flex bg-red-50 h-[60px] items-center '>
          <div className='flex-1 flex items-center  px-4 justify-between'>
            <input className='h-[30px] rounded-full px-4' type="text" placeholder='Search orders, products...' />
            <div className='flex gap-4'>
              <span>one</span>
              <span>two</span>
            </div>
          </div>
          <div className='px-4 flex'>
            <div className='h-[40px] w-[40px] rounded-full border-2 border-black mr-2'>
              <img className='rounded-full' src={user.image} alt="" />
            </div>
            <div>
              <h1 className='text-md font-bold'>Rajkumar</h1>
            <p className='text-[10px] font-semibold  '>PREMIUM SELLER</p>
            </div>
          </div>
        </nav>
        <button className='mt-6 ml-6 py-2 px-4 bg-orange-400 text-white font-bold rounded-full' onClick={()=> navigate("/add-product")}>Add Product</button>
      </div>
    </div>
  )
}

export default SellerDashboard
