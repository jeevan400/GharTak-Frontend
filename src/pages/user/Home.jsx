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
import Card from "../../components/common/Card";
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
import { Heart, Plus, ShoppingCart, Star } from "lucide-react";
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
      console.log("these are all products : ", products);

      // set array element here
      let pageArray = [];
      for (let i = 1; i <= products.totalPages; i++) {
        pageArray[i] = i;
      }
      setIsTotalPages(pageArray);
      setIsCart(cartItems.totalCartItems);
    } catch (e) {
      console.log(e.message);
      toast.error(e.response.data.message || e.message || "Product Not Found.");
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
    <div>
      <section className="w-full px-6 py-6 bg-gray-50">
        <div className="relative overflow-hidden rounded-3xl shadow-lg">
          <img
            className="w-full h-[250px] md:h-[400px] lg:h-[550px] object-cover"
            src={GharTakHomeImage}
            alt="Banner"
          />

          <div className="absolute inset-0 bg-black/30"></div>

          <div className="absolute left-8 top-1/2 -translate-y-1/2 text-white">
            <span className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-semibold">
              Special Offers
            </span>

            <h1 className="text-3xl md:text-5xl font-bold mt-4">
              Everything You Need
            </h1>

            <p className="mt-3 text-white/90 max-w-md">
              Shop electronics, fashion, home essentials and more at unbeatable
              prices.
            </p>

            <button className="mt-6 bg-[var(--primary)] px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
              Shop Now
            </button>
          </div>
        </div>
      </section>

      <section className="w-full px-6 py-10 bg-white">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Shop By Category
            </h2>

            <p className="text-gray-500 mt-1">
              Discover products from top categories
            </p>
          </div>

          <button className="border border-[var(--primary)] text-[var(--primary)] px-5 py-2 rounded-lg hover:bg-[var(--primary)] hover:text-white transition">
            View All
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categories?.map((category) => (
            <div
              key={category.id}
              className="group bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="h-[120px] bg-gray-50 rounded-xl flex justify-center items-center overflow-hidden">
                <img
                  className="w-[40px] h-[40px] object-contain group-hover:scale-110 transition duration-300"
                  src={category.icon}
                  alt={category.title}
                />
              </div>

              <h3 className="text-center mt-4 font-semibold text-gray-800">
                {category.title}
              </h3>
            </div>
          ))}
        </div>
      </section>
      <section className="w-full px-6 py-10 bg-white">
        <Card className={`!mx-0 !border-none !bg-gray-100`}>
          <Card.Header
            icon={
              <h1 className="text-3xl font-bold text-gray-800">
                Featured for you
              </h1>
            }
          >
            <span>Total : {isProducts.totalProducts}</span>
          </Card.Header>
          <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ">
            {error && <p>{error}</p>}
            {isProducts.products?.map((product, index) =>
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
            {isProducts?.products?.length === 0 ? (
              <div> 404 Product Not Found. </div>
            ) : (
              ""
            )}
          </div>
        </Card>
      </section>

      <div className="flex justify-center items-center gap-2 my-10">
        {isTotalPages?.map((element) => (
          <button
            key={element}
            onClick={() => handlePaginationButtonClick(element)}
            className={`h-11 w-11 rounded-full font-medium transition-all duration-300
      ${
        currentPage === element
          ? "bg-[var(--primary)] text-white shadow-lg scale-110"
          : "bg-white border border-gray-300 text-gray-700 hover:bg-[var(--primary-light)] hover:border-[var(--primary)]"
      }`}
          >
            {element}
          </button>
        ))}
      </div>
      <div className="flex justify-center items-center">
        <div
          style={{ background: "var(--gradient-primary)" }}
          className="fixed bottom-12 right-8 w-[80px] h-[80px] p-2 rounded-full flex justify-between border border-gray-300 shadow-lg"
        >
          <button
            onClick={() => navigate("/get-cart")}
            className=" h-full w-full border border-[var(--primary)] flex justify-center items-center text-[var(--primary)] bg-[var(--primary-light)] text-lg  rounded-full relative"
          >
            <ShoppingCart size={32} />
            {console.log("this is cart items count : ", isCart)}
            {isCart !== 0 || isCart !== "undefined" ? (
              <span className="absolute  -top-2 -right-2 bg-[var(--danger)] text-[var(--danger-light)] text-[14px] font-semibold h-[25px] w-[25px] flex justify-center items-center rounded-full">
                {isCart}
              </span>
            ) : null}
          </button>
        </div>
      </div>

      {/* </section> */}
    </div>
  );
}

export default Home;
