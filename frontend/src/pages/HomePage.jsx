import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import ProductCard from '../components/ProductCard.jsx';
import ProductNotFound from '../components/ProductNotFound.jsx';

const HomePage = () => {

  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get('/Products')
        console.log(res.data)
        setProduct(res.data)
      } catch (error) {
        console.log("Error fetching books")
        console.log(error)
        toast.error("Failed to load books")
      } finally {
        setLoading(false)
      }
    }
    fetchProduct();
  }, [])

  const filteredProducts = product
    .filter((p) =>
      p.productName?.toLowerCase().includes(search.toLowerCase())
    )
    .filter((p) =>
      categoryFilter ? p.category === categoryFilter : true
    )

  return (
    <div className='min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white'>
      <Navbar />

      <div className="text-center py-16 px-6 bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-gray-800 shadow-2xl">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-white to-yellow-500">
          Elite Performance Wear
        </h1>
        <p className="mt-6 text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
          Designed for champions. Built for dominance. Experience premium sportswear crafted with precision.
        </p>
      </div>

      <div className='max-w-7xl mx-auto px-6 md:px-12 py-16'>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">

          <input
            type="text"
            placeholder="Search product..."
            className="bg-black border border-gray-700 rounded-lg px-4 py-2 w-full md:w-1/2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="bg-black border border-gray-700 rounded-lg px-4 py-2 w-full md:w-1/4"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="trackpant">trackpant</option>
            <option value="tshirt">tshirt</option>
           
          </select>

        </div>

        {loading && (
          <div className='text-center text-yellow-400 text-lg font-semibold animate-pulse py-10'>
            Loading premium collection...
          </div>
        )}

        {!loading && product.length === 0 && <ProductNotFound />}

        {!loading && product.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl md:text-3xl font-bold tracking-wide">
                Featured Collection
              </h2>
              <div className="h-[2px] w-32 bg-gradient-to-r from-yellow-500 to-transparent"></div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'>
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="transform hover:scale-105 transition-all duration-500"
                >
                  <ProductCard
                    product={product}
                    setProduct={setProduct}
                  />
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  )
}

export default HomePage