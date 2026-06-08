import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { blockProduct, getAllProducts } from "../../../services/product.service";
import ProductCard from "../../../components/common/home/ProductCard";
import ProductCardSkeleton from "../../../components/common/home/ProductCardSkeleton";
import Modal from "../../../components/common/Modal";

function Products() {
  const [allProducts, setAllProducts] = useState([]);
  const [isTotalPages, setIsTotalPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isActive, setIsActive] = useState();
  const [editModalOpen, setEditModalOpen] = useState(false);

  const fetechAllProducts = async () => {
    try {
      const res = await getAllProducts("", currentPage, 10);
      console.log(res);
      setAllProducts(res.products);

      let pageArray = [];
      for (let i = 1; i <= res.totalPages; i++) {
        pageArray[i] = i;
      }

      // console.log("this is cart items array : ", products.cartItems);
      setIsTotalPages(pageArray);
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message || e.message);
    }
  };

  useEffect(() => {
    fetechAllProducts();
  }, [currentPage, isActive]);

  const handlePaginationButtonClick = (value) => {
    setCurrentPage(value);
  };

  const handleDeactivateProduct = async (id) => {
    try{
      const res = await blockProduct(id);
      toast.success(res.message);
      setIsActive(res);
    } catch(e){
      console.log(e);
      toast.error(e.response.data.message || e.message );
    }
  }

  return (
    <div className="p-4 h-full">
      <div className="bg-[var(--bg-card)] rounded-md shadow-md overflow-hidden h-[80%]">
        <div className="overflow-x-auto overflow-y-auto h-full">
          <table className="w-full relative">
            <thead>
              <tr className="bg-[var(--primary)] text-white text-[14px] sticky top-0">
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-4 py-3 text-left">Product</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Brand</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Stock</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {allProducts?.slice(0, 10).map((product) => (
                <tr
                  key={product._id}
                  className="border-b border-[var(--border-light)] hover:bg-[var(--primary-light)] transition text-[12px] font-semibold"
                >
                  <td className="px-4 py-3">
                    <img
                      src={product.image?.[0]}
                      alt={product.name}
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                  </td>

                  <td className="px-4 py-3 font-medium text-[var(--text-primary)]">
                    {product.name}
                  </td>

                  <td className="px-4 py-3 text-[var(--text-secondary)] capitalize">
                    {product.category}
                  </td>

                  <td className="px-4 py-3 text-[var(--text-secondary)]">
                    {product.brand}
                  </td>

                  <td className="px-4 py-3 font-semibold text-[var(--primary)]">
                    ₹{product.price}
                  </td>

                  <td className="px-4 py-3">
                    {product.stock > 0 ? (
                      <span className="text-[var(--success)] font-medium">
                        {product.stock}
                      </span>
                    ) : (
                      <span className="text-[var(--danger)] font-medium">
                        Out of Stock
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {product.isActive ? (
                      <span className="px-3 py-1 rounded-full bg-[var(--success-light)] text-[var(--success)] text-[10px]">
                        Active
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-[var(--danger-light)] text-[var(--danger)] text-[10px]">
                        Blocked
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <button className="px-3 py-1 rounded bg-[var(--info)] text-white">
                        View
                      </button>

                      <button onClick={()=> setEditModalOpen(true)} className="px-3 py-1 rounded bg-[var(--warning)] text-white">
                        Edit
                      </button>

                      {
                        editModalOpen?
                        <Modal onClose={setEditModalOpen} outerClassName={`bg-black/5`}>
                        <Modal.Header>
                          Edit Product Details
                        </Modal.Header>
                        <Modal.Body>
                          edit product
                        </Modal.Body>
                      </Modal> : null
                      }

                      {
                        product.isActive? <button onClick={()=> handleDeactivateProduct(product._id)} className="px-3 py-1 rounded bg-[var(--danger)] text-white">
                        Deactivate
                      </button> :  <button onClick={()=> handleDeactivateProduct(product._id)} className="px-3 py-1 rounded bg-[var(--success)] text-white">
                        Activate
                      </button>
                      }
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className=" flex justify-center items-center gap-2 my-6">
        {isTotalPages?.map((element) => (
          <button
            key={element}
            onClick={() => handlePaginationButtonClick(element)}
            className={`h-8 w-8 rounded-full text-[14px] font-medium transition-all duration-300
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
    </div>
  );
}

export default Products;
