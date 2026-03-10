import api from '../lib/axios';
import { ArrowLeftIcon } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const CreatePage = () => {

  const [productName, setProductName] = useState('');
  const [size, setSize] = useState('');
  const [category, setCategory] = useState('');
  const [gender, setGender] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/Products', {
        productName,
        size,
        category,
        gender,
        price: Number(price),
        stock: Number(stock),
        description
      });

      toast.success('Product created successfully');
      navigate('/');

    } catch (error) {
      console.log('Error Creating product', error);
      toast.error('Failed to create product.');

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white'>

      <div className='max-w-3xl mx-auto px-6 py-16'>

        <Link
          to="/"
          className='flex items-center gap-2 text-gray-300 hover:text-yellow-400 mb-8'
        >
          <ArrowLeftIcon className='size-5' />
          Back to Products
        </Link>

        <div className='bg-gray-900 border border-gray-800 rounded-xl shadow-2xl p-8'>

          <h2 className='text-3xl font-bold mb-8 text-yellow-400'>
            Add New Product
          </h2>

          <form onSubmit={handelSubmit}>

            <div className='mb-6'>
              <label className='block text-gray-400 mb-2'>Product Name</label>
              <input
                type="text"
                className='w-full bg-black border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-yellow-500'
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>

            <div className='mb-6'>
              <label className='block text-gray-400 mb-2'>Size</label>
              <input
                type="text"
                className='w-full bg-black border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-yellow-500'
                value={size}
                onChange={(e) => setSize(e.target.value)}
                required
              />
            </div>

            <div className='mb-6'>
              <label className='block text-gray-400 mb-2'>Category</label>
              <input
                type="text"
                className='w-full bg-black border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-yellow-500'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>

            <div className='mb-6'>
              <label className='block text-gray-400 mb-2'>Gender</label>
              <input
                type="text"
                className='w-full bg-black border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-yellow-500'
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              />
            </div>

            <div className='mb-6'>
              <label className='block text-gray-400 mb-2'>Price</label>
              <input
                type="number"
                className='w-full bg-black border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-yellow-500'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div className='mb-6'>
              <label className='block text-gray-400 mb-2'>Stock</label>
              <input
                type="number"
                className='w-full bg-black border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-yellow-500'
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>


            <div className='mb-8'>
              <label className='block text-gray-400 mb-2'>Description</label>
              <textarea
                className='w-full bg-black border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-yellow-500'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className='flex justify-end'>
              <button
                type="submit"
                className='bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-3 rounded-lg transition'
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Product"}
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default CreatePage;