import React, { useContext, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import { deleteProduct, getAllProducts } from "../../services/product.service";
import ProductModal from "../seller/ProductModal";
import { addToCart, getCartItems } from "../../services/cart.service";
import home from "../../assets/homeImageGharTak.png";
import GharTakHomeImage from "../../assets/home/categories/GharTakHomeImage.png";
import Gradient from "../../assets/Gradient.png";
import toast from "react-hot-toast";
import Electronic from "../../assets/home/categories/Electronics.png";
import Fashion from "../../assets/home/categories/Fashion.png";
import HomeIcon from "../../assets/home/categories/homeGhar.png";
import Grocery from "../../assets/home/categories/Grocery.png";
import Beauty from "../../assets/home/categories/beauty.png";
import Appliance from "../../assets/home/categories/appliance.png";
import {
  addWishList,
  getSingleWishList,
} from "../../services/wishlist.service";
import { Heart, Plus, ShoppingCart, Star, ChevronRight, ArrowRight } from "lucide-react";
import { SearchContext } from "../../store/context/SearchContext";
import ProductCard from "../../components/common/home/ProductCard";
import ProductCardSkeleton from "../../components/common/home/ProductCardSkeleton";

function Home() {
  const [isProducts, setIsProduct] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState(null);
  const [wishListProduts, setWishListProducts] = useState([]);
  const [debouncingSearch, setDbouncingSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isTotalPages, setIsTotalPages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { search, isCart, setIsCart } = useContext(SearchContext);

  const { logout, user } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
  };

  const showToken = () => {
    const token = localStorage.getItem("token");
  };

  // get all products
  const fetchAllProducts = async () => {
    try {
      setIsLoading(true);
      const products = await getAllProducts(
        debouncingSearch,
        currentPage,
        limit,
      );
      const cartItems = await getCartItems();
      const singleWishList = await getSingleWishList();
      setIsProduct(products);
      setWishListProducts(
        singleWishList.products?.map((item) =>
          item?._id ? item._id.toString() : item.toString(),
        ) || [],
      );

      // set array element here
      let pageArray = [];
      for (let i = 1; i <= products.totalPages; i++) {
        pageArray.push(i);
      }
      setIsTotalPages(pageArray);
      setIsCart(cartItems.totalCartItems);
    } catch (e) {
      console.log(e.message);
      toast.error(e.response?.data?.message || e.message || "Product Not Found.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDbouncingSearch(search);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  useEffect(() => {
    fetchAllProducts();
  }, [debouncingSearch, currentPage, limit]);

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

      toast.success("product Deleted successfully.");
    } catch (e) {
      console.log(e);
    }
  };

  const handleNavigate = (id) => {
    navigate(`/single-product/${id}`);
  };

  const handleAddToCart = async (id) => {
    try {
      const data = await addToCart({
        productId: id,
        quantity: 1,
      });
      toast.success(data.message);
      fetchAllProducts();
    } catch (e) {
      toast.error(e?.response?.data?.message);
      console.log(e.response);
    }
  };

  const categories = [
    {
      id: 1,
      icon: Electronic,
      title: "Electronics",
    },
    {
      id: 2,
      icon: Fashion,
      title: "Fashion",
    },
    {
      id: 3,
      icon: HomeIcon,
      title: "Home",
    },
    {
      id: 4,
      icon: Grocery,
      title: "Grocery",
    },
    {
      id: 5,
      icon: Beauty,
      title: "Beauty",
    },
    {
      id: 6,
      icon: Appliance,
      title: "Appliance",
    },
  ];

  const addProductWishList = async (id) => {
    try {
      const res = await addWishList(id);
      toast.success(res.message);
      fetchAllProducts();
    } catch (e) {
      console.log(e);
      const message =
        e?.response?.data?.message ||
        e?.message ||
        "Failed to add product to wishlist.";
      toast.error(message);
    }
  };

  // pagination button click handler
  const handlePaginationButtonClick = (value) => {
    setCurrentPage(value);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* Hero Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 pt-6 pb-10 max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-[2rem] shadow-2xl shadow-orange-900/10 group bg-gray-900">
          <img
            className="w-full h-[350px] sm:h-[450px] lg:h-[550px] object-cover group-hover:scale-105 transition-transform duration-1000 ease-out opacity-80"
            src={GharTakHomeImage}
            alt="Summer Sale Banner"
          />
          
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/40 to-transparent"></div>

          <div className="absolute left-6 sm:left-12 lg:left-20 top-1/2 -translate-y-1/2 text-white max-w-xl z-10">
            <div className="inline-block bg-orange-500 text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest mb-4 shadow-lg shadow-orange-500/30">
              Weekend Special
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight mb-4 tracking-tight">
              Upgrade Your <br className="hidden sm:block"/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">Lifestyle</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-200 mb-8 max-w-md font-medium leading-relaxed hidden sm:block">
              Discover the latest trends in electronics, fashion, and home essentials at unbeatable prices.
            </p>

            <button onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })} className="group/btn bg-white hover:bg-orange-50 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-orange-500/20 hover:-translate-y-1">
              Shop Now
              <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Shop By Category
            </h2>
            <p className="text-gray-500 mt-2 font-medium">
              Explore our wide range of products
            </p>
          </div>
          <button className="text-orange-600 font-bold hover:text-orange-700 transition-colors flex items-center gap-1 group">
            View All Categories 
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6">
          {categories?.map((category) => (
            <div
              key={category.id}
              className="group bg-white rounded-3xl p-4 sm:p-6 hover:shadow-xl hover:shadow-orange-500/10 border border-gray-100 hover:border-orange-200 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-center hover:-translate-y-2"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-full flex justify-center items-center mb-4 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                <img
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                  src={category.icon}
                  alt={category.title}
                />
              </div>
              <h3 className="font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                {category.title}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center mb-10 gap-4 border-b border-gray-200 pb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Featured For You
            </h2>
            <p className="text-gray-500 mt-2 font-medium">
              Handpicked products just for you
            </p>
          </div>
          <div className="bg-orange-50 text-orange-700 px-4 py-2 rounded-lg font-bold text-sm">
            {isProducts?.totalProducts || 0} Products
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 font-medium border border-red-100 text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {isProducts?.products?.map((product, index) =>
            isLoading ? (
              <ProductCardSkeleton product={product} key={index} />
            ) : (
              <ProductCard
                key={product._id}
                handleAddToCart={handleAddToCart}
                wishListProduts={wishListProduts}
                addProductWishList={addProductWishList}
                product={product}
              />
            ),
          )}
        </div>
        
        {!isLoading && isProducts?.products?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-3xl border border-dashed border-gray-300">
            <div className="bg-gray-50 p-6 rounded-full mb-4">
              <ShoppingCart size={48} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Products Found</h3>
            <p className="text-gray-500 font-medium max-w-sm">We couldn't find any products matching your search criteria. Try adjusting your filters.</p>
          </div>
        )}

        {/* Pagination */}
        {isTotalPages?.length > 1 && (
          <div className="flex justify-center items-center gap-2 sm:gap-3 mt-16">
            {isTotalPages.map((element) => (
              <button
                key={element}
                onClick={() => handlePaginationButtonClick(element)}
                className={`h-10 w-10 sm:h-12 sm:w-12 rounded-xl font-bold transition-all duration-300 flex items-center justify-center
                ${
                  currentPage === element
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30 scale-110"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600"
                }`}
              >
                {element}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Floating Cart Button */}
      <div className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-50">
        <button
          onClick={() => navigate("/get-cart")}
          className="group flex items-center justify-center w-16 h-16 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-2xl shadow-orange-500/40 hover:-translate-y-2 transition-all duration-300 relative border-4 border-white"
        >
          <ShoppingCart size={24} className="group-hover:scale-110 transition-transform" />
          
          {(isCart !== 0 && isCart !== "undefined" && isCart !== undefined) && (
            <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-[12px] font-bold h-7 w-7 flex justify-center items-center rounded-full border-2 border-white shadow-sm">
              {isCart}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default Home;
