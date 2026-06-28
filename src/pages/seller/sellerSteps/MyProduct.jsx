import React, { useEffect, useState } from "react";
import { deleteProduct, getMyProduct } from "../../../services/product.service";
import useAuth from "../../../hooks/useAuth";
import ProductModal from "../ProductModal";
import toast from "react-hot-toast";
import ProductCard from "../../../components/common/home/ProductCard";
import { Package } from "lucide-react";

function MyProduct() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
    <div className="p-4 sm:p-6 lg:p-8 bg-[var(--bg-main)] min-h-full font-sans">
      <div className="mb-8 border-b border-[var(--border-light)] pb-6 flex items-center gap-3">
        <Package className="text-[var(--primary)]" size={32} />
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
            My Products
          </h1>
          <p className="text-[var(--text-secondary)] font-medium mt-1 text-[14px]">
            Manage your inventory, edit details, or remove listings.
          </p>
        </div>
      </div>

      {products?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-3xl border border-[var(--border-light)] shadow-sm">
          <Package className="text-gray-300 mb-4" size={48} />
          <h2 className="text-xl font-bold text-[var(--text-primary)]">No products found</h2>
          <p className="text-[var(--text-secondary)] mt-2">You haven't listed any products yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard 
              key={product._id} 
              product={product} 
              isSellerMode={user?.role === "seller"} 
              onEdit={handleProductModalOpen} 
              onDelete={handleDeleteData} 
            />
          ))}
        </div>
      )}

      {isModalOpen && selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={setIsModalOpen}
          refreshProducts={fetchProducts}
        />
      )}
    </div>
  );
}

export default MyProduct;
