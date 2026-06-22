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
      toast.error(e.response.data.message);
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
      toast.error(e.response.data.message);
    }
  };

  return (
    <div className="bg-red-50 h-screen w-[100%]">
      <div className="h-full w-full grid grid-cols-12 gap-4 px-4">
        <div className="col-span-8 py-4">
          <h1 className="text-xl font-bold mb-4">Your Cart </h1>

          {cartItem.items
            ?.filter((item) => item.product !== null)
            .map((product, index) => (
              <div
                key={product.product?._id || index}
                className="flex bg-white p-4 gap-4 rounded-lg border shadow-lg mb-4"
              >
                <div className="h-[100px] w-[80px]">
                  <img
                    className="h-full w-full rounded-lg"
                    src={product.product?.image || boy}
                    alt=""
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div>
                      <h1 className="text-lg font-bold">
                        {product.product?.name || "Product Unavailable"}
                      </h1>
                      <p className="text-sm font-medium text-gray-500 line-clamp-1">
                        {product.product?.description ||
                          "Description not available"}
                      </p>
                    </div>
                    <span className="text-xl font-semibold text-red-900">
                      &#8377;
                      {product.product?.price || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="border border-red-800 px-2 flex gap-4 rounded-lg font-semibold">
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            product.product?._id,
                            product.quantity - 1,
                          )
                        }
                        className="text-black font-bold"
                      >
                        -
                      </button>
                      {product.quantity}
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            product.product?._id,
                            product.quantity + 1,
                          )
                        }
                        className="text-black font-bold"
                      >
                        +
                      </button>
                    </span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(product.product?._id, 0)
                      }
                      className="flex items-center gap-1 text-sm font-bold text-red-600 "
                    >
                      <Trash size={14} />
                      REMOVE
                    </button>
                  </div>
                </div>
              </div>
            ))}
          <div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-red-900 font-medium text-lg"
            >
              <ArrowLeft size={20} /> Continue Shopping
            </button>
          </div>
        </div>
        <div className="col-span-4 py-4">
          <div className="bg-orange-100 p-4 rounded-lg border border-orange-200">
            <h1 className="text-xl font-semibold border-b border-gray-400 p-2 mb-6">
              Order Summary
            </h1>
            <div className=" border-b border-gray-400">
              <div className="flex justify-between p-2">
                <p>Subtotal</p>
                <span>&#8377;{cartItem.totalPrice}</span>
              </div>
              <div className="flex justify-between p-2">
                <p>Estimated Shipping</p>
                <span>&#8377;12.50</span>
              </div>
              <div className="flex justify-between p-2">
                <p>Estimated Tax</p>
                <span>&#8377;34</span>
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <h1 className="text-xl font-semibold">Total Amount</h1>
              <span className="text-xl font-bold text-red-900">
                &#8377; {cartItem.totalPrice + 12.5 + 34}
              </span>
            </div>
            <div className="mt-6 flex justify-center items-center">
              <button
                onClick={() => navigate("/order")}
                className="w-full bg-orange-600 text-white font-semibold p-2 rounded-lg text-lg flex items-center gap-2 justify-center"
              >
                Proceed to Checkout <ChevronRight size={18} />
              </button>
            </div>
            <div className="flex justify-center items-center gap-4 my-4 text-gray-500">
              <Banknote /> <CreditCard /> <Wallet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
