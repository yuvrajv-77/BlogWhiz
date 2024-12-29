import Singleblog from '../components/Singleblog'
import Gridblog from '../components/Gridblog'
import Skeleton from '../components/Skeleton'
import { blogData } from '../components/blogdata'
import { Link } from 'react-router'
import { getBlogsFromFirestore, getUserBlogsFromFirestore } from '../services/blogServices'
import { Blog } from '../services/Blog.types'
import { useQuery } from '@tanstack/react-query'
import { GoHeart } from 'react-icons/go'
import { BiMessageSquareDetail } from 'react-icons/bi'


const Home = () => {

    // const [blogs, setBlogs] = useState<Blog[]>([]);
    // const [loading, setLoading] = useState(true);


    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear().toString();
        return `${month} ${day}, ${year}`;
    };

    const { data, isPending, isSuccess, isError, error } = useQuery({
        queryKey: ['blogs'],
        queryFn: getBlogsFromFirestore,
    })

    const sortedBlogs: Blog[] = data ? data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) : [];

    // useEffect(() => {
    //   const fetchBlogs = async () => {
    //     setLoading(true);
    //     const data = await getBlogsFromFirestore();
    //     if (data !== undefined) {
    //       console.log(data);

    //       setBlogs(data);
    //     }
    //     setLoading(false);
    //   };

    //   fetchBlogs();
    // }, []);
    console.log('sorted blog ', sortedBlogs);

    if (isError) {
        return (
            <div className='px-5 lg:px-0 md:px-4 lg:max-w-[55rem] mx-auto'>
                <div>
                    <p>Some Error Occured ! 😵‍💫</p>
                    <p className='my-5 text-sm'>
                        {error?.message}
                    </p>
                </div>
            </div>
        )
    }


    return (
        <div className='px-5 lg:px-0 md:px-4 lg:max-w-[55rem] mx-auto'>




            <div className=' '>


                {isPending ? <Skeleton /> : (






                    sortedBlogs.length > 0 && (
                        <Link to={`/blog/${sortedBlogs[0]?.id}`}>
                            <div className='flex md:border-b group border-gray-200 py-5 gap-8 md:flex-row flex-row-reverse cursor-pointer'>
                                <img src={sortedBlogs[0]?.imageUrl} className='min-w-[100px] h-[60px] md:w-[20rem] md:h-[13rem] lg:w-[28rem] lg:h-[17rem] rounded-xl md:rounded-2xl object-cover' alt="" />
                                <div className='flex flex-col justify-between gap-4 md:gap-0'>
                                    <h1 className='text-lg md:text-3xl lg:text-3xl leading-5 font-brand font-extrabold tracking-tight group-hover:underline'>{sortedBlogs[0]?.title}</h1>
                                    <h3 className='text-sm md:text-xl text-gray-500 line-clamp-2 font-blog lg:line-clamp-3 '> {sortedBlogs[0]?.summary}</h3>








                                    <div className='md:flex items-center justify-between mt-2 hidden w-full '>
                                        <div className='flex items-center gap-4'>
                                            <img src='/avatar.jpg' className={`size-6 md:size-10 object-cover rounded-full cursor-pointer`} alt="" />
                                            <span className='flex justify-between flex-col gap-1'>
                                                <p className='text-xs'>{sortedBlogs[0]?.authorName}</p>
                                                <p className='text-xs text-gray-500'>{formatDate(sortedBlogs[0]?.createdAt)}</p>
                                            </span>
                                        </div>
                                        <div className='flex items-center gap-4 '>
                                            <span className='flex items-center gap-2 cursor-pointer'  >
                                                <GoHeart size={20} color='gray' />
                                                <p className='text-sm font-blog'>{sortedBlogs[0]?.likes.length}</p>
                                            </span>
                                            <span className='flex items-center gap-2'>
                                                {
                                                    <BiMessageSquareDetail size={20} color='gray' />
                                                }
                                                <p className='text-sm font-blog'>{sortedBlogs[0]?.comments.length}</p>
                                            </span>

                                        </div>
                                    </div>













                                </div>

                            </div>
                            <div className='flex items-center justify-between md:hidden w-full border-b pb-5'>
                                <div className='flex items-center gap-4'>
                                    <img src='/avatar.jpg' className={`size-6 md:size-10 object-cover rounded-full cursor-pointer`} alt="" />
                                    <span className='flex justify-between flex-col gap-1'>
                                        <p className='text-xs'>{sortedBlogs[0]?.authorName}</p>
                                        <p className='text-xs text-gray-500'>{formatDate(sortedBlogs[0]?.createdAt)}</p>
                                    </span>
                                </div>
                                <div className='flex items-center gap-4 '>
                                    <span className='flex items-center gap-2 cursor-pointer'  >
                                        <GoHeart size={19} color='gray' />
                                        <p className='text-sm font-blog'>{sortedBlogs[0]?.likes.length}</p>
                                    </span>
                                    <span className='flex items-center gap-2'>
                                        <BiMessageSquareDetail size={19} color='gray' />
                                        <p className='text-sm font-blog'>{sortedBlogs[0]?.comments.length}</p>
                                    </span>



















                                </div>

                            </div>



                        </Link>
                    )
                )}


                {isPending ? <Skeleton /> :
                    <div className='grid md:grid-cols-2 justify-between md:gap-y-6 md:gap-x-10 md:border-b border-gray-200 relative'>




                        {sortedBlogs.length > 1 && <Gridblog blog={sortedBlogs[1]} />}
                        {sortedBlogs.length > 2 && <Gridblog blog={sortedBlogs[2]} />}
                    </div>
                }


                {sortedBlogs.slice(3).map((blog, index) => (
                    <Singleblog blog={blog} key={index} />
                ))}

            </div>
        </div >
    )

}
export default Home