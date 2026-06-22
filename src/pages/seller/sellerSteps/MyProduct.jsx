import React, { useEffect, useState } from "react";
import { deleteProduct, getMyProduct } from "../../../services/product.service";
import useAuth from "../../../hooks/useAuth";
import ProductModal from "../ProductModal";
import boy from "../../../assets//boy.jpg";
import toast from "react-hot-toast";

function MyProduct() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  //   const [product, setProduct] = useState(null);

  const { user } = useAuth();

  const fetchProducts = async () => {
    const res = await getMyProduct();
    setProducts(res);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductModalOpen = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteData = async (id) => {
    try {
      const data = await deleteProduct(id);

      setProducts((prev) => prev.filter((product) => product._id !== id));
      toast.success(data.message);
    } catch (e) {
      console.log(e);
      alert(e?.response?.data?.message || e.message || "Delete Failed");
    }
  };

  return (
    <div className="grid grid-cols-4 p-4 gap-6">
      {products?.map((product) => (
        <div
          className="shadow-lg rounded-xl pb-2 border relative"
          key={product._id}
        >
          <img
            className="w-full h-[220px] rounded-tl-xl rounded-tr-xl"
            src={product.image || boy}
            alt="product image"
          />
          {product?.isActive ? (
            <span className="absolute top-2 right-2 text-[10px] font-medium bg-[var(--success)] text-white px-4 py-1 rounded-full shadow-lg">
              Live
            </span>
          ) : (
            <span className="absolute top-2 right-2 text-[10px] font-medium bg-[var(--danger)] text-white px-4 py-1 rounded-full shadow-lg">
              Disabled
            </span>
          )}
          <div className="flex justify-between items-center p-2">
            <div>
              <h1 className="text-[18px] font-bold">{product.name}</h1>
              <p className="text-[12px] font-semibold line-clamp-1 w-[70%]">
                {product.description}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <span className="text-xl font-bold text-[var(--primary)]">
                &#8377;{product.price}
              </span>
              <span className="text-[12px] text-green-600 font-bold whitespace-nowrap">
                Stock: {product.stock}
              </span>
            </div>
          </div>
          <div>
            <div></div>
          </div>
          {user.role === "seller" ? (
            <>
              <div className=" flex gap-4 justify-end p-2">
                <button
                  onClick={() => handleProductModalOpen(product)}
                  className="bg-[var(--accent)] text-xs font-semibold text-white rounded-lg px-4 py-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteData(product._id)}
                  className="bg-[var(--bg-dark)] text-xs font-semibold text-white rounded-lg px-4 py-2"
                >
                  Delete
                </button>
              </div>
              {isModalOpen && selectedProduct ? (
                <ProductModal
                  product={selectedProduct}
                  onClose={setIsModalOpen}
                  refreshProducts={fetchProducts}
                />
              ) : (
                ""
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      ))}
    </div>
  );
}

export default MyProduct;
