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
  User2,
  UserPlus,
  UserPlus2,
  Users,
} from "lucide-react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import GharTakLogoImage from "../../assets/GharTak.png";

function AdminDashboard() {
  const [requests, setRequests] = useState([]);

  const navigate = useNavigate();

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
      // console.log(data2, "this is data 2 and user profile");
    } catch (e) {
      console.log(e.response.data.message);
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
      icon: <LayoutDashboard size={18} />,
      text: "Dashboard",
      href: "/admin/dashboard",
    },
    {
      id: 2,
      icon: <UserPlus size={18} />,
      text: "Seller Requests",
      href: "/admin/seller-requests",
    },
    {
      id: 3,
      icon: <Users size={18} />,
      text: "Users",
      href: "/admin/users",
    },
    {
      id: 4,
      icon: <Archive size={18} />,
      text: "Products",
      href: "/admin/products",
    },
    {
      id: 5,
      icon: <ShoppingCart size={18} />,
      text: "Orders",
      href: "/admin/orders",
    },
    {
      id: 6,
      icon: <ChartNoAxesColumn size={18} />,
      text: "Analytics",
      href: "/admin/analytics",
    },
  ];

  const activeClass =
    "text-white bg-[var(--primary)] border-l-4 border-[var(--primary)]";
  const notmalClass =
    "text-[var(--primary)] hover:bg-[var(--primary-light)] border-l-4 border-red-900/5 hover:border-[var(--primary)]";
  return (
    <div className="bg-[var(--primary-light)] h-screen w-[100%] grid grid-cols-12 grid-rows-12">
      <div className="col-span-2 row-span-12 overflow-y-auto bg-white">
        <div
          onClick={() => navigate("/home")}
          className="mb-2 flex justify-center items-cneter cursor-pointer text-white "
        >
          <img className="h-[80px]" src={GharTakLogoImage} alt="logo image" />
          {/* <h1 className="text-3xl font-bold text-white">GharTak</h1> */}
          {/* <p className="text-[var(--text-primary)] text-md font-semibold flex justify-center items-center">ADMIN CONSOLE</p> */}
        </div>
        <div>
          {/* className={({ isActive }) =>
    isActive
      ? "bg-indigo-600 text-white px-4 py-2 rounded"
      : "text-gray-700 px-4 py-2"
  } */}
          {adminDashboardSidebar?.map((tab) => (
            <NavLink
              key={tab.id}
              to={tab.href}
              className={({ isActive }) =>
                `${isActive ? activeClass : notmalClass} p-4 mb-2 cursor-pointer text-[14px] font-semibold transition-all duration-100 ease-in flex gap-2 justify-start items-center`
              }
            >
              {tab.icon}
              {tab.text}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="col-span-10 sticky top-0 flex bg-white shadow-sm items-center z-50">
        <div className="flex-1 flex items-center  px-4 justify-between">
          <div className="flex justify-center items-center bg-white px-4 rounded-full border border-[var(--primary)]">
            <Search size={18} color="gray" />
            <input
              className=" rounded-full text-[16px] font-normal py-1 focus:ring-0 outline-none"
              type="text"
              name="search"
              id="search"
              placeholder={`Search . . .`}
            />
            {/* <button className='h-fit w-fit bg-red-900 text-white justify-center items-center  p-2 rounded-full'><Search/></button> */}
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
            <img className="h-full w-full rounded-full" src={userPorfile?.image} alt="" />
          </div>
          <div>
            <h1 className="text-md font-bold">{userPorfile?.name}</h1>
            <p className="text-[10px] font-semibold  ">ADMINISTRATOR</p>
          </div>
        </div>
      </div>
      <div className="col-span-10 row-span-11 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboard;
