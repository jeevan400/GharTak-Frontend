import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addReviewForProfuct, deleteReview, getAllReviews, getSingleProduct } from "../../services/product.service";
import Navbar from "../../components/layout/Navbar";
import { addToCart } from "../../services/cart.service";
import { Delete, DeleteIcon, LucideDelete, Pencil, ShoppingCart, Trash } from "lucide-react";
import boy from "../../assets/boy.jpg";
import toast from "react-hot-toast";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [cartData, setCartData] = useState({});
  const [reviewData, setReviewData] = useState({
    rating:1,
    comment:""
  });
  const [allReviews, setAllReviews] = useState()

  const fetchProduct = async () => {
    const res = await getSingleProduct(id);
    const res2 = await getAllReviews(id);
    setProduct(res);
    setAllReviews(res2);
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
      toast.success(data.message)
    } catch (e) {
      toast.error(e.response.data.message);
      console.log(e);
    }
  };

  const handleFormSubmint = async (e, id)=>{
    e.preventDefault();
    try{
      const res = await addReviewForProfuct(id, reviewData);
      toast.success(res.message);
      fetchProduct();
    } catch(e){
      toast.error(e.response.data.message);
      console.log(e);
    }
  }

  const handleDeleteReview = async (productId, reviewId) => {
    try{
      const res = await deleteReview(productId, reviewId);
      fetchProduct();
      toast.success(res.message);
    }catch(e){
      toast.error(e.response.data.message);
      console.log(e.response);
    }
  }
  return (
    <div className="pb-32">
      <Navbar />
      <div className="flex items bg-center justify-between p-8">
        <img className="h-[300px] w-[300px]" src={product?.image || boy} alt="" />
        <div className="flex flex-col gap-2 justify-center">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <span>Stock : {product.stock}</span>{" "}
          <span className="text-lg font-bold text-red-900">
            &#8377;{product.price}
          </span>
          <div className="flex gap-6">
            <button className="text-md font-bold border px-4 py-2 rounded-lg bg-orange-400 text-white">
              Buy
            </button>
            <button
              onClick={handleAddToCart}
              className="text-md font-bold border px-4 py-2 rounded-lg bg-gray-900 text-white"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>

      {/* add review section */}
      <form onSubmit={(e)=> handleFormSubmint(e, product?._id)} className="flex flex-col p-8  border m-4 rounded-lg border-red-900 bg-red-900/10" >
        <label htmlFor="" className="text-lg font-bold">Rating</label>
        <input 
        type="range" 
        className=""
        onChange={(e)=> setReviewData({
          ...reviewData,
          rating:e.target.value
        })} 
        name="rating" 
        min={1} 
        max={5} 
        step={1} />
        <br />
        <label htmlFor="" className="text-md font-semibold">Comment</label>
        <textarea 
        type="text" 
        className="border p-4 rounded-lg border-red-900"
        onChange={(e)=> setReviewData({
          ...reviewData,
          comment:e.target.value
        })} 
        placeholder="Enter comment here"
         name="comment" /> <br /> <br />
        <button type="submit" className="bg-red-900 p-2 text-lg font-bold text-white rounded-lg">Add review</button>
      </form>

{/* all reviews show here */}
        {
          allReviews?.map((review)=>(
            <div key={review._id} className="flex gap-6 p-4 border border-red-900 m-4 rounded-lg shadow-md">
              <div className="flex flex-col justify-center items-center">
                <div>
                  <img className="h-[50px] w-[50px] rounded-full" src={review.user.image} alt="" />
                </div>
                <div>
                  <h1 className="text-sm font-semibold">{(review.user.name)?.toUpperCase()}</h1>
                </div>
              </div>
              <div className="flex justify-between flex-1 ">
                <div className="flex flex-col">
                  <h1 className="text-lg font-bold"> Rating : {review.rating}</h1>
                  <p className="text-md font-semibold text-gray-600">{review.comment}</p>
                  <div>
                    <span className=" text-sm font-medium text-gray-400">{review.createdAt.split("T")[0]}</span>
                    <span className=" text-sm font-medium text-gray-400">{review.createdAt.split("T")[1].split(".")[0]}</span>
                  </div>
                </div>
                <div className="flex gap-2 ">
                  <button onClick={()=> handleDeleteReview(product?._id, review._id)} className="hover:bg-red-600/15 transition-all duration-200 ease-in text-red-600 h-[30px] w-[30px] flex justify-center items-center rounded-lg"><Trash size={18}/></button>
                  <button className="hover:bg-green-600/15 transition-all duration-200 ease-in text-green-600 h-[30px] w-[30px] flex justify-center items-center rounded-lg"><Pencil size={18}/></button>
                </div>
              </div>
            </div>
          ))
        }

      <div className="w-full flex items-center justify-center">
        <div className="fixed bg-white bottom-12 w-[80%] p-4 rounded-xl flex justify-between border border-gray-300 shadow-lg">
          <div>
            <h1 className="text-xl font-bold">Add more items</h1>
            <p className="text-sm font-semibold text-gray-500">get new offer</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => navigate(-1)}
              className="border border-orange-500 text-orange-500 text-lg px-6 py-2 rounded-full"
            >
              Back
            </button>
            <button
              onClick={() => navigate("/get-cart")}
              className="border border-orange-500 text-orange-500 text-lg px-6 py-2 rounded-full relative"
            >
              <ShoppingCart />
              <span className="text-sm absolute -top-1 bg-green-600 text-white  h-6 w-6 rounded-full -right-1 flex justify-center items-center font-semibold">
                {cartData.totalItems}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
