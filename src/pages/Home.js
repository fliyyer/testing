import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo.png'

const Home = () => {
  return (
    <div className='bg-home min-h-screen'>
      <div className="px-4 py-8 md:px-0 md:py-16 md:flex md:flex-col md:items-center">
        <img src={Logo} className='p-4 mx-auto' alt="Maritim Muda" />
        <h1 className="text-3xl text-center text-white font-medium mx-auto mb-8 md:text-5xl">Absensi Magang Merdeka</h1>
        <h1 className="text-2xl font-medium text-center mb-12 md:text-4xl text-white">Maritim Muda Nusantara</h1>
        <Link to='/login' className="bg-blue-700 hover:bg-blue-950 ml-32 sm:ml-0 text-white px-6 py-2 rounded-md mb-4 md:mb-0 md:text-lg">
          Login
        </Link>
        <h3 className="text-sm mt-6 text-center text-white md:text-lg">Login Untuk Melakukan Absensi</h3>
      </div>
    </div>
  )
}

export default Home
