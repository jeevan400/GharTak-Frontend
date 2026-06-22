import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import {
  LucideShoppingCart,
  Plus,
  Search,
  ShoppingBasket,
  ShoppingCart,
  ShoppingCartIcon,
  Star,
  User,
} from "lucide-react";
import landingImage from "../../assets/landingPage/landingImage.png";
import Electronic from "../../assets/home/categories/Electronics.png";
import Fashion from "../../assets/home/categories/Fashion.png";
import HomeIcon from "../../assets/home/categories/homeGhar.png";
import Grocery from "../../assets/home/categories/Grocery.png";
import Beauty from "../../assets/home/categories/beauty.png";
import Appliance from "../../assets/home/categories/appliance.png";
import Card from "../../components/common/Card";
import { getAllProducts } from "../../services/product.service";
import { useState } from "react";
import toast from "react-hot-toast";
import { useEffect } from "react";
import logoImage from "../../assets/GharTak.png";
import { SearchContext } from "../../store/context/SearchContext";
import Footer from "../../components/layout/Footer";
import Modal from "../../components/common/Modal";

function LandingPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [electronicsProducts, setElectronicsProducts] = useState([]);
  const [fashionProducts, setFashionProducts] = useState([]);
  const [debouncingSearch, setDbouncingSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { search } = useContext(SearchContext);

  const fetchAllProducts = async () => {
    try {
      const res = await getAllProducts(debouncingSearch);
      setProducts(res);

      //electronics products
      const electronicsItems = res.products.filter(
        (product) => product.category === "electronics",
      );
      setElectronicsProducts(electronicsItems);

      //fashion products
      const fashionItems = res.products.filter(
        (product) => product.category === "fashion",
      );
      setFashionProducts(fashionItems);
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
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
  }, [debouncingSearch]);

  const handleShopNow = () => {
    setIsModalOpen(true);
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

  return (
    <div>
      <Navbar>
        <li className="hover:text-[var(--primary)] cursor-pointer text-[16px] ">
          Home
        </li>
        <li className="hover:text-[var(--primary)] cursor-pointer text-[16px]">
          Artisans
        </li>
        <li className="hover:text-[var(--primary)] cursor-pointer text-[16px]">
          Orders
        </li>
      </Navbar>
      <section className="w-full px-6 py-6 bg-gray-50">
        <div
          className="relative h-[500px] rounded-3xl overflow-hidden"
          style={{
            backgroundImage: `url(${landingImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>

          <div className="relative z-10 h-full flex flex-col justify-center max-w-3xl px-12">
            <span className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-full w-fit text-sm">
              MEGA SALE UP TO 70% OFF
            </span>

            <h1 className="text-6xl font-extrabold text-white mt-6 leading-tight">
              Discover Amazing Products At Best Prices
            </h1>

            <p className="text-gray-200 text-lg mt-4">
              Electronics, Fashion, Home Decor, Beauty, Groceries and thousands
              of products from trusted sellers.
            </p>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => navigate("/home")}
                className="bg-[var(--primary)] text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition"
              >
                Shop Now
              </button>

              <button
                onClick={handleShopNow}
                className="bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition"
              >
                Become Seller
              </button>
            </div>
          </div>
        </div>
        {isModalOpen ? (
          <Modal
            onClose={setIsModalOpen}
            className="!w-[450px] !max-w-[90vw] !h-[250px] !border-none !rounded-3xl !overflow-hidden"
          >
            <Modal.Header className="!border-none !pb-0">
              <div className="flex items-center text-center">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[var(--primary)]/10">
                  <span className="text-3xl">🛍️</span>
                </div>

                <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                  Become a Seller
                </h2>
              </div>
            </Modal.Header>

            <Modal.Body>
              <p className="text-center text-[var(--text-muted)] leading-relaxed mt-2">
                Start selling your products on <strong>GharTak</strong>. To
                become a seller, please visit your profile and click on
                <span className="font-semibold text-[var(--primary)]">
                  {" "}
                  "Become a Seller"
                </span>
                .
              </p>

              <div className="flex justify-end px-4 gap-3 mt-8">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-gray-300 hover:bg-gray-100 transition-all"
                >
                  Cancel
                </button>

                <button
                  onClick={() => navigate("/profile")}
                  className="px-6 py-2.5 rounded-full bg-[var(--primary)] text-white font-medium hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Go to Profile →
                </button>
              </div>
            </Modal.Body>
          </Modal>
        ) : (
          ""
        )}
      </section>

      <section className="px-6 py-8 bg-white">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Shop By Category</h2>

            <p className="text-gray-500">
              Explore products from top categories
            </p>
          </div>

          <button className="text-[var(--primary)] font-semibold">
            View All
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categories?.map((category) => (
            <div
              key={category.id}
              className="bg-white border rounded-2xl p-5 hover:shadow-xl transition duration-300 cursor-pointer group"
            >
              <div className="h-[120px] flex justify-center items-center bg-gray-100 rounded-xl">
                <img
                  src={category.icon}
                  alt=""
                  className="group-hover:scale-110 transition"
                />
              </div>

              <h3 className="text-center mt-4 font-semibold">
                {category.title}
              </h3>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full px-8 py-6 mb-10 bg-gray-50">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">All Items</h1>
            <p className="text-gray-500 text-sm mt-1">
              Discover top all at unbeatable prices
            </p>
          </div>

          <button className="px-5 py-2 rounded-lg border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products?.products?.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              {/* Product Image */}
              <div className="relative h-[240px] overflow-hidden bg-gray-100">
                <img
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  20% OFF
                </span>
              </div>

              {/* Product Details */}
              <div className="p-4">
                <p className="text-xs text-gray-500 line-clamp-1">
                  {product?.description}
                </p>

                <h2 className="font-semibold text-gray-800 mt-2 line-clamp-1">
                  {product?.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-3">
                  <Star size={14} fill="gold" stroke="gold" />
                  <Star size={14} fill="gold" stroke="gold" />
                  <Star size={14} fill="gold" stroke="gold" />
                  <Star size={14} fill="gold" stroke="gold" />
                  <Star size={14} fill="gold" stroke="gold" />

                  <span className="text-xs text-gray-500 ml-2">
                    (124 Reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-2xl font-bold text-[var(--primary)]">
                    &#8377;{product.price}
                  </span>

                  <span className="text-sm line-through text-gray-400">
                    &#8377;{product.price + product.price * 0.2}
                  </span>
                </div>

                {/* Button */}
                <button className="w-full mt-4 flex items-center justify-center gap-2 bg-[var(--primary)] text-white py-3 rounded-xl font-medium hover:opacity-90 transition">
                  <Plus size={18} />
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* fashion products  start*/}
      <section className="w-[100%] px-8 mb-8">
        <div className=" p-4 bg-gray-100 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h1 className=" text-xl font-bold mb-4">Fashion Items</h1>
            <button className="text-[14px] font-semibold text-red-900">
              View All
            </button>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {fashionProducts?.slice(0, 10).map((product) => (
              <div
                key={product._id}
                className="w-full max-h-[400px] border border-red-900/30 rounded-md hover:shadow-md transition-all duration-200 ease-in cursor-pointer"
              >
                <div className="w-full h-[220px]">
                  <img
                    className="h-full w-full rounded-tl-md rounded-tr-md"
                    src={product?.image}
                    alt="product image"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between gap-4 ">
                  <div className="flex flex-col gap-1">
                    <h1 className="text-[12px] font-bold text-red-900 tracking-wider line-clamp-1">
                      {product?.description}
                    </h1>
                    <p className="text-[14px] font-bold truncate">
                      {product?.name}
                    </p>
                    <div className="flex gap-2 text-red-900">
                      <Star size={16} />
                      <Star size={16} />
                      <Star size={16} />
                      <Star size={16} />
                      <Star size={16} />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-red-900">
                      &#8377;349.00
                    </span>
                    <span className="text-white bg-black p-2 rounded-md relative hover:scale-105 transition-all duration-200 ease-in group">
                      <Plus
                        className="group-hover:scale-105 transition-all duration-200 ease-in"
                        size={16}
                      />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* fashion products end*/}

      <Footer />
    </div>
  );
}

export default LandingPage;
