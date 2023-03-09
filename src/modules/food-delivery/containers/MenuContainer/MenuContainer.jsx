import React ,{ useEffect,useState,useContext } from 'react'
import { useParams } from 'react-router-dom';
import { useRestaurantInfoImport, CartsContext,Shimmer, WishlistContext } from '../../utils';
import { AiFillStar, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { MdLocalOffer } from "react-icons/md";
import { BiFoodTag } from "react-icons/bi";
import "./MenuContainer.css";
import { InView } from 'react-intersection-observer';
import { addItem,updateItem } from '../../utils/store/cartSlice';
import {useDispatch, useSelector} from 'react-redux';


const RestaurantHeader = ({restaurant}) => {
	if(JSON.stringify(restaurant)==="{}"){
		return <Shimmer.ShimmerHeader/>
	}
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

	const cart = useSelector(store => store.cart);
	const {wishlist,setWishlist} = useContext(WishlistContext);
	const widgetContents = document.querySelectorAll(".widget-content");
	const [activeWidget, setActiveWidget] = useState(widgetContents[0]?.id)
	
	
	const dispatch = useDispatch();
	const handleAddItem = (item) => {
		dispatch(addItem({item,restaurant}));
	}
	const handleUpdateQuantity = (item,newQuantity) => {
		dispatch(updateItem({item,restaurant,newQuantity}));
	}


	const toggleWishlist = (item) => {
		if(!wishlist.hasOwnProperty(restaurant.id)){
			const newWishlist = {
				[restaurant.id]:{
					wishlistMeta:{
						restaurant_details: {
							...restaurant
						},
					},
					wishlistItems: {},
				},
			}
			setWishlist((prev)=>({
				...prev,
				...newWishlist
			}))
		} 
		if(!wishlist[restaurant.id]?.wishlistItems?.hasOwnProperty(item.id)){
			let newItem = {
				[item.id]:{
					quantity: 1,
					items: [
						{
							...item
						},
					],
					itemId: item.id,
				}
			}
			setWishlist((prev)=>({
				...prev,
				[restaurant.id]:{
					...prev[restaurant.id],
					wishlistItems: {
						...prev[restaurant.id].wishlistItems,
						...newItem
					},
				}
			}))
		} else{
			const {
				[item.id]:{},
				...rest
			} = wishlist[restaurant.id].wishlistItems;
			if(JSON.stringify(rest)==="{}"){
				const {
					[restaurant.id]:{},
					...restWishlist
				} = wishlist;
				setWishlist({
					...restWishlist
				})
			}
			else{
				setWishlist((prev)=>({
					...prev,
					[restaurant.id]:{
						...prev[restaurant.id],
						wishlistItems: {
							...rest
						}
					}
				}));
			}
		}
	}
	
	

	useEffect(() => {
		const scrollFunction = () => {
			const menu = document.getElementById("widgets-menu");
			const stickyHeight = menu?.offsetTop + menu?.offsetHeight*2;
			if (window.pageYOffset >= stickyHeight) {
				menu?.classList.add("sticky");
			} else {
				menu?.classList.remove("sticky");
			}
		};
		setActiveWidget(widgetContents[0]?.id);
		window.addEventListener("scroll", scrollFunction);
		return function (){
			window.removeEventListener("scroll", scrollFunction);
		};
	}, []);

	if(!Object.keys(restaurant).length) return <Shimmer.ShimmerMenu/>

	const {
		menu
	} = restaurant;

	const {
		items,
		widgets
	} = menu;
	return (
		<InView className="menu-items flex w-full relative">
			<div id='widgets-menu' className="widgets-container w-4/12 h-full">
				<div className="category-container flex flex-col text-right py-10 h-full">
				{
					widgets?.filter(widget=>widget.entities?.length>0).map(item=>{
						return(
							<a onClick={()=>setActiveWidget(item.name)} href={'#'+item.name}>
								<p className={'widgets-menu-item text-lg cursor-pointer my-1 hover:text-orange-400 pr-4'+(activeWidget===item.name?" text-orange-400 font-semibold border-r-4 border-orange-400":" text-black")}>{item.name}</p>
							</a>
						)
					})
				}
				</div>
			</div>
			<div id="menu-items" className="menu-items-container w-full flex flex-col px-16 max-h-[menu-items] overflow-y-auto scroll-my-1">
				{
					widgets?.filter(widget=>widget.entities?.length>0).map(widget=>{
						const cartItems = cart[restaurant.id]?.cartItems;
						return (
							<InView 
								delay={500} 
								threshold={0.01} 
								onChange={(inView, entry) => {
									setActiveWidget(entry.target.id)
								}} 
								id={widget.name} 
								className="widget-content min-h-screen flex flex-col justify-center" 
								key={widget.name}
							>
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
										
										const itemInWishlist = wishlist[restaurant.id]?.wishlistItems?.hasOwnProperty(item.id);
										const itemInCart = cart[restaurant.id]?.cartItems?.hasOwnProperty(item.id);
										
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
														{!itemInCart&&(<button onClick={()=>handleAddItem(item)} className='absolute bottom-[-10%] left-1/2 translate-x-[-50%] bg-white py-1 px-10 border text-green-600 uppercase'>
															<button className="button-content relative">
																Cart
																<div className="absolute top-[-25%] right-[-100%]">+</div>
															</button>
														</button>)}
														{itemInCart&&(
														<div className="absolute flex bottom-[-10%] left-1/2 translate-x-[-50%] bg-white px-4 border text-green-600 uppercase">
															<button onClick={()=>handleUpdateQuantity(item,cartItems[id]?.quantity-1)} className="minus p-2">-</button>
															<div className="quantity p-2">{cartItems[id]?.quantity}</div>
															<button onClick={()=>handleUpdateQuantity(item,cartItems[id]?.quantity+1)} className="plus p-2">+</button>
														</div>
														)}
														<button onClick={()=>toggleWishlist(item)} className='group absolute top-[-10%] left-1/2 translate-x-[-50%] bg-white py-1 px-10 border text-red-600 uppercase'>
															<button className={"button-content relative text-sm"+(itemInWishlist?" font-bold":"")}>
																Wishlist
																<div className="absolute top-0 right-[-65%] group-hover:scale-[1.2]">{itemInWishlist?(<AiFillHeart/>):(<AiOutlineHeart/>)}</div>
															</button>
														</button>
													</div>
												</div>
											</div>
										)
									})
								}
								{ widget.entities?.length>0 && (
									<div className="w-full h-0.5 bg-gray-600 my-10"></div>
								) }
							</InView>
						)
					})
				}
			</div>
		</InView>
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

	if(JSON.stringify(restaurant)!=="{}"){
		document.title = `${restaurant.name} - ${restaurant.city} | Lumega Eats`;
	}
	return <RestaurantProfile restaurant={restaurant}/>
}

export default MenuContainer;