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

  const {search} = useContext(SearchContext);

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


  useEffect(()=>{
    const timer = setTimeout(()=>{
      setDbouncingSearch(search);
    }, 500);

    return ()=>{
      clearTimeout(timer);
    };
  },[search]);

  useEffect(() => {
    fetchAllProducts();
  }, [debouncingSearch]);

  const handleShopNow = () => {
    setIsModalOpen(true);
  }

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
        <li className="hover:text-[var(--primary)] cursor-pointer text-[16px] ">Home</li>
        <li className="hover:text-[var(--primary)] cursor-pointer text-[16px]">Artisans</li>
        <li className="hover:text-[var(--primary)] cursor-pointer text-[16px]">Orders</li>
        {/* <li
          onClick={() => navigate("/profile")}
          className=" cursor-pointer flex gap-2 border border-[var(--primary)] px-4 py-1 justify-center items-center rounded-full bg-[var(--primary-light)] hover:bg-[var(--primary)] hover:text-white text-[var(--primary)] transition-all duration-300 ease-linear"
        >
          <User size={20} />
          Profile
        </li> */}
      </Navbar>
      <section className="h-[90vh] w-[100%] p-8">
        <div
          className="h-full w-full bg-white rounded-xl back flex"
          style={{
            backgroundImage: `url(${landingImage})`,
            backgroundSize: "cover",
          }}
        >
          <div className="max-w-[600px] p-12 flex flex-col justify-between">
            <div className="text-[12px] font-bold bg-red-900 w-fit px-6 py-1 flex justify-center items-center text-white rounded-sm">
              BUY • SELL • GROW
            </div>
            <h1 className="text-5xl font-bold text-white">
              Everything You Need, Delivered to Your Door
            </h1>
            <p className="text-[16px] font-semibold text-white/80">
              Explore top deals on electronics, fashion, furniture, beauty
              products, groceries, and much more. Shop smarter with trusted
              sellers and secure payments.
            </p>
            <div className="flex justify-start items-center gap-4">
              <button onClick={()=> navigate("/home")}  className="bg-[var(--primary-light)]  px-4 py-2 text-[16px] font-bold text-[var(--primary)] rounded-lg hover:bg-white transition-all duration-300 ease-in">
                Shop Now &gt;&gt;
              </button>
              <button onClick={handleShopNow} className="bg-white/10 px-4 py-2 text-[16px] font-bold text-white rounded-lg hover:bg-white/15 transition-all duration-200 ease-in">
                Start Selling
              </button>
            </div>
          </div>
        </div>
        {
          isModalOpen?<Modal onClose={setIsModalOpen} className={`w-[30%] h-[30%] border-none`}>
            <Modal.Header>
              if you want to become a seller then go to profile and click on the become a seller button 
            </Modal.Header>
            <Modal.Body className={`flex justify-center items-center`}>
              <button className="bg-[var(--primary)] text-white rounded-full px-4 py-2" onClick={()=> navigate("/profile")}>Go to Profile</button>
            </Modal.Body>
          </Modal>:""
        }
      </section>
      <section className=" w-[100%] p-8 mb-6">
        <Card className={`!mx-0 !border-none !bg-gray-100`}>
          <Card.Header
            icon={
              <div>
                <h1 className="text-[18px] font-bold text-[var(--text-primary)]">
                  Explore Categories
                </h1>
                <p className="text-[16px] font-normal text-[var(--text-secondary)]">
                  Find exactly what you need across our massive inventory
                </p>
              </div>
            }
          >
            <button className="text-[16px] font-semibold text-red-900">
              View All
            </button>
          </Card.Header>
          <Card.Body className={`grid grid-cols-6 gap-4`}>
            {categories?.map((category) => (
              <div
                key={category.id}
                className="flex flex-col justify-center items-center gap-4 group "
              >
                <div className="h-[150px] w-full bg-[#E5EEFF] flex justify-center items-center rounded-xl border border-[#E2BFB2] cursor-pointer">
                  <img
                    className="group-hover:scale-125 transition-all duration-200 ease-in"
                    src={category.icon}
                    alt=""
                  />
                </div>
                <p className="text-[16px] font-medium text-[#0B1C30]">
                  {category.title}
                </p>
              </div>
            ))}
          </Card.Body>
        </Card>
      </section>

      {/* Electronic products */}
      <section className="w-[100%] px-8 mb-8">
        <div className=" p-4 bg-gray-100 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h1 className=" text-xl font-bold mb-4">Electronic Items</h1>
            <button className="text-[14px] font-semibold text-red-900">
              View All
            </button>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {electronicsProducts?.slice(0, 10).map((product) => (
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
      
      <Footer/>
    </div>
  );
}

export default LandingPage;
