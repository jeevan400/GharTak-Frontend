import { Circle, Plus } from "lucide-react";
import React from "react";

function ProductCardSkeleton() {
  return (
    <div
      className="w-full max-h-[400px] border border-gray-200 rounded-md hover:shadow-md transition-all duration-200 ease-in cursor-pointer "
    >
      <div className="w-full h-[220px] bg-gray-200 relative animate-pulse">
        
        <span
          className="absolute top-2 right-2 bg-gray-300 p-2 rounded-lg text-[var(--text-secondary)] animate-pulse"
        >
            <i className="fa-regular fa-heart text-gray-300"></i>
        </span>
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between gap-4 ">
        <div className="flex flex-col gap-1">
          <h1 className="text-[12px] font-bold h-4 bg-gray-200 tracking-wider line-clamp-1 animate-pulse">
    
          </h1>
          <p className="text-[14px] font-bold truncate bg-gray-200 h-6 animate-pulse"></p>
          <div className="flex gap-2 text-gray-200 ">
            <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold h-6 w-14 bg-gray-200 animate-pulse">
           
          </span>
          <span
            className="text-gray-200 bg-gray-200 p-2 rounded-md relative hover:scale-105 transition-all duration-200 ease-in group animate-pulse"
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

export default ProductCardSkeleton;
