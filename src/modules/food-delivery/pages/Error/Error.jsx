import React from 'react';
import { Navbar, Footer } from '../../components';
import {Link} from 'react-router-dom';
const Error = () => {
  document.title = "Oops!! Not Found";
  return (
    <>
      <Navbar/>
      <div className='w-full min-h-screen flex flex-col items-center justify-center'>
        <h1 className='text-gray-600 text-3xl font-semibold'>Error 404: Oops not Found</h1>
        <p className='text-gray-500 mt-3'>You can go to home page to view more restaurants</p>
        <Link to="/" className='uppercase m-10 px-5 py-2 bg-orange-400 font-semibold text-white'>See Restaurants near you</Link>
      </div>
      <Footer/>
    </>
  )
}

export default Error