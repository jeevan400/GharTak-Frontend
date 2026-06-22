import React, { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';
import { Bell, MessageSquareText, Archive, Plus, ListOrdered, Dessert, HandCoins, UserPlus, LayoutDashboard, ShoppingBasket, ShoppingBag, ChartNoAxesColumn, Search, Menu   } from 'lucide-react';
import { getProfile } from '../../services/auth.service';
import GharTakLogoImage from "../../assets/GharTak.png";

function SellerDashboard() {
  const navigate = useNavigate();
  const {user} = useAuth();
  const [userProfile, setUserProfile] = useState();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      icon:<LayoutDashboard size={18} />,
      href:"/seller/seller-dashboard"
    },
    {
      id:2,
      text:"Add Product",
      icon:<Plus size={18}/>,
      href:"/seller/add-product"
    },
    {
      id:3,
      text:"My Products",
      icon:<ShoppingBag size={18} />,
      href:"/seller/my-products"
    },
    {
      id:4,
      text:"Orders",
      icon:<ListOrdered size={18}/>,
      href:"/seller/orders"
    },
    {
      id:5,
      text:"Customers",
      icon:<Dessert size={18}/>,
      href:"/seller/customers"
    },
    {
      id:6,
      text:"Earnings",
      icon:<HandCoins size={18} />,
      href:"/seller/earnings",
    },
    {
      id:7,
      text:"Analytics",
      icon:<ChartNoAxesColumn size={18}/>,
      href:"/seller/seller-analytics",
    },
    {
      id:8,
      text:"Profile",
      icon:<UserPlus size={18}/>,
      href:"/profile"
    },
    {
      id:9,
      text:"Customer Orders",
      icon:<ShoppingBasket size={18}/>,
      href:"/seller/seller-orders"
    }
  ];

  const activeClass =
    "text-white bg-[var(--primary)] border-b border-[var(--primary)]";
  const normalClass =
    "text-[var(--primary)] hover:bg-[var(--primary-light)] border-b hover:border-[var(--primary)]";
  return (
    <>
    <div
    className='bg-[var(--primary-light)] h-screen w-[100%] grid grid-cols-10 grid-rows-9'
    >
      <div className={`col-span-10 lg:col-span-2 row-span-9 overflow-y-auto bg-white lg:block ${sidebarOpen ? "block" : "hidden"} lg:static fixed inset-y-0 left-0 z-50 w-full max-w-[280px] lg:w-auto lg:shadow-none shadow-xl`}>
        <div
                  onClick={() => {
                    navigate("/home");
                    setSidebarOpen(false);
                  }}
                  className="mb-2 flex justify-center items-center cursor-pointer bg-white sticky top-0 z-50"
                >
                  <img className="h-[80px]" src={GharTakLogoImage} alt="logo image" />
                </div>
                <div>
                  {sellerDashboardSidebar?.map((tab) => (
                    <NavLink
                      key={tab.id}
                      to={tab.href}
                      onClick={() => setSidebarOpen(false)}
                      className={({ isActive }) =>
                        `${isActive ? activeClass : normalClass} p-4 mb-2 cursor-pointer text-[14px] font-semibold transition-all duration-100 ease-in flex gap-2 justify-start items-center`
                      }
                    >
                      {tab.icon}
                      {tab.text}
                    </NavLink>
                  ))}
                </div>
      </div>
      <div className='className="col-span-10 lg:col-span-8 sticky top-0 flex bg-white shadow-sm items-center z-50"'>
                  <div className="flex-1 flex items-center px-4 justify-between gap-3">
          <button
            type="button"
            className="lg:hidden p-2 rounded-full border border-[var(--primary)] text-[var(--primary)]"
            onClick={() => setSidebarOpen((prev) => !prev)}
          >
            <Menu size={20} />
          </button>
          <div className="flex-1 flex justify-center items-center bg-white px-4 rounded-full border border-[var(--primary)]">
            <Search size={18} color="gray" />
            <input
              className=" rounded-full text-[16px] font-normal py-1 focus:ring-0 outline-none"
              type="text"
              name="search"
              id="search"
              placeholder={`Search . . .`}
            />
          </div>
          <div className="flex gap-4">
            <span>
              <Bell />
            </span>
            <span>
              <MessageSquareText />
            </span>
          </div>
        </div>
        <div
          onClick={() => navigate("/profile")}
          className="px-4 flex cursor-pointer"
        >
          <div className="h-[40px] w-[40px] rounded-full border border-black mr-2">
            <img
              className="h-full w-full rounded-full"
              src={userProfile?.image}
              alt=""
            />
          </div>
          <div>
            <h1 className="text-md font-bold">{userProfile?.name}</h1>
            <p className="text-[10px] font-semibold  ">SELLER</p>
          </div>
        </div>
      </div>
      <div className="col-span-10 lg:col-span-8 row-span-8 overflow-y-auto">
                  <Outlet/>
      </div>
    </div>
  </>
  )
}

export default SellerDashboard
