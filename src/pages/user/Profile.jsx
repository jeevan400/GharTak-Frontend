import React, { useRef, useEffect, useState } from "react";
import { getProfile, requestSellerRole } from "../../services/auth.service";
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
  Package,
  Ticket,
  Award,
  ChevronRight,
  LogOut
} from "lucide-react";
import ProfileModal from "./ProfileModal";
import Navbar from "../../components/layout/Navbar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { updateProfile } from "../../services/upload.service";
import { getMyOrder } from "../../services/order.service";
import useAuth from "../../hooks/useAuth";

function Profile() {
  const [user, setUser] = useState({});
  const [modal, setModal] = useState(false);
  const [address, setAddress] = useState();
  const [image, setImage] = useState();
  const [lastOrder, setLastOrder] = useState({});

  const navigate = useNavigate();
  const fileInputRef = useRef();
  const { logout } = useAuth();

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      const myOrder = await getMyOrder();
      setLastOrder(myOrder[0]);
      setUser(data);
    } catch (e) {
      console.log(e);
      toast.error(e.response?.data?.message || "Failed to fetch profile");
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
      toast.error(e.response?.data?.message || e.message);
      console.log(e.response?.data?.message);
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
      toast.error(e.response?.data?.message || e.message || "Image not upload.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-24">
              <h1 className="text-xl font-bold text-gray-900">Account Settings</h1>
              <p className="text-sm text-gray-500 mb-6 mt-1">Manage your preferences</p>
              
              <nav className="flex flex-col gap-2">
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full flex items-center justify-between px-4 py-3 bg-[var(--primary)] text-white rounded-xl transition-all shadow-sm shadow-orange-200"
                >
                  <div className="flex items-center gap-3">
                    <BookMarked size={18} />
                    <span className="font-medium">Profile</span>
                  </div>
                  <ChevronRight size={18} />
                </button>
                
                <button
                  onClick={() => navigate("/my-order")}
                  className="group w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Package size={18} className="group-hover:text-orange-500" />
                    <span className="font-medium">Orders</span>
                  </div>
                  <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                
                <button
                  onClick={() => navigate("/wishlist")}
                  className="group w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Heart size={18} className="group-hover:text-orange-500" />
                    <span className="font-medium">Wishlist</span>
                  </div>
                  <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
  
                <button className="group w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-all">
                  <div className="flex items-center gap-3">
                    <MapPin size={18} className="group-hover:text-orange-500" />
                    <span className="font-medium">Addresses</span>
                  </div>
                  <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                
                <div className="h-px bg-gray-100 my-2"></div>
                
                <button 
                  onClick={logout}
                  className="group w-full flex items-center justify-between px-4 py-3 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"
                >
                  <div className="flex items-center gap-3">
                    <LogOut size={18} className="group-hover:scale-110 transition-transform" />
                    <span className="font-bold">Logout</span>
                  </div>
                </button>
              </nav>
            </div>
          </div>
  
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            
            {/* Profile Header Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
                  <div className="relative group">
                    <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full overflow-hidden border-4 border-orange-50 shadow-inner bg-gray-100">
                      <img
                        className="h-full w-full object-cover"
                        src={user?.image || 'https://ui-avatars.com/api/?name=' + (user?.name || 'User') + '&background=random'}
                        alt="Profile"
                      />
                    </div>
                    <button
                      onClick={() => fileInputRef.current.click()}
                      className="absolute bottom-0 right-0 bg-orange-500 hover:bg-orange-600 text-white p-2 sm:p-2.5 rounded-full shadow-lg transition-transform hover:scale-110"
                    >
                      <Camera size={16} />
                    </button>
                    <input
                      className="hidden"
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleUploadImage}
                    />
                  </div>
                  
                  <div className="text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row items-center gap-3 mb-1.5">
                      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{user?.name || 'User'}</h1>
                      {user?.role && (
                        <span className="bg-green-100 text-green-700 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                          {user.role}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 flex items-center justify-center sm:justify-start gap-2 text-sm sm:text-base">
                      <Mail size={16} className="text-gray-400" />
                      {user?.email}
                    </p>
                  </div>
                </div>
                
                <div className="flex w-full sm:w-auto flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleModalOpen}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-orange-50 text-orange-600 hover:bg-orange-100 font-semibold py-2.5 px-5 rounded-xl transition-colors"
                  >
                    <Pencil size={18} />
                    <span>Edit Profile</span>
                  </button>
                  {user?.role === "user" && (
                    <button
                      onClick={handleSellerRequest}
                      className="flex-1 sm:flex-none bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 px-5 rounded-xl transition-colors shadow-sm shadow-orange-200"
                    >
                      Become Seller
                    </button>
                  )}
                </div>
              </div>
              {modal && <ProfileModal onClose={setModal} />}
            </div>
  
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl p-6 text-white shadow-sm shadow-orange-200 relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-orange-100 font-bold tracking-wider text-xs">TOTAL ORDERS</span>
                    <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                      <Package size={20} className="text-white" />
                    </div>
                  </div>
                  <h2 className="text-4xl font-extrabold mb-1">24</h2>
                  <p className="text-orange-100 text-sm font-medium flex items-center gap-1">+2 since last month</p>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              </div>
  
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-6 text-white shadow-sm shadow-blue-200 relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-blue-100 font-bold tracking-wider text-xs">ACTIVE COUPONS</span>
                    <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                      <Ticket size={20} className="text-white" />
                    </div>
                  </div>
                  <h2 className="text-4xl font-extrabold mb-1">03</h2>
                  <p className="text-blue-100 text-sm font-medium">Expiring soon: 1</p>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              </div>
  
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 text-white shadow-sm shadow-gray-200 relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-gray-400 font-bold tracking-wider text-xs">REWARD POINTS</span>
                    <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm">
                      <Award size={20} className="text-orange-400" />
                    </div>
                  </div>
                  <h2 className="text-4xl font-extrabold text-orange-400 mb-1">1240</h2>
                  <p className="text-gray-400 text-sm font-medium">Worth ₹124.00</p>
                </div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              </div>
            </div>
  
            {/* Info & Orders Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              
              {/* Personal Information */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Personal Information</h2>
                  <button onClick={handleModalOpen} className="text-orange-600 text-sm font-semibold hover:text-orange-700 transition-colors">Edit</button>
                </div>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-500 mb-2">Email Address</label>
                    <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-gray-800 font-medium">
                      {user?.email || "Not provided"}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-500 mb-2">Phone Number</label>
                    <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-gray-800 font-medium">
                      {user?.phone || "Not provided"}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-500 mb-2">Saved Address</label>
                    <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-gray-800 font-medium">
                      {user?.address?.city ? `${user?.address?.city}${user?.address?.state ? `, ${user?.address?.state}` : ''}` : "Not provided"}
                    </div>
                  </div>
                </div>
              </div>
  
              {/* Recent Orders */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 flex flex-col h-full">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Recent Order</h2>
                  <button onClick={() => navigate("/my-order")} className="text-orange-600 text-sm font-semibold hover:text-orange-700 transition-colors">View All</button>
                </div>
                
                <div className="flex-1 flex flex-col gap-4">
                  {lastOrder?.items?.length > 0 ? (
                    lastOrder.items.map((item) => (
                      <div key={item?.product?._id} className="group flex gap-4 items-center p-3 sm:p-4 hover:bg-orange-50/50 rounded-2xl transition-all duration-300 border border-transparent hover:border-orange-100">
                        <div className="h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                          <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={item?.product?.image} alt={item?.product?.name} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base font-bold text-gray-900 truncate mb-1">
                            {item?.product?.name}
                          </h4>
                          <p className="text-sm text-gray-500 mb-2 font-medium">
                            Qty: <span className="text-gray-900">{item.quantity}</span>
                          </p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="font-bold text-lg text-gray-900">&#8377;{item?.product?.price}</span>
                            <span className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider
                              ${lastOrder.paymentStatus === "Paid" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                              {lastOrder.paymentStatus}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                      <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                        <Package size={32} className="text-gray-400" />
                      </div>
                      <h3 className="text-gray-900 font-bold mb-1">No recent orders</h3>
                      <p className="text-gray-500 text-sm font-medium px-4">When you place an order, it will appear here.</p>
                      <button onClick={() => navigate("/")} className="mt-5 text-orange-600 font-bold hover:text-orange-700 text-sm transition-colors">Start Shopping &rarr;</button>
                    </div>
                  )}
                </div>
              </div>
  
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
