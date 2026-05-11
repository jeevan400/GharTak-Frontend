import React, { useState } from 'react'
import { addProduct } from '../../services/product.service';


function AddProduct() {
  const [form, setForm] = useState({
    name:"",
    description:"",
    price:"",
    category:"",
    brand:"",
    stock:"",
    image:""
  });

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try{
      await addProduct({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        image: [form.image],
      });
      alert("Product added successfully!");
    } catch(e){
      const message = e?.response?.data?.message || e.message || "Unknown error";
      console.error("Add product failed:", message, e);
      alert(`Could not add product: ${message}`);
    }
  }
  return (
    <div className="bg-orange-100 w-[100%] h-screen flex items-center justify-center">
      <div className="w-[50%] bg-white flex flex-col gap-4 p-6 rounded-lg">
    <form onSubmit={handleAddProduct}>
      <label htmlFor="">Product Name</label><br />
      <input className="border py-2 px-4 rounded-lg text-[16px]" value={form.name} onChange={(e)=> setForm({...form, name:e.target.value})} type="text" placeholder='Enter product name ' required /> <br /> <br />

      <label htmlFor="">Product Description</label><br />
      <input className="border py-2 px-4 rounded-lg text-[16px]" value={form.description} onChange={(e)=> setForm({...form, description:e.target.value})} type="text" placeholder='Enter product Description ' required /> <br /> <br />

      <label htmlFor="">Price</label><br />
      <input className="border py-2 px-4 rounded-lg text-[16px]" value={form.price} onChange={(e)=> setForm({...form, price:e.target.value})} type="number" placeholder='Enter product price ' required /> <br /> <br />

      <label htmlFor="">category</label><br />
      <select className="border py-2 px-4 rounded-lg text-[16px]" value={form.category} onChange={(e)=> setForm({...form, category:e.target.value})} required >
        <option value="">Choose category</option>
        <option value="electronics">Electronics</option>
        <option value="fashion">Fashion</option>
        <option value="grocery">Grocery</option>
        <option value="home">Home</option>
        </select> <br /> <br />

      <label htmlFor="">Brand</label><br />
      <input className="border py-2 px-4 rounded-lg text-[16px]" value={form.brand} onChange={(e)=> setForm({...form, brand:e.target.value})} type="text" placeholder='Enter product Brand ' required /> <br /> <br />

      <label htmlFor="">Stock</label><br />
      <input className="border py-2 px-4 rounded-lg text-[16px]" value={form.stock} onChange={(e)=> setForm({...form, stock:e.target.value})} type="number" placeholder='Enter product Stock ' required /> <br /> <br />

      <label htmlFor="">Product Image</label><br />
      <input className="border py-2 px-4 rounded-lg text-[16px]" value={form.image} onChange={(e)=> setForm({...form, image:e.target.value})} type="text" placeholder='Enter product Image Url ' required /> <br /> <br />

      <button
      className="bg-orange-600 rounded-lg p-2 cursor-pointer text-white text-[16px] font-semibold" type='submit'>Add Product</button>
    </form>
    </div>
    </div>
  )
}

export default AddProduct
