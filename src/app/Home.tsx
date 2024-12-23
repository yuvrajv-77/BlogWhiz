import Singleblog from '../components/Singleblog'
import Gridblog from '../components/Gridblog'
import Skeleton from '../components/Skeleton'
import { blogData } from '../components/blogdata'
import { Link } from 'react-router'
import { useEffect, useState } from 'react'
import { getBlogsFromFirestore, getUserBlogsFromFirestore } from '../services/blogServices'
import { Blog } from '../services/Blog.types'
import { useQuery } from '@tanstack/react-query'


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

  const {data, isPending, isSuccess, isError, error} = useQuery({
		queryKey:['blogs'],
		queryFn:  getBlogsFromFirestore,
	})

  const sortedBlogs = data?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

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
      {/* <div className='py-2 border-b-2'>
        Tech | News | Sports
      </div> */}

      <div className=' '>

        {/* first blog here */}
        {isPending ? <Skeleton /> : (
          <Link to={`/blog/${sortedBlogs[0]?.id}`}>
            <div className='flex border-b group border-gray-200 py-5 gap-8 md:flex-row flex-row-reverse cursor-pointer'>
              <img src={blogData[0].blogImg} className='w-[7rem] h-[4rem] md:w-[20rem] md:h-[13rem] lg:w-[25rem] lg:h-[17rem]' alt="" />
              <div className='flex flex-col justify-between gap-4 md:gap-0'>
                <h1 className='text-lg md:text-3xl lg:text-3xl leading-5 font-brand font-bold group-hover:underline'>{sortedBlogs[0]?.title}</h1>
                <h3 className='text-sm md:text-xl text-gray-500 line-clamp-2 font-blog lg:line-clamp-3 '> {sortedBlogs[0]?.summary}</h3>
                <div className='flex items-center gap-4 w-full'>
                  <img src={blogData[0].authorImg} className={`size-6 md:size-10 object-cover rounded-full cursor-pointer`} alt="" />
                  <span className='flex justify-between flex-col gap-1'>
                    <p className='text-xs'>{sortedBlogs[0]?.authorName}</p>
                    <p className='text-xs'>{formatDate(sortedBlogs[0]?.createdAt)}</p>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )}


        {isPending ? <Skeleton /> : 
        <div className='grid md:grid-cols-2 justify-between md:gap-y-6 md:gap-x-10 '>
          <Gridblog blog={sortedBlogs[1]} />
          <Gridblog blog={sortedBlogs[2]} />

        </div>
        }
        <div className='border-b border-gray-200 mt-3'> </div>

        {sortedBlogs?.slice(3).map((blog, index) => (
          <Singleblog blog={blog} key={index} />
        ))}

      </div>
    </div >
  )
}
export default Home