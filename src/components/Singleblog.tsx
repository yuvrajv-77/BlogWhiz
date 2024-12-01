// import {Blog} from '../Blog.types'
import { Link } from 'react-router'
import { blogData } from './blogdata';
import useAuth from '../hooks/useAuth';
import { LuTrash2 } from 'react-icons/lu';
import { useEffect, useState } from 'react';
import { deleteBlogFromFirestore } from '../services/blogServices';

type Blog = {
    // blogImg: string | null;
    id: string
    title: string;
    summary: string;
    body: string;
    userId: string;
    createdAt: Date;
    authorName: string;
}

const Singleblog = ({ blog, onDelete }: { blog: Blog; onDelete?:(blogId:string)=> void }) => {
    const { user, userDetail } = useAuth()
    const [isAuthor, setIsAuthor] = useState(false);

    const name = user?.displayName || userDetail?.displayName || "A Reader or Author";

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear().toString();
        return `${month} ${day}, ${year}`;
    };

    useEffect(() => {       
        if (blog?.userId == user?.uid) {
            setIsAuthor(true);
        }else{
            setIsAuthor(false);
        }
    },[])

    const handleDeleteClick = (event: React.MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        event.stopPropagation();
        deleteBlogFromFirestore(blog?.id);
        onDelete(blog?.id);
    };

    return (
        <Link to={`/blog/${blog?.id}`}>
            <div className='flex group py-5 gap-8 justify-between flex-row-reverse md:w-full transition-colors duration-200 cursor-pointer ease-in-out'>
                <img src={blogData[1].blogImg} className=' w-[100px] h-[60px] md:w-[160px] md:h-[100px] md:ml- border object-cover' alt="" />
                <div className='flex  flex-col  gap-3 w-full '>
                    <h1 className='text-lg md:text-2xl lg:text-2xl leading-5 font-bold font-brand group-hover:underline'>{blog?.title}</h1>
                    <h3 className='text-sm md:text-lg text-gray-500 line-clamp-2 font-blog font-normal leading-tight md:leading-none'>{blog?.summary}</h3>
                    <div className='flex items-center justify-between mt-2 w-full '>
                        <div className='flex items-center gap-4'>
                            <img src='/avatar.jpg' className={`size-6 md:size-10 object-cover rounded-full cursor-pointer`} alt="" />
                            <span className='flex justify-between flex-col gap-1'>
                                <p className='text-xs'>{blog?.authorName}</p>
                                <p className='text-xs text-gray-500'>{formatDate(blog?.createdAt)}</p>
                            </span>
                        </div>
                        {isAuthor && <span className='text-xs p-2 rounded-full hover:bg-gray-200 text-gray-500'
                        onClick={handleDeleteClick}><LuTrash2 size={20}/></span>}
                    </div>
                </div>
            </div>
            <div className='border-b border-gray-200'> </div>

        </Link>

    )
}
export default Singleblog