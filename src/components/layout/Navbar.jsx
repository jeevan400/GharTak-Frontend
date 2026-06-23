import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Bell, Menu, MessageSquare, Search, X } from "lucide-react";
import logoImage from "../../assets/GharTak.png";
import { SearchContext } from "../../store/context/SearchContext";
import toast from "react-hot-toast";
import { getProfile, productOwner } from "../../services/auth.service";
import Modal from "../common/Modal";
import Login from "../../pages/auth/Login";
import DropdownMenu from "../common/navbar/DropdownMenu";
import Card from "../common/Card";
import { getNotification } from "../../services/notification.service";
import socket from "../../socket.js";

function Navbar({ children }) {
  const navigate = useNavigate();
  const { logout, token } = useAuth();
  const [profileMenu, setProfileMenu] = useState(false);
  const [user, setUser] = useState(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationBadge, setNotificationBadge] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const categories = [
    "electronics", "mobiles", "laptops", "gaming", "fashion",
    "mens-clothing", "womens-clothing", "footwear", "watches", "beauty",
    "health", "home-kitchen", "furniture", "books", "sports",
    "toys", "grocery", "automotive", "jewelry", "bags",
  ];

  const customerLinks = [
    { label: "Home", place: "/home" },
    { label: "Wishlist", place: "/wishlist" },
    { label: "Cart", place: "/get-cart" },
    { label: "Orders", place: "/my-order" },
  ];
  const sellerLinks = [
    { label: "Dashboard", place: "/seller/seller-dashboard" },
    { label: "My Products", place: "/seller/my-products" },
    { label: "Add Products", place: "/seller/add-product" },
    { label: "Seller Orders", place: "/seller/seller-orders" },
    { label: "Analytics", place: "/seller/seller-analytics" },
  ];
  const adminLinks = [
    { label: "Dashboard", place: "/admin/dashboard" },
    { label: "Products", place: "/admin/products" },
    { label: "Orders", place: "/admin/orders" },
    { label: "Users", place: "/admin/users" },
    { label: "Sellers Requests", place: "/admin/seller-requests" },
  ];
  const guestLinks = [
    { label: "Home", place: "/home" },
    { label: "About Us", place: "/about-us" },
    { label: "Contact", place: "/contact" },
  ];

  const navLinkClass = "hover:text-[var(--primary)] cursor-pointer text-[16px] whitespace-nowrap";

  let currentLinks = [];
  if (user?.role === "user") currentLinks = customerLinks;
  else if (user?.role === "seller") currentLinks = sellerLinks;
  else if (user?.role === "admin") currentLinks = adminLinks;

  const activeLinks = token ? currentLinks : guestLinks;

  const { search, setSearch } = useContext(SearchContext);

  const fetchAllProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await getProfile();
      setUser(res);
    } catch (e) {
      console.error("Profile Error:", e.response?.status, e.message);
      if (e.response?.status !== 302) {
        toast.error(e.response?.data?.message || e.message || "Failed to load User data.");
      }
    }
  };

  const allNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const allNotifications = await getNotification();
      setNotifications(allNotifications.allNotifications);
    } catch (e) {
      console.error("Notification Error:", e.response?.status, e.message);
      if (e.response?.status !== 302) {
        toast.error(e.response?.data?.message || e.message || "Failed to fetch notification data");
      }
    }
  };

  useEffect(() => {
    const handleConnect = () => {
      if (user?._id) socket.emit("joinRoom", user._id);
    };
    const handleConnectError = (err) => console.error("Socket connect error:", err);
    const handleNewNotification = (notification) => {
      setNotifications((prev) => [notification, ...prev]);
      if (notification) setNotificationBadge(true);
    };

    socket.on("connect", handleConnect);
    socket.on("connect_error", handleConnectError);
    socket.on("newNotification", handleNewNotification);
    if (!socket.connected) socket.connect();

    return () => {
      socket.off("connect", handleConnect);
      socket.off("connect_error", handleConnectError);
      socket.off("newNotification", handleNewNotification);
    };
  }, [user]);

  useEffect(() => {
    if (!token) return;
    const loadData = async () => {
      try {
        await fetchAllProfile();
        await allNotifications();
        await handlesellerData();
      } catch (error) {
        console.error("Error loading navbar data:", error);
      }
    };
    loadData();
  }, [token]);

  const handleLogout = () => logout();

  let sellerId = "69fde7cf308518713d1b7968";
  const [seller, setSeller] = useState({});

  const handlesellerData = async() => {
    try{
      const sellerData = await productOwner(sellerId);
      setSeller(sellerData);
    } catch(e){
      console.log(e);
      toast.error(e.response.data.message);
    }
  }

  return (
    <>
      <nav
        style={{ boxShadow: "var(--shadow-md)" }}
        className="sticky bg-white top-0 border-b border-red-900/15 z-50"
      >
        {/* ── Top bar ── */}
        <div className="flex flex-wrap justify-between items-center gap-3 px-4 md:px-8">
          {/* Left: logo + desktop nav links */}
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div onClick={() => navigate("/home")} className="flex-shrink-0">
              <img className="h-[50px] sm:h-[60px] md:h-[80px] object-contain" src={logoImage} alt="logo image" />
            </div>

            {/* Desktop nav links */}
            <ul className="hidden lg:flex flex-nowrap items-center gap-6 text-lg font-semibold text-gray-600 min-w-0">
              {activeLinks.map((link, index) => (
                <li key={index} className={navLinkClass} onClick={() => navigate(link.place)}>
                  {link.label}
                </li>
              ))}
            </ul>

            {/* Desktop category dropdown */}
            <div className="hidden lg:block">
              <DropdownMenu categories={categories} navLinkClass={navLinkClass} />
            </div>
          </div>

          {/* Right: search + icons + hamburger */}
          <div className="flex flex-wrap justify-end items-center gap-2 md:gap-4 min-w-0">
            {/* Search — hidden on small, shown lg+ */}
            <div className="hidden lg:flex justify-center items-center bg-white px-4 rounded-full border border-[var(--primary)] min-w-0">
              <Search size={18} color="gray" />
              <input
                className="rounded-full text-[16px] font-normal p-2 focus:ring-0 outline-none min-w-0"
                type="text"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                id="search"
                placeholder="Search . . ."
              />
            </div>

            {!user ? (
              <>
                <button
                  onClick={() => setLoginModalOpen(true)}
                  style={{ background: "var(--gradient-primary)" }}
                  className="h-fit w-fit cursor-pointer flex gap-2 border border-[var(--primary)] px-4 py-2 justify-center items-center rounded-full text-white hover:scale-105 transition-all duration-200 ease-in text-sm md:text-base"
                >
                  Login
                </button>
                {loginModalOpen && (
                  <Modal onClose={setLoginModalOpen} className="!h-[95vh]">
                    <Modal.Body className="!overflow-y-auto">
                      <Login />
                    </Modal.Body>
                  </Modal>
                )}
              </>
            ) : (
              <>
                <div onClick={()=> {
                  navigate("/message", {
                  state:{
                    seller: seller,
                  }
                });
                }} className="flex justify-center items-center bg-[var(--primary-light)] h-[40px] w-[40px] rounded-full relative cursor-pointer text-[var(--text-primary)]">
                  <MessageSquare size={18} />
                  {/* <span className="h-[10px] w-[10px] absolute bg-red-500 rounded-full top-0 right-0"></span> */}
                </div>

                <div
                  onClick={() => {
                    setNotificationModalOpen(true);
                    setNotificationBadge(false);
                  }}
                  className="flex justify-center items-center bg-[var(--primary-light)] h-[40px] w-[40px] rounded-full relative cursor-pointer text-[var(--text-primary)]"
                >
                  <Bell size={18} />
                  {notificationBadge && (
                    <span className="h-[10px] w-[10px] absolute bg-red-500 rounded-full top-0 right-0"></span>
                  )}
                </div>

                {notificationModalOpen && (
                  <Modal
                    onClose={setNotificationModalOpen}
                    outerClassName="!bg-transparent"
                    className="absolute right-4 top-20 !w-[270px] !h-[70vh] border border-[var(--primary)] !bg-[var(--primary-light)] !p-2"
                  >
                    <Modal.Body className="!flex !flex-col !gap-2 !overflow-y-auto">
                      {notifications?.map((notificationData) => (
                        <Card key={notificationData._id} className="!bg-white !border-none !mx-0 !shadow-lg">
                          <Card.Body>
                            <h1 className="text-md font-bold text-[var(--primary)]">{notificationData.title}</h1>
                            <p className="text-sm font-medium text-[var(--text-secondary)] line-clamp-2">{notificationData.message}</p>
                          </Card.Body>
                          <Card.Footer className="flex justify-between items-center pt-4">
                            <p className="text-[10px] font-medium text-[var(--primary)]">{notificationData.createdAt.slice(0, 10)}</p>
                            <p className="text-[10px] font-medium text-[var(--primary)]">{notificationData.createdAt.slice(11, 16)}</p>
                          </Card.Footer>
                        </Card>
                      ))}
                    </Modal.Body>
                  </Modal>
                )}

                <div
                  onClick={() => setProfileMenu(true)}
                  className="relative rounded-full text-xl font-semibold bg-orange-100 text-orange-500 h-[40px] w-[40px]"
                >
                  <img className="w-full h-full rounded-full" src={user.image} alt="profile image" />
                </div>

                {profileMenu && (
                  <Modal
                    onClose={setProfileMenu}
                    outerClassName="!bg-transparent"
                    className="!w-[220px] !h-fit !absolute !right-8 !top-20 !p-2 !rounded-sm"
                  >
                    <Modal.Body className="!flex !flex-col !gap-2">
                      {user?.role === "admin" && (
                        <button
                          onClick={() => navigate("/admin")}
                          className="h-fit w-full cursor-pointer flex gap-2 border border-[var(--primary)] px-4 py-2 justify-center items-center rounded-lg text-[var(--primary)] hover:scale-105 transition-all duration-200 ease-in"
                        >
                          Admin Dashboard
                        </button>
                      )}
                      {user?.role === "seller" && (
                        <button
                          onClick={() => navigate("/seller")}
                          className="h-fit w-full cursor-pointer flex gap-2 border border-[var(--primary)] px-4 py-2 justify-center items-center rounded-lg text-[var(--primary)] hover:scale-105 transition-all duration-200 ease-in"
                        >
                          Seller Dashboard
                        </button>
                      )}
                      <button
                        onClick={() => navigate("/profile")}
                        className="h-fit w-full cursor-pointer flex gap-2 border border-[var(--primary)] px-4 py-2 justify-center items-center rounded-lg text-[var(--primary)] hover:scale-105 transition-all duration-200 ease-in"
                      >
                        Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        style={{ background: "var(--gradient-primary)" }}
                        className="h-fit w-full cursor-pointer flex gap-2 border border-[var(--primary)] px-4 py-2 justify-center items-center rounded-lg text-white hover:scale-105 transition-all duration-200 ease-in"
                      >
                        Logout
                      </button>
                    </Modal.Body>
                  </Modal>
                )}
              </>
            )}

            {/* Hamburger — mobile and medium screens */}
            <button
              className="lg:hidden flex items-center justify-center h-[40px] w-[40px] rounded-full bg-[var(--primary-light)] text-[var(--text-primary)]"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* ── Mobile drawer ── */}
        {menuOpen && (
          <div className="lg:hidden border-t border-red-900/15 px-4 pb-4 pt-2 flex flex-col gap-3">
            {/* Mobile search */}
            <div className="flex items-center bg-white px-4 rounded-full border border-[var(--primary)] lg:hidden">
              <Search size={18} color="gray" />
              <input
                className="rounded-full text-[16px] font-normal p-2 focus:ring-0 outline-none w-full"
                type="text"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search . . ."
              />
            </div>

            {/* Mobile nav links */}
            <ul className="flex flex-col gap-2 text-base font-semibold text-gray-600">
              {activeLinks.map((link, index) => (
                <li
                  key={index}
                  className={`${navLinkClass} py-2 border-b border-gray-100`}
                  onClick={() => {
                    navigate(link.place);
                    setMenuOpen(false);
                  }}
                >
                  {link.label}
                </li>
              ))}
            </ul>

            {/* Mobile category dropdown */}
            <DropdownMenu categories={categories} navLinkClass={navLinkClass} />
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;