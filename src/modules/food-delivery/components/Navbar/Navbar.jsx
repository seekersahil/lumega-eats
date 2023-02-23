import React from 'react'
import logo from "../../../../assets/dark_icon.png";
import {Link} from "react-router-dom";
import {AiOutlineShoppingCart} from "react-icons/ai";
import {FaUserCircle} from "react-icons/fa";
import {SearchBarHeader} from "../SearchBar/SearchBar";

const Navbar = () => {
  return (
	<nav className="flex justify-between px-10 py-3 shadow-sm fixed bg-white w-full z-10">
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
				{
					name:"About Us",
					link:"/about"
				},
				{
					name:"FAQs",
					link:"/faqs"
				}
			].map((item,index) =>(
				<li className="list-none m-5 cursor-pointer" key={"nav-item-"+index}>
					<Link to={item.link}>
						{item.name}
					</Link>
				</li>
			))}
			<div className="cart flex m-5 justify-center content-center">
				<Link to="/cart">
					<div className="flex cart">
						<AiOutlineShoppingCart className="m-1"/>(0)
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