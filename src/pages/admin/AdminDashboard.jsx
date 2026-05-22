import React, { useEffect, useState } from 'react'
import { approveSellerRequest, getProfile, getSellerRequest, rejectSellerRequest } from '../../services/auth.service';
import { Archive, Bell, BookDashedIcon, ChartNoAxesColumn, Group, LayoutDashboard, MessageSquareText, ShoppingCart, User2, UserPlus, UserPlus2, Users } from 'lucide-react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [requests, setRequests] = useState([]);

  const navigate = useNavigate();

  const [userPorfile, setUserProfile] = useState();

  useEffect(()=>{
    fetchRequests();
  },[]);

  const fetchRequests = async ()=>{
    try{
      const data = await getSellerRequest();
      const data2 = await getProfile();
      setRequests(data);
      setUserProfile(data2);
      // console.log(data2, "this is data 2 and user profile");
    } catch(e){
      console.log(e.response.data.message);
    }
  }

  const handleApprove = async (id) => {
    try{
      await approveSellerRequest(id);

      fetchRequests();
    } catch(e){
      console.log(e);
    }
  }

  const handleReject = async (id) => {
    try{
      await rejectSellerRequest(id);

      fetchRequests();
    } catch(e){
      console.log(e);
    }
  }

  const adminDashboardSidebar = [
    {
      id:1,
      icon:<LayoutDashboard size={18}/>,
      text:'Dashboard',
      href:"/admin/dashboard"
    },
    {
      id:2,
      icon:<UserPlus size={18}/>,
      text:'Seller Requests',
      href:"/admin/seller-requests"
    },
    {
      id:3,
      icon:<Users size={18}/>,
      text:'Users',
      href:"/admin/users"
    },
    {
      id:4,
      icon:<Archive size={18}/>,
      text:'Products',
      href:"/admin/products"
    },
    {
      id:5,
      icon:<ShoppingCart size={18}/>,
      text:'Orders',
      href:"/admin/orders"
    },
    {
      id:6,
      icon:<ChartNoAxesColumn size={18}/>,
      text:'Analytics',
      href:"/admin/analytics"
    },
  ]
  return <>
    <div className=' h-screen w-[100%] flex'>
      <div className='h-full w-[270px] bg-red-900/25 text-red-900'>
        <div onClick={()=> navigate("/home")} className='mb-6 p-4 cursor-pointer'>
          <h1 className='text-3xl font-bold text-red-900'>GharTak</h1>
        <p className='text-md font-semibold'>ADMIN CONSOLE</p>
        </div>
        <div>
          {
            adminDashboardSidebar?.map((tab)=>(
              <Link key={tab.id} to={tab.href}>
              <div className='p-4 mb-2 cursor-pointer text-lg font-semibold text-red-900 hover:bg-red-900/10 border-l-4 border-red-900/5 hover:border-red-900 transition-all duration-100 ease-in flex gap-2 justify-start items-center'>
                {tab.icon}{tab.text}
              </div>
              </Link>
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
          <div onClick={()=> navigate("/profile")} className='px-4 flex cursor-pointer'>
            <div className='h-[40px] w-[40px] rounded-full border-2 border-black mr-2'>
              <img className='rounded-full' src={userPorfile?.image} alt="" />
            </div>
            <div>
              <h1 className='text-md font-bold'>{userPorfile?.name}</h1>
            <p className='text-[10px] font-semibold  '>ADMINISTRATOR</p>
            </div>
          </div>
        </nav>
        <Outlet/>
        {/* <button className='mt-6 ml-6 py-2 px-4 bg-orange-400 text-white font-bold rounded-full' onClick={()=> navigate("/add-product")}>Add Product</button> */}
      </div>
    </div>
  </>
}

export default AdminDashboard
