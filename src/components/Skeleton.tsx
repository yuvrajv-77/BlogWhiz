import React from 'react'

const Skeleton = () => {
    return (


        <div className='flex  py-5 gap-8 md:flex-row flex-row-reverse '>
            <div className='w-[7rem] h-[4rem] md:w-[20rem] md:h-[13rem] lg:w-[25rem] lg:h-[17rem] bg-gray-100 animate-pulse'></div>
            <div className='flex flex-col  gap-8 md:gap-8 w-[20rem] md:w-1/2'>
                <span className='bg-gray-100 h-3 md:h-7 rounded-xl w-full animate-pulse'></span>
                <span className='bg-gray-100 h-2 md:h-3 rounded-xl w-full animate-pulse'></span>
                <span className='bg-gray-100 h-2 md:h-3 rounded-xl w-1/2 hidden md:block animate-pulse'></span>
                <span className='bg-gray-100 h-2 md:h-3 rounded-xl w-1/2 hidden md:block animate-pulse'></span>
               
            </div>
        </div>


    )
}

export default Skeleton
