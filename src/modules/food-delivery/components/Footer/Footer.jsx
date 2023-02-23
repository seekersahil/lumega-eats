import React from 'react';
import logoFull from "../../../../assets/dark_logo_transparent.png";

const Footer = () => {
  return (
	<div className="flex items-center justify-between w-full h-10 bg-gray-900 p-10">
    <img src={logoFull} className="w-36" alt="lumega" />
    <p className='text-white'>© 2023 Lumega Labs</p>
  </div>
  )
}

export default Footer