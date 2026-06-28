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
      <div className="flex h-screen bg-[var(--bg-main)] overflow-hidden font-sans">
        
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm transition-opacity"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-50 w-[260px] bg-white border-r border-[var(--border-light)] shadow-[var(--shadow-md)] lg:shadow-none flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          {/* Logo Area */}
          <div
            onClick={() => {
              navigate("/home");
              setSidebarOpen(false);
            }}
            className="h-[76px] flex justify-center items-center cursor-pointer border-b border-[var(--border-light)] shrink-0"
          >
            <img className="h-[60px] object-contain" src={GharTakLogoImage} alt="GharTak logo" />
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto py-5 flex flex-col gap-1.5 px-4 custom-scrollbar">
            {sellerDashboardSidebar?.map((tab) => (
              <NavLink
                key={tab.id}
                to={tab.href}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 ease-in-out ${
                    isActive 
                    ? "bg-[var(--primary)] text-white shadow-md shadow-orange-500/20" 
                    : "text-[var(--text-secondary)] hover:bg-orange-50 hover:text-[var(--primary)]"
                  }`
                }
              >
                {tab.icon}
                <span className="text-[14px] font-bold">{tab.text}</span>
              </NavLink>
            ))}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 bg-[var(--bg-main)]">
          
          {/* Header */}
          <header className="h-[76px] bg-white border-b border-[var(--border-light)] shadow-sm flex items-center justify-between px-4 lg:px-8 shrink-0 z-10">
            
            {/* Left Section: Mobile Menu Toggle & Search */}
            <div className="flex items-center gap-4 flex-1">
              <button
                type="button"
                className="lg:hidden p-2 rounded-xl border border-[var(--border-medium)] text-[var(--text-secondary)] hover:text-[var(--primary)] hover:border-[var(--primary)] hover:bg-orange-50 transition-colors"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={22} />
              </button>

              <div className="hidden sm:flex items-center bg-[var(--bg-main)] px-4 py-2.5 rounded-full border border-[var(--border-medium)] focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary-light)] transition-all max-w-md w-full shadow-sm">
                <Search size={18} className="text-gray-400 mr-2 shrink-0" />
                <input
                  className="bg-transparent border-none outline-none text-[14px] w-full placeholder-gray-500 text-[var(--text-primary)] font-medium"
                  type="text"
                  placeholder="Search your dashboard..."
                />
              </div>
            </div>

            {/* Right Section: Actions & Profile */}
            <div className="flex items-center gap-4 lg:gap-6 ml-4 shrink-0">
              <div className="flex items-center gap-1.5 sm:gap-3">
                <button className="p-2.5 rounded-full text-[var(--text-secondary)] hover:bg-orange-50 hover:text-[var(--primary)] transition-colors relative">
                  <Bell size={20} />
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>
                <button 
                  onClick={() => navigate('/chat')} // Assuming global chat navigation
                  className="p-2.5 rounded-full text-[var(--text-secondary)] hover:bg-orange-50 hover:text-[var(--primary)] transition-colors"
                >
                  <MessageSquareText size={20} />
                </button>
              </div>

              <div className="w-[1px] h-8 bg-[var(--border-light)] hidden sm:block"></div>

              <div
                onClick={() => navigate("/profile")}
                className="flex items-center gap-3 cursor-pointer hover:bg-orange-50 p-1.5 pr-3 md:pr-4 rounded-full transition-colors border border-transparent hover:border-[var(--border-medium)]"
              >
                <div className="h-[42px] w-[42px] rounded-full overflow-hidden shadow-sm border border-[var(--border-medium)] shrink-0">
                  <img
                    className="h-full w-full object-cover"
                    src={userProfile?.image || "https://ui-avatars.com/api/?name=Seller"}
                    alt="Seller Profile"
                  />
                </div>
                <div className="hidden md:block">
                  <h1 className="text-[14px] font-bold text-[var(--text-primary)] leading-tight capitalize">
                    {userProfile?.name || "Seller"}
                  </h1>
                  <p className="text-[11px] font-extrabold text-[var(--primary)] tracking-wide">
                    SELLER
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content / Outlet */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-8 bg-[var(--bg-main)]">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  )
}

export default SellerDashboard
