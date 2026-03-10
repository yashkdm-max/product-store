import React from 'react'
import { Link } from 'react-router-dom'
import { PlusIcon } from 'lucide-react'

const Navbar = () => {
  return (
    <header className='bg-black border-b border-gray-800 shadow-lg'>
      <div className='mx-auto max-w-7xl px-6 py-4'>
        <div className='flex items-center justify-between'>

          <h1 className='text-3xl font-bold text-yellow-400 font-mono tracking-widest'>
            ELITE STORE
          </h1>

          <div className='flex items-center gap-4'>
            <Link
              to={"/create"}
              className='flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-lg transition'
            >
              <PlusIcon className='size-5' />
              <span>New Product</span>
            </Link>
          </div>

        </div>
      </div>
    </header>
  )
}

export default Navbar