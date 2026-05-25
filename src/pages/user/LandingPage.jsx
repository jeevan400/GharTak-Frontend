import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar';
import { User } from 'lucide-react';

function LandingPage() {
    const navigate = useNavigate();
  return (
    <div>
        <Navbar>
          <li className="hover:text-black cursor-pointer ">Home</li>
                <li className="hover:text-black cursor-pointer ">Artisans</li>
                <li className="hover:text-black cursor-pointer ">Orders</li>
                <li
                  onClick={() => navigate("/profile")}
                  className=" cursor-pointer flex gap-2 border border-red-900 px-4 py-1 justify-center items-center rounded-full bg-red-900/10 text-red-900"
                >
                  <User size={20} />
                  Profile
                </li>
        </Navbar>
        {/* //   <!-- Hero Section --> */}
          <section className="min-h-screen flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-20">
        {/* <!-- Left Content --> */}
        <div className="max-w-xl">
          {/* <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Fast Delivery <br/>
            To Your <span className="text-orange-500">Doorstep</span>
          </h1> */}
          <p className="mt-6 text-gray-400 text-lg leading-8">
            Order groceries, electronics, fashion, and daily essentials
            with lightning fast delivery anywhere in your city.
          </p>
          <div className="mt-10 flex gap-5">
            <button className="px-8 py-4 bg-orange-500 rounded-xl text-lg font-semibold hover:bg-orange-600 transition">
              Shop Now
            </button>
            <button className="px-8 py-4 border border-gray-600 rounded-xl text-lg hover:border-orange-500 hover:text-orange-400 transition">
              Explore
            </button>
          </div>
        </div>
        {/* <!-- Right Image --> */}
        <div className="mt-16 md:mt-0">
          {/* <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e"
            alt="delivery"
            className="w-[500px] rounded-3xl shadow-2xl"
          /> */}
        </div>
        
          </section>
        
          {/* <!-- Features --> */}
          <section className="px-8 md:px-20 py-20 bg-gray-900">
        <h2 className="text-4xl font-bold text-center mb-14">
          Why Choose Us
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {/* <!-- Card 1 --> */}
          {/* <div className="bg-gray-800 p-8 rounded-2xl hover:scale-105 transition">
            <h3 className="text-2xl font-bold text-orange-400 mb-4">
              Fast Delivery
            </h3>
            <p className="text-gray-400 leading-7">
              Get your orders delivered within minutes at your doorstep.
            </p>
          </div> */}
          {/* <!-- Card 2 --> */}
          {/* <div className="bg-gray-800 p-8 rounded-2xl hover:scale-105 transition">
            <h3 className="text-2xl font-bold text-orange-400 mb-4">
              Secure Payments
            </h3>
            <p className="text-gray-400 leading-7">
              Multiple safe and secure payment methods available.
            </p>
          </div> */}
          {/* <!-- Card 3 --> */}
          {/* <div className="bg-gray-800 p-8 rounded-2xl hover:scale-105 transition">
            <h3 className="text-2xl font-bold text-orange-400 mb-4">
              Best Quality
            </h3>
            <p className="text-gray-400 leading-7">
              Premium quality products from trusted sellers and brands.
            </p>
          </div> */}
        </div>
        
          </section>
        
          {/* <!-- Footer --> */}
          <footer className="text-center py-8 border-t border-gray-800 text-gray-500">
        © 2026 GharTak. All Rights Reserved.
          </footer>
    </div>
  )
}

export default LandingPage
