import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { LoaderIcon, Trash2Icon, ArrowLeftIcon } from "lucide-react";

const ProductDetailPage = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/Products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product", error);
        toast.error("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await api.delete(`/Products/${id}`);
      toast.success("Product deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting product", error);
      toast.error("Failed to delete product");
    }
  };

  const handleSave = async () => {
    if (!product.productName?.trim()) {
      toast.error("Please add product name");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/Products/${id}`, {
        productName: product.productName,
        category: product.category,
        gender: product.gender,
        price: Number(product.price),
        stock: Number(product.stock),
        description: product.description,
      });

      toast.success("Product updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Error updating product", error);
      toast.error("Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <LoaderIcon className="animate-spin size-12 text-yellow-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* Top Buttons */}
        <div className="flex items-center justify-between mb-8">

          <Link
            to="/"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Back to Products
          </Link>

          <button
            onClick={handleDelete}
            className="flex items-center gap-2 border border-red-500 text-red-400 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg transition"
          >
            <Trash2Icon className="h-5 w-5" />
            Delete Product
          </button>

        </div>

        {/* Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-2xl p-8">

          {/* Product Name */}
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Product Name</label>
            <input
              type="text"
              className="w-full bg-black border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-yellow-500"
              value={product.productName || ""}
              onChange={(e) =>
                setProduct({ ...product, productName: e.target.value })
              }
            />
          </div>

          {/* Category */}
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Category</label>
            <input
              type="text"
              className="w-full bg-black border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-yellow-500"
              value={product.category || ""}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
            />
          </div>

          {/* Gender */}
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Gender</label>
            <input
              type="text"
              className="w-full bg-black border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-yellow-500"
              value={product.gender || ""}
              onChange={(e) =>
                setProduct({ ...product, gender: e.target.value })
              }
            />
          </div>

          {/* Price */}
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Price</label>
            <input
              type="number"
              className="w-full bg-black border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-yellow-500"
              value={product.price || ""}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
            />
          </div>

          {/* Stock */}
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Stock</label>
            <input
              type="number"
              className="w-full bg-black border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-yellow-500"
              value={product.stock || ""}
              onChange={(e) =>
                setProduct({ ...product, stock: e.target.value })
              }
            />
          </div>

          {/* Description */}
          <div className="mb-8">
            <label className="block text-gray-400 mb-2">Description</label>
            <textarea
              className="w-full bg-black border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-yellow-500"
              value={product.description || ""}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-3 rounded-lg transition"
              disabled={saving}
              onClick={handleSave}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;