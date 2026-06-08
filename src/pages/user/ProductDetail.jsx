import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addReviewForProfuct,
  deleteReview,
  getAllProducts,
  getAllReviews,
  getSingleProduct,
  updateReview,
} from "../../services/product.service";
import Navbar from "../../components/layout/Navbar";
import { addToCart, getCartItems } from "../../services/cart.service";
import {
  Delete,
  DeleteIcon,
  LucideDelete,
  Pencil,
  ShoppingCart,
  Trash,
  X,
} from "lucide-react";
import boy from "../../assets/boy.jpg";
import toast from "react-hot-toast";
import Modal from "../../components/common/Modal";
import { SearchContext } from "../../store/context/SearchContext";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [cartData, setCartData] = useState({});
  const [reviewData, setReviewData] = useState({
    rating: 1,
    comment: "",
  });
  const [allReviews, setAllReviews] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    rating: "",
    comment: "",
  });

  const { isCart, setIsCart } = useContext(SearchContext);

  const fetchProduct = async () => {
    const res = await getSingleProduct(id);
    const res2 = await getAllReviews(id);
    const res3 = await getCartItems();
    setProduct(res);
    setAllReviews(res2);
    // console.log(res3);
    setIsCart(res3.totalCartItems);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleAddToCart = async () => {
    try {
      const data = await addToCart({
        productId: id,
        quantity: 1,
      });

      setCartData(data.cart);
      toast.success(data.message);
      fetchProduct();
    } catch (e) {
      toast.error(e.response.data.message);
      console.log(e);
    }
  };

  const handleFormSubmint = async (e, id) => {
    e.preventDefault();
    try {
      const res = await addReviewForProfuct(id, reviewData);
      toast.success(res.message);
      fetchProduct();
    } catch (e) {
      toast.error(e.response.data.message);
      console.log(e);
    }
  };

  const handleDeleteReview = async (productId, reviewId) => {
    try {
      const res = await deleteReview(productId, reviewId);
      fetchProduct();
      toast.success(res.message);
    } catch (e) {
      toast.error(e.response.data.message);
      console.log(e.response);
    }
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleReviewSubmit = async (e, productId, reviewId) => {
    e.preventDefault();
    try {
      const res = await updateReview(productId, reviewId, updatedData);
      toast.success(res.message);
      setModalOpen(false);
      fetchProduct();
    } catch (e) {
      toast.error(e.response.data.message);
      console.log(e);
    }
  };
  return (
    // <div className="pb-32">
    //   {/* <Navbar /> */}
    //   <div className="flex items bg-center justify-between p-8">
    //     <img
    //       className="h-[300px] w-[300px]"
    //       src={product?.image || boy}
    //       alt=""
    //     />
    //     <div className="flex flex-col gap-2 justify-center">
    //       <h1>{product.name}</h1>
    //       <p>{product.description}</p>
    //       <span>Stock : {product.stock}</span>{" "}
    //       <span className="text-lg font-bold text-red-900">
    //         &#8377;{product.price}
    //       </span>
    //       <div className="flex gap-6">
    //         <button className="text-md font-bold border px-4 py-2 rounded-lg bg-orange-400 text-white">
    //           Buy
    //         </button>
    //         <button
    //           onClick={handleAddToCart}
    //           className="text-md font-bold border px-4 py-2 rounded-lg bg-gray-900 text-white"
    //         >
    //           Add to cart
    //         </button>
    //       </div>
    //     </div>
    //   </div>

    //   {/* add review section */}
    //   <form
    //     onSubmit={(e) => handleFormSubmint(e, product?._id)}
    //     className="flex flex-col p-8  border m-4 rounded-lg border-red-900 bg-red-900/10"
    //   >
    //     <label htmlFor="" className="text-lg font-bold">
    //       Rating
    //     </label>
    //     <input
    //       type="range"
    //       className=""
    //       onChange={(e) =>
    //         setReviewData({
    //           ...reviewData,
    //           rating: e.target.value,
    //         })
    //       }
    //       name="rating"
    //       min={1}
    //       max={5}
    //       step={1}
    //     />
    //     <br />
    //     <label htmlFor="" className="text-md font-semibold">
    //       Comment
    //     </label>
    //     <textarea
    //       type="text"
    //       className="border p-4 rounded-lg border-red-900"
    //       onChange={(e) =>
    //         setReviewData({
    //           ...reviewData,
    //           comment: e.target.value,
    //         })
    //       }
    //       placeholder="Enter comment here"
    //       name="comment"
    //     />{" "}
    //     <br /> <br />
    //     <button
    //       type="submit"
    //       className="bg-red-900 p-2 text-lg font-bold text-white rounded-lg"
    //     >
    //       Add review
    //     </button>
    //   </form>

    //   {/* all reviews show here */}
    //   {allReviews?.map((review) => (
    //     <div
    //       key={review._id}
    //       className="flex gap-6 p-4 border border-red-900 m-4 rounded-lg shadow-md"
    //     >
    //       <div className="flex flex-col justify-center items-center">
    //         <div>
    //           <img
    //             className="h-[50px] w-[50px] rounded-full"
    //             src={review?.user?.image}
    //             alt=""
    //           />
    //         </div>
    //         <div>
    //           <h1 className="text-sm font-semibold">
    //             {review?.user?.name?.toUpperCase()}
    //           </h1>
    //         </div>
    //       </div>
    //       <div className="flex justify-between flex-1 ">
    //         <div className="flex flex-col">
    //           <h1 className="text-lg font-bold"> Rating : {review.rating}</h1>
    //           <p className="text-md font-semibold text-gray-600">
    //             {review.comment}
    //           </p>
    //           <div>
    //             <span className=" text-sm font-medium text-gray-400">
    //               {review.createdAt.split("T")[0]}
    //             </span>
    //             <span className=" text-sm font-medium text-gray-400">
    //               {review.createdAt.split("T")[1].split(".")[0]}
    //             </span>
    //           </div>
    //         </div>
    //         <div className="flex gap-2 ">
    //           <button
    //             onClick={() => handleDeleteReview(product?._id, review._id)}
    //             className="hover:bg-red-600/15 transition-all duration-200 ease-in text-red-600 h-[30px] w-[30px] flex justify-center items-center rounded-lg"
    //           >
    //             <Trash size={18} />
    //           </button>
    //           <button
    //             onClick={handleModalOpen}
    //             className="hover:bg-green-600/15 transition-all duration-200 ease-in text-green-600 h-[30px] w-[30px] flex justify-center items-center rounded-lg"
    //           >
    //             <Pencil size={18} />
    //           </button>
    //         </div>
    //         {modalOpen ? (
    //           <>
    //             <Modal onClose={setModalOpen}>
    //               <Modal.Header>
    //                 <h1 className="text-xl font-semibold">Update Review</h1>
    //                 <div
    //                   onClick={() => setModalOpen(false)}
    //                   className="flex justify-center items-center hover:bg-gray-300 p-2 rounded-lg cursor-pointer transition-all duration-300 ease-in"
    //                 >
    //                   <X />
    //                 </div>
    //               </Modal.Header>
    //               <Modal.Body>
    //                 <form
    //                   onSubmit={(e) =>
    //                     handleReviewSubmit(e, product?._id, review._id)
    //                   }
    //                   action=""
    //                 >
    //                   <input
    //                     type="text"
    //                     name="rating"
    //                     onChange={(e) =>
    //                       setUpdatedData({
    //                         ...updatedData,
    //                         rating: e.target.value,
    //                       })
    //                     }
    //                   />{" "}
    //                   <br />
    //                   <br />
    //                   <input
    //                     type="text"
    //                     name="comment"
    //                     onChange={(e) =>
    //                       setUpdatedData({
    //                         ...updatedData,
    //                         comment: e.target.value,
    //                       })
    //                     }
    //                   />{" "}
    //                   <br /> <br />
    //                   <button type="submit">Update</button>
    //                 </form>
    //               </Modal.Body>
    //             </Modal>
    //           </>
    //         ) : (
    //           <></>
    //         )}
    //       </div>
    //     </div>
    //   ))}

    //   <div className="flex justify-center items-center">
    //     <div
    //       style={{ background: "var(--gradient-primary)" }}
    //       className="fixed bottom-12 right-8 w-[80px] h-[80px] p-2 rounded-full flex justify-between border border-gray-300 shadow-lg"
    //     >
    //       <button
    //         onClick={() => navigate("/get-cart")}
    //         className=" h-full w-full border border-[var(--primary)] flex justify-center items-center text-[var(--primary)] bg-[var(--primary-light)] text-lg  rounded-full relative"
    //       >
    //         <ShoppingCart size={32} />
    //         {isCart !== 0 ? (
    //           <span className="absolute  -top-2 -right-2 bg-[var(--danger)] text-[var(--danger-light)] text-[14px] font-semibold h-[25px] w-[25px] flex justify-center items-center rounded-full">
    //             {isCart}
    //           </span>
    //         ) : (
    //           ""
    //         )}
    //       </button>
    //     </div>
    //   </div>
    // </div>






    <div className="min-h-screen bg-gray-50 pb-32">

  {/* Product Section */}
  <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white rounded-3xl shadow-lg p-6">

      <div className="bg-[var(--primary-light)] rounded-2xl p-6 flex justify-center items-center">
        <img
          className="max-h-[500px] object-contain hover:scale-105 transition duration-300"
          src={product?.image || boy}
          alt=""
        />
      </div>

      <div className="flex flex-col justify-center gap-4">

        <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
          {product?.name}
        </h1>

        <p className="text-[var(--text-secondary)] leading-7">
          {product?.description}
        </p>

        <div>
          <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium">
            Stock : {product?.stock}
          </span>
        </div>

        <h2 className="text-4xl font-bold text-[var(--primary)]">
          ₹{product?.price}
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">

          <button
            style={{ background: "var(--gradient-primary)" }}
            className="px-8 py-3 rounded-xl text-white font-semibold hover:shadow-lg transition"
          >
            Buy Now
          </button>

          <button
            onClick={handleAddToCart}
            className="px-8 py-3 rounded-xl border border-[var(--primary)] text-[var(--primary)] font-semibold hover:bg-[var(--primary-light)] transition"
          >
            Add To Cart
          </button>

        </div>

      </div>
    </div>
  </div>

  {/* Review Form */}
  <form
    onSubmit={(e) => handleFormSubmint(e, product?._id)}
    className="max-w-7xl mx-auto bg-white rounded-3xl shadow-lg p-6 md:p-8 mt-8 flex flex-col gap-4"
  >

    <h2 className="text-2xl font-bold text-[var(--text-primary)]">
      Write a Review
    </h2>

    <label className="font-semibold">
      Rating
    </label>

    <input
      type="range"
      min={1}
      max={5}
      step={1}
      className="accent-[var(--primary)]"
      onChange={(e) =>
        setReviewData({
          ...reviewData,
          rating: e.target.value,
        })
      }
    />

    <label className="font-semibold">
      Comment
    </label>

    <textarea
      className="border border-[var(--primary)] rounded-xl p-4 outline-none"
      placeholder="Write your review..."
      onChange={(e) =>
        setReviewData({
          ...reviewData,
          comment: e.target.value,
        })
      }
    />

    <button
      type="submit"
      style={{ background: "var(--gradient-primary)" }}
      className="py-3 rounded-xl text-white font-semibold hover:shadow-lg transition"
    >
      Add Review
    </button>

  </form>

  {/* Reviews */}
  <div className="max-w-7xl mx-auto mt-8 px-4">

    <h2 className="text-2xl font-bold mb-6">
      Customer Reviews
    </h2>

    {allReviews?.map((review) => (
      <div
        key={review._id}
        className="bg-white rounded-2xl shadow-md p-5 mb-4 flex flex-col md:flex-row gap-4"
      >

        <div className="flex items-center gap-4">

          <img
            className="h-[60px] w-[60px] rounded-full border-2 border-[var(--primary)]"
            src={review?.user?.image}
            alt=""
          />

          <div>
            <h3 className="font-bold text-[var(--text-primary)]">
              {review?.user?.name?.toUpperCase()}
            </h3>

            <p className="text-xs text-gray-400">
              {review.createdAt.split("T")[0]}
            </p>
          </div>

        </div>

        <div className="flex-1">

          <h4 className="text-lg font-bold text-[var(--primary)]">
            ⭐ {review.rating}/5
          </h4>

          <p className="text-[var(--text-secondary)] mt-2">
            {review.comment}
          </p>

        </div>

        <div className="flex gap-2">

          <button
            onClick={() =>
              handleDeleteReview(product?._id, review._id)
            }
            className="hover:bg-red-100 text-red-500 h-10 w-10 rounded-xl flex justify-center items-center transition"
          >
            <Trash size={18} />
          </button>

          <button
            onClick={handleModalOpen}
            className="hover:bg-green-100 text-green-500 h-10 w-10 rounded-xl flex justify-center items-center transition"
          >
            <Pencil size={18} />
          </button>

        </div>

      </div>
    ))}

  </div>

  {/* Floating Cart */}
  <div
    style={{ background: "var(--gradient-primary)" }}
    className="fixed bottom-6 right-6 md:bottom-10 md:right-10 w-[70px] h-[70px] rounded-full shadow-2xl p-2"
  >

    <button
      onClick={() => navigate("/get-cart")}
      className="h-full w-full rounded-full bg-white flex justify-center items-center text-[var(--primary)] relative"
    >

      <ShoppingCart size={30} />

      {isCart !== 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold h-6 w-6 rounded-full flex justify-center items-center">
          {isCart}
        </span>
      )}

    </button>

  </div>

</div>
  );
}

export default ProductDetail;
