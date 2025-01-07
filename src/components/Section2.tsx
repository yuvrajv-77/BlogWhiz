import React from 'react'
import { Blog } from '../services/Blog.types'

const Section2 = ({blogs}: {blogs:Blog[]}) => {

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear().toString();
        return `${month} ${day}, ${year}`;
    };
    
  return (
    <section className='hidden   border-l lg:block w-auto py-4 px-8'>
                    <h3 className='my-4 text-md font-semibold font-brand'>Trending Blogs</h3>
                    <div className=' space-y-5'>
                        <div className='flex flex-col gap-3 group cursor-pointer '>
                            <div className='flex items-center gap-2'>
                                <img src='/avatar.jpg' className={`size-6 object-cover rounded-md cursor-pointer`} alt="" />
                                <p className='text-xs'>{blogs[0]?.authorName}</p>
                            </div>
                            <h1 className='text-sm  text-gray-900 leading-tight line-clamp-2 font-brand font-bold tracking-tight  group-hover:underline'>{blogs[4]?.title}</h1>
                            <p className='text-xs text-gray-500 flex items-center'>{formatDate(blogs[0]?.createdAt)}</p>
                        </div>
                        <div className='flex flex-col gap-3 group cursor-pointer '>
                            <div className='flex items-center gap-2'>
                                <img src='/avatar.jpg' className={`size-6 object-cover rounded-md cursor-pointer`} alt="" />
                                <p className='text-xs'>{blogs[0]?.authorName}</p>
                            </div>
                            <h1 className='text-sm  text-gray-900 leading-tight line-clamp-2 font-brand font-bold tracking-tight  group-hover:underline'>{blogs[6]?.title}</h1>
                            <p className='text-xs text-gray-500 flex items-center'>{formatDate(blogs[0]?.createdAt)}</p>
                        </div>
                        <div className='flex flex-col gap-3 group cursor-pointer '>
                            <div className='flex items-center gap-2'>
                                <img src='/avatar.jpg' className={`size-6 object-cover rounded-md cursor-pointer`} alt="" />
                                <p className='text-xs'>{blogs[2]?.authorName}</p>
                            </div>
                            <h1 className='text-sm  text-gray-900 leading-tight line-clamp-2 font-brand font-bold tracking-tight  group-hover:underline'>{blogs[2]?.title}</h1>
                            <p className='text-xs text-gray-500 flex items-center'>{formatDate(blogs[2]?.createdAt)}</p>
                        </div>
                    </div>

                </section>
  )
}

export default Section2