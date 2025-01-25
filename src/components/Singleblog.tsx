// import {Blog} from '../Blog.types'
import { Link } from 'react-router'
import { GoHeart } from 'react-icons/go';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { Blog } from '../services/Blog.types';



const Singleblog = ({ blog }: { blog: Blog; onDelete?: (blogId: string) => void }) => {
    // const { user, userDetail } = useAuth()
    // const [isAuthor, setIsAuthor] = useState(false);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear().toString();
        return `${month} ${day}, ${year}`;
    };

    // useEffect(() => {
    //     if (blog?.userId == user?.uid) {
    //         setIsAuthor(true);
    //     } else {
    //         setIsAuthor(false);
    //     }
    // }, [])

    return (

        <Link to={`/blog/${blog?.id}`} >
            <div className='flex group py-5 gap-8 justify-between flex-row-reverse md:w-full transition-colors duration-200 cursor-pointer ease-in-out md:border-b border-gray-200'>
                <img src={blog.imageUrl} className=' min-w-[100px] h-[60px] md:min-w-[160px] md:h-[107px]  object-cover rounded-xl md:rounded-2xl' alt="" />
                <div className='flex  flex-col  gap-3 w-full '>
                    <h1 className='text-lg md:text-2xl text-gray-900 leading-5 tracking-tight font-extrabold font-brand group-hover:underline'>{blog?.title}</h1>
                    <h3 className='text-sm md:text-lg text-gray-500 line-clamp-2 font-blog font-normal leading-tight md:leading-none'>{blog?.summary}</h3>

                    <div className='md:flex items-center hidden justify-between mt-2 w-full '>


                        <div className='flex items-center gap-4'>
                            <img src='/avatar.jpg' className={`size-6 md:size-10 object-cover rounded-full cursor-pointer`} alt="" />
                            <span className='flex justify-between flex-col gap-1'>
                                <p className='text-xs'>{blog?.authorName}</p>
                                <p className='text-xs text-gray-500'>{formatDate(blog?.createdAt)}</p>
                            </span>
                        </div>
                        <div className='flex items-center gap-4'>
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
            {/* <div className='border-b border-gray-200'> </div> */}
            <div className='flex items-center justify-between md:hidden w-full border-b border-gray-200 pb-5'>
                <div className='flex items-center gap-4'>
                    <img src='/avatar.jpg' className={`size-6 md:size-10 object-cover rounded-full cursor-pointer`} alt="" />
                    <span className='flex justify-between flex-col gap-1'>
                        <p className='text-xs'>{blog?.authorName}</p>
                        <p className='text-xs text-gray-500'>{formatDate(blog?.createdAt)}</p>
                    </span>
                </div>
                <div className='flex items-center gap-4 '>
                    <span className='flex items-center gap-2 cursor-pointer'  >
                        <GoHeart size={19} color='gray' />
                        <p className='text-sm font-blog'>{blog?.likes.length}</p>
                    </span>
                    <span className='flex items-center gap-2'>
                        {
                            <BiMessageSquareDetail size={19} color='gray' />
                        }
                        <p className='text-sm font-blog'>{blog?.comments.length}</p>
                    </span>

                </div>

            </div>

        </Link>

    )
}
export default Singleblog