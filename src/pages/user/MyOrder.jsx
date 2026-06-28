import React, { useEffect, useState } from "react";
import boy from "../../assets/boy.jpg";
import { cancelOrder, getMyOrder } from "../../services/order.service";
import Navbar from "../../components/layout/Navbar";
import toast from "react-hot-toast";
import Modal from "../../components/common/Modal";
import { getProfile, productOwner } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { 
  MessageSquare, Package, ChevronRight, CheckCircle2, 
  Clock, XCircle, ShoppingBag, Truck, RotateCcw, Star, X, MapPin 
} from "lucide-react";
import { createConversation } from "../../services/conversation.service";

function MyOrder() {
  const [orderData, setOrderData] = useState();
  const [items, setItems] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [sellerId, setSellerId] = useState();
  const [sellerData, setSellerData] = useState({});

  const navigate = useNavigate();

  const fetchMyOrder = async () => {
    try {
      const orders = await getMyOrder();
      console.log(orders);
      setOrderData(orders);
      setItems();
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  const handleCreateConversation = async (id) => {
    try {
      const res = await createConversation(id);
      console.log("this is conversation response : ", res);
      toast.success("conversation create successfully.");
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message || e.message);
    }
  };

  const handleProductOwnerData = async (id) => {
    try {
      const sellerProfile = await productOwner(id);
      console.log(sellerProfile);
      setSellerData(sellerProfile);
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  };

  const handleCancelOrder = async (id) => {
    try {
      const res = await cancelOrder(id);
      toast.success(res.message);
      fetchMyOrder();
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1000px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-3 rounded-2xl shadow-sm border border-orange-100">
              <ShoppingBag className="text-orange-600" size={26} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Order History</h1>
              <p className="text-sm font-medium text-gray-500 mt-0.5">
                Check the status of recent orders, manage returns, and discover similar products.
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 pb-2 border-b border-gray-200">
          <button className="bg-orange-50 text-orange-600 font-bold px-5 py-2.5 rounded-full text-sm shrink-0 transition-colors">All Orders</button>
          <button className="text-gray-600 hover:bg-gray-100 font-semibold px-5 py-2.5 rounded-full text-sm shrink-0 transition-colors">Buy Again</button>
          <button className="text-gray-600 hover:bg-gray-100 font-semibold px-5 py-2.5 rounded-full text-sm shrink-0 transition-colors">Not Yet Shipped</button>
          <button className="text-gray-600 hover:bg-gray-100 font-semibold px-5 py-2.5 rounded-full text-sm shrink-0 transition-colors">Cancelled</button>
        </div>

        <div className="space-y-8">
          {(!orderData || orderData.length === 0) && (
            <div className="text-center py-24 bg-white rounded-[2rem] border border-dashed border-gray-200 shadow-sm">
              <div className="bg-orange-50 p-8 rounded-full mb-6 inline-block">
                <Package className="text-orange-400 mx-auto" size={48} strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-2">No orders found</h2>
              <p className="text-gray-500 max-w-sm mx-auto font-medium text-sm">You haven't placed any orders yet. Start exploring our premium collection.</p>
              <button onClick={() => navigate("/")} className="mt-8 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-1">
                Start Shopping
              </button>
            </div>
          )}

          {orderData?.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-[2rem] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-shadow duration-300"
            >
              {/* Order Header */}
              <div className="bg-gray-50/50 px-6 py-5 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  <div>
                    <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Date Placed</p>
                    <p className="text-sm font-bold text-gray-900">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : "Recently"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Total Amount</p>
                    <p className="text-sm font-bold text-gray-900">&#8377;{order.totalPrice}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Ship To</p>
                    <div className="flex items-center gap-1.5 text-sm font-bold text-gray-900 group cursor-pointer">
                      <span>GharTak User</span>
                      <ChevronRight size={14} className="text-gray-400 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start md:items-end w-full md:w-auto">
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Order Number</p>
                  <p className="text-sm font-bold text-gray-900">#{order._id.slice(-10)}</p>
                </div>
              </div>

              {/* Order Body */}
              <div className="p-6">
                {/* Status Banner */}
                <div className="flex items-center gap-3 mb-6">
                  {order.orderStatus === 'Delivered' && (
                    <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
                      <CheckCircle2 size={20} />
                      <span className="font-bold text-sm">Delivered</span>
                    </div>
                  )}
                  {order.orderStatus === 'Cancelled' && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-xl border border-red-100">
                      <XCircle size={20} />
                      <span className="font-bold text-sm">Cancelled</span>
                    </div>
                  )}
                  {order.orderStatus !== 'Delivered' && order.orderStatus !== 'Cancelled' && (
                    <div className="flex items-center gap-2 text-orange-600 bg-orange-50 px-4 py-2 rounded-xl border border-orange-100">
                      <Clock size={20} />
                      <span className="font-bold text-sm">{order.orderStatus}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Left Items Section */}
                  <div className="flex-1 space-y-6">
                    {order.items
                      ?.filter((item) => item.product !== null)
                      .map((item, index) => (
                        <div key={index} className="flex gap-5 p-4 rounded-2xl border border-gray-100 hover:border-orange-200 transition-colors group">
                          <div className="w-24 h-24 shrink-0 bg-gray-50 rounded-xl overflow-hidden relative">
                            <img
                              className="w-full h-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                              src={item.product?.image || boy}
                              alt=""
                            />
                          </div>
                          
                          <div className="flex-1 flex flex-col justify-center">
                            <div className="flex justify-between items-start gap-4 mb-1">
                              <h4 className="font-extrabold text-gray-900 text-base line-clamp-2 hover:text-orange-500 transition-colors cursor-pointer leading-tight">
                                {item.product?.name || "Product Unavailable"}
                              </h4>
                              <p className="font-black text-gray-900 shrink-0">&#8377;{item.price}</p>
                            </div>
                            
                            <p className="text-xs font-medium text-gray-500 line-clamp-1 mb-3">
                              {item.product?.description || "Description not available"}
                            </p>
                            
                            <div className="flex items-center gap-3 mt-auto">
                              <button
                                onClick={() => {
                                  setModalOpen(true);
                                  handleProductOwnerData(item.product?.seller._id);
                                }}
                                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-700 transition-colors cursor-pointer"
                              >
                                <img src={item.product?.seller?.image || boy} className="w-5 h-5 rounded-full object-cover" />
                                <span>Sold by {item.product?.seller?.name?.slice(0, 15)}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Right Actions Section */}
                  <div className="w-full lg:w-64 flex flex-col gap-3 shrink-0 lg:border-l lg:border-gray-100 lg:pl-8">
                    <button className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-orange-500 text-white text-sm font-bold px-4 py-3 rounded-xl transition-colors shadow-sm hover:shadow-[0_4px_15px_rgba(249,115,22,0.4)]">
                      <Truck size={16} />
                      Track Package
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 text-sm font-bold px-4 py-3 rounded-xl border border-gray-200 transition-colors">
                      <RotateCcw size={16} />
                      Return Items
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 text-sm font-bold px-4 py-3 rounded-xl border border-gray-200 transition-colors">
                      <Star size={16} />
                      Write a Review
                    </button>
                    
                    {order.orderStatus !== 'Cancelled' && order.orderStatus !== 'Delivered' && (
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        className="w-full flex items-center justify-center gap-2 bg-white hover:bg-red-50 text-red-600 text-sm font-bold px-4 py-3 rounded-xl border border-red-200 hover:border-red-300 transition-colors mt-2"
                      >
                        <X size={16} />
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {modalOpen ? (
          <Modal onClose={setModalOpen}>
            <Modal.Body className="h-full overflow-y-auto">
              <div className="h-full bg-[var(--bg-main)] rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-400 p-8">
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-lg mb-4 bg-white">
                      <img
                        src={
                          sellerData?.image ||
                          "https://ui-avatars.com/api/?name=" + sellerData?.name
                        }
                        alt={sellerData?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <h2 className="text-2xl font-extrabold text-white capitalize">
                      {sellerData?.name}
                    </h2>

                    <span className="mt-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold flex items-center gap-1 backdrop-blur-sm">
                      <CheckCircle2 size={12} fill="white" className="text-orange-500" />
                      Verified Seller
                    </span>
                  </div>
                </div>

                {/* Seller Details */}
                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-start gap-3">
                      <div className="bg-white p-2 rounded-lg shadow-sm">
                         <MessageSquare size={18} className="text-orange-500" />
                      </div>
                      <div>
                        <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Email</h3>
                        <p className="font-bold text-gray-900 mt-0.5">{sellerData?.email}</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-start gap-3">
                      <div className="bg-white p-2 rounded-lg shadow-sm">
                         <MapPin size={18} className="text-orange-500" />
                      </div>
                      <div>
                        <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Phone</h3>
                        <p className="font-bold text-gray-900 mt-0.5">{sellerData?.phone || "Not Available"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-8 flex gap-3">
                    <button
                      onClick={() => {
                        navigate("/message", {
                          state: { seller: sellerData },
                        });
                        handleCreateConversation(sellerData._id);
                      }}
                      className="flex-1 py-3.5 rounded-xl font-bold text-white bg-gray-900 hover:bg-orange-500 transition-colors flex justify-center items-center gap-2 shadow-sm"
                    >
                      <MessageSquare size={18} /> Chat with Seller
                    </button>

                    <button
                      onClick={() => setModalOpen(false)}
                      className="flex-1 py-3.5 rounded-xl font-bold border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Close Profile
                    </button>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        ) : null}
      </div>
    </div>
  );
}

export default MyOrder;
