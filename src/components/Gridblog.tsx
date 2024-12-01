
import { Link } from 'react-router';
// import { Blog } from '../Blog.types'
import useAuth from '../hooks/useAuth';

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

const Gridblog = ({ blog }: { blog: Blog }) => {

    const { user, userDetail } = useAuth()
  

    const name = user?.displayName || userDetail?.displayName || "A Reader or Author";

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear().toString();
        return `${month} ${day}, ${year}`;
    };

    return (
        <Link to={`/blog/${blog?.id}`}>
            <div className='flex group  py-5 gap-5  justify-between  md:flex-col flex-row-reverse md:w-full hover:bg-gray-50 transition-colors duration-200 cursor-pointer ease-in-out'>

                <img src="https://images.pexels.com/photos/60626/pexels-photo-60626.jpeg?auto=compress&cs=tinysrgb&w=600" className='mx-auto w-[7rem] h-[4rem] md:w-[25rem] md:h-[14rem] lg:w-[28rem] lg:h-[17rem]' alt="" />


                <div className='flex  flex-col justify-between gap-4 md:gap-3 '>
                    <h1 className='text-lg md:text-2xl lg:text-2xl leading-tight md:leading-none font-brand font-bold group-hover:underline'>{blog?.title}</h1>
                    <h3 className='text-sm md:text-base text-gray-500 line-clamp-2 font-blog  leading-tight '>{blog?.summary}</h3>
                    <div className='flex items-center gap-4 w-full'>
                        <img src={'/avatar.jpg'} className={`size-6 md:size-10 object-cover rounded-full cursor-pointer`} alt="" />
                        <span className='flex justify-between flex-col gap-1'>
                            <p className='text-xs'>{blog?.authorName}</p>
                            <p className='text-xs'>{formatDate(blog?.createdAt)}</p>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Gridblog