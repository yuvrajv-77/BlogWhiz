import React from 'react'
import { Blog } from '../services/Blog.types'
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getBlogsFromFirestore } from '../services/blogServices';


const Section2 = ({  handleTagClick }: { handleTagClick: (tag: string) => void }) => {

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear().toString();
        return `${month} ${day}, ${year}`;

    };
    const recommendedTags = ["Entertaintment", "Gaming", "Music", "Travel", "Science", "Business", "Technology"];

    const { data, isPending } = useQuery({
        queryKey: ['Trending data'],
        queryFn: getBlogsFromFirestore,
    })

    if (isPending) {
        return (
            <div className='hidden sticky top-0 h-screen overflow-y-auto border-l lg:block w-auto py-4 px-8'>
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            </div>
        )
    }

    return (
        <section className='hidden sticky top-0 h-screen overflow-y-auto border-l lg:block w-auto py-4 px-8'>
            <h3 className='my-4 text-md font-semibold font-brand'>Trending Blogs</h3>
            <div className=' space-y-5'>
                <Link to={`/blog/${data?.[4]?.id}`} className='flex flex-col gap-3 group cursor-pointer '>
                    <div className='flex items-center gap-2'>
                        <img src={data?.[4]?.authorImg || '/default-avatar.png'} className={`size-6 object-cover rounded-md cursor-pointer`} alt="" />
                        <p className='text-xs'>{data?.[4]?.authorName}</p>
                    </div>
                    <h1 className='text-sm  text-gray-900 leading-tight line-clamp-2 font-brand font-bold tracking-tight  group-hover:underline'>{data?.[4]?.title}</h1>
                    <p className='text-xs text-gray-500 flex items-center'>{formatDate(data?.[4]?.createdAt)}</p>
                </Link>
                <Link to={`/blog/${data?.[6]?.id}`} className='flex flex-col gap-3 group cursor-pointer '>
                    <div className='flex items-center gap-2'>
                        <img src={data?.[6]?.authorImg || '/default-avatar.png'} className={`size-6 object-cover rounded-md cursor-pointer`} alt="" />
                        <p className='text-xs'>{data?.[6]?.authorName}</p>
                    </div>
                    <h1 className='text-sm  text-gray-900 leading-tight line-clamp-2 font-brand font-bold tracking-tight  group-hover:underline'>{data?.[6]?.title}</h1>
                    <p className='text-xs text-gray-500 flex items-center'>{formatDate(data?.[6]?.createdAt)}</p>
                </Link>
                <Link to={`/blog/${data?.[5]?.id}`} className='flex flex-col gap-3 group cursor-pointer '>
                    <div className='flex items-center gap-2'>
                        <img src={data?.[5]?.authorImg || '/default-avatar.png'} className={`size-6 object-cover rounded-md cursor-pointer`} alt="" />
                        <p className='text-xs'>{data?.[5]?.authorName}</p>
                    </div>
                    <h1 className='text-sm  text-gray-900 leading-tight line-clamp-2 font-brand font-bold tracking-tight  group-hover:underline'>{data?.[5]?.title}</h1>
                    <p className='text-xs text-gray-500 flex items-center'>{formatDate(data?.[5]?.createdAt)}</p>
                </Link>
            </div>

            <h3 className='my-4 text-md font-semibold font-brand'>Recommended Tags</h3>
            <div className='w-full flex flex-wrap gap-x-2 gap-y-4'>
                {recommendedTags.map((tag, index) => (
                    <span className='text-xs font-semibold font-brand text-gray-700 px-3 py-2 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200'
                        onClick={() => handleTagClick(tag)} key={index}>{tag}</span>
                ))}
            </div>

        </section>
    )
}

export default Section2