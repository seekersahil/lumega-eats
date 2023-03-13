import React,{useEffect, useState} from 'react';
import {Shimmer, useRestaurantListImport} from "../../utils";
import { Link } from 'react-router-dom';
import { AiFillStar } from "react-icons/ai";
import { MdLocalOffer } from "react-icons/md";

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
		<Link to={`/restaurant/${slugs?.city}/${slugs?.restaurant}/${id}`} key={id} className='restaurant-card sm:w-1/3 md:w-1/4 lg:w-1/4 xl:w-1/5 min-h-40 flex flex-col mx-5 my-10 hover:shadow-lg'>
			<img src={ process.env.IMAGE_API_URL + cloudinaryImageId } alt="" />
			<div className="restaurant-info py-5 px-5 flex flex-col items-left">
				<h1 className='restaurant-name text-xl font-semibold'>{name}</h1>
				<p className='text-sm text-gray-500'>{cuisines?.join(", ")}</p>
				<div className="restaurant-meta flex justify-between items-center mt-3">
					<p key={id+"rating"} className={"flex py-0.5 text-sm px-1"+(avgRating!=="--"?(+avgRating>=4?" text-white bg-teal-600":" text-white bg-[#db7c38]"):(" text-gray-400"))}><AiFillStar className='my-1 mr-1'/>{avgRating}</p>
					<p key={id+"sla"} className='text-xs text-gray-500'>{slaString}</p>
					<p key={id+"cost"} className='text-xs text-gray-500'>{costForTwoString}</p>
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
  const [offset, setOffset] = useState(0)
  let restaurantData = useRestaurantListImport(listFilter, offset);
  const { restaurantList, sorts, totalOpenRestaurants, isFetchingMore, totalSize, setTotalSize } = restaurantData;

  const sortList = ({key}) => {
	if(key !== listFilter){
		setOffset(0);
		setListFilter(key);
	}
  }

  const handleScrolling = () => {
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
	if (scrollTop + clientHeight >= scrollHeight - 5) {
		if(+totalSize-offset>0){
			setOffset((prev)=>prev+Math.min(15,+totalSize-offset));
		}
	}
  }
  
  useEffect(()=>{
	window.addEventListener("scroll", handleScrolling );
	return ()=>window.removeEventListener("scroll", handleScrolling);
  },[]);


  if(restaurantList?.length === 0) {
	return <Shimmer.ShimmerList repeat={12}/>
  }

  return (
	<div id='restaurant-list'>
		<div className="restaurant-list-header ml-5 mt-10 px-5 flex justify-between">
			<h1 className='text-3xl'><span className=' font-semibold'>{totalSize || totalOpenRestaurants}</span> Restaurants</h1>
			<ul className="restaurant-list-filters flex">
				<li className='m-3'>Filters:</li>
				{sorts?.map((item)=>(
					<li key={item.key} onClick={()=>sortList(item)} className={"m-3 hover:text-gray-900 text-gray-500 cursor-pointer" + (listFilter === item.key ? " font-semibold text-gray-900" : "")}>
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
					(restaurant) => {
						if(restaurant.subtype === 'basic'){
							return <RestaurantCard restaurant={restaurant}/>
						}
					}
				)
			}
			{isFetchingMore && (<Shimmer.ShimmerList repeat={6}/>)}
			</div>
		</div>
	</div>
  )
}

export default RestaurantList