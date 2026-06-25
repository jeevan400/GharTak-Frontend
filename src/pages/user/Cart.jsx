import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCartItems, updateCartQuantity } from "../../services/cart.service";
import Navbar from "../../components/layout/Navbar";
import {
  Trash,
  ChevronRight,
  ArrowLeft,
  Wallet,
  CreditCard,
  Banknote,
  ShoppingCart,
  Minus,
  Plus,
} from "lucide-react";
import boy from "../../assets/boy.jpg";
import toast from "react-hot-toast";

function Cart() {
  const navigate = useNavigate();
  const [cartItem, setCartItem] = useState({
    items: [],
    totalItems: 0,
    totalPrice: 0,
  });
  const [error, setError] = useState(null);

  const fetchCartItems = async () => {
    try {
      const res = await getCartItems();
      setCartItem(res.cart ?? res);
    } catch (e) {
      console.log(e);
      setError(
        e?.response?.data?.message || e.message || "Failed to load cart",
      );
      toast.error(e.response?.data?.message || "Error fetching cart");
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleUpdateQuantity = async (productId, quantity) => {
    try {
      const updatedCart = await updateCartQuantity(productId, quantity);

      setCartItem(updatedCart);
      toast.success(updatedCart.message);
    } catch (e) {
      console.log(e);
      toast.error(e.response?.data?.message || "Failed to update quantity");
    }
  };

  const validItems = cartItem.items?.filter((item) => item.product !== null) || [];
  const estimatedShipping = validItems.length > 0 ? 12.5 : 0;
  const estimatedTax = validItems.length > 0 ? 34 : 0;
  const orderTotal = cartItem.totalPrice + estimatedShipping + estimatedTax;

  return (
    <div className="bg-[var(--bg-main)] min-h-screen pb-12 w-full font-sans text-[var(--text-primary)]">
      {/* <Navbar /> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold tracking-tight mb-8 flex items-center gap-3">
          <ShoppingCart className="text-[var(--primary)]" size={32} />
          Shopping Cart
        </h1>
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--primary)] font-medium text-sm transition-colors"
                >
                  <ArrowLeft size={16} /> Continue Shopping
                </button>
              </div>
        {validItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
            <ShoppingCart className="text-gray-300 mb-4" size={80} />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-[var(--text-secondary)] mb-6">Looks like you haven't added anything yet.</p>
            <button
              onClick={() => navigate(-1)}
              className="bg-[var(--primary)] text-white px-8 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                  <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                    Cart Items ({validItems.length})
                  </h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {validItems.map((product, index) => (
                    <div
                      key={product.product?._id || index}
                      className="flex flex-col sm:flex-row p-6 gap-6 hover:bg-gray-50/50 transition-colors"
                    >
                      <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                        <img
                          className="h-full w-full object-cover object-center"
                          src={product.product?.image || boy}
                          alt={product.product?.name || "Product"}
                        />
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div className="pr-4">
                            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1 leading-tight">
                              {product.product?.name || "Product Unavailable"}
                            </h3>
                            <p className="text-sm text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                              {product.product?.description || "Description not available"}
                            </p>
                          </div>
                          <p className="text-xl font-bold text-[var(--primary)] whitespace-nowrap">
                            &#8377;{product.product?.price || "N/A"}
                          </p>
                        </div>
                        
                        <div className="flex justify-between items-end mt-4">
                          <div className="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
                            <button
                              onClick={() => handleUpdateQuantity(product.product?._id, product.quantity - 1)}
                              className="p-2 hover:bg-gray-100 text-gray-600 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-12 text-center font-semibold text-[var(--text-primary)]">
                              {product.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(product.product?._id, product.quantity + 1)}
                              className="p-2 hover:bg-gray-100 text-gray-600 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => handleUpdateQuantity(product.product?._id, 0)}
                            className="flex items-center gap-1.5 text-sm font-semibold text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
                          >
                            <Trash size={16} />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-8">
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Order Summary</h2>
                
                <dl className="space-y-4 text-sm text-[var(--text-secondary)]">
                  <div className="flex justify-between">
                    <dt>Subtotal</dt>
                    <dd className="font-medium text-[var(--text-primary)]">&#8377;{cartItem.totalPrice.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Estimated Shipping</dt>
                    <dd className="font-medium text-[var(--text-primary)]">&#8377;{estimatedShipping.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Estimated Tax</dt>
                    <dd className="font-medium text-[var(--text-primary)]">&#8377;{estimatedTax.toFixed(2)}</dd>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4 mt-4 flex justify-between items-center">
                    <dt className="text-base font-bold text-[var(--text-primary)]">Total</dt>
                    <dd className="text-2xl font-bold text-[var(--primary)]">
                      &#8377;{orderTotal.toFixed(2)}
                    </dd>
                  </div>
                </dl>

                <div className="mt-8">
                  <button
                    onClick={() => navigate("/order")}
                    className="w-full bg-[var(--primary)] text-white font-bold py-3.5 px-4 rounded-xl text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Proceed to Checkout <ChevronRight size={20} />
                  </button>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-xs text-center text-gray-400 mb-3 uppercase tracking-wider font-semibold">
                    Secure Checkout
                  </p>
                  <div className="flex justify-center items-center gap-4 text-gray-400">
                    <Banknote className="hover:text-[var(--primary)] transition-colors" size={24} /> 
                    <CreditCard className="hover:text-[var(--primary)] transition-colors" size={24} /> 
                    <Wallet className="hover:text-[var(--primary)] transition-colors" size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
