import React, { useRef } from "react";
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
  Camera,
  Pencil,
} from "lucide-react";
import ProfileModal from "./ProfileModal";
import Navbar from "../../components/layout/Navbar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { updateProfile } from "../../services/upload.service";
import { getMyOrder } from "../../services/order.service";

function Profile() {
  const [user, setUser] = useState({});
  const [modal, setModal] = useState(false);
  const [address, setAddress] = useState();
  const [image, setImage] = useState();
  const [lastOrder, setLastOrder] = useState({});

  const navigate = useNavigate();

  const fileInputRef = useRef();

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      const myOrder = await getMyOrder();
      setLastOrder(myOrder[0]);
      // setUser(data);
      // console.log(data);
      setUser(data);
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

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

  const handleUploadImage = async (e) => {
    let file = e.target.files[0];

    if (!file) return;

    try {
      const formData = new FormData();

      formData.append("image", file);

      const res = await updateProfile(formData);

      fetchProfile();

      toast.success(res.message);
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message || e.message || "Image not upload.");
    }
  };

  return (
    <div className="h-[80vh] w-[100%] grid grid-cols-12 grid-rows-12">
      <div className="col-span-3 row-span-12 p-4 sticky top-0">
        <div className="p-4 rounded-lg bg-[var(--primary-light)]">
          <h1 className="text-xl font-bold">Account Settings</h1>
          <p className="text-[13px] font-semibold text-gray-500 mb-4 -mt-1">
            Manage your preferences
          </p>
          <div className="flex flex-col gap-0.5">
            <button
              onClick={() => navigate("/profile")}
              className="hover:bg-orange-400 text-left px-2 py-2 rounded-lg transition-all duration-300 ease-in flex items-center hover:text-white"
            >
              <BookMarked size={14} color="brown" /> &nbsp;Profile
            </button>
            <button
              onClick={() => navigate("/my-order")}
              className="hover:bg-orange-400 text-left px-2 py-2 rounded-lg transition-all duration-300 ease-in flex items-center hover:text-white"
            >
              <User size={14} color="brown" /> &nbsp;Order
            </button>
            <button
              onClick={() => navigate("/wishlist")}
              className="hover:bg-orange-400 text-left px-2 py-2 rounded-lg transition-all duration-300 ease-in flex items-center hover:text-white"
            >
              <Heart size={14} color="brown" /> &nbsp;Wishlist
            </button>
            <button className="hover:bg-orange-400 text-left px-2 py-2 rounded-lg transition-all duration-300 ease-in flex items-center hover:text-white">
              <MapPin size={14} color="brown" /> &nbsp;Addresses
            </button>
          </div>
        </div>
      </div>
      <div className="p-4 col-span-9 row-span-12 overflow-y-auto">
        <div className="flex flex-col h-screen w-full rounded-lg">
          <div className="w-full bg-white p-4 flex justify-between items-center gap-4 rounded-lg">
            <div className="flex gap-4 items-center">
              <div className="h-[80px] w-[80px] relative">
                <img
                  className="h-full w-full rounded-full"
                  src={user.image}
                  alt="boy image"
                />
                <button
                  onClick={() => fileInputRef.current.click()}
                  type="button"
                  className="absolute bg-white p-2 rounded-full bottom-0 right-0"
                >
                  <Camera size={14} />
                </button>
                <input
                  className="hidden"
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={(e) => handleUploadImage(e)}
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
            <div className="h-full">
              <button
                onClick={handleModalOpen}
                className=" bg-[var(--primary-light)] hover:bg-[var(--primary)] border border-[var(--primary)] text-[var(--primary)] hover:text-white text-[13px] font-medium py-2 px-2 rounded-md transition-all duration-200 ease-in"
              >
                <Pencil size={18} />
              </button>
              {user?.role === "user" && (
                <button
                  onClick={handleSellerRequest}
                  className=" bg-[var(--primary-light)] hover:bg-[var(--primary)] border border-[var(--primary)] text-[var(--primary)] hover:text-white text-[13px] font-medium py-1 px-4 rounded-md transition-all duration-200 ease-in"
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
            <div className="flex-1 bg-white h-fit rounded-lg p-4 flex flex-col gap-4">
              <div className="flex justify-between items-center ">
                <h1 className="text-lg font-bold">Recent Orders</h1>
                <span className="text-sm text-orange-800 font-medium">
                  ViewAll
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {lastOrder?.items?.map((item) => (
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <div className="h-[70px] w-[70px]">
                        <img
                          className="w-full h-full rounded-lg"
                          src={item?.product?.image}
                          alt=""
                        />
                      </div>
                      <div className="flex flex-col justify-start items-start">
                        <h4 className="text-lg font-semibold whitespace-nowrap truncate">
                          {item?.product?.name}
                        </h4>
                        <p className="text-sm font-medium text-gray-600 ">
                          Qyt: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-start items-center">
                      <h1 className="text-amber-900 font-bold text-lg mb-2">
                        &#8377;{item?.product?.price}
                      </h1>
                      <span
                        className={`border w-fit px-4 py-0.5 rounded-md text-[12px] font-medium mt-1
                      ${lastOrder.paymentStatus === "Paid" && "text-green-500  border-green-500  bg-green-50 "}
                      ${lastOrder.paymentStatus === "Pending" && "text-orange-500  border-orange-500  bg-orange-50 "}
                      `}
                      >
                        {lastOrder.paymentStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
