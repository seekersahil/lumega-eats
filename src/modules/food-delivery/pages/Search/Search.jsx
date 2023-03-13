import React, { useEffect, useState } from 'react';
import { Link, useNavigate} from "react-router-dom";
import { FaArrowLeft, FaSearch } from 'react-icons/fa';
import { useSearch } from '../../utils';

const Suggestion = ({suggestion,index}) => {
	const {cloudinaryId, text, tagToDisplay, metadata} = suggestion;
	const restaurantData = JSON.parse(metadata);
	const {primaryRestaurantId } = restaurantData?.data;
	return (
		<Link to={`/restaurant/${primaryRestaurantId}`}  className='suggestion flex w-full px-36 cursor-pointer hover:bg-slate-50'>
			<div className="suggestion-image my-5">
				<img className='rounded-md' src={"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/"+cloudinaryId} alt="" />
			</div>
			<div className="ml-5 suggestion-details flex flex-col justify-center">
				<h1>{text}</h1>
				<h2>{tagToDisplay}</h2>
			</div>
		</Link>
	)
}

const Search = ({prevPath = "/"}) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleKeyPress = (e) => {
	setSearchTerm(e.target.value);
  }
  const navigate = useNavigate();
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
  const { suggestions } = useSearch(searchTerm); 
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
		<div className="search-results flex flex-col items-center w-full">
			{
				suggestions.map((suggestion, index) => <Suggestion suggestion={suggestion} index={index}/>)
			}
		</div>
	</>
  )
}

export default Search