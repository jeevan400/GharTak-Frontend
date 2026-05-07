import React from "react";
import { useEffect } from "react";
import { getProfile } from "../../services/auth.service";
import { useState } from "react";
import boy from "../../assets/boy.jpg";
import totalIcon from "../../assets/profileIcon/Icon.png"
import {
  Mail,
  BookMarked,
  User,
  Heart,
  MapPin,
  ChevronDown,
} from "lucide-react";
import Modal from "../../components/common/Modal";

function Profile() {
  const [user, setUser] = useState({});
  const [modal, setModal] = useState(false);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        // setUser(data);
        // console.log(data);
        setUser(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleNodalOpen = () => {
    setModal(true);
  };
  return (
    <div className="h-screen w-[100%]">
      <nav class="flex items-center justify-between px-8 py-3 border-b border-gray-800">
        <h1 class="text-3xl font-bold text-orange-500">GharTak</h1>
        <ul class="hidden md:flex gap-8 text-gray-300 font-medium">
          <li>
            <a href="#" class="hover:text-orange-400">
              Home
            </a>
          </li>
          <li>
            <a href="#" class="hover:text-orange-400">
              Products
            </a>
          </li>
          <li>
            <a href="#" class="hover:text-orange-400">
              Categories
            </a>
          </li>
          <li>
            <a href="#" class="hover:text-orange-400">
              Contact
            </a>
          </li>
        </ul>
        <div class="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            class="px-5 py-2 border border-orange-500 rounded-lg hover:bg-orange-500 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            class="px-5 py-2 bg-orange-500 rounded-lg hover:bg-orange-600 transition"
          >
            Signup
          </button>
        </div>
      </nav>
      <main className="py-6 px-8 flex gap-4 bg-gray-200">
        <div className="!w-[300px] bg-blue-50 rounded-lg h-fit p-4">
          <h1 className="text-xl font-bold">Account Settings</h1>
          <p className="text-[13px] font-semibold text-gray-500 mb-4 -mt-1">
            Manage your preferences
          </p>
          <div className="flex flex-col gap-0.5">
            <button className="hover:bg-orange-400 text-left px-2 py-2 rounded-lg transition-all duration-300 ease-in flex items-center hover:text-white">
              <BookMarked size={14} color="brown" /> &nbsp;Profile
            </button>
            <button className="hover:bg-orange-400 text-left px-2 py-2 rounded-lg transition-all duration-300 ease-in flex items-center hover:text-white">
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
        <div className="flex flex-col bg-red-200 h-screen w-full rounded-lg">
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
                    <ChevronDown size={16} />
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
                onClick={handleNodalOpen}
                className="bg-yellow-700 text-white text-[13px] font-medium py-1 px-4 rounded-md"
              >
                Edit Profile
              </button>
            </div>
            {modal ? <Modal onClose={setModal} /> : ""}
          </div>
          <div className="flex gap-4 p-4">
            <div className="flex-1 bg-[#FB923C]">
              <h3>
                <span>TOTAL ORDERS</span>
                <img src={totalIcon} alt="total icon" />
              </h3>
              <h1>24</h1>
              <p>+2 since last month</p>
            </div>
            <div className="flex-1">
              <h3>
                <span>TOTAL ORDERS</span>
              </h3>
              <h1>24</h1>
              <p>+2 since last month</p>
            </div>
            <div className="flex-1">
              <h3>
                <span>TOTAL ORDERS</span>
              </h3>
              <h1>24</h1>
              <p>+2 since last month</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
