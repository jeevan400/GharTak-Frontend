import { Plus, Star, ShoppingCart, Heart, Edit3, Trash2 } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function ProductCard({
  handleAddToCart,
  wishListProduts,
  addProductWishList,
  product,
  isSellerMode = false,
  onEdit,
  onDelete,
}) {
  const isWishlisted = wishListProduts?.includes(product?._id?.toString());

  return (
    <div className="group relative w-full h-[380px] bg-white rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.3)] hover:-translate-y-2 border border-gray-100 flex flex-col z-10">
      
      {/* Image Section */}
      <div className="relative h-[220px] w-full overflow-hidden bg-gray-50 flex-shrink-0">
        <Link to={`/single-product/${product._id}`} className="block h-full w-full">
          <img
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            src={product?.image}
            alt={product?.name}
          />
        </Link>

        {/* Futuristic Top-Right Badge/Wishlist */}
        {!isSellerMode && (
          <div className="absolute top-0 right-0 p-3 flex flex-col gap-2 z-20">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addProductWishList && addProductWishList(product._id);
              }}
              className="relative h-10 w-10 flex items-center justify-center rounded-2xl bg-white/70 backdrop-blur-md border border-white shadow-lg overflow-hidden group/btn hover:scale-110 transition-transform duration-300"
            >
              {/* Hover fill animation background */}
              <div className={`absolute inset-0 transition-transform duration-300 ease-out origin-bottom ${isWishlisted ? 'bg-orange-500 scale-y-100' : 'bg-orange-500 scale-y-0 group-hover/btn:scale-y-100'}`}></div>
              
              <Heart 
                size={18} 
                className={`relative z-10 transition-colors duration-300 ${isWishlisted ? 'text-white fill-white' : 'text-gray-500 group-hover/btn:text-white'}`} 
              />
            </button>
          </div>
        )}

        {/* Futuristic Category Badge & Seller Badges */}
        <div className="absolute top-4 left-0 flex flex-col gap-2">
          <div className="bg-gray-900/80 backdrop-blur-md text-white text-[10px] font-bold px-4 py-1.5 rounded-r-full uppercase tracking-[0.2em] shadow-lg border-y border-r border-gray-700/50 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out">
            {product?.category || "Featured"}
          </div>
          {isSellerMode && (
             <div className={`text-white text-[10px] font-bold px-4 py-1.5 rounded-r-full uppercase tracking-[0.2em] shadow-lg border-y border-r border-gray-700/50 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out delay-75 ${product?.isActive ? 'bg-[var(--success)]' : 'bg-[var(--danger)]'}`}>
               {product?.isActive ? "Live" : "Disabled"}
             </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-5 flex flex-col justify-between relative bg-white z-20">
        <div>
          <div className="flex justify-between items-start mb-2 gap-2">
            <h1 className="text-[10px] font-bold text-orange-500 uppercase tracking-widest line-clamp-1">
              {product?.description || "Premium"}
            </h1>
            <div className="flex gap-0.5 text-orange-400 bg-orange-50 px-1.5 py-0.5 rounded-full border border-orange-100">
              <Star size={10} fill="currentColor" />
              <span className="text-[10px] font-bold text-orange-600 ml-0.5 leading-none">4.8</span>
            </div>
          </div>
          <Link to={`/single-product/${product._id}`}>
            <h2 className="text-base font-extrabold text-gray-900 line-clamp-2 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[var(--primary)] group-hover:to-orange-400 transition-all duration-300">
              {product?.name}
            </h2>
          </Link>
        </div>

        <div className="flex justify-between items-end mt-4">
          <div className="flex flex-col">
            <span className="text-[11px] text-gray-400 font-semibold line-through decoration-gray-300 mb-0.5">
              &#8377;{(parseFloat(product?.price || 0) * 1.3).toFixed(2)}
            </span>
            <span className="text-xl font-black text-gray-900 tracking-tight">
              &#8377;{product?.price}
            </span>
            {isSellerMode && (
              <span className="text-[11px] text-green-600 font-bold whitespace-nowrap mt-1">
                Stock: {product?.stock}
              </span>
            )}
          </div>

          {isSellerMode ? (
            <div className="flex gap-2">
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEdit && onEdit(product); }}
                className="h-10 w-10 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center transition-all duration-300 hover:shadow-[0_8px_15px_rgba(249,115,22,0.4)] hover:-translate-y-1"
                title="Edit Product"
              >
                <Edit3 size={16} />
              </button>
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete && onDelete(product._id); }}
                className="h-10 w-10 rounded-xl bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-all duration-300 hover:shadow-[0_8px_15px_rgba(239,68,68,0.4)] hover:-translate-y-1"
                title="Delete Product"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleAddToCart && handleAddToCart(product._id)}
              className="h-12 w-12 rounded-2xl bg-gray-900 hover:bg-[var(--primary)] text-white flex items-center justify-center transition-all duration-300 shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_20px_rgba(249,115,22,0.5)] group/cart hover:-rotate-6 hover:scale-110"
            >
              <ShoppingCart size={18} className="transition-transform duration-300 group-hover/cart:-translate-y-0.5" />
            </button>
          )}
        </div>
      </div>

      {/* Decorative futuristic glow lines */}
      <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[var(--primary)] to-yellow-400 w-0 group-hover:w-full transition-all duration-700 ease-out z-30"></div>
      <div className="absolute top-0 right-0 w-1 bg-gradient-to-b from-[var(--primary)] to-yellow-400 h-0 group-hover:h-full transition-all duration-700 ease-out delay-100 z-30"></div>
    </div>
  );
}

export default ProductCard;
