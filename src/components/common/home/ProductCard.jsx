import { Plus, Star } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function ProductCard({
  handleAddToCart,
  wishListProduts,
  addProductWishList,
  product,
}) {
  return (
    <div
      key={product._id}
      className="w-full max-h-[400px] border border-red-900/30 rounded-md hover:shadow-md transition-all duration-200 ease-in cursor-pointer"
    >
      <div className="w-full h-[220px] relative">
        <Link to={`/single-product/${product._id}`}>
          <img
            className="h-full w-full rounded-tl-md rounded-tr-md"
            src={product?.image}
            alt="product image"
          />
        </Link>
        <span
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addProductWishList(product._id);
          }}
          className="absolute top-2 right-2 bg-white p-2 rounded-lg text-[var(--text-secondary)]"
        >
          {wishListProduts?.includes(product._id.toString()) ? (
            <i className="fa-solid fa-heart text-red-500"></i>
          ) : (
            <i className="fa-regular fa-heart"></i>
          )}
        </span>
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between gap-4 ">
        <div className="flex flex-col gap-1">
          <h1 className="text-[12px] font-bold text-red-900 tracking-wider line-clamp-1">
            {product?.description}
          </h1>
          <p className="text-[14px] font-bold truncate">{product?.name}</p>
          <div className="flex gap-2 text-red-900">
            <Star size={16} />
            <Star size={16} />
            <Star size={16} />
            <Star size={16} />
            <Star size={16} />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-red-900">
            &#8377;{product?.price}
          </span>
          <span
            onClick={() => handleAddToCart(product._id)}
            className="text-white bg-black p-2 rounded-md relative hover:scale-105 transition-all duration-200 ease-in group"
          >
            <Plus
              className="group-hover:scale-105 transition-all duration-200 ease-in"
              size={16}
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
