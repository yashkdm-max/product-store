import { Link, useLocation } from "react-router-dom";
import { Package, Info, Edit2, Trash2, Heart } from "lucide-react";
import { formatData } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

const ProductCard = ({ product, setProducts }) => {
  const [showModal, setShowModal] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const location = useLocation();

  const isActive = location.pathname === `/Products/${product._id}`;

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = wishlist.find((item) => item._id === product._id);
    setIsWishlisted(!!exists);
  }, [product._id]);

  const toggleWishlist = (e) => {
    e.preventDefault();

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.find((item) => item._id === product._id);

    if (exists) {
      wishlist = wishlist.filter((item) => item._id !== product._id);
      setIsWishlisted(false);
      toast.success("Removed from wishlist");
    } else {
      wishlist.push(product);
      setIsWishlisted(true);
      toast.success("Added to wishlist");
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/Products/${product._id}`);
      setProducts((prev) => prev.filter((p) => p._id !== product._id));
      toast.success("Product deleted successfully");
    } catch {
      toast.error("Failed to delete product");
    } finally {
      setShowModal(false);
    }
  };

  return (
    <>
      <Link
        to={`/Products/${product._id}`}
        className={`relative block rounded-xl bg-base-100 p-4 border transition-all duration-200 ${
          isActive ? "border-primary shadow-lg" : "border-base-300"
        } hover:border-primary hover:shadow-xl`}
      >
        <div className="flex justify-between items-start">
          <p className="text-xs text-base-content/60 truncate">
            {product._id}
          </p>
          <span className="badge badge-secondary">
            ₹ {product.price}
          </span>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <Package className="size-4 text-primary" />
            <p className="font-medium text-base-content line-clamp-1">
              {product.productname}
            </p>
          </div>

          <div className="flex items-center gap-2 text-base-content/70">
            <Info className="size-4 text-primary" />
            <p className="text-sm line-clamp-1">
              {product.category} | {product.gender}
            </p>
          </div>

          <p className="text-sm text-base-content/70">
            Size: {product.size}
          </p>

          <p className="text-sm text-base-content/70">
            Stock: {product.stock}
          </p>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <span className="text-xs text-base-content/60">
            {formatData(new Date(product.createdAt))}
          </span>

          <div className="flex items-center gap-4">

            {/* Wishlist */}
            <div className="tooltip tooltip-primary" data-tip="Wishlist">
              <button
                onClick={toggleWishlist}
                className="hover:scale-110 transition"
              >
                <Heart
                  className={`size-4 ${
                    isWishlisted
                      ? "fill-red-500 text-red-500"
                      : "text-base-content"
                  }`}
                />
              </button>
            </div>

            {/* Edit */}
            <div className="tooltip tooltip-warning" data-tip="Edit Product">
              <Edit2 className="size-4 text-warning hover:scale-100 transition" />
            </div>

            {/* Delete */}
            <div className="tooltip tooltip-error" data-tip="Delete Product">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowModal(true);
                }}
                className="text-error hover:scale-100 transition"
              >
                <Trash2 className="size-4" />
              </button>
            </div>

          </div>
        </div>
      </Link>

      {showModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-error flex items-center gap-2">
              <Trash2 className="size-5" /> Delete Product
            </h3>

            <p className="py-4 text-base-content/70">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-base-content">
                "{product.productname}"
              </span>
              ?
            </p>

            <div className="modal-action">
              <button
                className="btn btn-ghost"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="btn btn-error flex items-center gap-2"
                onClick={handleDelete}
              >
                <Trash2 className="size-4" /> Delete
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default ProductCard;