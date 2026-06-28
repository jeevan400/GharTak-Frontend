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
    <div className="min-h-screen bg-[var(--bg-main)] pb-32 pt-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Breadcrumb / Back Navigation */}
        <button 
          onClick={() => navigate(-1)} 
          className="mb-6 flex items-center text-[var(--text-secondary)] hover:text-[var(--primary)] font-semibold transition-colors w-fit"
        >
          <span className="mr-2">←</span> Back to Shopping
        </button>

        {/* Product Section */}
        <div className="bg-white rounded-[32px] shadow-[var(--shadow-md)] border border-[var(--border-light)] overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            
            {/* Image Side */}
            <div className="lg:w-1/2 p-8 lg:p-12 bg-gray-50/50 flex justify-center items-center relative border-b lg:border-b-0 lg:border-r border-[var(--border-light)]">
              <div className="absolute top-6 left-6">
                <span className="bg-white border border-[var(--border-medium)] text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest text-[var(--text-secondary)] shadow-sm">
                  {product?.category || 'Premium'}
                </span>
              </div>
              <img
                className="max-h-[400px] lg:max-h-[500px] w-full object-contain hover:scale-105 transition-transform duration-500 ease-out drop-shadow-xl"
                src={product?.image || boy}
                alt={product?.name}
              />
            </div>

            {/* Content Side */}
            <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1 text-yellow-400">
                  {'★★★★☆'.split('').map((star, i) => (
                    <span key={i} className="text-lg">{star}</span>
                  ))}
                </div>
                <span className="text-sm font-semibold text-[var(--text-secondary)] ml-2 border-l border-[var(--border-medium)] pl-3">
                  {allReviews?.length || 0} Reviews
                </span>
              </div>

              <h1 className="text-3xl lg:text-4xl font-extrabold text-[var(--text-primary)] leading-tight mb-4">
                {product?.name}
              </h1>
              
              <p className="text-[var(--text-secondary)] text-[15px] leading-relaxed mb-6">
                {product?.description}
              </p>

              <div className="flex items-end gap-4 mb-8">
                <h2 className="text-4xl font-black text-[var(--text-primary)] tracking-tight">
                  ₹{product?.price}
                </h2>
                <span className="text-lg text-gray-400 line-through font-bold mb-1">
                  ₹{(parseFloat(product?.price || 0) * 1.3).toFixed(2)}
                </span>
              </div>

              <div className="mb-8">
                {product?.stock > 0 ? (
                   <div className="flex items-center gap-2 text-green-600 bg-green-50 w-fit px-4 py-2 rounded-xl font-bold border border-green-100">
                     <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                     In Stock ({product?.stock} available)
                   </div>
                ) : (
                   <div className="flex items-center gap-2 text-red-600 bg-red-50 w-fit px-4 py-2 rounded-xl font-bold border border-red-100">
                     Out of Stock
                   </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex justify-center items-center gap-2 bg-[var(--bg-dark)] hover:bg-black text-white px-8 py-4 rounded-2xl font-bold transition-all hover:-translate-y-0.5 shadow-lg shadow-gray-200"
                >
                  <ShoppingCart size={20} />
                  ADD TO CART
                </button>

                <button
                  style={{ background: "var(--gradient-primary)" }}
                  className="flex-1 flex justify-center items-center px-8 py-4 rounded-2xl text-white font-bold transition-all hover:shadow-[0_8px_20px_rgba(249,115,22,0.4)] hover:-translate-y-0.5"
                >
                  BUY NOW
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section Split */}
        <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Review Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-[32px] shadow-[var(--shadow-md)] border border-[var(--border-light)] p-8 sticky top-8">
              <h2 className="text-2xl font-extrabold text-[var(--text-primary)] mb-6 border-b border-[var(--border-light)] pb-4">
                Write a Review
              </h2>
              <form onSubmit={(e) => handleFormSubmint(e, product?._id)} className="flex flex-col gap-5">
                
                <div>
                  <label className="text-[13px] font-extrabold text-[var(--text-primary)] mb-2 block uppercase tracking-wider">
                    Rating ({reviewData.rating}/5)
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    value={reviewData.rating}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
                    onChange={(e) =>
                      setReviewData({
                        ...reviewData,
                        rating: e.target.value,
                      })
                    }
                  />
                  <div className="flex justify-between text-xs font-bold text-gray-400 mt-2 px-1">
                    <span>Poor</span>
                    <span>Excellent</span>
                  </div>
                </div>

                <div>
                  <label className="text-[13px] font-extrabold text-[var(--text-primary)] mb-2 block uppercase tracking-wider">
                    Your Experience
                  </label>
                  <textarea
                    className="w-full border border-[var(--border-medium)] rounded-xl p-4 outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all min-h-[120px] text-sm font-medium bg-gray-50 focus:bg-white"
                    placeholder="What did you like or dislike?"
                    value={reviewData.comment}
                    onChange={(e) =>
                      setReviewData({
                        ...reviewData,
                        comment: e.target.value,
                      })
                    }
                  />
                </div>

                <button
                  type="submit"
                  style={{ background: "var(--gradient-primary)" }}
                  className="w-full py-4 rounded-xl text-white font-bold hover:shadow-[0_8px_15px_rgba(249,115,22,0.3)] hover:-translate-y-0.5 transition-all mt-2"
                >
                  SUBMIT REVIEW
                </button>
              </form>
            </div>
          </div>

          {/* Review List */}
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-extrabold text-[var(--text-primary)] mb-6 px-2">
              Customer Reviews ({allReviews?.length || 0})
            </h2>
            
            {allReviews?.length > 0 ? (
              <div className="space-y-4">
                {allReviews?.map((review) => (
                  <div
                    key={review._id}
                    className="bg-white rounded-3xl border border-[var(--border-light)] p-6 flex flex-col sm:flex-row gap-5 transition-shadow hover:shadow-[var(--shadow-sm)]"
                  >
                    <div className="flex flex-row sm:flex-col items-center sm:items-start gap-4 sm:w-[140px] shrink-0 border-b sm:border-b-0 sm:border-r border-[var(--border-light)] pb-4 sm:pb-0 sm:pr-4">
                      <img
                        className="h-12 w-12 rounded-full border border-[var(--border-medium)] object-cover shadow-sm"
                        src={review?.user?.image || "https://ui-avatars.com/api/?name=User"}
                        alt={review?.user?.name}
                      />
                      <div>
                        <h3 className="font-bold text-[14px] text-[var(--text-primary)] leading-tight capitalize">
                          {review?.user?.name}
                        </h3>
                        <p className="text-[11px] font-semibold text-gray-400 mt-0.5">
                          {new Date(review.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-md border border-orange-100">
                          <span className="text-[13px] font-bold text-orange-600">{review.rating}</span>
                          <span className="text-orange-500 text-xs">★</span>
                        </div>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={handleModalOpen}
                            className="p-2 text-gray-400 hover:text-[var(--primary)] hover:bg-orange-50 rounded-lg transition-colors"
                            title="Edit Review"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteReview(product?._id, review._id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Review"
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                      </div>

                      <p className="text-[14px] text-[var(--text-secondary)] font-medium leading-relaxed mt-3 whitespace-pre-wrap">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-[var(--border-light)] p-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <span className="text-gray-300 text-2xl">★</span>
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)]">No reviews yet</h3>
                <p className="text-[var(--text-secondary)] text-sm font-medium mt-1">Be the first to share your experience with this product!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Cart Badge */}
      <div
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 group"
      >
        <button
          onClick={() => navigate("/get-cart")}
          className="h-[65px] w-[65px] rounded-full bg-white border border-[var(--border-light)] shadow-[0_10px_30px_rgba(0,0,0,0.15)] flex justify-center items-center text-[var(--primary)] relative transition-transform duration-300 hover:scale-110 hover:shadow-[0_10px_40px_rgba(249,115,22,0.3)] group-hover:border-[var(--primary)]"
        >
          <ShoppingCart size={24} className="group-hover:fill-[var(--primary-light)] transition-colors" />

          {isCart !== 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[11px] font-black h-7 w-7 rounded-full flex justify-center items-center shadow-md border-2 border-white">
              {isCart}
            </span>
          )}
        </button>
      </div>

      {/* Edit Review Modal UI */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 transition-opacity">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative">
            <button 
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-extrabold mb-6 text-[var(--text-primary)]">Update Review</h2>
            <form onSubmit={(e) => handleReviewSubmit(e, product?._id, "some-review-id")} className="flex flex-col gap-5">
                <div>
                  <label className="text-[13px] font-extrabold text-[var(--text-primary)] mb-2 block uppercase">Rating</label>
                  <input
                    type="range" min={1} max={5} step={1}
                    value={updatedData.rating || 5}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
                    onChange={(e) => setUpdatedData({ ...updatedData, rating: e.target.value })}
                  />
                  <div className="flex justify-between text-xs font-bold text-gray-400 mt-2 px-1">
                    <span>Poor</span>
                    <span>Excellent</span>
                  </div>
                </div>
                <div>
                  <label className="text-[13px] font-extrabold text-[var(--text-primary)] mb-2 block uppercase">Comment</label>
                  <textarea
                    className="w-full border border-[var(--border-medium)] rounded-xl p-4 text-sm font-medium outline-none focus:ring-2 focus:ring-[var(--primary)] bg-gray-50 focus:bg-white min-h-[120px]"
                    placeholder="Update your review..."
                    value={updatedData.comment}
                    onChange={(e) => setUpdatedData({ ...updatedData, comment: e.target.value })}
                  />
                </div>
                <button type="submit" style={{ background: "var(--gradient-primary)" }} className="py-4 mt-2 rounded-xl text-white font-bold shadow-[0_4px_10px_rgba(249,115,22,0.2)] hover:shadow-[0_8px_15px_rgba(249,115,22,0.35)] hover:-translate-y-0.5 transition-all">
                  SAVE CHANGES
                </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
