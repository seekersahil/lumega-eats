import React,{useState} from 'react';
import {Shimmer, useRestaurantListImport} from "../../utils";
import { Link } from 'react-router-dom';
import {AiFillStar} from "react-icons/ai";
import {MdLocalOffer} from "react-icons/md";

const RestaurantCard = ({restaurant}) => {
	const {
		name,
		id,
		cloudinaryImageId,
		cuisines,
		slugs,
		avgRating,
		slaString,
		costForTwoString,
		aggregatedDiscountInfoV2
	} = restaurant.data;
	return(
		<Link to={`/restaurant/${slugs.city}/${slugs.restaurant}/${id}`} key={id} className='restaurant-card sm:w-1/3 md:w-1/4 lg:w-1/4 xl:w-1/5 min-h-40 flex flex-col mx-5 my-10 hover:shadow-lg'>
			<img src={ process.env.IMAGE_API_URL + cloudinaryImageId } alt="" />
			<div className="restaurant-info py-5 px-5 flex flex-col items-left">
				<h1 className='restaurant-name text-xl font-semibold'>{name}</h1>
				<p className='text-sm text-gray-500'>{cuisines.join(", ")}</p>
				<div className="restaurant-meta flex justify-between items-center mt-3">
					<p className={"flex py-0.5 text-sm px-1"+(avgRating!=="--"?(+avgRating>=4?" text-white bg-teal-600":" text-white bg-[#db7c38]"):(" text-gray-400"))}><AiFillStar className='my-1 mr-1'/>{avgRating}</p>
					<p className='text-xs text-gray-500'>{slaString}</p>
					<p className='text-xs text-gray-500'>{costForTwoString}</p>
				</div>
				<div className="line h-0.5 bg-gray-200 mt-5"></div>
				<p className='offer flex p-2 text-amber-800'>
					<MdLocalOffer className='mr-2 mt-1'/>
					{aggregatedDiscountInfoV2?.shortDescriptionList[0]?.meta}
				</p>
			</div>
		</Link>
	);
}


const RestaurantList = () => {
  const [listFilter, setListFilter] = useState("RELEVANCE");

  let restaurantData = useRestaurantListImport(listFilter);
  let restaurantList = restaurantData.restaurantList;
  let sorts = restaurantData.sorts;
  
  const sortList = ({key}) => {
	if(key !== listFilter){
		restaurantData.restaurantList = [];
		setListFilter(key);
	}
  }

  if(restaurantList?.length === 0) {
	return(
			<Shimmer repeat={12}/>
	)}

  return (
	<div id='restaurant-list'>
		<div className="restaurant-list-header ml-5 mt-10 px-5 flex justify-between">
			<h1 className='text-3xl'><span className=' font-semibold'>{restaurantList?.length}</span> Restaurants</h1>
			<ul className="restaurant-list-filters flex">
				<li className='m-3'>Filters:</li>
				{sorts?.map((item)=>(
					<li key={item.key} onClick={()=>sortList(item)} className={"m-3 hover:font-semibold text-gray-500 cursor-pointer" + (listFilter === item.key ? " font-semibold" : "")}>
						{item.title}
					</li>
				))}
			</ul>
		</div>
		<div className='h-[0.1] mx-5 bg-gray-300 '></div>
		<div className="restaurant-list-items w-full">
			<div className="items-container  flex flex-wrap justify-center">
			{
				restaurantList?.map(
					(restaurant) => <RestaurantCard restaurant={restaurant}/>
				)
			}
			</div>
			
		</div>
	</div>
  )
}

export default RestaurantList