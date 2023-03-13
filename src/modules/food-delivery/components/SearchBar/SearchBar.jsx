import React from 'react'
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const SearchBarHeader = () => {
  return (
	<div className='my-3 search-bar relative'>
		<Link to="/search" state={{prevPath : window.location}} className='cursor-pointer'>
			<input type="text" placeholder='Search...' disabled className='cursor-pointer search-input w-full border border-theme-color rounded-full py-2 px-5' />
			<FaSearch className='absolute right-5 text-gray-200 search-input-active:text-black top-1/3'/>
		</Link>
	</div>
  )
}

const SearchBar = () => {}

export default SearchBar