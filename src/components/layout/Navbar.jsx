import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { ArrowBigLeft, Settings, User } from "lucide-react";

function Navbar({children}) {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <>
      {/* // <!-- Navbar --> */}
      {/* <nav className=" sticky top-0 flex items-center justify-between px-8 py-5 border-b border-gray-800 bg-white">
        <h1
          onClick={() => navigate("/home")}
          className="text-3xl font-bold text-orange-500 cursor-pointer"
        >
          GharTak
        </h1>
        <ul className="hidden md:flex gap-8 text-gray-500 font-medium">
          <li>
            <a href="#" className="hover:text-orange-400">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-orange-400">
              Products
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-orange-400">
              Categories
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-orange-400">
              Contact
            </a>
          </li>
        </ul>
        <div className="flex gap-4">
          {!user ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-5 py-2 border border-orange-500 rounded-lg hover:bg-orange-500 transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-5 py-2 bg-orange-500 rounded-lg hover:bg-orange-600 transition"
              >
                Signup
              </button>
            </>
          ) : (
            <>
              {user?.role === "admin" && (
                <button
                  onClick={() => navigate("/admin")}
                  className="px-5 py-2 bg-white rounded-lg text-orange-500 border  border-orange-500"
                >
                  Admin Dashboard
                </button>
              )}
              {user?.role === "seller" && (
                <button
                  onClick={() => navigate("/seller")}
                  className="px-5 py-2 bg-white rounded-lg text-orange-500 border  border-orange-500"
                >
                  Seller Dashboard
                </button>
              )}
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-orange-500 rounded-lg hover:bg-orange-600 transition text-white"
              >
                Logout
              </button>
              <div
                onClick={() => navigate("/profile")}
                className="rounded-full text-xl font-semibold bg-orange-100 text-orange-500 h-[40px] w-[40px]"
              >
                <img
                  className="w-full h-full rounded-full"
                  src={user.image}
                  alt="profile image"
                />
              </div>
            </>
          )}
        </div>
      </nav> */}
      <nav className="sticky top-0 bg-red-50 flex justify-between px-16 py-4 border-b border-red-900/15 z-50">
              <div className="flex justify-center items-center gap-4 text-2xl font-bold cursor-pointer">
                <span className="flex justify-center items-center ">
                  <ArrowBigLeft onClick={() => navigate(-1)} size={26} />
                </span>
                GharTak
              </div>
              <ul className="flex justify-center items-center gap-8 text-lg font-semibold text-gray-600">
                {/* <li className="hover:text-black cursor-pointer ">Home</li>
                <li className="hover:text-black cursor-pointer ">Artisans</li>
                <li className="hover:text-black cursor-pointer ">Orders</li>
                <li
                  onClick={() => navigate("/profile")}
                  className=" cursor-pointer flex gap-2 border border-red-900 px-4 py-1 justify-center items-center rounded-full bg-red-900/10 text-red-900"
                >
                  <User size={20} />
                  Profile
                </li> */}

                {
                  children
                }
              </ul>
              <div className="flex gap-4">
          {!user ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className=" cursor-pointer flex gap-2 border border-red-900 px-4 py-1 justify-center items-center rounded-full bg-red-900/10 text-red-900"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className=" cursor-pointer flex gap-2 border border-red-900 px-4 py-1 justify-center items-center rounded-full bg-red-900/10 text-red-900"
              >
                Signup
              </button>
            </>
          ) : (
            <>
              {user?.role === "admin" && (
                <button
                  onClick={() => navigate("/admin")}
                  className=" cursor-pointer flex gap-2 border border-red-900 px-4 py-1 justify-center items-center rounded-full bg-red-900/10 text-red-900"
                >
                  Admin Dashboard
                </button>
              )}
              {user?.role === "seller" && (
                <button
                  onClick={() => navigate("/seller")}
                  className=" cursor-pointer flex gap-2 border border-red-900 px-4 py-1 justify-center items-center rounded-full bg-red-900/10 text-red-900"
                >
                  Seller Dashboard
                </button>
              )}
              <button
                onClick={handleLogout}
                className=" cursor-pointer flex gap-2 border border-red-900 px-4 py-1 justify-center items-center rounded-full bg-red-900 text-white"
              >
                Logout
              </button>
              <div
                onClick={() => navigate("/profile")}
                className="rounded-full text-xl font-semibold bg-orange-100 text-orange-500 h-[40px] w-[40px]"
              >
                <img
                  className="w-full h-full rounded-full"
                  src={user.image}
                  alt="profile image"
                />
              </div>
            </>
          )}
          </div>
              {/* <div className="flex justify-center items-center cursor-pointer">
                <Settings />
              </div> */}
            </nav>
    </>
  );
}

export default Navbar;
