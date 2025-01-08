import Singleblog from '../components/Singleblog'
import Gridblog from '../components/Gridblog'
import Skeleton from '../components/Skeleton'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { getBlogsFromFirestore, getUserBlogsFromFirestore } from '../services/blogServices'
import { Blog } from '../services/Blog.types'
import { useQuery } from '@tanstack/react-query'
import { GoHeart } from 'react-icons/go'
import { BiMessageSquareDetail } from 'react-icons/bi'
import { BsCalendar } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import Section2 from '../components/Section2'
import ButtonPrimary from '../components/ButtonPrimary'
import { RxPencil2 } from 'react-icons/rx'


const Home = () => {

    const [blogs, setBlogs] = useState<Blog[]>([]);
    // const [loading, setLoading] = useState(true);

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
    const tags: string[] = ['For You', 'Technology', 'Programming', 'Politics',
        'Books', 'Productivity', 'Health', 'Science',
         'Entrepreneurship', 'Business', 'Life',
        'Education', "Work", 'Travel', 'Fashion', 'Gaming',
        'Art', 'Music', 'Food', 'Sports', 'Culture', 'Lifestyle']


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

    const [searchParams] = useSearchParams();
    const tag = searchParams.get('tag');

    useEffect(() => {
        if (searchParams.get('tag')) {
            const sortedBlogs: Blog[] = data ? data.filter(blog => blog.tags.includes(tag as string)).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) : [];
            setBlogs(sortedBlogs);
        } else {
            const sortedBlogs: Blog[] = data ? data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) : [];
            setBlogs(sortedBlogs);
        }
    }, [tag, data]);


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


    const navigate = useNavigate();


    const handleTagClick = (tag: string) => {
        if (tag === 'For You') {
            navigate('/');
        } else {
            navigate(`/?tag=${tag}`);
        }
    }



    return (
        <main className='px-5 lg:px-0 md:px-4 max-w-[75rem] mx-auto'>
            <div className='flex justify-between select-none gap-9'>
                <section className='md:max-w-[50rem] overflow-x-auto'>
                    <div className=' sticky top-0 bg-white z-10 text-xs  md:text-sm text-gray-500 border-b border-gray-200 flex  items-center h-11 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] select-none font-brand '>{
                        tags.map(
                            (tag, index) => <span key={index} onClick={() => handleTagClick(tag)} className='mr-5 lg:mr-6 whitespace-nowrap cursor-pointer hover:text-black'>{tag}</span>
                        )}
                    </div>          

                    {blogs.length === 0 && !isPending && (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <h2 className="text-2xl font-brand font-bold text-gray-800 mb-4">
                                No blogs found with tag #{tag}
                            </h2>
                            <p className="text-gray-500 mb-8 font-blog">
                                Be the first one to write a blog with this tag!
                            </p>
                            <Link to="/admin/form">
                                <ButtonPrimary> <RxPencil2 size={22}/> Write a blog</ButtonPrimary>
                            </Link>
                        </div>
                    )}

                    {isPending ? <Skeleton /> : (
                        blogs.length > 0 && (
                            <Link to={`/blog/${blogs[0]?.id}`}>   {/* 1st blog */}
                                <div className='flex md:border-b group border-gray-200 py-5 gap-8 md:flex-row flex-row-reverse cursor-pointer'>
                                    <img src={blogs[0]?.imageUrl} className='min-w-[100px] h-[60px] md:min-w-[20rem] md:min-h-[12rem] lg:min-w-[21rem] lg:h-[13rem]  rounded-xl md:rounded-2xl object-cover' alt="" />
                                    <div className='flex flex-col justify-between gap-4 md:gap-0'>
                                        <h1 className='text-lg md:text-2xl text-gray-900 leading-5 font-brand font-extrabold tracking-tight group-hover:underline'>{blogs[0]?.title}</h1>
                                        <h3 className='text-sm md:text-lg text-gray-500 line-clamp-2 font-blog lg:line-clamp-3 '> {blogs[0]?.summary}</h3>

                                        <div className='md:flex items-center justify-between mt-2 hidden w-full '>
                                            <div className='flex items-center gap-4'>
                                                <img src={blogs[0]?.authorImg || '/default-avatar.png'} className={`size-6 md:size-10 object-cover rounded-full cursor-pointer`} alt="" />
                                                <span className='flex justify-between flex-col gap-1'>
                                                    <p className='text-xs'>{blogs[0]?.authorName}</p>
                                                    <p className='text-xs text-gray-500'>{formatDate(blogs[0]?.createdAt)}</p>
                                                </span>
                                            </div>
                                            <div className='flex items-center gap-4 '>
                                                <span className='flex items-center gap-2 cursor-pointer'  >
                                                    <GoHeart size={20} color='gray' />
                                                    <p className='text-sm font-blog'>{blogs[0]?.likes.length}</p>
                                                </span>
                                                <span className='flex items-center gap-2'>
                                                    {
                                                        <BiMessageSquareDetail size={20} color='gray' />
                                                    }
                                                    <p className='text-sm font-blog'>{blogs[0]?.comments.length}</p>
                                                </span>

                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <div className='flex items-center justify-between md:hidden w-full border-b pb-5'>
                                    <div className='flex items-center gap-4'>
                                        <img src='/avatar.jpg' className={`size-6 md:size-10 object-cover rounded-full cursor-pointer`} alt="" />
                                        <span className='flex justify-between flex-col gap-1'>
                                            <p className='text-xs'>{blogs[0]?.authorName}</p>
                                            <p className='text-xs text-gray-500'>{formatDate(blogs[0]?.createdAt)}</p>
                                        </span>
                                    </div>
                                    <div className='flex items-center gap-4 '>
                                        <span className='flex items-center gap-2 cursor-pointer'  >
                                            <GoHeart size={19} color='gray' />
                                            <p className='text-sm font-blog'>{blogs[0]?.likes.length}</p>
                                        </span>
                                        <span className='flex items-center gap-2'>
                                            <BiMessageSquareDetail size={19} color='gray' />
                                            <p className='text-sm font-blog'>{blogs[0]?.comments.length}</p>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        )
                    )}

                    {isPending ? <Skeleton /> :
                        <div className='grid md:grid-cols-2 justify-between md:gap-y-6 md:gap-x-10 md:border-b border-gray-200 relative'>
                            {blogs.length > 1 && <Gridblog blog={blogs[1]} />}
                            {blogs.length > 2 && <Gridblog blog={blogs[2]} />}
                        </div>
                    }

                    {blogs.slice(3).map((blog, index) => (
                        <Singleblog blog={blog} key={index} />
                    ))}

                </section>

                <Section2 handleTagClick={handleTagClick} />
            </div>
        </main >
    )

}
export default Home