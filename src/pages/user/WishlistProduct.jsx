import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { getSingleWishList } from '../../services/wishlist.service';
import { Plus, Star } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import { addToCart } from '../../services/cart.service';

function WishlistProduct() {
    const [products, setProducts] = useState([]);

    const fetchWishinglist = async () => {
        try{
            const res = await getSingleWishList();
            setProducts(res.products);
        } catch(e){
            console.log(e);
            toast.error(e.response.data.message || e.message || "wishing list request failed.");
        }
    }

    useEffect(()=>{
        fetchWishinglist();
    },[]);

    const handleAddToCart = async (id) => {
        try{
            const res = await addToCart({
                productId:id,
                quantity:1
            });

            toast.success(res.message);
        } catch(e){
            console.log(e);
            toast.error(e.response.data.message || e.message);
        }
    } 

  return (
    <div>
        {/* <Navbar/> */}
        <div className='grid grid-cols-5 gap-4 p-8'>
          {
            products?.map((product)=> (
                <div
                    key={product._id}
                    className="w-full max-h-[400px] border border-red-900/30 rounded-md hover:shadow-md transition-all duration-200 ease-in cursor-pointer"
                  >
                    <div className="w-full h-[220px]">
                      <img
                        className="h-full w-full rounded-tl-md rounded-tr-md"
                        src={product?.image}
                        alt="product image"
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between gap-4 ">
                      <div className="flex flex-col gap-1">
                        <h1 className="text-[12px] font-bold text-red-900 tracking-wider line-clamp-1">
                          {product?.description}
                        </h1>
                        <p className="text-[14px] font-bold truncate">
                          {product?.name}
                        </p>
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
                          &#8377;349.00
                        </span>
                        <span onClick={() => handleAddToCart(product._id)} className="text-white bg-black p-2 rounded-md relative hover:scale-105 transition-all duration-200 ease-in group">
                          <Plus
                            className="group-hover:scale-105 transition-all duration-200 ease-in"
                            size={16}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
            ))
          }
        </div>
    </div>
  )
}

export default WishlistProduct;
