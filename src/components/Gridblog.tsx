
import { Link } from 'react-router';
// import { Blog } from '../Blog.types'/
import useAuth from '../hooks/useAuth';
import { GoHeart } from 'react-icons/go';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { Blog } from '../services/Blog.types';



const Gridblog = ({ blog }: { blog: Blog }) => {

    // const { user, userDetail } = useAuth()

    // const randomImageNumber = Math.floor(Math.random() * 5) + 1;
    // const blogImage = `/blog${randomImageNumber}.jpg`;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear().toString();
        return `${month} ${day}, ${year}`;
    };

    return (
        <Link to={`/blog/${blog?.id}`}>
            <div className='flex group  py-5 gap-5  justify-between  md:flex-col flex-row-reverse md:w-full cursor-pointer '>

                <img src={blog?.imageUrl} className='mx-auto w-[12rem] h-[4rem] md:w-[25rem] md:h-[14rem] lg:w-[28rem] lg:h-[17rem] object-cover  ' alt="" />

                <div className='flex  flex-col justify-between gap-4 md:gap-3 '>
                    <h1 className='text-lg md:text-2xl lg:text-2xl leading-tight line-clamp-3 md:leading-none font-brand font-bold group-hover:underline'>{blog?.title}</h1>
                    <h3 className='text-sm md:text-base text-gray-500 line-clamp-2 font-blog  leading-tight '>{blog?.summary}</h3>

                    <div className='md:flex items-center justify-between mt-2 hidden w-full '>
                        <div className='flex items-center gap-4'>
                            <img src='/avatar.jpg' className={`size-6 md:size-10 object-cover rounded-full cursor-pointer`} alt="" />
                            <span className='flex justify-between flex-col gap-1'>
                                <p className='text-xs'>{blog?.authorName}</p>
                                <p className='text-xs text-gray-500'>{formatDate(blog?.createdAt)}</p>
                            </span>
                        </div>
                        <div className='flex items-center gap-4 '>
                            <span className='flex items-center gap-2 cursor-pointer'  >
                                <GoHeart size={20} color='gray' />
                                <p className='text-sm font-blog'>{blog?.likes.length}</p>
                            </span>
                            <span className='flex items-center gap-2'>
                                <BiMessageSquareDetail size={20} color='gray' />
                                <p className='text-sm font-blog'>{blog?.comments.length}</p>
                            </span>

                        </div>

                    </div>

                </div>
            </div>
            <div className='flex items-center justify-between md:hidden w-full border-b pb-5'>
                <div className='flex items-center gap-4'>
                    <img src='/avatar.jpg' className={`size-6 md:size-10 object-cover rounded-full cursor-pointer`} alt="" />
                    <span className='flex justify-between flex-col gap-1'>
                        <p className='text-xs'>{blog?.authorName}</p>
                        <p className='text-xs text-gray-500'>{formatDate(blog?.createdAt)}</p>
                    </span>
                </div>
                <div className='flex items-center gap-4 '>
                    <span className='flex items-center gap-2 cursor-pointer'  >
                        <GoHeart size={15} color='gray' />
                        <p className='text-sm font-blog'>{blog?.likes.length}</p>
                    </span>
                    <span className='flex items-center gap-2'>
                        {
                            <BiMessageSquareDetail size={15} color='gray' />
                        }
                        <p className='text-sm font-blog'>{blog?.comments.length}</p>
                    </span>

                </div>

            </div>
        </Link>
    )
}

export default Gridblog