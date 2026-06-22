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

        <label className="font-semibold">Rating</label>

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

        <label className="font-semibold">Comment</label>

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
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

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
                onClick={() => handleDeleteReview(product?._id, review._id)}
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
