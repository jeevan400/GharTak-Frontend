import React, { useState } from 'react'
import { addProduct } from '../../../services/product.service';
import toast from 'react-hot-toast';
import { Package, AlignLeft, DollarSign, List, Tag, Cuboid, Image as ImageIcon, PlusCircle } from 'lucide-react';

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
      const data = await addProduct({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        image: [form.image],
      });
      // alert("Product added successfully!");
      toast.success(data.message);
      // Optional: Clear form on success
      setForm({ name:"", description:"", price:"", category:"", brand:"", stock:"", image:"" });
    } catch(e){
      const message = e?.response?.data?.message || e.message || "Unknown error";
      console.error("Add product failed:", message, e);
      alert(`Could not add product: ${message}`);
    }
  }

  return (
    <div className="min-h-full bg-[var(--bg-main)] p-4 sm:p-6 lg:p-8 flex justify-center items-start font-sans">
      <div className="w-full max-w-4xl bg-white shadow-[var(--shadow-md)] rounded-3xl p-6 sm:p-10 border border-[var(--border-light)]">
        
        <div className="mb-8 border-b border-[var(--border-light)] pb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] flex items-center gap-3">
            <Package className="text-[var(--primary)]" size={32} />
            Add New Product
          </h1>
          <p className="text-[var(--text-secondary)] font-medium mt-2 text-[15px]">
            Fill in the details below to list a new product on your store.
          </p>
        </div>

        <form onSubmit={handleAddProduct} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Product Name */}
            <div className="md:col-span-2">
              <label className="text-[13px] font-extrabold text-[var(--text-primary)] mb-1.5 block">Product Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Package size={18} className="text-gray-400" />
                </div>
                <input 
                  className="appearance-none block w-full pl-11 pr-4 py-3 border border-[var(--border-medium)] rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent sm:text-sm transition-all text-[var(--text-primary)] font-medium bg-gray-50/50 focus:bg-white" 
                  value={form.name} 
                  onChange={(e)=> setForm({...form, name:e.target.value})} 
                  type="text" 
                  placeholder="E.g., Premium Wireless Headphones" 
                  required 
                />
              </div>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="text-[13px] font-extrabold text-[var(--text-primary)] mb-1.5 block">Description</label>
              <div className="relative">
                <div className="absolute top-3.5 left-0 pl-4 pointer-events-none">
                  <AlignLeft size={18} className="text-gray-400" />
                </div>
                <textarea 
                  className="appearance-none block w-full pl-11 pr-4 py-3 border border-[var(--border-medium)] rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent sm:text-sm transition-all text-[var(--text-primary)] font-medium min-h-[120px] bg-gray-50/50 focus:bg-white" 
                  value={form.description} 
                  onChange={(e)=> setForm({...form, description:e.target.value})} 
                  placeholder="Describe your product's features and benefits..." 
                  required 
                />
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="text-[13px] font-extrabold text-[var(--text-primary)] mb-1.5 block">Price (₹)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <DollarSign size={18} className="text-gray-400" />
                </div>
                <input 
                  className="appearance-none block w-full pl-11 pr-4 py-3 border border-[var(--border-medium)] rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent sm:text-sm transition-all text-[var(--text-primary)] font-medium bg-gray-50/50 focus:bg-white" 
                  value={form.price} 
                  onChange={(e)=> setForm({...form, price:e.target.value})} 
                  type="number" 
                  min="0"
                  step="0.01"
                  placeholder="0.00" 
                  required 
                />
              </div>
            </div>

            {/* Stock */}
            <div>
              <label className="text-[13px] font-extrabold text-[var(--text-primary)] mb-1.5 block">Available Stock</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Cuboid size={18} className="text-gray-400" />
                </div>
                <input 
                  className="appearance-none block w-full pl-11 pr-4 py-3 border border-[var(--border-medium)] rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent sm:text-sm transition-all text-[var(--text-primary)] font-medium bg-gray-50/50 focus:bg-white" 
                  value={form.stock} 
                  onChange={(e)=> setForm({...form, stock:e.target.value})} 
                  type="number"
                  min="0"
                  placeholder="Enter quantity" 
                  required 
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="text-[13px] font-extrabold text-[var(--text-primary)] mb-1.5 block">Category</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <List size={18} className="text-gray-400" />
                </div>
                <select 
                  className="appearance-none block w-full pl-11 pr-10 py-3 border border-[var(--border-medium)] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent sm:text-sm transition-all text-[var(--text-primary)] font-medium bg-gray-50/50 focus:bg-white" 
                  value={form.category} 
                  onChange={(e)=> setForm({...form, category:e.target.value})} 
                  required 
                >
                  <option value="" disabled>Select a category</option>
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="grocery">Grocery</option>
                  <option value="home">Home & Furniture</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            {/* Brand */}
            <div>
              <label className="text-[13px] font-extrabold text-[var(--text-primary)] mb-1.5 block">Brand Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Tag size={18} className="text-gray-400" />
                </div>
                <input 
                  className="appearance-none block w-full pl-11 pr-4 py-3 border border-[var(--border-medium)] rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent sm:text-sm transition-all text-[var(--text-primary)] font-medium bg-gray-50/50 focus:bg-white" 
                  value={form.brand} 
                  onChange={(e)=> setForm({...form, brand:e.target.value})} 
                  type="text" 
                  placeholder="Enter brand name" 
                  required 
                />
              </div>
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
              <label className="text-[13px] font-extrabold text-[var(--text-primary)] mb-1.5 block">Product Image URL</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <ImageIcon size={18} className="text-gray-400" />
                </div>
                <input 
                  className="appearance-none block w-full pl-11 pr-4 py-3 border border-[var(--border-medium)] rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent sm:text-sm transition-all text-[var(--text-primary)] font-medium bg-gray-50/50 focus:bg-white" 
                  value={form.image} 
                  onChange={(e)=> setForm({...form, image:e.target.value})} 
                  type="url" 
                  placeholder="https://example.com/image.jpg" 
                  required 
                />
              </div>
            </div>
            
            {/* Image Preview (Optional but nice UX if they type a URL) */}
            {form.image && (
              <div className="md:col-span-2 pt-2">
                <p className="text-[13px] font-extrabold text-[var(--text-primary)] mb-2">Image Preview</p>
                <div className="w-full h-56 rounded-2xl border border-[var(--border-medium)] bg-gray-50 flex items-center justify-center overflow-hidden shadow-inner p-2">
                  <img 
                    src={form.image} 
                    alt="Preview" 
                    className="max-h-full max-w-full object-contain rounded-xl"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/400x200?text=Invalid+Image+URL' }}
                  />
                </div>
              </div>
            )}

          </div>

          <div className="pt-6 mt-8 border-t border-[var(--border-light)]">
            <button
              style={{ background: "var(--gradient-primary)" }}
              className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-[0_4px_10px_rgba(249,115,22,0.2)] text-[15px] font-bold text-white hover:shadow-[0_6px_15px_rgba(249,115,22,0.35)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)] transition-all duration-300"
              type="submit"
            >
              <PlusCircle size={20} strokeWidth={2.5} />
              PUBLISH PRODUCT
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AddProduct;
