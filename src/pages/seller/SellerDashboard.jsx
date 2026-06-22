import React, { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';
import { Bell, MessageSquareText, Archive   } from 'lucide-react';
import { getProfile } from '../../services/auth.service';

function SellerDashboard() {
  const navigate = useNavigate();
  const {user} = useAuth();
  const [userProfile, setUserProfile] = useState();

  const fetectProfile = async () => {
    try{
      const res = await getProfile();
      setUserProfile(res);

    } catch(e){
      console.log(e.response.data.message);
    }
  }

  useEffect(()=>{
    fetectProfile();
  },[]);

  const sellerDashboardSidebar = [
    {
      id:1,
      text:"Dashboard",
      icon:"",
      href:"/seller/seller-dashboard"
    },
    {
      id:2,
      text:"Add Product",
      icon:"",
      href:"/seller/add-product"
    },
    {
      id:3,
      text:"My Products",
      icon:"",
      href:"/seller/my-products"
    },
    {
      id:4,
      text:"Orders",
      icon:"",
      href:"/seller/orders"
    },
    {
      id:5,
      text:"Customers",
      icon:"",
      href:"/seller/customers"
    },
    {
      id:6,
      text:"Earnings",
      icon:"",
      href:"/seller/earnings",
    },
    {
      id:7,
      text:"Analytics",
      icon:"",
      href:"/seller/seller-analytics",
    },
    {
      id:8,
      text:"Profile",
      icon:"",
      href:"/profile"
    },
    {
      id:9,
      text:"Seller Orders",
      icon:"",
      href:"/seller/seller-orders"
    }
  ];

  const activeClass = "text-white bg-red-900 border-l-4 border-red-900";
  const notmalClass = "text-red-900 hover:bg-red-900/10 border-l-4 border-red-900/5 hover:border-red-900";

  return (
    <div className=' h-screen w-[100%] flex'>
      <div className='h-full w-[270px] bg-red-900/25 text-red-900'>
        <div onClick={()=> navigate("/home")} className='mb-6 p-4 cursor-pointer text-white bg-red-900'>
          <h1 className='text-3xl font-bold text-white'>GharTak</h1>
        <p className='text-md font-semibold'>SELLER PROFILE</p>
        </div>
        <div>
          {
            sellerDashboardSidebar?.map((tab)=>(
              <NavLink key={tab.id} to={tab.href} className={({isActive})=>
              `${isActive?activeClass:notmalClass} p-4 mb-2 cursor-pointer text-lg font-semibold transition-all duration-100 ease-in flex gap-2 justify-start items-center`
              }>
                {tab.text}
              </NavLink>
            ))
          }
        </div>

      </div>
      <div className='flex-1 bg-red-900/10'>
        <nav className='sticky top-0 flex bg-red-50 h-[60px] border-b border-black/20 items-center '>
          <div className='flex-1 flex items-center  px-4 justify-between'>
            <input className='h-[30px] rounded-full px-4' type="text" placeholder='Search orders, products...' />
            <div className='flex gap-4'>
              <span><Bell/></span>
              <span><MessageSquareText/></span>
            </div>
          </div>
          <div className='px-4 flex'>
            <div className='h-[40px] w-[40px] rounded-full border-2 border-black mr-2'>
              <img className='rounded-full w-full h-full' src={userProfile?.image} alt="" />
            </div>
            <div>
              <h1 className='text-md font-bold'>{userProfile?.name}</h1>
            <p className='text-[10px] font-semibold  '>PREMIUM SELLER</p>
            </div>
          </div>
        </nav>
        <div className='h-full overflow-y-auto'>
          <Outlet />
          {/* <div className='p-4'>
            <h1 className='text-xl font-bold'>Dashboard Overview</h1>
            <p className='text-sm font-semibold text-gray-500'>Good morning, Rajesh. Here's what's happenig with your shop today.</p>
          </div>
          <div className='p-4 grid grid-cols-3 grid-rows-2 gap-4'>
            <div className='bg-white p-4 rounded-lg shadow-lg border border-gray-600/15 flex flex-col gap-4'>
              <div className='flex justify-between items-start'>
                <div className='bg-red-300/30 p-2 rounded-lg'><Archive size={18} /></div>
                <div className='text-[12px] text-green-600 font-bold'>+12%</div>
              </div>
              <div>
                <h1 className='text-sm font-medium text-gray-600'>TOTAL PRODUCTS</h1>
                <p className='text-md font-bold'>1,284</p>
              </div>
            </div>
            <div className='bg-white p-4 rounded-lg shadow-lg border border-gray-600/15 flex flex-col gap-4'>
              <div className='flex justify-between items-start'>
                <div className='bg-red-300/30 p-2 rounded-lg'><Archive size={18} /></div>
                <div className='text-[12px] text-green-600 font-bold'>+12%</div>
              </div>
              <div>
                <h1 className='text-sm font-medium text-gray-600'>TOTAL PRODUCTS</h1>
                <p className='text-md font-bold'>1,284</p>
              </div>
            </div>
            <div className='bg-white p-4 rounded-lg shadow-lg border border-gray-600/15 flex flex-col gap-4'>
              <div className='flex justify-between items-start'>
                <div className='bg-red-300/30 p-2 rounded-lg'><Archive size={18} /></div>
                <div className='text-[12px] text-green-600 font-bold'>+12%</div>
              </div>
              <div>
                <h1 className='text-sm font-medium text-gray-600'>TOTAL PRODUCTS</h1>
                <p className='text-md font-bold'>1,284</p>
              </div>
            </div>
            <div className='bg-white p-4 rounded-lg shadow-lg border border-gray-600/15 flex flex-col gap-4'>
              <div className='flex justify-between items-start'>
                <div className='bg-red-300/30 p-2 rounded-lg'><Archive size={18} /></div>
                <div className='text-[12px] text-green-600 font-bold'>+12%</div>
              </div>
              <div>
                <h1 className='text-sm font-medium text-gray-600'>TOTAL PRODUCTS</h1>
                <p className='text-md font-bold'>1,284</p>
              </div>
            </div>
            <div className='bg-white p-4 rounded-lg shadow-lg border border-gray-600/15 flex flex-col gap-4'>
              <div className='flex justify-between items-start'>
                <div className='bg-red-300/30 p-2 rounded-lg'><Archive size={18} /></div>
                <div className='text-[12px] text-green-600 font-bold'>+12%</div>
              </div>
              <div>
                <h1 className='text-sm font-medium text-gray-600'>TOTAL PRODUCTS</h1>
                <p className='text-md font-bold'>1,284</p>
              </div>
            </div>
            <div className='bg-white p-4 rounded-lg shadow-lg border border-gray-600/15 flex flex-col gap-4'>
              <div className='flex justify-between items-start'>
                <div className='bg-red-300/30 p-2 rounded-lg'><Archive size={18} /></div>
                <div className='text-[12px] text-green-600 font-bold'>+12%</div>
              </div>
              <div>
                <h1 className='text-sm font-medium text-gray-600'>TOTAL PRODUCTS</h1>
                <p className='text-md font-bold'>1,284</p>
              </div>
            </div>
          </div> */}
        </div>
        {/* <button className='mt-6 ml-6 py-2 px-4 bg-orange-400 text-white font-bold rounded-full' onClick={()=> navigate("/add-product")}>Add Product</button> */}
      </div>
    </div>
  )
}

export default SellerDashboard
