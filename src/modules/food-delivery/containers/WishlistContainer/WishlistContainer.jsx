import React,{useState, useEffect, useContext} from 'react';
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart, AiFillDelete, AiTwotoneDelete } from "react-icons/ai";
import { BiFoodTag} from "react-icons/bi";
import { WishlistContext } from '../../utils';

const EmptyWishlist= () => {
	return (
		<div className='w-full min-h-screen flex flex-col items-center justify-center'>
			<h1 className='text-gray-600 text-3xl font-semibold'>Your Wishlist is Empty</h1>
			<p className='text-gray-500 mt-3'>You can go to home page to view more restaurants</p>
			<Link to="/" className='uppercase m-10 px-5 py-2 bg-orange-400 font-semibold text-white'>See Restaurants near you</Link>
		</div>
	)
}

const WishlistComponent = ({restaurant,products,wishlistData,setWishlistData}) =>{
	const removeItemFromWishlist = (item,restaurant) => {
		const {id} = item;
		const index =restaurant?.id;
		const {
			[id]:{},
			...rest
		} = wishlistData[index].wishlistItems;
		if(JSON.stringify(rest)==="{}"){
			removeRestaurantFromWishlist(restaurant);
		}
		else{
			setWishlistData((prev)=>({
				...prev,
				[index]:{
					...prev[index],
					wishlistItems: {
						...rest
					}
				}
			}));
		}
	}
	
	const removeRestaurantFromWishlist = (restaurant) => {
		const {
			[restaurant?.id]:{},
			...restWishlist
		} = wishlistData;
		setWishlistData({
			...restWishlist
		})
	}

	console.log(restaurant)
	const{name,area,cloudinaryImageId,slug,id,areaSlug} = restaurant;
	return (
		<div className="bg-white min-h-96 h-full shadow-sm p-10 mb-10 flex flex-col relative">
			<div className="flex justify-between">
				<Link to={`/restaurant/${areaSlug}/${slug}/${id}`} className="restaurant-details flex cursor-pointer">
					<div className="restaurant-image">
						<img src={process.env.CART_IMAGE_URL+cloudinaryImageId} alt={name} />
					</div>
					<div className=" mx-10 my-5 restaurant-meta flex flex-col h-full justify-center">
						<h1 className="restaurant-name text-xl font-semibold">{name}</h1>
						<p className="restaurant-area text-gray-600">{area}</p>
						<div className="line bg-gray-900 w-2/4 h-0.5 mt-5"></div>
					</div>
				</Link>
				<div className="shift-to-cart flex justify-center items-center">
					<button onClick={()=>moveToCart(restaurant)} className='bg-green-600 py-2 pl-4 pr-8 border text-white uppercase'>
						<button className="button-content relative">
							Move to Cart
							<div className="absolute top-0 right-[-20%]"><AiOutlineShoppingCart/></div>
						</button>
					</button>
				</div>
			</div>
			
			<div className="wishlist-items flex flex-col mt-10">
				{
					Object.values(products)?.map(item=>{
						const { items } = item;
						const { name, price, isVeg } = items[0];
						return (
							<div className="wishlist-item flex justify-between border-t-2">
								<div className="w-5/12 flex">
									<div className={"food-tag flex items-center"+(isVeg?" text-[#0f8a65]":" text-[#e43b4f]")}><BiFoodTag/></div>
									<div className=" ml-5 food-name flex items-center">{name}</div>
								</div>
								<div className="price flex items-center">₹ {+price/100}</div>
								<div onClick={()=>removeItemFromWishlist(items[0],restaurant)} className=" cursor-pointer text-white bg-red-500 font-semibold quantity-button flex justify-center items-center border rounded-full h-10 w-10 m-2">
									<div className="quantity p-2"><AiTwotoneDelete/></div>
								</div>
							</div>
						)
					})
				}
			</div>
			
		</div>
	);
}

const WishlistContainer = ({wishlist, index, setWishlist}) => {
	const products = wishlist[index]?.wishlistItems;
  const restaurantDetails = wishlist[index]?.wishlistMeta?.restaurant_details;
  return (
    <WishlistComponent restaurant={restaurantDetails} products={products} setWishlistData={setWishlist} wishlistData={wishlist}/>
    )
}

const WishlistsContainer = () => {
  document.title = "Wish List | Lumega Eats"
  const {wishlist,setWishlist} = useContext(WishlistContext);
  const [wishlistNumber, setWishlistNumber] = useState(0)
  useEffect(()=>{
	setWishlistNumber(Object.values(wishlist)?.reduce((acc,curr)=>
		acc + (Object.keys(curr.wishlistItems).length)
		,0))
  },[wishlist])
  return (
    <div className=' bg-slate-200 min-h-screen relative p-10'>
      {wishlistNumber<=0&&(<EmptyWishlist/>)}
      {Object.keys(wishlist).map(key=>(
			<WishlistContainer index={key} wishlist={wishlist} setWishlist={setWishlist}/>
	  	)
	  )}
    </div>
  )
}

export default WishlistsContainer