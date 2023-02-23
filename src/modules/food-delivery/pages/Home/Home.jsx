import React from 'react'
import {Navbar,Footer} from "../../components"
import {RestaurantList,OffersCarousel} from '../../containers';

const Home = () => {
	document.title = "Welcome to Lumega Eats";
  return (
	<>
		<Navbar/>
		<div className='restaurant-list py-5 pt-20 bg-slate-50 min-h-screen'>
			<OffersCarousel/>
			<RestaurantList/>
		</div>
		<Footer/>
	</>
  )
}

export default Home