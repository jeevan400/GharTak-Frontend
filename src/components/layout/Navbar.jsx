import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
  ArrowBigLeft,
  Bell,
  MessageSquare,
  Search,
  Settings,
  User,
} from "lucide-react";
import logoImage from "../../assets/GharTak.png";
import { useState } from "react";
import { SearchContext } from "../../store/context/SearchContext";
import toast from "react-hot-toast";
import { getProfile } from "../../services/auth.service";
import Modal from "../common/Modal";
import Login from "../../pages/auth/Login";
import DropdownMenu from "../common/navbar/DropdownMenu";
import Card from "../common/Card";
import { getNotification } from "../../services/notification.service";
import socket from "../../socket.js";

function Navbar({ children }) {
  const navigate = useNavigate();
  const { logout, token } = useAuth();
  const [hover, setHover] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [user, setUser] = useState(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationBadge, setNotificationBadge] = useState(false);

  const categories = ["electronics",
  "mobiles",
  "laptops",
  "gaming",
  "fashion",
  "mens-clothing",
  "womens-clothing",
  "footwear",
  "watches",
  "beauty",
  "health",
  "home-kitchen",
  "furniture",
  "books",
  "sports",
  "toys",
  "grocery",
  "automotive",
  "jewelry",
  "bags"]

  const customerLinks = [
    {
      label:"Home",
      place:"/home"
    },
    {
      label:"Wishlist",
      place:"/wishlist"
    },
    {
      label:"Cart",
      place:"/get-cart"
    },
    {
      label:"Orders",
      place:"/my-order"
    }];
  const sellerLinks = [
    {
      label:"Dashboard",
      place:"/seller/seller-dashboard"
    },
    {
      label:"My Products",
      place:"/seller/my-products"
    },
    {
      label:"Add Products",
      place:"/seller/add-product"
    },
    {
      label:"Seller Orders",
      place:"/seller/seller-orders"
    },
    {
      label:"Analytics",
      place:"/seller/seller-analytics"
    }];
  const adminLinks = [
    {
      label:"Dashboard",
      place:"/admin/dashboard"
    },
    {
      label:"Products",
      place:"/admin/products"
    },
    {
      label:"Orders",
      place:"/admin/orders"
    },
    {
      label:"Users",
      place:"/admin/users"
    },
    {
      label:"Sellers Requests",
      place:"/admin/seller-requests"
    }
  ];
  const guestLinks = [
    {
      label:"Home",
      place:"/home"
    },
    {
      label:"About Us",
      place:"/about-us"
    },
    {
      label:"Contact",
      place:"/contact"
    }
    ];
  const navLinkClass =
    "hover:text-[var(--primary)] cursor-pointer text-[16px] ";

  let currentLinks = [];

  if (user?.role === "user") {
    currentLinks = customerLinks;
  } else if (user?.role === "seller") {
    currentLinks = sellerLinks;
  } else if (user?.role === "admin") {
    currentLinks = adminLinks;
  }

  const { search, setSearch } = useContext(SearchContext);

  const fetchAllProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token available for profile");
        return;
      }
      const res = await getProfile();
      setUser(res);
    } catch (e) {
      console.error("Profile Error:", e.response?.status, e.message);
      if (e.response?.status === 302) {
        console.error("Received 302 redirect - Token may be invalid or expired");
      }
      if (e.response?.status !== 302) {
        toast.error(
          e.response?.data?.message || e.message || "Failed to load User data.",
        );
      }
    }
  };

  const allNotifications = async () => {
    try{
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token available for notifications");
        return;
      }
      const allNotifications = await getNotification();
      setNotifications(allNotifications.allNotifications);
    }
    catch(e){
      console.error("Notification Error:", e.response?.status, e.message);
      if (e.response?.status === 302) {
        console.error("Received 302 redirect - Token may be invalid or expired");
      }
      if (e.response?.status !== 302) {
        toast.error(e.response?.data?.message || e.message || "Failed to fetch notification data");
      }
    }
  }

  useEffect(() => {
    const handleConnect = () => {
      // console.log("Socket connected", socket.id);
      if (user?._id) {
        // console.log("Joining socket room after connect:", user._id);
        socket.emit("joinRoom", user._id);
      }
    };

    const handleConnectError = (err) => {
      console.error("Socket connect error:", err);
    };

    const handleNewNotification = (notification) => {
      // console.log("notification received : ", notification);
      setNotifications((prev) => [notification, ...prev]);
      if (notification) {
        setNotificationBadge(true);
      }
    };

    socket.on("connect", handleConnect);
    socket.on("connect_error", handleConnectError);
    socket.on("newNotification", handleNewNotification);

    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off("connect_error", handleConnectError);
      socket.off("newNotification", handleNewNotification);
    };
  }, [user]);

  // useEffect(() => {
  //   if (user?._id) {
  //     console.log("Joining Room:", user._id);
  //     socket.emit("joinRoom", user._id);
  //   }
  // }, [user]);
  useEffect(() => {
    // if token is not exist then return otherwise fetch the profile data
    if (!token) return;

    const loadData = async () => {
      try {
        await fetchAllProfile();
        await allNotifications();
      } catch (error) {
        console.error("Error loading navbar data:", error);
      }
    };

    loadData();
  }, [token]);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* // <!-- Navbar --> */}
      {/* <nav className=" sticky top-0 flex items-center justify-between px-8 py-5 border-b border-gray-800 bg-white">
        <h1
          onClick={() => navigate("/home")}
          className="text-3xl font-bold text-orange-500 cursor-pointer"
        >
          GharTak
        </h1>
        <ul className="hidden md:flex gap-8 text-gray-500 font-medium">
          <li>
            <a href="#" className="hover:text-orange-400">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-orange-400">
              Products
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-orange-400">
              Categories
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-orange-400">
              Contact
            </a>
          </li>
        </ul>
        <div className="flex gap-4">
          {!user ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-5 py-2 border border-orange-500 rounded-lg hover:bg-orange-500 transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-5 py-2 bg-orange-500 rounded-lg hover:bg-orange-600 transition"
              >
                Signup
              </button>
            </>
          ) : (
            <>
              {user?.role === "admin" && (
                <button
                  onClick={() => navigate("/admin")}
                  className="px-5 py-2 bg-white rounded-lg text-orange-500 border  border-orange-500"
                >
                  Admin Dashboard
                </button>
              )}
              {user?.role === "seller" && (
                <button
                  onClick={() => navigate("/seller")}
                  className="px-5 py-2 bg-white rounded-lg text-orange-500 border  border-orange-500"
                >
                  Seller Dashboard
                </button>
              )}
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-orange-500 rounded-lg hover:bg-orange-600 transition text-white"
              >
                Logout
              </button>
              <div
                onClick={() => navigate("/profile")}
                className="rounded-full text-xl font-semibold bg-orange-100 text-orange-500 h-[40px] w-[40px]"
              >
                <img
                  className="w-full h-full rounded-full"
                  src={user.image}
                  alt="profile image"
                />
              </div>
            </>
          )}
        </div>
      </nav> */}
      <nav
        style={{ boxShadow: "var(--shadow-md)" }}
        className="sticky bg-white top-0 flex justify-between items-center px-8 border-b border-red-900/15 z-50 "
      >
        <div className="flex justify-center items-center gap-8 text-2xl font-bold cursor-pointer ">
          {/* <span className="flex justify-center items-center ">
                  <ArrowBigLeft onClick={() => navigate(-1)} size={26} />
                </span>
                GharTak */}
          <div onClick={() => navigate("/home")}>
            <img className="h-[80px]" src={logoImage} alt="logo image" />
          </div>
          <ul className="flex justify-center items-center gap-8 text-lg font-semibold text-gray-600">
            {/* {children} */}
            {token
              ? currentLinks.map((link, index) => (
                  <li
                    key={index}
                    className={navLinkClass}
                    onClick={() => navigate(link.place)}
                  >
                    {link.label}
                  </li>
                ))
              : guestLinks.map((link, index) => (
                  <li
                    key={index}
                    className={navLinkClass}
                    onClick={() => navigate(link.place)}
                  >
                    {link.label}
                  </li>
                )) }
          </ul>
          <DropdownMenu categories={categories} navLinkClass={navLinkClass}/>
        </div>
        <div className="flex gap-4">
          <div className="flex justify-center items-center bg-white px-4 rounded-full border border-[var(--primary)]">
            <Search size={18} color="gray" />
            <input
              className=" rounded-full text-[16px] font-normal p-2 focus:ring-0 outline-none"
              type="text"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              id="search"
              placeholder={`Search . . .`}
            />
            {/* <button className='h-fit w-fit bg-red-900 text-white justify-center items-center  p-2 rounded-full'><Search/></button> */}
          </div>
          {!user ? (
            <>
              <button
                onClick={() => setLoginModalOpen(true)}
                style={{ background: "var(--gradient-primary)" }}
                className=" h-fit w-fit cursor-pointer flex gap-2 border border-[var(--primary)] px-4 py-2 justify-center items-center rounded-full  text-white hover:scale-105 transition-all duration-200 ease-in"
              >
                Login
              </button>

              {
                loginModalOpen?
                <Modal onClose={setLoginModalOpen} className={`!h-[95vh] `}>
                  <Modal.Body className={`!overflow-y-auto`}>
                    <Login/>
                  </Modal.Body>
                </Modal>:null
              }

              {/* <button
                onClick={() => navigate("/register")}
                style={{background:"var(--gradient-primary)"}}
                className=" h-fit w-fit cursor-pointer flex gap-2 border border-[var(--primary)] px-4 py-2 justify-center items-center rounded-full  text-white  "
              >
                Signup
              </button> */}
            </>
          ) : (
            <>
              {/* {user?.role === "admin" && (
                <button
                  onClick={() => navigate("/admin")}
                  className=" cursor-pointer flex gap-2 border border-red-900 px-4 py-1 justify-center items-center rounded-full bg-red-900/10 text-red-900"
                >
                  Admin Dashboard
                </button>
              )}
              {user?.role === "seller" && (
                <button
                  onClick={() => navigate("/seller")}
                  className=" cursor-pointer flex gap-2 border border-red-900 px-4 py-1 justify-center items-center rounded-full bg-red-900/10 text-red-900"
                >
                  Seller Dashboard
                </button>
              )}
              <button
                onClick={handleLogout}
                className=" cursor-pointer flex gap-2 border border-red-900 px-4 py-1 justify-center items-center rounded-full bg-red-900 text-white"
              >
                Logout
              </button> */}
              <div className="flex justify-center items-center bg-[var(--primary-light)] h-[40px] w-[40px] rounded-full relative cursor-pointer text-[var(--text-primary)]">
                <MessageSquare size={18} />
                <span className="h-[10px] w-[10px] absolute bg-red-500 rounded-full top-0 right-0"></span>
              </div>
              <div onClick={()=> {
                setNotificationModalOpen(true);
                setNotificationBadge(false);
              }} className="flex justify-center items-center bg-[var(--primary-light)] h-[40px] w-[40px] rounded-full relative cursor-pointer text-[var(--text-primary)]">
                <Bell size={18} />
                {
                  notificationBadge?<span className="h-[10px] w-[10px] absolute bg-red-500 rounded-full top-0 right-0"></span>:null
                }
              </div>
              {
                notificationModalOpen?
                <Modal onClose={setNotificationModalOpen} outerClassName={`!bg-transparent`}  className={`absolute right-4 top-20 !w-[270px] !h-[70vh] border border-[var(--primary)] !bg-[var(--primary-light)] !p-2 `}>
                  <Modal.Body className={`!flex !flex-col !gap-2 !overflow-y-auto`}>
                    {
                      notifications?.map((notificationData)=>(
                        <Card key={notificationData._id} className={`!bg-white !border-none !mx-0 !shadow-lg`}>
                      <Card.Body>
                        <h1 className="text-md font-bold text-[var(--primary)]">{notificationData.title}</h1>
                        <p className="text-sm font-medium text-[var(--text-secondary)] line-clamp-2">{notificationData.message}</p>
                      </Card.Body>
                      <Card.Footer className={`flex justify-between items-center pt-4`}>
                        <p className="text-[10px] font-medium text-[var(--primary)]">{notificationData.createdAt.slice(0, 10)}</p>
                        <p className="text-[10px] font-medium text-[var(--primary)]">{notificationData.createdAt.slice(11, 16)}</p>
                      </Card.Footer>
                    </Card>
                      ))
                    }
                  </Modal.Body>
                </Modal>:null
              }
              <div
                onClick={() => setProfileMenu(true)}
                className="relative rounded-full text-xl font-semibold bg-orange-100 text-orange-500 h-[40px] w-[40px]"
              >
                <img
                  className="w-full h-full rounded-full"
                  src={user.image}
                  alt="profile image"
                />
              </div>
              {profileMenu ? (
                <Modal onClose={setProfileMenu} outerClassName={`!bg-transparent`} className={`!w-[220px] !h-fit !absolute !right-8 !top-20 !p-2 !rounded-sm`}>
                  <Modal.Body className={`!flex !flex-col !gap-2`}>
                    {/* <div className="absolute w-[250px] top-16 right-8 bg-white p-4 flex flex-col gap-2 rounded-md border border-[var(--border-medium)]"> */}
                  {user?.role === "admin" && (
                    <button
                      onClick={() => navigate("/admin")}
                      className=" h-fit w-full cursor-pointer flex gap-2 border border-[var(--primary)] px-4 py-2 justify-center items-center rounded-lg  text-[var(--primary)] hover:scale-105 transition-all duration-200 ease-in"
                    >
                      Admin Dashboard
                    </button>
                  )}
                  {user?.role === "seller" && (
                    <button
                      onClick={() => navigate("/seller")}
                      className=" h-fit w-full cursor-pointer flex gap-2 border border-[var(--primary)] px-4 py-2 justify-center items-center rounded-lg  text-[var(--primary)] hover:scale-105 transition-all duration-200 ease-in"
                    >
                      Seller Dashboard
                    </button>
                  )}
                  <button
                    onClick={() => navigate("/profile")}
                    className=" h-fit w-full cursor-pointer flex gap-2 border border-[var(--primary)] px-4 py-2 justify-center items-center rounded-lg  text-[var(--primary)] hover:scale-105 transition-all duration-200 ease-in"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    style={{ background: "var(--gradient-primary)" }}
                    className=" h-fit w-full cursor-pointer flex gap-2 border border-[var(--primary)] px-4 py-2 justify-center items-center rounded-lg  text-white hover:scale-105 transition-all duration-200 ease-in"
                  >
                    Logout
                  </button>
                {/* </div> */}
                  </Modal.Body>
                </Modal>
              ) : (
                ""
              )}
            </>
          )}
        </div>
        {/* <div className="flex justify-center items-center cursor-pointer">
                <Settings />
              </div> */}
      </nav>
    </>
  );
}

export default Navbar;
