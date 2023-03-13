import React from 'react';
import "./Shimmer.css";

const ShimmerCard = () => {
  return (
	<div className=' sm:w-1/3 md:w-1/4 lg:w-1/4 xl:w-1/5 flex flex-col mx-5 my-10 hover:shadow-lg h-60 bg-slate-100  justify-center items-center'>
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

const ShimmerHeader = ({index}) => {
	return (
		<div key={"shimmer"+index} className={`menu-header min-h-[20rem] bg-gray-900 text-white flex justify-center items-center`}>
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
		<div key="shimmerList" className="restaurant-list-items flex flex-wrap justify-center my-5">
			{
				[...Array(repeat)].map((e,index)=><ShimmerCard index={index}/>)
			}
		</div>
	)
}

export default {ShimmerList,ShimmerHeader, ShimmerMenu}