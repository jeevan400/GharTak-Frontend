import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import { deleteProduct, getAllProducts } from "../../services/product.service";
import ProductModal from "../seller/ProductModal";
import { addToCart } from "../../services/cart.service";
import home from "../../assets/home.jpg";
import toast from "react-hot-toast";

function Home() {
  const [isProducts, setIsProduct] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState(null);
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
  };

  const showToken = () => {
    const token = localStorage.getItem("token");
    // console.log(token);
  };

  // get all products
  const fetchAllProducts = async () => {
    try {
      const products = await getAllProducts();
      setIsProduct(products);
      // setError(e?.response?.data?.message || e.message );
      console.log("these are all products : ", products.products);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleIsModalOpen = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteData = async (id) => {
    try {
      await deleteProduct(id);

      setIsProduct((prev) => ({
        ...prev,
        products: prev.products.filter((product) => product._id !== id),
      }));

      alert("Product Deleted successfully.");
    } catch (e) {
      console.log(e);
    }
  };

  const handleNavigate = (id) => {
    navigate(`/single-product/${id}`);
  };

  const handleAddToCart = async (id) => {
      try{
        const data = await addToCart({
          productId:id,
          quantity:1
        });
      
        console.log(data);
          // alert("Product added successfully in the cart section");
          toast.success(data.message);
      } catch(e){
        console.log(e);
      }
    }
  return (
    <div>
      <Navbar />

      <div style={{background:`url(${home})`, backgroundSize:"cover", }} className="h-[60vh] w-[100%] bg-green-400">

      </div>

      <div className="flex flex-wrap gap-4">
        {
          error && <p>{error}</p>
        }
        {isProducts.products?.map((product) => (
          <div
            key={product._id}
            className="w-[270px] shadow-lg mt-4 ml-4 rounded-xl pb-4 border"
          >
            <Link to={`/single-product/${product._id}`}>
              <img
                className="w-full h-[300px]"
                src={product.image || boy}
                alt="product image"
              />
              <div className="flex p-2">
                <div>
                  <h1 className="text-xl font-bold">{product.name}</h1>
                  <p className="font-semibold line-clamp-1 w-[70%]">
                    {product.description}
                  </p>
                </div>
                <div>
                  <span className="text-xl">&#8377;{product.price}</span>
                </div>
              </div>
            </Link>
            <div>
              <div></div>
              <span className="p-2 text-green-600 font-bold">
                In Stock: {product.stock}
              </span>
            </div>

            {user.role === "seller" && user.id === product.seller ? (
              <>
                <div className=" flex gap-4 justify-end p-2">
                  <button
                    onClick={() => handleIsModalOpen(product)}
                    className="bg-orange-400 text-xs font-semibold text-white rounded-lg px-4 py-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteData(product._id)}
                    className="bg-gray-900 text-xs font-semibold text-white rounded-lg px-4 py-1"
                  >
                    Delete
                  </button>
                </div>
                {console.log("this is user id : ", user)}
                {isModalOpen && selectedProduct ? (
                  <ProductModal
                    product={selectedProduct}
                    onClose={setIsModalOpen}
                    refreshProducts={fetchAllProducts}
                  />
                ) : (
                  ""
                )}
              </>
            ) : (
              <>
                <div className=" flex gap-4 justify-end p-2">
                  <button className="bg-orange-400 text-xs font-semibold text-white rounded-lg px-4 py-1">
                    Buy
                  </button>
                  <button onClick={()=> handleAddToCart(product._id)} className="bg-gray-900 text-xs font-semibold text-white rounded-lg px-4 py-1">
                    Add to Cart
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      {/* <nav class="flex items-center justify-between px-8 py-5 border-b border-gray-800">
        
        <h1 class="text-3xl font-bold text-orange-500">
          GharTak
        </h1>
        <div class="flex gap-4">
          {
            user?.role === "admin" && (
              <button
                onClick={()=> navigate("/admin")}
                className="px-5 py-2 bg-red-500 rounded-lg text-white"
              >Admin Dashboard</button>
            )
          }
          <button onClick={()=> navigate("/profile")} class="px-5 py-2 border border-orange-500 rounded-lg hover:bg-orange-500 transition">
            Profile
          </button>
          <div></div>
          <button onClick={handleLogout} class="px-5 py-2 bg-orange-500 rounded-lg hover:bg-orange-600 transition text-white">
            Logout
          </button>
        </div>
        
          </nav> */}

      {/* //   <!-- Hero Section --> */}
      {/* <section class="min-h-screen flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-20"> */}
        {/* <!-- Left Content --> */}
        {/* <div class="max-w-xl">
          <h1 class="text-5xl md:text-7xl font-extrabold leading-tight">
            Fast Delivery <br />
            To Your <span class="text-orange-500">Doorstep</span>
          </h1>
          <p class="mt-6 text-gray-400 text-lg leading-8">
            Order groceries, electronics, fashion, and daily essentials with
            lightning fast delivery anywhere in your city.
          </p>
          <div class="mt-10 flex gap-5">
            <button class="px-8 py-4 bg-orange-500 rounded-xl text-lg font-semibold hover:bg-orange-600 transition">
              Shop Now
            </button>
            <button class="px-8 py-4 border border-gray-600 rounded-xl text-lg hover:border-orange-500 hover:text-orange-400 transition">
              Explore
            </button>
          </div>
        </div> */}
        {/* <!-- Right Image --> */}
        {/* <div class="mt-16 md:mt-0">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e"
            alt="delivery"
            class="w-[500px] rounded-3xl shadow-2xl"
          />
        </div> */}
        <div className="flex justify-center items-center">
          <div className="fixed bg-white bottom-12 w-[60%] p-8 rounded-xl flex justify-between border border-gray-300 shadow-lg">
          <div>
            <h1 className="text-xl font-bold">Add more items</h1>
            <p className="text-sm font-semibold text-gray-500">get new offer</p>
          </div>
          <button onClick={()=> navigate("/get-cart")} className="border border-orange-500 text-orange-500 text-lg px-6 rounded-full">Go to Cart</button>
        </div>
        </div>
        
      {/* </section> */}

      

      {/* <!-- Footer --> */}
      <footer className="text-center py-8 border-t border-gray-800 text-gray-500">
        © 2026 GharTak. All Rights Reserved.
      </footer>
    </div>
  );
}

export default Home;
