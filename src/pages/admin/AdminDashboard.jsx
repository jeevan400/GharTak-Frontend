import React, { useEffect, useState } from "react";
import {
  approveSellerRequest,
  getProfile,
  getSellerRequest,
  rejectSellerRequest,
} from "../../services/auth.service";
import {
  Archive,
  Bell,
  BookDashedIcon,
  ChartNoAxesColumn,
  Group,
  LayoutDashboard,
  MessageSquareText,
  Search,
  ShoppingCart,
  Menu,
  User2,
  UserPlus,
  UserPlus2,
  Users,
  X,
} from "lucide-react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import GharTakLogoImage from "../../assets/GharTak.png";

function AdminDashboard() {
  const [requests, setRequests] = useState([]);

  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userPorfile, setUserProfile] = useState();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const data = await getSellerRequest();
      const data2 = await getProfile();
      setRequests(data);
      setUserProfile(data2);
    } catch (e) {
      console.log(e.response?.data?.message || e.message);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveSellerRequest(id);
      fetchRequests();
    } catch (e) {
      console.log(e);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectSellerRequest(id);
      fetchRequests();
    } catch (e) {
      console.log(e);
    }
  };

  const adminDashboardSidebar = [
    {
      id: 1,
      icon: <LayoutDashboard size={20} />,
      text: "Dashboard",
      href: "/admin/dashboard",
    },
    {
      id: 2,
      icon: <UserPlus size={20} />,
      text: "Seller Requests",
      href: "/admin/seller-requests",
    },
    {
      id: 3,
      icon: <Users size={20} />,
      text: "Users",
      href: "/admin/users",
    },
    {
      id: 4,
      icon: <Archive size={20} />,
      text: "Products",
      href: "/admin/products",
    },
    {
      id: 5,
      icon: <ShoppingCart size={20} />,
      text: "Orders",
      href: "/admin/orders",
    },
    {
      id: 6,
      icon: <ChartNoAxesColumn size={20} />,
      text: "Analytics",
      href: "/admin/analytics",
    },
  ];

  return (
    <div className="flex h-screen bg-[var(--bg-main)] font-sans overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-[260px] bg-white border-r border-[var(--border-light)] transform transition-transform duration-300 ease-in-out flex flex-col ${
          sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-[80px] flex justify-between items-center px-6 border-b border-[var(--border-light)] shrink-0">
          <div 
            onClick={() => {
              navigate("/home");
              setSidebarOpen(false);
            }}
            className="cursor-pointer"
          >
            <img className="h-[45px] object-contain" src={GharTakLogoImage} alt="logo" />
          </div>
          <button 
            className="lg:hidden p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
          {adminDashboardSidebar?.map((tab) => (
            <NavLink
              key={tab.id}
              to={tab.href}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-[14px] transition-all duration-200 ${
                  isActive
                    ? "bg-[var(--primary)] text-white shadow-[0_4px_15px_rgba(249,115,22,0.35)]"
                    : "text-[var(--text-secondary)] hover:bg-orange-50 hover:text-[var(--primary)]"
                }`
              }
            >
              {tab.icon}
              {tab.text}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Header */}
        <header className="h-[80px] bg-white border-b border-[var(--border-light)] flex items-center justify-between px-4 sm:px-8 shrink-0 z-30">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="lg:hidden p-2 rounded-full border border-[var(--border-medium)] text-[var(--primary)] hover:bg-orange-50 transition-colors shadow-sm"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            
            {/* Search Bar */}
            <div className="hidden sm:flex items-center bg-gray-50 px-5 py-2.5 rounded-full border border-[var(--border-light)] focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-orange-100 transition-all w-[250px] lg:w-[400px]">
              <Search size={18} className="text-gray-400 mr-2" />
              <input
                className="bg-transparent w-full text-[14px] font-bold text-[var(--text-primary)] outline-none placeholder:font-semibold placeholder:text-gray-400"
                type="text"
                placeholder="Search anything..."
              />
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2 sm:gap-3 text-gray-400">
              <button className="p-2 hover:text-[var(--primary)] hover:bg-orange-50 rounded-full transition-colors relative">
                <Bell size={22} />
                {requests?.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                )}
              </button>
              <button className="p-2 hover:text-[var(--primary)] hover:bg-orange-50 rounded-full transition-colors hidden sm:block">
                <MessageSquareText size={22} />
              </button>
            </div>

            <div className="h-8 w-[1px] bg-[var(--border-medium)] hidden sm:block"></div>

            <div
              onClick={() => navigate("/profile")}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="hidden sm:flex flex-col items-end">
                <h1 className="text-[14px] font-extrabold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
                  {userPorfile?.name || "Admin"}
                </h1>
                <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">
                  Administrator
                </p>
              </div>
              <img
                className="h-[42px] w-[42px] rounded-full object-cover border-2 border-[var(--border-medium)] group-hover:border-[var(--primary)] transition-colors shadow-sm"
                src={userPorfile?.image || "https://ui-avatars.com/api/?name=Admin"}
                alt="Admin Profile"
              />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[var(--bg-main)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
