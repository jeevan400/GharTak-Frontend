import React from "react";
import { updateProfile } from "../../services/auth.service";
import { useState } from "react";

function Modal({ onClose }) {
  const [form, setform] = useState({
    name: "",
    image: "",
    address: {
      street: "",
      city: "",
      state: "",
      pincode: "",
    },
    phone: "",
  });

  const handleModalClose = (e) => {
    onClose(false);
  };

  const handleUpdateData = async () => {
    try {
      const updateUser = await updateProfile(form);
      console.log(updateUser);
      alert("Profile Updated successfully.");
    } catch (e) {
      console.log(e);
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
                placeholder="Image"
                value={form.image}
                onChange={(e)=> setform({...form, image:e.target.value})}
            /> <br /> <br />
            <input type="text"
                className="border py-2 px-4 rounded-lg text-[16px] w-full"
                placeholder="Street"
                value={form.street}
                onChange={(e)=> setform({...form, address:{...form.address, street:e.target.value}})}
            /> <br /> <br />
            <input type="text"
                className="border py-2 px-4 rounded-lg text-[16px] w-full"
                placeholder="City"
                value={form.city}
                onChange={(e)=> setform({...form, address:{...form.address, city:e.target.value}})}
            /> <br /> <br />
            <input type="text"
                className="border py-2 px-4 rounded-lg text-[16px] w-full"
                placeholder="State"
                value={form.state}
                onChange={(e)=> setform({...form, address:{...form.address, state:e.target.value}})}
            /> <br /> <br />
            <input type="text"
                className="border py-2 px-4 rounded-lg text-[16px] w-full"
                placeholder="Pincode"
                value={form.pincode}
                onChange={(e)=> setform({...form, address:{...form.address, pincode:e.target.value}})}
            /> <br /> <br />
            <input type="text"
                className="border py-2 px-4 rounded-lg text-[16px] w-full"
                placeholder="Phone"
                value={form.phone}
                onChange={(e)=> setform({...form, phone:e.target.value})}
            /> <br /> <br />

            
        </div>
        {/* modal footer */}
        <div className="w-full h-[80px] border-t p-4 flex items-center justify-end"> 
            <button 
            className="bg-orange-600 rounded-lg px-6 py-2 cursor-pointer text-white text-[18px] font-semibold"
            onClick={handleUpdateData}>Edit</button>
            </div>
      </div>
    </div>
  );
}

export default Modal;
