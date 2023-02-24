import React,{useEffect,useState,useContext} from 'react'
import { useParams } from 'react-router-dom';
import { useRestaurantInfoImport } from '../../utils';
import {AiFillStar} from "react-icons/ai";
import {MdLocalOffer} from "react-icons/md";
import {BiFoodTag} from "react-icons/bi";
import "./MenuContainer.css";
import {CartContext} from "../../utils";

const RestaurantHeader = ({restaurant}) => {
	const {
		cloudinaryImageId,
		name,
		city, 
		area, 
		cuisines,
		avgRatingString,
		totalRatingsString,
		sla,
		costForTwo,
		aggregatedDiscountInfo,
	} = restaurant;
	return (
		<div className={`menu-header bg-gray-900 text-white flex justify-between`}>
			<div className="image-container m-10 flex items-center justify-center w-full ">
				<img src={ process.env.IMAGE_API_URL + cloudinaryImageId } alt={city} />
			</div>
			<div className="my-12 w-full restaurant-info flex flex-col">
				<h1 className='text-white uppercase text-3xl'>{name}</h1>
				<p className='text-gray-400 mt-3'>{cuisines?.join(", ")}</p>
				<p className='text-gray-400 mt-3'>{area}, {city}</p>
				<div className="restaurant-data flex justify-between mt-6">
					<div className="ratings flex flex-col ">
						<p className='flex text-lg font-semibold'><AiFillStar className='m-1'/>{avgRatingString}</p>
						<p className='text-gray-300 text-sm mt-2' >{totalRatingsString}</p>
					</div>
					<div className="w-0.5 bg-gray-600 h-full"></div>
					<div className="delivery-time flex flex-col">
						<p className='text-lg font-semibold lowercase'>{sla?.slaString}</p>
						<p className='text-gray-300 text-sm mt-2' >Delivery Time</p>
					</div>
					<div className="w-0.5 bg-gray-600 h-full"></div>
					<div className="cost flex flex-col text-lg font-semibold">
						<p className='text-lg font-semibold'>{"₹"+costForTwo/100}</p>
						<p className='text-gray-300 text-sm mt-2' >Cost for Two</p>
					</div>
				</div>
			</div>
			<div className=" w-9/12 offers relative border border-white mx-10 my-16 flex flex-col justify-center">
				<h1 className='absolute bg-gray-900 p-2 text-xl top-[-20] left-[-20] uppercase'>offer</h1>
				<div className="offers-list p-5 ">
					{aggregatedDiscountInfo?.descriptionList?.map((offer,index)=>{
						if(index<2)
						return (
							<p className='flex m-3 text-md lg:text-lg'><MdLocalOffer className='m-1 text-2xl'/>{offer?.meta}</p>
						);
					})}
				</div>
			</div>
		</div>
	)
}

const RestaurantMenu = ({restaurant}) => {
	const {cartData,setCartData} = useContext(CartContext);
	
	const widgetContents = document.querySelectorAll(".widget-content");
	const [activeWidget, setActiveWidget] = useState(widgetContents[0]?.id)
	
	const scrollFunction = ()=>{
		widgetContents.forEach((section)=>{
			if (window.pageYOffset > section.offsetTop){
				console.log(section.id)
				setActiveWidget(section.id);
			}
		});	
		const menu = document.getElementById("widgets-menu");
		const stickyHeight = menu?.offsetTop + menu?.offsetHeight*2;
		if (window.pageYOffset >= stickyHeight) {
			menu?.classList.add("sticky");
		} else {
			menu?.classList.remove("sticky");
		}
	};

	useEffect(() => {
		window.addEventListener("scroll",scrollFunction);
		return (()=>{
			window.removeEventListener("scroll",scrollFunction);
		});
		
	}, []);
	if(!Object.keys(restaurant).length) return <h2>Loading</h2>

	const {
		menu
	} = restaurant;

	const {
		items,
		widgets
	} = menu;

	return (
		<div className="menu-items flex w-full relative">
			<div id='widgets-menu' className="widgets-container w-4/12 h-full">
				<div className="category-container flex flex-col text-right py-10 h-full">
				{widgets?.map(item=>
						<a href={'#'+item.name}><p className={'widgets-menu-item text-lg cursor-pointer my-1 hover:text-orange-400 pr-4'+(activeWidget===item.name?" text-orange-400 font-semibold border-r-4 border-orange-400":" text-black")}>{item.name}</p></a>
					)
				}
				</div>
			</div>
			<div id="menu-items" className="menu-items-container w-full flex flex-col px-16 max-h-[menu-items] overflow-y-auto scroll-my-1">
				{
					widgets?.map(widget=>{
						return (
							<div id={widget.name} className="widget-content min-h-screen flex flex-col justify-center" key={widget.name}>
								{ widget.entities?.length>0 && (
									<div className="widget-header py-5">
										<h1 className=' text-2xl font-bold'>{widget.name}</h1>
										<p className='text-gray-600 uppercase'>{ widget.entities?.length} Items</p>
									</div>
								) }
								{
									widget.entities?.map(tag=>{
										let id = tag.id;
										let item = items[id];
										const {
											name,
											price,
											attributes,
											cloudinaryImageId
										} = item;
										return (
											<div key={id}>
												<div className="w-full h-0.5 bg-gray-100 first:display-none" ></div>
												<div className='item-meta flex justify-between my-10'>
													<div className="item-details">
														<h1 className={'text-lg font-semibold'+(attributes?.vegClassifier==="VEG"?" text-[#0f8a65]":" text-[#e43b4f]")}><BiFoodTag/></h1>
														<h1 className='text-lg font-semibold'>{name}</h1>
														<p className='text-md'>₹ {(price/100).toFixed(0)}</p>
													</div>
													<div className="add-action w-3/12 relative">
														{cloudinaryImageId&&(<img className='rounded-md' src={ process.env.IMAGE_API_URL + cloudinaryImageId } alt="" />)}
														<button className='absolute bottom-[-10%] left-1/2 translate-x-[-50%] bg-white py-1 px-10 border text-green-600 uppercase'>
															<div className="button-content relative">
																Add
																<div className="absolute top-[-25%] right-[-100%]">+</div>
															</div>
														</button>
													</div>
												</div>
											</div>
										)
									})
								}
								{ widget.entities?.length>0 && (
									<div className="w-full h-0.5 bg-gray-600 my-10" ></div>
								) }
							</div>
						)
					})
				}
			</div>
		</div>
	);
}

const RestaurantProfile = ({restaurant}) => {
	return (
		<>
			<RestaurantHeader restaurant={restaurant}/>
			<RestaurantMenu restaurant={restaurant}/>
		</>
	)
}

const MenuContainer = () => {
	const {id} = useParams();
	const restaurant = useRestaurantInfoImport(id);
	
	document.title = `${restaurant.name} - ${restaurant.city} | Lumega Eats`;
	return <RestaurantProfile restaurant={restaurant}/>
}

export default MenuContainer;