import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Navbar() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <>
      {/* // <!-- Navbar --> */}
      <nav className=" sticky top-0 flex items-center justify-between px-8 py-5 border-b border-gray-800 bg-white">
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
      </nav>
    </>
  );
}

export default Navbar;
