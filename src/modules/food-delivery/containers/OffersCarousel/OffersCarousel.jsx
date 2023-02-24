import React from 'react'
import {useRestaurantListImport} from "../../utils";

const CarouselItem = ({item}) => {
	const {creativeId, bannerId} = item;
	return (
		<img key={bannerId} className=' cursor-pointer w-1/5 mx-6 my-12 hover:scale-110 transition duration-500 ease-in-out ' src={"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_520,h_520/"+creativeId} alt=""/>
	);
}

const OffersCarousel = () => {
  let offers = useRestaurantListImport().carouselsList;
  return (
	(offers[0]?.cardType!=="seeAllRestaurants" && <div className='bg-gray-900'>
		<div className="carousel-items flex flex-wrap justify-center">
			{
				offers?.map((offer,index)=>{
					if(index<4)
					return(
						<CarouselItem item={offer.data}/>
					)
				})
			}
		</div>
	</div>)
  )
}

export default OffersCarousel