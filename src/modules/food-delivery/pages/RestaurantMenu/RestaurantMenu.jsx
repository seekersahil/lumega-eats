import React from 'react'
import { Navbar, Footer } from '../../components';
import { MenuContainer } from '../../containers';

const RestaurantMenu = () => {
  return (
	<>
		<Navbar sticky={false}/>
		<div className='restaurant-list bg-slate-50 min-h-screen'>
			<MenuContainer/>
		</div>
		<Footer/>
	</>
  )
}

export default RestaurantMenu