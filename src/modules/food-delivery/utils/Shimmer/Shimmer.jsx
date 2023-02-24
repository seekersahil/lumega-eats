import React from 'react'

const ShimmerCard = () => {
  return (
	<div className='w-60 h-60 mx-5 my-10 bg-slate-100 flex justify-center items-center'>
		<div className='text-gray-300'>Loading...</div>
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

export default {ShimmerList}