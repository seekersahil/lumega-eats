import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft, FaSearch } from 'react-icons/fa';
const Search = ({prevPath = "/"}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleKeyPress = (e) => {
	setSearchTerm(e.target.value);
  }
  const navigate = useNavigate();
  const {state} = useLocation();
  console.log(state)
  const escapeFunction = (e) => {
	if(e.key === "Escape"){
		return navigate(prevPath);
	}
}
  useEffect(()=>{
	window.addEventListener("keyup",escapeFunction)
	return ()=>{
		window.removeEventListener("keyup",escapeFunction)
	}
  },[]) 
  return (
	<>
		<nav className='navbar flex justify-between items-center px-10 py-6 bg-white w-full z-10'>
			<Link to="/">
				<FaArrowLeft className='text-slate-300 text-2xl'/>
			</Link>
			<div className='search-bar flex items-center justify-center w-full'>
				<Link to="/search" className='cursor-pointer w-full mx-10 relative'>
					<input onChange={handleKeyPress} autoFocus type="text" placeholder='Search...' className='cursor-pointer search-input w-full border border-theme-color rounded-full py-2 px-5' value={searchTerm} />
					<FaSearch className='absolute right-5 text-gray-200 search-input-active:text-black top-1/3'/>
				</Link>
			</div>
		</nav>
	</>
  )
}

export default Search