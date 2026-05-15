import React, { useEffect, useState } from "react";
import { deleteProduct, updateProduct } from "../../services/product.service";
import toast from "react-hot-toast";

function Modal({ product, onClose, refreshProducts }) {
  const [form, setform] = useState({
    name: "",
    description: "",
    price: "",
    brand: "",
    stock: "",
  });

  useEffect(() => {
    if (product) {
      setform({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        brand: product.brand || "",
        stock: product.stock || "",
      });
    }
  }, [product]);

  const handleModalClose = (e) => {
    onClose(false);
  };

  const handleUpdateData = async () => {
    try {
     const data = await updateProduct(product._id, {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        brand: form.brand,
        stock: Number(form.stock),
      });
      // alert("Product Updated successfully.");
      toast.success(data.message);
      refreshProducts?.();
      onClose(false);
    } catch (e) {
      console.log(e);
      alert(e?.response?.data?.message || e.message || "Update failed");
    }
  };
  return (
    <div
      onClick={handleModalClose}
      className="fixed h-screen w-[100%] top-0 left-0 bg-black/50 flex justify-center items-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col w-[80%] h-[90%] bg-white rounded-xl"
      >
        {/* modal header */}
        <div className="w-full h-[100px] border-b"></div>
        {/* modal body */}
        <div className="flex-1 p-4 overflow-y-auto">
            <input type="text"
                className="border py-2 px-4 rounded-lg text-[16px] w-full"
                placeholder="Name"
                value={form.name}
                onChange={(e)=> setform({...form, name:e.target.value})}
            /> <br /> <br />
            <input type="text"
                className="border py-2 px-4 rounded-lg text-[16px] w-full"
                placeholder="Description"
                value={form.description}
                onChange={(e)=> setform({...form, description:e.target.value})}
            /> <br /> <br />
            <input type="number"
                className="border py-2 px-4 rounded-lg text-[16px] w-full"
                placeholder="Price"
                value={form.price}
                onChange={(e)=> setform({...form, price:e.target.value})}
            /> <br /> <br />
            {/* <input type="text"
                className="border py-2 px-4 rounded-lg text-[16px] w-full"
                placeholder="Category"
                value={form.category}
                onChange={(e)=> setform({...form, category:e.target.value})}
            /> <br /> <br /> */}
            <input type="text"
                className="border py-2 px-4 rounded-lg text-[16px] w-full"
                placeholder="Brand"
                value={form.brand}
                onChange={(e)=> setform({...form, brand:e.target.value})}
            /> <br /> <br />
            <input type="text"
                className="border py-2 px-4 rounded-lg text-[16px] w-full"
                placeholder="Stock"
                value={form.stock}
                onChange={(e)=> setform({...form, stock:e.target.value})}
            /> <br /> <br />
            {/* <input type="text"
                className="border py-2 px-4 rounded-lg text-[16px] w-full"
                placeholder="Phone"
                value={form.phone}
                onChange={(e)=> setform({...form, phone:e.target.value})}
            /> <br /> <br /> */}

            
        </div>
        {/* modal footer */}
        <div className="w-full h-[80px] border-t p-4 flex items-center justify-end"> 
            <button 
            className="bg-orange-600 rounded-lg px-6 py-2 cursor-pointer text-white text-[18px] font-semibold"
            onClick={handleUpdateData}>Edit Product</button>
            </div>
      </div>
    </div>
  );
}

export default Modal;
