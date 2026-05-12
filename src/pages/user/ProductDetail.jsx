import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSingleProduct } from '../../services/product.service';
import Navbar from '../../components/layout/Navbar';
import { addToCart } from '../../services/cart.service';

function ProductDetail() {
  const {id} = useParams();
  const [product, setProduct] = useState({});

  const fetchProduct = async () => {
    const res = await getSingleProduct(id);
    console.log(res);
    setProduct(res);
  }
  
  useEffect(()=>{
    fetchProduct();
  },[]);

  const handleAddToCart = async () => {
    try{
      const data = await addToCart({
        productId:id,
        quantity:1
      });
    
      console.log(data);
        alert("Product added successfully in the cart section");
    } catch(e){
      console.log(e);
    }
  }
  return (
    <div>
     <Navbar/>
     <div className='flex items bg-center justify-between p-8'>
      <img className='h-[300px] w-[300px]' src={product.image} alt="" />
      <div className='flex flex-col gap-2 justify-center'>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <span>Stock : {product.stock}</span> <span className='text-lg font-bold text-red-900'>&#8377;{product.price}</span>
        <div className='flex gap-6'>
          <button className='text-md font-bold border px-4 py-2 rounded-lg bg-orange-400 text-white'>Buy</button>
          <button onClick={handleAddToCart} className='text-md font-bold border px-4 py-2 rounded-lg bg-gray-900 text-white'>Add to cart</button>
        </div>
      </div>
     </div>
    </div>
  )
}

export default ProductDetail
