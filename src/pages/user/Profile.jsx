import React from "react";
import { useEffect } from "react";
import { getProfile, requestSellerRole } from "../../services/auth.service";
import { useState } from "react";
import boy from "../../assets/boy.jpg";
import totalIcon from "../../assets/profileIcon/Icon.png";
import {
  Mail,
  BookMarked,
  User,
  Heart,
  MapPin,
  ChevronDown,
} from "lucide-react";
import ProfileModal from "./ProfileModal";
import Navbar from "../../components/layout/Navbar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Profile() {
  const [user, setUser] = useState({});
  const [modal, setModal] = useState(false);
  const [address, setAddress] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        // setUser(data);
        // console.log(data);
        setUser(data);
      } catch (e) {
        console.log(e);
        toast.error(e.response.data.message);
      }
    };
    fetchProfile();
  }, []);

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  const handleModalOpen = () => {
    setModal(true);
  };

  const handleSellerRequest = async () => {
    try {
      const res = await requestSellerRole();
      toast.success(res.message);
    } catch (e) {
      toast.error(e.message.data.message);
      console.log(e.response.data.message);
    }
  };
  return (
    <div className="h-screen w-[100%]">
      <Navbar />
      <main className="py-6 px-8 flex gap-4 bg-gray-200">
        <div className="!w-[300px] bg-blue-50 rounded-lg h-fit p-4">
          <h1 className="text-xl font-bold">Account Settings</h1>
          <p className="text-[13px] font-semibold text-gray-500 mb-4 -mt-1">
            Manage your preferences
          </p>
          <div className="flex flex-col gap-0.5">
            <button onClick={()=> navigate("/profile")} className="hover:bg-orange-400 text-left px-2 py-2 rounded-lg transition-all duration-300 ease-in flex items-center hover:text-white">
              <BookMarked size={14} color="brown" /> &nbsp;Profile
            </button>
            <button onClick={()=> navigate("/my-order")} className="hover:bg-orange-400 text-left px-2 py-2 rounded-lg transition-all duration-300 ease-in flex items-center hover:text-white">
              <User size={14} color="brown" /> &nbsp;Order
            </button>
            <button className="hover:bg-orange-400 text-left px-2 py-2 rounded-lg transition-all duration-300 ease-in flex items-center hover:text-white">
              <Heart size={14} color="brown" /> &nbsp;Wishist
            </button>
            <button className="hover:bg-orange-400 text-left px-2 py-2 rounded-lg transition-all duration-300 ease-in flex items-center hover:text-white">
              <MapPin size={14} color="brown" /> &nbsp;Addresses
            </button>
          </div>
        </div>
        <div className="flex flex-col h-screen w-full rounded-lg">
          <div className="w-full bg-white p-4 flex justify-between items-center gap-4 rounded-lg">
            <div className="flex gap-4 items-center">
              <div className="h-[80px] w-[80px]">
                <img
                  className="h-full w-full rounded-full"
                  src={user.image}
                  alt="boy image"
                />
              </div>
              <div className="">
                <h1 className="text-3xl font-bold flex">
                  {user.name} &nbsp;
                  <span className="text-green-700 bg-green-100 text-[14px] font-medium px-4 rounded-md cursor-pointer flex w-fit items-center gap-1">
                    {user.role}
                  </span>
                </h1>
                <p className="text-sm font-light mt-1 flex gap-1 items-center">
                  <Mail size={14} color="brown" />
                  {user.email}
                </p>
              </div>
            </div>
            <div>
              <button
                onClick={handleModalOpen}
                className="bg-yellow-700 mr-2 text-white text-[13px] font-medium py-1 px-4 rounded-md"
              >
                Edit Profile
              </button>
              {user?.role === "user" && (
                <button
                  onClick={handleSellerRequest}
                  className="bg-yellow-700 text-white text-[13px] font-medium py-1 px-4 rounded-md"
                >
                  Become Seller
                </button>
              )}
            </div>
            {modal ? <ProfileModal onClose={setModal} /> : ""}
          </div>
          <div className="flex gap-4 pt-4">
            <div className="flex-1 bg-[#FB923C1d] rounded-lg border border-orange-300 p-2">
              <h3 className="flex justify-between items-center">
                <span className="text-sm font-bold text-amber-800">
                  TOTAL ORDERS
                </span>
                <img className="h-4" src={totalIcon} alt="total icon" />
              </h3>
              <h1 className="text-3xl font-bold text-amber-900 mt-4">24</h1>
              <p className="text-xs font-medium text-amber-800">
                +2 since last month
              </p>
            </div>
            <div className="flex-1 bg-blue-200 rounded-lg border border-blue-300 p-2">
              <h3 className="flex justify-between items-center">
                <span className="text-sm font-bold text-gray-700">
                  ACTIVE COUPONS
                </span>
                <img className="h-4" src={totalIcon} alt="total icon" />
              </h3>
              <h1 className="text-3xl font-bold text-gray-900 mt-4">03</h1>
              <p className="text-xs font-medium text-gray-700">
                Expiring soon: 1
              </p>
            </div>
            <div className="flex-1 bg-gray-900 rounded-lg border border-orange-300 p-2">
              <h3 className="flex justify-between items-center">
                <span className="text-sm font-bold text-orange-300">
                  REWARD POINTS
                </span>
                <img className="h-4" src={totalIcon} alt="total icon" />
              </h3>
              <h1 className="text-3xl font-bold text-orange-200 mt-4">1240</h1>
              <p className="text-xs font-medium text-orange-300">
                Worth $12.40
              </p>
            </div>
          </div>
          <div className="flex-1 flex gap-4 pt-4">
            <div className="flex-1 bg-white h-fit rounded-lg p-4 flex flex-col gap-4">
              <div className="flex justify-between items-center ">
                <h1 className="text-lg font-bold">Personal Information</h1>
                <span className="text-sm text-orange-800 font-medium">
                  Change
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-2" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    className="bg-gray-100 rounded-sm h-[40px] px-4"
                    type="text"
                    value={user?.email || ""}
                    readOnly
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-2" htmlFor="email">
                    Phone Number
                  </label>
                  <input
                    className="bg-gray-100 rounded-sm h-[40px] px-4"
                    type="text"
                    value={user?.phone || ""}
                    readOnly
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-2" htmlFor="email">
                    Saved Address
                  </label>
                  <input
                    className="bg-gray-100 rounded-sm h-[40px] px-4"
                    type="text"
                    value={user?.address?.city || ""}
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* recent Orders */}
              <div className="flex-1 bg-white h-fit rounded-lg p-4 flex flex-col gap-4">
              <div className="flex justify-between items-center ">
                <h1 className="text-lg font-bold">Recent Orders</h1>
                <span className="text-sm text-orange-800 font-medium">
                  ViewAll
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <div className="h-[70px] w-[70px]">
                      <img className="w-full h-full rounded-lg" src={boy} alt="" />
                    </div>
                    <div className="flex flex-col justify-start items-start">
                      <h4 className="text-lg font-semibold">SpeedRunner Pro X</h4>
                      <p className="text-sm font-medium text-gray-600">Order #98231.Oct 12</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-start items-center">
                    <h1 className="text-amber-900 font-bold text-lg mb-2">$129.99</h1>
                    <span className="px-4 py-0.5 rounded-md text-xs font-medium bg-green-100 text-green-700
                    border border-green-700 ">DELIVERED</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <div className="h-[70px] w-[70px]">
                      <img className="w-full h-full rounded-lg" src={boy} alt="" />
                    </div>
                    <div className="flex flex-col justify-start items-start">
                      <h4 className="text-lg font-semibold">SpeedRunner Pro X</h4>
                      <p className="text-sm font-medium text-gray-600">Order #98231.Oct 12</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-start items-center">
                    <h1 className="text-amber-900 font-bold text-lg mb-2">$129.99</h1>
                    <span className="px-4 py-0.5 rounded-md text-xs font-medium bg-green-100 text-green-700
                    border border-green-700 ">DELIVERED</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <div className="h-[70px] w-[70px]">
                      <img className="w-full h-full rounded-lg" src={boy} alt="" />
                    </div>
                    <div className="flex flex-col justify-start items-start">
                      <h4 className="text-lg font-semibold">SpeedRunner Pro X</h4>
                      <p className="text-sm font-medium text-gray-600">Order #98231.Oct 12</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-start items-center">
                    <h1 className="text-amber-900 font-bold text-lg mb-2">$129.99</h1>
                    <span className="px-4 py-0.5 rounded-md text-xs font-medium bg-green-100 text-green-700
                    border border-green-700 ">DELIVERED</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
