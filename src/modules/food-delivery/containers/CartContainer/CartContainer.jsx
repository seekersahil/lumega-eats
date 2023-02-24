import React,{useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import { BiFoodTag } from "react-icons/bi";
import { CartContext, useSubtractProductFromCart } from '../../utils';

const EmptyCart= () => {
	return (
		<div className='w-full h-full flex flex-col items-center justify-center'>
			<div className="empty-cart-img w-5/12 p-10">
				<img src={process.env.EMPTY_CART_IMAGE_URL} alt="Empty cart" />
			</div>
			<h1 className='text-gray-600 text-3xl font-semibold'>Your Cart is Empty</h1>
			<p className='text-gray-500 mt-3'>You can go to home page to view more restaurants</p>
			<Link to="/" className='uppercase m-10 px-5 py-2 bg-orange-400 font-semibold text-white'>See Restaurants near you</Link>
		</div>
	)
}

const CartItemsContainer = ({restaurant,products,total,cartData, setCartData}) => {
	const updateQuantity = (id, newQuantity) => {
		if(newQuantity>0)
		{
			setCartData((prev)=>({
				...prev,
				cartItems: {
					...prev.cartItems,
					[id]:{
						...prev.cartItems[id],
						quantity: newQuantity
					}
				}
			}));
		} else {		
			const {
				[id]:{},
				...rest
			} = cartData.cartItems;
			setCartData((prev)=>({
				...prev,
				cartItems: {
					...rest
				}
			}));
		}
	};
	const{name,area_name,cloudinary_image_id} = restaurant;
	return (
		<div className="bg-white min-h-96 h-full shadow-sm p-10 flex flex-col">
			<div className="restaurant-details flex">
				<div className="restaurant-image">
					<img src={process.env.CART_IMAGE_URL+cloudinary_image_id} alt={name} />
				</div>
				<div className=" mx-10 my-5 restaurant-meta flex flex-col h-full justify-center">
					<h1 className="restaurant-name text-xl font-semibold">{name}</h1>
					<p className="restaurant-area text-gray-600">{area_name}</p>
					<div className="line bg-gray-900 w-2/4 h-0.5 mt-5"></div>
				</div>
			</div>
			<div className="cart-items flex flex-col mt-10">
				{
					Object.values(products)?.map(item=>{
						const { items, quantity, itemId } = item;
						const { name, effective_item_price, isVeg } = items[0];
						return (
							(quantity>0&&<div className="cart-item flex justify-between">
								<div className="w-5/12 flex">
									<div className={"food-tag flex items-center"+(isVeg?" text-[#0f8a65]":" text-[#e43b4f]")}><BiFoodTag/></div>
									<div className=" ml-5 food-name flex items-center">{name}</div>
								</div>
								<div className="text-green-700 font-semibold quantity-button flex justify-between items-center border my-2">
									<button onClick={()=>updateQuantity(itemId,quantity-1)} className="minus p-2">-</button>
									<div className="quantity p-2">{quantity}</div>
									<button onClick={()=>updateQuantity(itemId,quantity+1)} className="plus p-2">+</button>
								</div>
								<div className="price flex items-center">₹ {+effective_item_price*quantity}</div>
							</div>)
						)
					})
				}
			</div>
			<div className="line w-full h-0.5 mt-5 bg-gray-900"></div>
			<div className=" uppercase py-5 font-semibold text-xl bill-details flex justify-between">
				<h1>to pay</h1>
				<p className="price">₹ {total}</p>	
			</div>
		</div>
	);
}


const CartContainer = () => {
	document.title = "Cart | Lumega Eats"
	const {cartData,setCartData} = useContext(CartContext);
	const [products,setProducts] = useState({});
	const restaurantDetails = cartData?.cartMeta?.restaurant_details;
	const [total, setTotal] = useState(0);
	useEffect(()=>{
		setProducts(cartData?.cartItems)
	},[cartData])
	useEffect(()=>{
		setTotal(Object.values(products)?.reduce((acc,curr)=>acc+(+curr?.quantity*+curr?.items[0].effective_item_price),0));
	},[products])
  return (
	<div className=' bg-slate-200 min-h-screen relative p-10'>
		{total>0&&(<CartItemsContainer restaurant={restaurantDetails} products={products} total={total} setCartData={setCartData} cartData={cartData}/>)}
		{total<=0&&(<EmptyCart/>)}
	</div>
  )
}

export default CartContainer;