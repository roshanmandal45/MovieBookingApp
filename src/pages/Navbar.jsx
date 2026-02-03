import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className='sticky top-0 z-50 flex justify-between items-center px-20 py-4 bg-gradient-to-r from-blue-600 to-purple-600'>
      <div>
        <h1 className='text-white font-bold text-lg'>MovieBooking</h1>
      </div>

      <div className='flex gap-x-10'>
        <Link to='/' className='text-white hover:text-gray-200 transition'>Home</Link>
        <Link to='/about' className='text-white hover:text-gray-200 transition'>About</Link>
        <Link to='/movies' className='text-white hover:text-gray-200 transition'>Movies</Link>
        <Link to='/moviesdetails' className='text-white hover:text-gray-200 transition'>MoviesDetails</Link>
        <Link to='/admin' className='text-white hover:text-gray-200 transition'>Admin</Link>
      </div>

      <div className='flex gap-x-10'>
        <Link to='/login' className='text-white hover:text-gray-200 transition'>Login</Link>
        <Link to='/register' className='text-white hover:text-gray-200 transition'>Signup</Link>
      </div>
    </nav>
  )
}
