import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getSingleWishList } from "../../services/wishlist.service";
import { Plus, Star, Heart, ShoppingCart } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import { addToCart } from "../../services/cart.service";
import ProductCard from "../../components/common/home/ProductCard";

function WishlistProduct() {
  const [products, setProducts] = useState([]);

  const fetchWishinglist = async () => {
    try {
      const res = await getSingleWishList();
      setProducts(res.products);
    } catch (e) {
      console.log(e);
      toast.error(
        e.response?.data?.message || e.message || "wishing list request failed.",
      );
    }
  };

  useEffect(() => {
    fetchWishinglist();
  }, []);

  const handleAddToCart = async (id) => {
    try {
      const res = await addToCart({
        productId: id,
        quantity: 1,
      });

      toast.success(res.message);
    } catch (e) {
      console.log(e);
      toast.error(e.response?.data?.message || e.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-3.5 rounded-2xl shadow-sm border border-orange-100">
              <Heart className="text-orange-600" size={26} fill="currentColor" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">My Wishlist</h1>
              <p className="text-sm font-medium text-gray-500 mt-0.5">
                {products?.length || 0} {products?.length === 1 ? 'item' : 'items'} saved for later
              </p>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {products?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                handleAddToCart={handleAddToCart}
                wishListProduts={products.map(p => p?._id?.toString())}
                product={product}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[2rem] border border-dashed border-gray-200 shadow-sm">
            <div className="bg-orange-50 p-8 rounded-full mb-6">
              <Heart className="text-orange-400" size={64} strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8 text-center max-w-md font-medium text-sm leading-relaxed">
              Looks like you haven't saved any items yet. Explore our premium collection and add your favorites here!
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-1">
              Explore Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default WishlistProduct;
