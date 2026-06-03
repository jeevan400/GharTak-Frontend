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
  // const [isCart, setIsCart] = useState(0);

  const { search, isCart, setIsCart } = useContext(SearchContext);

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
      const products = await getAllProducts(debouncingSearch, currentPage, limit);
      const cartItems = await getCartItems();
      const singleWishList = await getSingleWishList();
      // console.log("these are wishlist products : ", singleWishList);
      setIsProduct(products);
      setWishListProducts(
        singleWishList.products?.map((item) => item._id || item) || [],
      );
      console.log("these are all products : ", products);

      // set array element here
      let pageArray = [];
      for(let i=1; i<=products.totalPages; i++){
        pageArray[i] = i;
      }

      // console.log("this is cart items array : ", products.cartItems);
      setIsTotalPages(pageArray);
      setIsCart(cartItems.totalCartItems);

    } catch (e) {
      console.log(e.message);
      toast.error(e.response.data.message || e.message || "Product Not Found.");
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

      // alert("Product Deleted successfully.");
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

      console.log(data); 

      // alert("Product added successfully in the cart section");
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
  }

  return (
    <div>
      {/* <Navbar>
        <li className="hover:text-[var(--primary)] cursor-pointer text-[16px] " onClick={()=> navigate("/home")}>Home</li>
      </Navbar> */}

      <div className="h-[100vh] w-[100%] p-8">
        <img
          className="h-full w-full rounded-xl"
          src={GharTakHomeImage}
          alt=""
        />
      </div>

      <section className=" w-[100%] p-8">
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

      {/* <Card className={`!mx-0 !border-none !bg-gray-100 !p-8`}>
        <Card.Header
          icon={
            <div>
              <h1 className="text-[16px] font-normal text[#0B1C30]">
                Explore Categories
              </h1>
              <p className="text-[16px] font-normal text-[#5A4138]">
                Find exactly what you need across our massive inventory
              </p>
            </div>
          }
        >
          <button>View All</button>
        </Card.Header>
        <Card.Body className={`flex justify-start items-center gap-4`}>
          {categories?.map((category) => (
            <div
              key={category.id}
              className="flex flex-col justify-center items-center gap-4"
            >
              <div className="h-[150px] w-[150px] bg-[#E5EEFF] flex justify-center items-center rounded-xl border border-[#E2BFB2]">
                <img src={category.icon} alt="" />
              </div>
              <p className="text-[16px] font-medium text-[#0B1C30]">
                {category.title}
              </p>
            </div>
          ))}
        </Card.Body>
      </Card> */}
<section className=" w-[100%] p-8">
      <Card className={`!mx-0 !border-none !bg-gray-100`}>
        <Card.Header
          icon={
            <h1 className="text-[16px] font-normal text[#0B1C30]">
              Featured for you
            </h1>
          }
        >
          <span>Total : {isProducts.totalProducts}</span>
        </Card.Header>
        <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ">
          {error && <p>{error}</p>}
          {isProducts.products?.map((product) => (
            // <div
            //   key={product._id}
            //   className="relative rounded-xl pb-4 flex flex-col justify-between hover:shadow-lg transition-all duration-200 ease-in border shadow-md"
            // >
            //   <Link to={`/single-product/${product._id}`}>
            //     <img
            //       className="w-full h-[240px] rounded-tl-lg rounded-tr-lg"
            //       src={product.image || boy}
            //       alt="product image"
            //     />
            //     <span onClick={(e)=>
            //       {
            //         e.preventDefault();
            //         e.stopPropagation();
            //         addProductWishList(product._id);
            //       }
            //       } className="absolute top-2 right-2 bg-white p-2 rounded-lg text-[var(--text-secondary)]">
            //       {
            //         wishListProduts?.includes(product._id)?<i className="fa-solid fa-heart text-red-500"></i>:<i className="fa-regular fa-heart"></i>
            //       }
            //     </span>
            //     <div className="flex p-2">
            //       <div>
            //         <h1 className="text-[16px] font-bold">{product.name}</h1>
            //         <p className="text-[14px] font-semibold line-clamp-1 w-[70%]">
            //           {product.description}
            //         </p>
            //       </div>
            //       <div>
            //         <span className="text-[16px] font-bold text-red-900">&#8377;{product.price}</span>
            //       </div>
            //     </div>
            //   </Link>
            //   <div>
            //     <div></div>
            //     <span className="p-2 text-[12px] text-green-600 font-bold">
            //       In Stock: {product.stock}
            //     </span>
            //   </div>

            //   {user.role === "seller" && user.id === product.seller ? (
            //     <>
            //       <div className=" flex gap-4 justify-between p-2">
            //         <button
            //           onClick={() => handleIsModalOpen(product)}
            //           className="flex-1 bg-orange-400 text-[14px] font-medium text-white rounded-lg px-4 py-2 whitespace-nowrap"
            //         >
            //           Edit
            //         </button>
            //         <button
            //           onClick={() => handleDeleteData(product._id)}
            //           className="flex-1 bg-gray-900 text-[14px] font-medium text-white rounded-lg px-4 py-2 whitespace-nowrap"
            //         >
            //           Delete
            //         </button>
            //       </div>
            //       {console.log("this is user id : ", user)}
            //       {isModalOpen && selectedProduct ? (
            //         <ProductModal
            //           product={selectedProduct}
            //           onClose={setIsModalOpen}
            //           refreshProducts={fetchAllProducts}
            //         />
            //       ) : (
            //         ""
            //       )}
            //     </>
            //   ) : (
            //     <>
            //       <div className=" flex gap-4 justify-between p-2">
            //         <button className="flex-1 bg-orange-400 text-[14px] font-medium text-white rounded-lg px-4 py-2 whitespace-nowrap">
            //           Buy
            //         </button>
            //         <button onClick={()=> handleAddToCart(product._id)} className="flex-1 bg-gray-900 text-[14px] font-medium text-white rounded-lg px-4 py-2 whitespace-nowrap">
            //           Add to Cart
            //         </button>
            //       </div>
            //     </>
            //   )}
            // </div>

            <div
              key={product._id}
              className="w-full max-h-[400px] border border-red-900/30 rounded-md hover:shadow-md transition-all duration-200 ease-in cursor-pointer"
            >
              <div className="w-full h-[220px] relative">
                <Link to={`/single-product/${product._id}`}>
                  <img
                    className="h-full w-full rounded-tl-md rounded-tr-md"
                    src={product?.image}
                    alt="product image"
                  />
                </Link>
                <span
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addProductWishList(product._id);
                  }}
                  className="absolute top-2 right-2 bg-white p-2 rounded-lg text-[var(--text-secondary)]"
                >
                  {wishListProduts?.includes(product._id) ? (
                    <i className="fa-solid fa-heart text-red-500"></i>
                  ) : (
                    <i className="fa-regular fa-heart"></i>
                  )}
                </span>
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
                  <span
                    onClick={() => handleAddToCart(product._id)}
                    className="text-white bg-black p-2 rounded-md relative hover:scale-105 transition-all duration-200 ease-in group"
                  >
                    <Plus
                      className="group-hover:scale-105 transition-all duration-200 ease-in"
                      size={16}
                    />
                  </span>
                </div>
              </div>
            </div>
          ))}
          {
            // console.log("ksdjfksdlkfslkdf:  ", isProducts.products.length)
            isProducts?.products?.length === 0 ? <div> 404 Product Not Found. </div>:""
          }
        </div>
      </Card>
</section>

      <div className="flex gap-4 mb-8 px-8">
        {
          isTotalPages?.map((element)=> (
            <button onClick={() => handlePaginationButtonClick(element)} key={element} 
            className={`border border-[var(--primary)] text-[var(--primary)] px-2 py-1 text-lg font-bold ${currentPage === element ? "bg-[var(--primary)] text-white":"bg-white text-[var(--primary)]"}`}>{element}</button>
          ))
        }
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
        <div style={{background:"var(--gradient-primary)"}} className="fixed bottom-12 right-8 w-[80px] h-[80px] p-2 rounded-full flex justify-between border border-gray-300 shadow-lg">
          {/* <div>
            <h1 className="text-xl font-bold">Add more items</h1>
            <p className="text-sm font-semibold text-gray-500">get new offer</p>
          </div> */}
          <button
            onClick={() => navigate("/get-cart")}
            className=" h-full w-full border border-[var(--primary)] flex justify-center items-center text-[var(--primary)] bg-[var(--primary-light)] text-lg  rounded-full relative"
          >
            <ShoppingCart size={32}/>
            {
              console.log("this is cart items count : ", isCart)
            }
            {
              isCart !== 0 ? <span className="absolute  -top-2 -right-2 bg-[var(--danger)] text-[var(--danger-light)] text-[14px] font-semibold h-[25px] w-[25px] flex justify-center items-center rounded-full">
               {isCart}
              </span>:""
            }
          </button>
        </div>
      </div>

      {/* </section> */}
    </div>
  );
}

export default Home;
