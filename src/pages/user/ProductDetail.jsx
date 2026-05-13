import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleProduct } from "../../services/product.service";
import Navbar from "../../components/layout/Navbar";
import { addToCart } from "../../services/cart.service";
import { ShoppingCart } from "lucide-react";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [cartData, setCartData] = useState({});

  const fetchProduct = async () => {
    const res = await getSingleProduct(id);
    console.log(res);
    setProduct(res);
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
      console.log("cart data", data.cart);
      alert("Product added successfully in the cart section");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex items bg-center justify-between p-8">
        <img className="h-[300px] w-[300px]" src={product.image} alt="" />
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
