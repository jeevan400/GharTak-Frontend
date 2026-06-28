import React, { useEffect, useState } from "react";
import { getSellerOrder, updateOrderStatus } from "../../../services/order.service";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { ShoppingBasket, Package, Clock, CreditCard, ChevronDown } from "lucide-react";
import boy from "../../../assets/boy.jpg";

function SellerOrders() {
  const [orderData, setOrderData] = useState([]);
  const [user, setUser] = useState();

  const fetchSellerOrder = async () => {
    try {
      const orders = await getSellerOrder();
      setOrderData(orders);
      const data = jwtDecode(localStorage.getItem("token"));
      setUser(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchSellerOrder();
  }, []);

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      const data = await updateOrderStatus(orderId, status);

      setOrderData((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? {
                ...order,
                orderStatus: status,
              }
            : order,
        ),
      );

      toast.success(data.message);
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-[var(--bg-main)] min-h-full font-sans pb-20">
      <div className="mb-8 border-b border-[var(--border-light)] pb-6 flex items-center gap-3">
        <ShoppingBasket className="text-[var(--primary)]" size={32} />
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
            Customer Orders
          </h1>
          <p className="text-[var(--text-secondary)] font-medium mt-1 text-[14px]">
            Manage and update the status of your product orders.
          </p>
        </div>
      </div>

      {!orderData || orderData.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-[32px] border border-[var(--border-light)] shadow-[var(--shadow-sm)]">
          <ShoppingBasket className="text-gray-300 mb-4" size={56} />
          <h2 className="text-xl font-bold text-[var(--text-primary)]">No orders yet</h2>
          <p className="text-[var(--text-secondary)] mt-2 font-medium">When customers buy your products, they will appear here.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {orderData.map((order) => {
            // Filter items that belong to this seller
            const sellerItems = order?.items?.filter(
              (item) => item.product && user && item.product.seller === user.id
            );

            // Skip rendering this order block if the seller has no items in it
            if (!sellerItems || sellerItems.length === 0) return null;

            return (
              <div
                key={order?._id}
                className="bg-white rounded-[32px] shadow-[var(--shadow-md)] border border-[var(--border-light)] overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-gray-50/50 p-5 sm:p-6 border-b border-[var(--border-light)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-bold tracking-widest uppercase text-gray-400">Order ID</span>
                      <span className="text-[13px] font-bold text-[var(--text-primary)] bg-white px-2 py-0.5 rounded-md border border-[var(--border-medium)] shadow-sm">
                        #{order?._id?.slice(-8)}
                      </span>
                    </div>
                    <p className="text-[13px] font-medium text-[var(--text-secondary)] flex items-center gap-1.5 mt-2">
                      <Clock size={14} />
                      {new Date(order?.createdAt || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex flex-col items-start sm:items-end">
                      <span className="text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-0.5">Order Total</span>
                      <span className="text-lg font-black text-[var(--primary)]">&#8377;{order?.totalPrice || "0"}</span>
                    </div>
                    
                    {/* Status Update Dropdown inside Header */}
                    <div className="relative shrink-0">
                      <select 
                        value={order.orderStatus || "Processing"}
                        onChange={(e)=> handleUpdateOrderStatus(order._id, e.target.value)}
                        className={`appearance-none pl-4 pr-10 py-2.5 rounded-xl text-[13px] font-extrabold border shadow-sm cursor-pointer outline-none transition-all uppercase tracking-wide
                          ${order.orderStatus === 'Delivered' ? 'bg-green-50 text-green-700 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200' : 
                            order.orderStatus === 'Shipped' ? 'bg-blue-50 text-blue-700 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' : 
                            'bg-orange-50 text-[var(--primary)] border-orange-200 focus:border-[var(--primary)] focus:ring-2 focus:ring-orange-200'}`}
                      >
                        <option value="Processing">PROCESSING</option>
                        <option value="Shipped">SHIPPED</option>
                        <option value="Delivered">DELIVERED</option>
                      </select>
                      <ChevronDown size={16} className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none 
                        ${order.orderStatus === 'Delivered' ? 'text-green-600' : order.orderStatus === 'Shipped' ? 'text-blue-600' : 'text-orange-500'}`} 
                      />
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-2 sm:p-4 divide-y divide-[var(--border-light)]">
                  {sellerItems.map((item, index) => (
                    <div
                      key={item.product?._id || index}
                      className="flex flex-col sm:flex-row justify-between p-4 gap-4 hover:bg-gray-50/50 transition-colors rounded-2xl"
                    >
                      <div className="flex gap-4 sm:gap-6 flex-1">
                        <div className="h-[80px] w-[80px] sm:h-[100px] sm:w-[100px] shrink-0">
                          <img
                            className="w-full h-full rounded-2xl border border-[var(--border-medium)] object-cover shadow-sm"
                            src={item.product?.image || boy}
                            alt={item.product?.name}
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <h4 className="text-[16px] sm:text-[18px] font-bold text-[var(--text-primary)] leading-tight mb-1">
                            {item.product?.name || "Product Unavailable"}
                          </h4>
                          <p className="text-[13px] font-medium text-[var(--text-secondary)] line-clamp-2 mb-3 max-w-md">
                            {item.product?.description || "Description not available"}
                          </p>
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="flex items-center gap-1.5 text-[12px] font-bold bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg">
                              <Package size={14} /> Qty: 1
                            </span>
                            <span className={`flex items-center gap-1.5 text-[12px] font-bold px-2.5 py-1 rounded-lg border
                              ${order.paymentStatus === "Pending" ? "bg-red-50 text-red-600 border-red-100" : "bg-green-50 text-green-600 border-green-100"}`}>
                              <CreditCard size={14} /> 
                              {order.paymentStatus || "Unknown"}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex sm:flex-col justify-between sm:justify-center items-center sm:items-end mt-2 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-0 border-[var(--border-light)] shrink-0">
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest sm:mb-1">Price</span>
                        <h1 className="text-[var(--text-primary)] font-black text-xl">
                          &#8377;{item.price}
                        </h1>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SellerOrders;
