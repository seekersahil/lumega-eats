import React,{useContext, useState, useEffect} from 'react'
import logo from "../../../../assets/dark_icon.png";
import {Link} from "react-router-dom";
import {AiOutlineShoppingCart, AiOutlineHeart, AiFillHeart} from "react-icons/ai";
import {FaUserCircle} from "react-icons/fa";
import {SearchBarHeader} from "../SearchBar/SearchBar";
import { CartsContext, WishlistContext } from "../../utils";

const Navbar = ({sticky = true}) => {
  const {carts}= useContext(CartsContext);
  const {wishlist}= useContext(WishlistContext);
  const cartNumber = Object.values(carts || []).reduce((acc,curr)=>acc + (Object.keys(curr.cartItems).length),0);
  const wishlistNumber = Object.values(wishlist || []).reduce((acc,curr)=>acc + (Object.keys(curr.wishlistItems).length),0);
  return (
	<nav className={"flex justify-between px-10 py-3 shadow-sm bg-white w-full z-10"+(sticky?" fixed":"")}>
		<div className="logo">
			<Link to="/">
				<img className="h-14" src={logo} alt="logo" />
			</Link>
		</div>
		<SearchBarHeader/>
		<ul className="nav-items flex justify-between">
			{[
				{
					name:"Home",
					link:"/"
				},
			].map((item,index) =>(
				<li className="list-none m-5 cursor-pointer" key={"nav-item-"+index}>
					<Link to={item.link}>
						{item.name}
					</Link>
				</li>
			))}
			<div className="wishlist flex m-5 justify-center content-center">
				<Link to="/wishlist">
					<div className="flex wishlist">
						Wish List {wishlistNumber === 0?(<AiOutlineHeart className="m-1.5"/>):(<AiFillHeart className="m-1.5"/>)}
					</div>
				</Link>
			</div>
			<div className="cart flex m-5 justify-center content-center">
				<Link to="/cart">
					<div className="flex carts">
						<AiOutlineShoppingCart className="m-1"/>({cartNumber})
					</div>
				</Link>
			</div>
			<Link to="/profile" className='flex m-5 justify-center content-center cursor-pointer'>
				<FaUserCircle className='m-1'/> Login/Signup
			</Link>
		</ul>
	</nav>
  )
}

export default Navbar