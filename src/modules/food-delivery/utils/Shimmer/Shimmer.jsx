import React from 'react';
import "./Shimmer.css";

const ShimmerCard = () => {
  return (
	<div className='w-60 h-60 mx-5 my-10 bg-slate-100 flex justify-center items-center'>
		<div className='text-gray-300'>Loading...</div>
	</div>
  )
}

const ShimmerMenu = ()=>{
	return (
		<>
		<div className="menu-items flex w-full relative">
			<div id='widgets-menu' className="widgets-container w-4/12 h-full">
				<div className="category-container flex flex-col text-right py-10 h-full">
				<article className="relative px-[20%]" >
					<div className="line"></div>
					<div className="line"></div>
					<div className="line"></div>
					<div className="line"></div>
					<div className="line"></div>
					<div className="line"></div>
					<div className="line"></div>
					<div className="line"></div>
					<div className="line"></div>
					<div className="shimmer"></div>
				</article>
				</div>
			</div>
			<div id="menu-items" className="menu-items-container w-full flex flex-col px-16 max-h-[menu-items] overflow-y-auto scroll-my-1">
				<article className="relative p-[5%]" >
					<div className="line"></div>
					<div className="line"></div>
					<div className="line"></div>
					<div className="line"></div>
					<div className="line"></div>
					<div className="line"></div>
					<div className="line"></div>
					<div className="line"></div>
					<div className="line"></div>
					<div className="line"></div>
					<div className="line"></div>
					<div className="line"></div>
					<div className="shimmer"></div>
				</article>
			</div>
		</div>
	</>
	)
}

const ShimmerHeader = () => {
	return (
		<div className={`menu-header min-h-[20rem] bg-gray-900 text-white flex justify-center items-center`}>
			<div className="loadingio-spinner-rolling-z5n0zmythvj">
				<div className="ldio-9e7adv6va9">
					<div></div>
				</div>
			</div>
		</div>
	)

}
const ShimmerList = ({repeat}) => {
	return (
		<div className="restaurant-list-items flex flex-wrap justify-center my-5">
			{
				[...Array(repeat)].map((e)=><ShimmerCard/>)
			}
		</div>
	)
}

export default {ShimmerList,ShimmerHeader, ShimmerMenu}