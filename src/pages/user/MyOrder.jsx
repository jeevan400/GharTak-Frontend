import React, { useEffect, useState } from "react";
import boy from "../../assets/boy.jpg";
import { cancelOrder, getMyOrder } from "../../services/order.service";
import Navbar from "../../components/layout/Navbar";
import toast from "react-hot-toast";
import Modal from "../../components/common/Modal";
import { getProfile, productOwner } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Package } from "lucide-react";
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
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        {/* Page Title & Breadcrumb style tabs */}
        <h1 className="text-2xl sm:text-3xl font-normal text-gray-900 mb-6">Your Orders</h1>

        <div className="flex flex-wrap border-b border-gray-300 mb-6 gap-6">
          <button className="text-black border-b-2 border-orange-500 pb-2 font-bold text-sm sm:text-base">Orders</button>
          <button className="text-blue-600 hover:underline hover:text-orange-500 pb-2 text-sm sm:text-base">Buy Again</button>
          <button className="text-blue-600 hover:underline hover:text-orange-500 pb-2 text-sm sm:text-base">Not Yet Shipped</button>
          <button className="text-blue-600 hover:underline hover:text-orange-500 pb-2 text-sm sm:text-base">Cancelled Orders</button>
        </div>

        <div className="space-y-6">
          {(!orderData || orderData.length === 0) && (
            <div className="text-center py-20 bg-gray-50 rounded border border-gray-200">
              <Package size={48} className="mx-auto text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold text-gray-700">No orders found</h2>
              <p className="text-gray-500 mt-2">Looking for an order? Check your other filters.</p>
            </div>
          )}

          {orderData?.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-lg shadow-sm border border-gray-300 overflow-hidden"
            >
              {/* Amazon-style Order Header */}
              <div className="bg-[#f0f2f2] px-4 py-3 border-b border-gray-300 flex flex-col sm:flex-row justify-between text-sm text-[#565959]">
                <div className="flex flex-wrap gap-10">
                  <div>
                    <p className="uppercase text-xs font-semibold mb-1">Order Placed</p>
                    <p className="text-[#0f1111]">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : "Recently"}
                    </p>
                  </div>
                  <div>
                    <p className="uppercase text-xs font-semibold mb-1">Total</p>
                    <p className="text-[#0f1111]">&#8377;{order.totalPrice}</p>
                  </div>
                  <div>
                    <p className="uppercase text-xs font-semibold mb-1">Ship To</p>
                    <p className="text-[#007185] hover:underline hover:text-[#c45500] cursor-pointer">
                      GharTak User 
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
                  <p className="text-xs text-[#0f1111]">ORDER # <span className="text-[#007185] hover:underline cursor-pointer">{order._id.slice(-10)}</span></p>
                  <div className="flex gap-2 mt-1">
                    <span className="text-[#007185] hover:underline cursor-pointer">View order details</span>
                    <span className="text-gray-300">|</span>
                    <span className="text-[#007185] hover:underline cursor-pointer">Invoice</span>
                  </div>
                </div>
              </div>

              {/* Order Body */}
              <div className="p-4 sm:p-6 flex flex-col md:flex-row justify-between gap-8">
                {/* Left Items Section */}
                <div className="flex-1 space-y-6">
                  <h2 className="font-bold text-lg mb-4 text-[#0f1111] flex items-center gap-2">
                    {order.orderStatus === 'Delivered' && <span className="text-green-700">Delivered</span>}
                    {order.orderStatus === 'Cancelled' && <span className="text-red-700">Cancelled</span>}
                    {order.orderStatus !== 'Delivered' && order.orderStatus !== 'Cancelled' && <span className="text-orange-600">{order.orderStatus}</span>}
                  </h2>
                  
                  {order.items
                    ?.filter((item) => item.product !== null)
                    .map((item, index) => (
                      <div key={index} className="flex flex-col sm:flex-row gap-4">
                        <div className="w-24 h-24 shrink-0 bg-gray-50 border border-gray-200 rounded p-1">
                          <img
                            className="w-full h-full object-contain cursor-pointer mix-blend-multiply"
                            src={item.product?.image || boy}
                            alt=""
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-[#007185] hover:underline hover:text-[#c45500] cursor-pointer font-medium text-base line-clamp-2">
                            {item.product?.name || "Product Unavailable"}
                          </h4>
                          <p className="text-xs text-[#565959] mt-1 line-clamp-1">
                            {item.product?.description || "Description not available"}
                          </p>
                          <p className="text-[#b12704] font-bold mt-1">&#8377;{item.price}</p>
                          
                          <div className="flex items-center gap-2 mt-3">
                            <button
                              onClick={() => {
                                setModalOpen(true);
                                handleProductOwnerData(item.product?.seller._id);
                              }}
                              className="flex items-center gap-2 bg-[#f0f2f2] hover:bg-[#e3e6e6] px-3 py-1.5 rounded-full text-xs cursor-pointer border border-[#d5d9d9] text-[#0f1111] transition-colors shadow-sm"
                            >
                              <img src={item.product?.seller?.image || boy} className="w-5 h-5 rounded-full object-cover" />
                              <span className="font-medium">Sold by: {item.product?.seller?.name?.slice(0, 15)}</span>
                            </button>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2">
                            <button className="bg-[#ffd814] hover:bg-[#f7ca00] text-[#0f1111] text-sm px-3 py-1.5 rounded-lg shadow-sm border border-[#fcd200] transition-colors">
                              Buy it again
                            </button>
                            <button className="bg-white hover:bg-gray-50 text-[#0f1111] text-sm px-3 py-1.5 rounded-lg shadow-sm border border-[#d5d9d9] transition-colors">
                              View your item
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Right Actions Section (Amazon Style side buttons) */}
                <div className="w-full md:w-64 flex flex-col gap-2 shrink-0">
                  <button className="w-full bg-white hover:bg-gray-50 text-[#0f1111] text-sm px-4 py-2 rounded-lg shadow-sm border border-[#d5d9d9] text-center transition-colors">
                    Track package
                  </button>
                  <button className="w-full bg-white hover:bg-gray-50 text-[#0f1111] text-sm px-4 py-2 rounded-lg shadow-sm border border-[#d5d9d9] text-center transition-colors">
                    Return or replace items
                  </button>
                  <button className="w-full bg-white hover:bg-gray-50 text-[#0f1111] text-sm px-4 py-2 rounded-lg shadow-sm border border-[#d5d9d9] text-center transition-colors">
                    Share gift receipt
                  </button>
                  <button className="w-full bg-white hover:bg-gray-50 text-[#0f1111] text-sm px-4 py-2 rounded-lg shadow-sm border border-[#d5d9d9] text-center transition-colors">
                    Write a product review
                  </button>
                  
                  {order.orderStatus !== 'Cancelled' && order.orderStatus !== 'Delivered' && (
                    <button
                      onClick={() => handleCancelOrder(order._id)}
                      className="w-full bg-white hover:bg-red-50 text-[#c40000] text-sm px-4 py-2 rounded-lg shadow-sm border border-[#d5d9d9] text-center transition-colors mt-2"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {modalOpen ? (
          <Modal onClose={setModalOpen}>
            <Modal.Body className="h-full overflow-y-auto">
              <div className="h-full bg-[var(--bg-main)]">
                {/* Header */}
                <div className="bg-[var(--gradient-primary)] p-8 rounded-t-xl">
                  <div className="flex flex-col items-center">
                    <div className="w-28 h-28 rounded-full border-4 border-black overflow-hidden shadow-lg">
                      <img
                        src={
                          sellerData?.image ||
                          "https://ui-avatars.com/api/?name=" + sellerData?.name
                        }
                        alt={sellerData?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <h2 className="mt-4 text-3xl font-bold text-[var(--text-primary)] capitalize">
                      {sellerData?.name}
                    </h2>

                    <span className="mt-2 px-4 py-1 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-sm">
                      Verified Seller
                    </span>
                  </div>
                </div>

                {/* Seller Details */}
                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl p-5 shadow-md border border-[var(--border-light)]">
                      <h3 className="text-sm text-[var(--text-secondary)]">
                        Email
                      </h3>

                      <p className="font-semibold text-[var(--text-primary)] mt-1">
                        {sellerData?.email}
                      </p>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-md border border-[var(--border-light)]">
                      <h3 className="text-sm text-[var(--text-secondary)]">
                        Phone
                      </h3>

                      <p className="font-semibold text-[var(--text-primary)] mt-1">
                        {sellerData?.phone || "Not Available"}
                      </p>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-md border border-[var(--border-light)]">
                      <h3 className="text-sm text-[var(--text-secondary)]">
                        Joined On
                      </h3>

                      <p className="font-semibold text-[var(--text-primary)] mt-1">
                        {new Date(sellerData?.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-md border border-[var(--border-light)]">
                      <h3 className="text-sm text-[var(--text-secondary)]">
                        Status
                      </h3>

                      <span className="inline-flex items-center mt-2 px-3 py-1 rounded-full bg-[var(--success-light)] text-[var(--success)] text-sm font-medium">
                        Active {sellerData?.role || "user"}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}

                  <div className="mt-8 flex gap-4">
                    <button
                      onClick={() => {
                        navigate("/message", {
                          state: {
                            seller: sellerData,
                          },
                        });
                        handleCreateConversation(sellerData._id);
                      }}
                      className="flex-1 py-3 rounded-lg font-semibold text-white
            bg-[var(--primary)]
            hover:bg-[var(--primary-hover)]
            transition flex justify-center items-center gap-2"
                    >
                      <MessageSquare size={18} /> Chat with Seller
                    </button>

                    <button
                      onClick={() => setModalOpen(false)}
                      className="flex-1 py-3 rounded-lg font-semibold border
            border-[var(--border-medium)]
            text-[var(--text-primary)]
            hover:bg-gray-50 transition"
                    >
                      Close
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
